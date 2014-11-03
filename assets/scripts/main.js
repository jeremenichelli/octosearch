if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
// Classing.js - Jeremias Menichelli
// https://github.com/jeremenichelli/classing - MIT License

// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement, fromIndex) {
    var k;
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    var O = Object(this);

    var len = O.length >>> 0;

    if (len === 0) {
      return -1;
    }

    var n = +fromIndex || 0;

    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    if (n >= len) {
      return -1;
    }

    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    while (k < len) {
      var kValue;
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}

(function(document){
    'use strict';

    // Object to prototype
    var els = (typeof HTMLElement !== 'undefined') ? HTMLElement : Element;

    // Given an element, converts classes into an array
    var _classToArray = function(el){
        return el.className.split(/\s+/);
    };
    // Checks if an element has a class
    var _hasClass = function(el, c){
        return _classToArray(el).indexOf(c) !== -1;
    };
    // Adds a class (if it's not already there)
    var _addClass = function(el, c){
        if(!_hasClass(el, c)){
            el.className += (el.className === '') ? c : ' ' + c;
        }
    };
    // Removes a class (if it's there)
    var _removeClass = function(el, c){
        if(_hasClass(el, c)){
            var cs = _classToArray(el);
            cs.splice(cs.indexOf(c), 1);
            el.className = cs.join(' ');
        }
    };
    // Toggles a class in an element
    var _toggleClass = function(el, c){
        if(_hasClass(el, c)){
            _removeClass(el, c);
        } else {
            _addClass(el, c);
        }
    };

    if(document.documentElement.classList){
        els.prototype.hasClass = function(c){
            return this.classList.contains(c);
        };

        els.prototype.addClass = function(c){
            this.classList.add(c);
        };

        els.prototype.removeClass = function(c){
            this.classList.remove(c);
        };

        els.prototype.toggleClass = function(c){
            this.classList.toggle(c);
        };
    } else {
        els.prototype.hasClass = function(c){
            return _hasClass(this, c);
        };

        els.prototype.addClass = function(c){
            _addClass(this, c);
        };

        els.prototype.removeClass = function(c){
            _removeClass(this, c);
        };

        els.prototype.toggleClass = function(c){
            _toggleClass(this, c);
        };
    }
})(document);
/* CSS3 Pie Chart Generator
 
    A JavaScript Library that allows you to create a dynamic CSS3 Pie Chart anywhere on your webpage. Purely CSS.
    github.com/AliBassam/css-pie

*/

