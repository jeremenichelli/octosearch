// define general namespace
var octosearch = octosearch || {};

// view object
octosearch.view = (function (d) {
    // returns object with views
    return {
        user: d.getElementById('user'),
        repos: d.getElementById('repos'),
        languages: d.getElementById('languages'),
        message: {
            title: d.getElementById('message-title'),
            content: d.getElementById('message-content')
        }
    };
})(document);

// model
octosearch.model = (function (w, d, undefined) {
    var baseUrl = 'https://api.github.com/';

    var _getUser = function (user, callback) {
        w.jabiru.get(baseUrl + 'users/' + user, function (response) {
            callback(response);
        });
    };

    var _getRepositories = function (user, callback) {
        var response;

        w.jabiru.get(baseUrl + 'users/' + user + '/repos', function (response) {
            callback(response);
        });
    };

    return {
        getUser: _getUser,
        getRepositories: _getRepositories
    };

})(window, document);

// controller
octosearch.controller = (function (w, d, undefined) {
    var searchInput = d.getElementById('search-input'),
        searchSubmit = d.getElementById('search-submit'),
        mainPane = d.getElementById('main'),
        messagePane = d.getElementById('message'),
        avatar = d.querySelector('.user-avatar');

    var _hideMessage = function () {
        messagePane.removeClass('show-message');
        octosearch.view.message.title.innerHTML = '';
        octosearch.view.message.content.innerHTML = '';
    };

    var _showMessage = function () {
        messagePane.addClass('show-message');
    };

    var _setMessage = function (type, title, content) {
        octosearch.view.message.title.innerHTML = title;
        octosearch.view.message.content.innerHTML = content;
        messagePane.className = '';
        if (type) {
            messagePane.addClass(type);
        }
        _showMessage();
    };

    var _hideMain = function () {
        mainPane.removeClass('loaded');
        avatar.removeClass('loaded');
        octosearch.view.languages.innerHTML = '';
        octosearch.view.languages.style.display = 'none';
        d.getElementById('no-repositories-message').style.display = 'none';
        d.querySelector('.repos-list').style.display = 'block';
    };

    var _showMain = function () {
        mainPane.addClass('loaded');
    };

    // search related methods
    var _validateSearch = function () {
        return (searchInput.value !== "");
    };

    var _searchUser = function () {
        _hideMain();
        _setMessage('loading', 'LOADING...', 'We\'ll be ready in a second!');
        if (_validateSearch()) {
            var user = decodeURI(searchInput.value);
            // get user from GitHub API
            octosearch.model.getUser(user, _resolveUser);
        }
    };

    // resolve user reponse data
    var _resolveUser = function (response) {
        if (response.meta.status === 200) {
            monster.view(octosearch.view.user, {
                    model: response.data,
                    context: 'user'
                });
            octosearch.model.getRepositories(response.data.login, _resolveRepositories);
            if ('history' in w) {
                w.history.pushState(response.data.login, 'OctoSearch // ' + response.data.login, '?' + response.data.login);
            }
        } else if (response.meta.status === 404) {
            _setMessage('error', 'User Not Found', 
                'There is no GitHub user with this name, please try with a different one.');
        } else {
             _setMessage('error', 'Something went wrong :(', 
                'Please try again later.');
        }
    };

    // resolve repositories response data and show info
    var _resolveRepositories = function (response) {
        if (response.meta.status === 200) {
            if (response.data.length === 0) {
                d.querySelector('.repos-list').style.display = 'none';
                d.getElementById('no-repositories-message').style.display = 'block';
            } else {
                monster.view(octosearch.view.repos, {
                    model: response.data,
                    context: 'repos'
                });
                //bind more info button events
                var expandables = octosearch.view.repos.querySelectorAll('.more-info-button');
                for (var i = 0, len = expandables.length; i < len; i++) {
                    expandables[i].onclick = _toggleInfo.bind(expandables[i]);
                }
                // build lang chart
                _buildLangView(response.data);
            }
            // hide loading message
            _hideMessage();
            // show main pane
            _showMain();
        } else {
            _setMessage('error', 'Connection Error', 
                'Please try again.');
        }
    };

    var _getFromURL = function () {
        var user = document.location.search.replace('?', '');

        if (user) {
            _setMessage('loading', 'LOADING...', 'We\'ll be ready in a second!');
            octosearch.model.getUser(user, _resolveUser);
        }
    };

    var _toggleInfo = function () {
        this.toggleClass('expanded');
    };

    var _buildLangView = function (arr) {
        var langMap = {},
            langNames = [],
            langPercents = [],
            total = 0,
            pieChart,
            pieInfo = d.createElement('ul'),
            colors = [ '#e51c23', ' #9c27b0', '#ffc107', '#5677fc', '#ff5722', '#55cF90', '#e91e63',
                '#aa00ff', '#5677fc', '#607d8b', '#e05bdF' ];

        for (var i = 0, len = arr.length; i < len; i++) {
            var lang = arr[i].language;

            if (langMap[lang]) {
                ++langMap[lang + ''];
            } else {
                langMap[lang + ''] = 1;
            }
            ++total;
        }

        for (var l in langMap) {
            if (l === 'null') {
                langNames.push('Not specified');
                langPercents.push((langMap[l]/total)*100);
            } else {
                langNames.push(l);
                langPercents.push((langMap[l]/total)*100);
            }
        }

        pieInfo.addClass('lang-info');

        for (var j = 0, nlen = langNames.length; j < nlen; j++) {
            var item = d.createElement('li'),
                p = d.createElement('span');

            p.innerHTML = langPercents[j].toFixed(2) + '%';

            item.style.color = colors[j];

            item.innerHTML = langNames[j];
            item.appendChild(p);

            pieInfo.appendChild(item);
        }

        pieChart = createPie('lang-pie-chart', '200px', '#ffffff', langNames.length, langPercents, colors);

        octosearch.view.languages.appendChild(pieChart);
        octosearch.view.languages.appendChild(pieInfo);   
        octosearch.view.languages.style.display = 'block';  
    };

    // initialize controller
    var _init = function () {
        searchSubmit.onclick = function (e) {
            e.preventDefault();
            _searchUser();
        };

        window.onload = function () {
            // add class loaded to body
            d.body.addClass('loaded');
            // attach event to loaded avatar img
            avatar.onload = function () {
                avatar.addClass('loaded');
            };
            // show welcome message
            _showMessage();
            // check if there's a initial user request in URL
            _getFromURL();
        };
    };

    return {
        init: _init
    };
})(window, document);

octosearch.controller.init();