(function(_win, _doc, undefined) {
    'use strict';

    /*
     * aliasses
     * _win: window global object
     * _doc: document object
     */

    /*
     * dep config
     */

    mnster.binding('showinline', function(context) {
        context.node.style.display = context.valueFromModel ? 'inline-block' : 'none';
    });

    mnster.binding('width', function(context) {
        context.node.style.width = context.valueFromModel * 100 + '%';
    });

    mnster.binding('percent', function(context) {
        context.node.textContent = (context.valueFromModel * 100).toFixed(2) + '%';
    });

    /*
     * SEARCH ELEMENTS
     */
    var form = _doc.getElementById('search-form'),
        formInput = _doc.getElementById('search-input');

    /*
     * MESSAGE ELEMENTS
     */
    var messageTitle = _doc.getElementById('message-title'),
        messageBody = _doc.getElementById('message-body'),
        messageBoard = _doc.querySelector('.message');

    /*
     * VIEWS
     */
    var views = {
        user: _doc.getElementById('user'),
        stats: _doc.getElementById('stats'),
        repos: _doc.getElementById('repos')
    };

    /*
     * TEMPLATES
     */
    var templates = {
        user: _doc.querySelector('.user-template'),
        stats: _doc.querySelector('.stats-template'),
        repos: _doc.querySelector('.repos-template')
    };

    /*
     * Returns cloned template content
     * @method cloneTemplate
     */
    var cloneTemplate = function(type) {
        return _doc.importNode(templates[type].content, true);
    };

    /*
     * Show message
     * @method showMessage
     */
    var showMessage = function(title, content, isError) {
        messageBoard.classList.remove('hidden');
        // error class action
        var classAction = isError ? 'add' : 'remove';
        messageBoard.classList[classAction]('error');

        messageTitle.textContent = title;
        messageBody.textContent = content;
    };

    /*
     * Hide message
     * @method hideMessage
     */
    var hideMessage = function() {
        messageBoard.classList.add('hidden');

        messageTitle.textContent = '';
        messageBody.textContent = '';
    };

    /*
     * Load data into views given a user name
     * @method showData
     */
    var showData = function(user) {
        showMessage('Loading', 'Wait a few seconds!');
        // clean views
        empty(views.user);
        empty(views.repos);
        empty(views.stats);

        // fetch data and build views
        jabiru.get({
            url: 'https://api.github.com/users/' + user,
            success: function(result) {
                var userContent = cloneTemplate('user'),
                    reposContent = cloneTemplate('repos');

                if (result.meta.status === 200) {
                    // bind user data
                    mnster.view(userContent, { context: 'user', model: result.data });

                    // get repositories for user
                    jabiru.get({
                        url: 'https://api.github.com/users/' + user + '/repos',
                        success: function(result) {
                            // bind repos info
                            mnster.view(reposContent, { context: 'repos', model: result.data });

                            hideMessage();

                            // append content
                            views.user.appendChild(userContent);
                            views.repos.appendChild(reposContent);

                            // process stats
                            var stats = {};

                            if (result.data.length) {
                                for (var r in result.data) {
                                    // create language object if it does not exist
                                    if (!stats[result.data[r].language]) {
                                        stats[result.data[r].language] = {
                                            name: result.data[r].language,
                                            frequency: 0
                                        };
                                    }

                                    stats[result.data[r].language].frequency =
                                        stats[result.data[r].language].frequency + 1/result.data.length;
                                }

                                if (stats['null']) {
                                    stats.Others = stats['null'];
                                    stats.Others.name = 'Others';
                                    delete stats['null'];
                                }

                                // generate stats view
                                var statsContent = cloneTemplate('stats');
                                mnster.view(statsContent, { context: 'stats', model: stats });

                                views.stats.appendChild(statsContent);

                                // reveal bars percentage
                                setTimeout(function() {
                                    views.stats.querySelector('.hide-bars').classList.remove('hide-bars');
                                }, 1);
                            }
                            
                            // push state
                            _win.history.pushState(user, 'OctoSearch | ' + user, '?' + user);
                        }
                    });
                } else if (result.meta.status === 404) {
                    showMessage('User not found', 'Try with a different user name', true);
                    _win.history.pushState('Not Found', 'OctoSearch | Not Found', '');
                } else {
                    showMessage('Error', 'Connection failed!', true);
                    _win.history.pushState('Error', 'OctoSearch | Error', '');
                }
            }
        });
    };

    _win.addEventListener('load', function() {
        // check presence of query user
        if (_win.location.search) {
            showData(_win.location.search.replace('?', ''));
        }

        // bind submit event on search form
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (formInput.value) {
                showData(formInput.value);
            } else {
                showMessage('Invalid user name', 'You must put something in the search bar!', true);
            }
        }, false);
    });
})(window, document);