function createPie (pieName, pieSize, baseColor, numberOfSlices, percentages, colors) {
    var sizeNum = parseFloat(pieSize.replace("px",""));
    //Pie Container
    var pieContainer = document.createElement("div");
    pieContainer.id=pieName;
    //Pie Background
    var pieBackground = document.createElement("div");
    pieBackground.style.width=pieSize;
    pieBackground.style.height=pieSize;
    pieBackground.style.position="relative";
    pieBackground.style.webkitBorderRadius=pieSize;
    pieBackground.style.mozBorderRadius=pieSize;
    pieBackground.style.borderRadius=pieSize;
    pieBackground.style.backgroundColor=baseColor;
    //Append Background to Container
    pieContainer.appendChild(pieBackground);
    //Loop through Slices
    var beforeDegree = 0;
    var degree = 0;
    for(var i=0;i<numberOfSlices;i++){
        //New Slice
        var newSlice = document.createElement("div");
        newSlice.style.position="absolute";
        newSlice.style.top="0px"; newSlice.style.left="0px";
        newSlice.style.width=pieSize;
        newSlice.style.height=pieSize;
        newSlice.style.webkitBorderRadius=pieSize;
        newSlice.style.mozBorderRadius=pieSize;
        newSlice.style.borderRadius=pieSize;
        newSlice.style.clip="rect(0px,"+sizeNum+"px,"+sizeNum+"px,"+((sizeNum)/2)+"px)";
        //New Slice Pie
        var pie = document.createElement("div");
        pie.style.backgroundColor=colors[i];
        pie.style.position="absolute";
        pie.style.top="0px"; pie.style.left="0px";
        pie.style.width = pieSize;
        pie.style.height = pieSize; 
        pie.style.webkitBorderRadius = pieSize;
        pie.style.mozBorderRadius = pieSize;
        pie.style.borderRadius = pieSize;
        pie.style.clip = "rect(0px, "+((sizeNum)/2)+"px, "+sizeNum+"px, 0px)";
        //Get Percentage
        var piePercentage = percentages[i];
        //Check if Percentage > 50
        if(piePercentage<=50){
            degree = parseFloat((180*piePercentage)/50);
            pie.style.webkitTransform="rotate("+degree+"deg)";
            pie.style.mozTransform="rotate("+degree+"deg)";
            pie.style.transform="rotate("+degree+"deg)";
            newSlice.appendChild(pie);
            //If it's not first slice, then ...
            if(i!=0){
                newSlice.style.webkitTransform="rotate("+beforeDegree+"deg)";
                newSlice.style.mozTransform="rotate("+beforeDegree+"deg)";
                newSlice.style.transform="rotate("+beforeDegree+"deg)";
            }
            pieBackground.appendChild(newSlice);
            beforeDegree += degree;
        }
        else{   
            newSlice.style.clip="rect(0px,"+(sizeNum)+"px,"+(sizeNum)+"px,"+((sizeNum-100)/2)+"px)";
            newSlice.style.webkitTransform="rotate("+beforeDegree+"deg)";
            newSlice.style.mozTransform="rotate("+beforeDegree+"deg)";
            newSlice.style.transform="rotate("+beforeDegree+"deg)";
            pie.style.webkitTransform="rotate(180deg)";
            pie.style.mozTransform="rotate(180deg)";
            pie.style.transform="rotate(180deg)";
            newSlice.appendChild(pie);
            pieBackground.appendChild(newSlice);
            var newSlice = document.createElement("div");
            newSlice.style.position="absolute";
            newSlice.style.top="0px"; newSlice.style.left="0px";
            newSlice.style.width=pieSize;
            newSlice.style.height=pieSize;
            newSlice.style.webkitBorderRadius=pieSize;
            newSlice.style.mozBorderRadius=pieSize;
            newSlice.style.borderRadius=pieSize;
            newSlice.style.clip="rect(0px,"+sizeNum+"px,"+sizeNum+"px,"+((sizeNum)/2)+"px)";
            if(i!=0)
                beforeDegree = beforeDegree-1;
            newSlice.style.webkitTransform="rotate("+(180+beforeDegree)+"deg)";
            newSlice.style.mozTransform="rotate("+(180+beforeDegree)+"deg)";
            newSlice.style.transform="rotate("+(180+beforeDegree)+"deg)";
            if(i!=0)
                beforeDegree = beforeDegree+1;
            var pie = document.createElement("div");
            pie.style.backgroundColor=colors[i];
            pie.style.position="absolute";
            pie.style.top="0px"; pie.style.left="0px";
            pie.style.width = pieSize;
            pie.style.height = pieSize; 
            pie.style.webkitBorderRadius = pieSize;
            pie.style.mozBorderRadius = pieSize;
            pie.style.borderRadius = pieSize;
            pie.style.clip = "rect(0px, "+((sizeNum)/2)+"px, "+sizeNum+"px, 0px)";
            degree = parseFloat(((piePercentage-50)*180)/50);
            if(i!=0)
                degree=degree+1;
            pie.style.webkitTransform="rotate("+degree+"deg)";
            pie.style.mozTransform="rotate("+degree+"deg)";
            pie.style.transform="rotate("+degree+"deg)";
            if(i!=0)
                degree = degree-1;
            newSlice.appendChild(pie);
            pieBackground.appendChild(newSlice);
            beforeDegree += (180+degree);
        }
    }
    return pieContainer;    
}

