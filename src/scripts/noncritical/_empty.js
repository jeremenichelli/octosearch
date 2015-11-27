/*
 * empty - v1.0.0
 * https://github.com/jeremenichelli/empty
 * 2015 (c) Jeremias Menichelli - MIT License
*/

(function(root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.empty = factory(root);
    }
})(this, function() {
    'use strict';
    return function(el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }

        if (el.innerText) {
            el.innerText = '';
        }
    };
});