// jabiru - Jeremias Menichelli
// https://github.com/jeremenichelli/jabiru - MIT License
(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory(root);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.jabiru = factory(root);
    }
})(this, function () {
    'use strict';

    var cName = 'callback',
        cNumber = 0;

    var _get = function (baseUrl, callback) {
        var script = document.createElement('script'),
            callbackId = cName + cNumber;

        // increase callback number
        cNumber++;

        // make padding method global
        window.jabiru[callbackId] = function (data) {
            if (typeof callback === 'function') {
                callback(data);
            } else {
                console.error('You must specify a method as a callback');
            }
        };

        function onScript (responseData) {
            // unable callback and data ref
            window.jabiru[callbackId] = responseData = null;

            // erase script element
            script.parentNode.removeChild(script);
        }

        // attach event
        script.onload = script.onreadystatechange = function (response) {
            if ((!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
                if (script) {
                    script.onreadystatechange = null;
                }
                onScript(response);
            }
        };

        script.src = baseUrl + '?callback=jabiru.' + callbackId;
        document.head.appendChild(script);
    };

    return {
        get: _get
    };
});

// monster - Jeremias Menichelli
// https://github.com/jeremenichelli/monster - MIT License

(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory(root);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.monster = factory(root);
    }
})(this, function () {
    'use strict';

    var prefix = /^(mns-)/,
        prefixAttr = /^(mns-attr-)/,
        prefixEach = /^(mns-each-)/,
        suffix = /((-)[a-zA-Z0-9]+)/;

    // constructor
    var View = function (options) {
        var v = this;

        if (!options.template) {
            console.error('No template specified');
            return;
        } else {
            v.template = options.template;
        }

        if (!options.model || !options.context) {
            console.error('Please specify a model and a context');
            return;
        } else {
            v.context = options.context;
            v.model = {};
            v.model[options.context] = options.model;
        }

        v.bindModel();
    };


    // adding a class for mns-class binding
    var _addClass = function (el, cl) {
        if ('classList' in el) {
            el.classList.add(cl);
        } else {
            el.className += (el.className === '') ? cl : ' ' + cl; 
        }
    };

    // get property from an object and a string
    var _toProperty = function (obj, str) {
        var props = str.split('.'),
            prop = obj;

        for (var i = 0, len = props.length; i < len; i++) {
            if (typeof prop[props[i]] !== 'undefined') {
                prop = prop[props[i]];
            } else {
                prop = '';
            }
        }

        return prop;
    };

    // available bindings
    var _bindings = {
        text: function (node, attr, model) {
            var data = _toProperty(model, attr.value);
            node.innerHTML = data + '';
        },
        attr: function (node, attr, model) {
            var attribute = attr.name.replace(prefixAttr, ''),
                value = _toProperty(model, attr.value);

            node.setAttribute(attribute, value + '');
        },
        each: function (node, attr, model, context) {
            var eachContext = attr.name.replace(prefixEach, ''),
                data = _toProperty(model, (eachContext === context) ? context : context + '.' + eachContext),
                tempContext = attr.value,
                tempData,
                tempView,
                tempNode,
                bufferNode;

            if (!node.__monsterTemplate__) {
                node.__monsterTemplate__ = node.children[0].cloneNode(true);
            }
            bufferNode = node.__monsterTemplate__.cloneNode(true);
            node.innerHTML = '';

            for (var i in data) {
                tempNode = bufferNode.cloneNode(true);

                // set temporary data
                tempData = data[i] || {};

                // set temporary view
                tempView = new View({
                    template: tempNode,
                    context: tempContext,
                    model: tempData
                });

                node.appendChild(tempNode);
            }

            tempData = tempNode = tempView = bufferNode = null;
        },
        show: function (node, attr, model) {
            var dataShow = _toProperty(model, attr.value);

            node.style.display = (!!dataShow) ? 'block' : 'none'; 
        },
        hide: function (node, attr, model) {
            var dataHide = _toProperty(model, attr.value);

            node.style.display = (!!dataHide) ? 'none' : 'block'; 
        },
        'class': function (node, attr, model) {
            if (attr.value) {
                var cl = _toProperty(model, attr.value);
                _addClass(node, cl + '');
            }
        }
    };

    View.prototype.bindModel = function () {
        var v = this;

        v.nodes = v.template.querySelectorAll('*');

        v.bindNode(v.template);

        for (var i = 0, len = v.nodes.length; i < len; i++) {
            v.bindNode(v.nodes[i]);
        }
    };

    View.prototype.bindNode = function (node) {
        var v = this,
            attrs = node.attributes;

        for (var i = 0, len = attrs.length; i < len; i++) {
            var attr = attrs[i],
                name = attr.name, 
                type;

            if (prefix.test(name)) {
                type = name.replace(prefix, '').replace(suffix, '');
                // applied only if binding type supported
                if (type in _bindings) {
                    _bindings[type](node, attr, v.model, v.context);
                }
            }
        }
    };

    View.prototype.update = function () {
        var v = this;

        for (var i = 0, len = v.nodes.length; i < len; i++) {
            v.bindNode(v.nodes[i]);
        }
    };

    var _createView = function (template, opt) {
        // create and return a new view
        var v = new View({
            template: template,
            context: opt.context,
            model: opt.model
        });

        return v;
    };

    return {
        view: _createView
    };
});
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
            // check if there's a initial user request in URL
            _getFromURL();
        };
    };

    return {
        init: _init
    };
})(window, document);

octosearch.controller.init();