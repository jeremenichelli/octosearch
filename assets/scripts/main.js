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

// Rivets.js + Sightglass.js
// version: 0.7.0-rc1
// author: Michael Richards
// license: MIT
(function(){function t(t,i,s,n){return new e(t,i,s,n)}function e(t,e,i,s){this.options=s||{},this.options.adapters=this.options.adapters||{},this.obj=t,this.keypath=e,this.callback=i,this.objectPath=[],this.parse(),"undefined"!=typeof(this.target=this.realize())&&this.set(!0,this.key,this.target,this.callback)}function i(t){throw new Error("[sightglass] "+t)}t.adapters={},e.tokenize=function(t,e,i){for(tokens=[],current={"interface":i,path:""},index=0;index<t.length;index++)char=t.charAt(index),~e.indexOf(char)?(tokens.push(current),current={"interface":char,path:""}):current.path+=char;return tokens.push(current),tokens},e.prototype.parse=function(){interfaces=this.interfaces(),interfaces.length||i("Must define at least one adapter interface."),~interfaces.indexOf(this.keypath[0])?(root=this.keypath[0],path=this.keypath.substr(1)):("undefined"==typeof(root=this.options.root||t.root)&&i("Must define a default root adapter."),path=this.keypath),this.tokens=e.tokenize(path,interfaces,root),this.key=this.tokens.pop()},e.prototype.realize=function(){return current=this.obj,unreached=!1,this.tokens.forEach(function(t,e){"undefined"!=typeof current?("undefined"!=typeof this.objectPath[e]?current!==(prev=this.objectPath[e])&&(this.set(!1,t,prev,this.update.bind(this)),this.set(!0,t,current,this.update.bind(this)),this.objectPath[e]=current):(this.set(!0,t,current,this.update.bind(this)),this.objectPath[e]=current),current=this.get(t,current)):(unreached===!1&&(unreached=e),(prev=this.objectPath[e])&&this.set(!1,t,prev,this.update.bind(this)))},this),unreached!==!1&&this.objectPath.splice(unreached),current},e.prototype.update=function(){(next=this.realize())!==this.target&&("undefined"!=typeof this.target&&this.set(!1,this.key,this.target,this.callback),"undefined"!=typeof next&&this.set(!0,this.key,next,this.callback),oldValue=this.value(),this.target=next,this.value()!==oldValue&&this.callback())},e.prototype.value=function(){return"undefined"!=typeof this.target?this.get(this.key,this.target):void 0},e.prototype.setValue=function(t){"undefined"!=typeof this.target&&this.adapter(this.key).set(this.target,this.key.path,t)},e.prototype.get=function(t,e){return this.adapter(t).get(e,t.path)},e.prototype.set=function(t,e,i,s){action=t?"observe":"unobserve",this.adapter(e)[action](i,e.path,s)},e.prototype.interfaces=function(){return interfaces=Object.keys(this.options.adapters),Object.keys(t.adapters).forEach(function(t){~interfaces.indexOf(t)||interfaces.push(t)}),interfaces},e.prototype.adapter=function(e){return this.options.adapters[e.interface]||t.adapters[e.interface]},e.prototype.unobserve=function(){this.tokens.forEach(function(t,e){(obj=this.objectPath[e])&&this.set(!1,t,obj,this.update.bind(this))},this),"undefined"!=typeof this.target&&this.set(!1,this.key,this.target,this.callback)},"undefined"!=typeof module&&module.exports?module.exports=t:this.sightglass=t}).call(this);
(function(){var t,e,i,n,r=[].indexOf||function(t){for(var e=0,i=this.length;i>e;e++)if(e in this&&this[e]===t)return e;return-1},s=function(t,e){return function(){return t.apply(e,arguments)}},o=[].slice,u={}.hasOwnProperty,h=function(t,e){function i(){this.constructor=t}for(var n in e)u.call(e,n)&&(t[n]=e[n]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t};t={options:["prefix","templateDelimiters","rootInterface","preloadData","handler"],extensions:["binders","formatters","components","adapters"],"public":{binders:{},components:{},formatters:{},adapters:{},prefix:"rv",templateDelimiters:["{","}"],rootInterface:".",preloadData:!0,handler:function(t,e,i){return this.call(t,e,i.view.models)},configure:function(e){var i,n,r,s;null==e&&(e={});for(r in e)if(s=e[r],"binders"===r||"components"===r||"formatters"===r||"adapters"===r)for(n in s)i=s[n],t[r][n]=i;else t["public"][r]=s},bind:function(e,i,n){var r;return null==i&&(i={}),null==n&&(n={}),r=new t.View(e,i,n),r.bind(),r}}},"jQuery"in window?(n="on"in jQuery.prototype?["on","off"]:["bind","unbind"],e=n[0],i=n[1],t.Util={bindEvent:function(t,i,n){return jQuery(t)[e](i,n)},unbindEvent:function(t,e,n){return jQuery(t)[i](e,n)},getInputValue:function(t){var e;return e=jQuery(t),"checkbox"===e.attr("type")?e.is(":checked"):e.val()}}):t.Util={bindEvent:function(){return"addEventListener"in window?function(t,e,i){return t.addEventListener(e,i,!1)}:function(t,e,i){return t.attachEvent("on"+e,i)}}(),unbindEvent:function(){return"removeEventListener"in window?function(t,e,i){return t.removeEventListener(e,i,!1)}:function(t,e,i){return t.detachEvent("on"+e,i)}}(),getInputValue:function(t){var e,i,n,r;if("checkbox"===t.type)return t.checked;if("select-multiple"===t.type){for(r=[],i=0,n=t.length;n>i;i++)e=t[i],e.selected&&r.push(e.value);return r}return t.value}},t.KeypathParser=function(){function t(){}return t.parse=function(t,e,i){var n,s,o,u,h,l;for(u=[],s={"interface":i,path:""},o=h=0,l=t.length;l>h;o=h+=1)n=t.charAt(o),r.call(e,n)>=0?(u.push(s),s={"interface":n,path:""}):s.path+=n;return u.push(s),u},t}(),t.ArgumentParser=function(){function t(){}return t.types={primitive:0,keypath:1},t.parse=function(t){var e,i,n,r;for(i=[],n=0,r=t.length;r>n;n++)e=t[n],i.push(/^'.*'$/.test(e)?{type:this.types.primitive,value:e.slice(1,-1)}:"true"===e?{type:this.types.primitive,value:!0}:"false"===e?{type:this.types.primitive,value:!1}:"null"===e?{type:this.types.primitive,value:null}:"undefined"===e?{type:this.types.primitive,value:void 0}:isNaN(Number(e))===!1?{type:this.types.primitive,value:Number(e)}:{type:this.types.keypath,value:e});return i},t}(),t.TextTemplateParser=function(){function t(){}return t.types={text:0,binding:1},t.parse=function(t,e){var i,n,r,s,o,u,h;for(u=[],s=t.length,i=0,n=0;s>n;){if(i=t.indexOf(e[0],n),0>i){u.push({type:this.types.text,value:t.slice(n)});break}if(i>0&&i>n&&u.push({type:this.types.text,value:t.slice(n,i)}),n=i+e[0].length,i=t.indexOf(e[1],n),0>i){o=t.slice(n-e[1].length),r=u[u.length-1],(null!=r?r.type:void 0)===this.types.text?r.value+=o:u.push({type:this.types.text,value:o});break}h=t.slice(n,i).trim(),u.push({type:this.types.binding,value:h}),n=i+e[1].length}return u},t}(),t.View=function(){function e(e,i,n){var r,o,u,h,l,a,p,d,c,f,b,v;for(this.els=e,this.models=i,null==n&&(n={}),this.update=s(this.update,this),this.publish=s(this.publish,this),this.sync=s(this.sync,this),this.unbind=s(this.unbind,this),this.bind=s(this.bind,this),this.select=s(this.select,this),this.build=s(this.build,this),this.componentRegExp=s(this.componentRegExp,this),this.bindingRegExp=s(this.bindingRegExp,this),this.options=s(this.options,this),this.els.jquery||this.els instanceof Array||(this.els=[this.els]),c=t.extensions,l=0,p=c.length;p>l;l++){if(o=c[l],this[o]={},n[o]){f=n[o];for(r in f)u=f[r],this[o][r]=u}b=t["public"][o];for(r in b)u=b[r],null==(h=this[o])[r]&&(h[r]=u)}for(v=t.options,a=0,d=v.length;d>a;a++)o=v[a],this[o]=n[o]||t["public"][o];this.build()}return e.prototype.options=function(){var e,i,n,r,s;for(i={},s=t.extensions.concat(t.options),n=0,r=s.length;r>n;n++)e=s[n],i[e]=this[e];return i},e.prototype.bindingRegExp=function(){return new RegExp("^"+this.prefix+"-")},e.prototype.componentRegExp=function(){return new RegExp("^"+this.prefix.toUpperCase()+"-")},e.prototype.build=function(){var e,i,n,s,o,u,h,l,a;for(this.bindings=[],u=[],e=this.bindingRegExp(),n=this.componentRegExp(),i=function(e){return function(i,n,r,s){var o,u,h,l,a,p,d;return a={},d=function(){var t,e,i,n;for(i=s.split("|"),n=[],t=0,e=i.length;e>t;t++)p=i[t],n.push(p.trim());return n}(),o=function(){var t,e,i,n;for(i=d.shift().split("<"),n=[],t=0,e=i.length;e>t;t++)u=i[t],n.push(u.trim());return n}(),l=o.shift(),a.formatters=d,(h=o.shift())&&(a.dependencies=h.split(/\s+/)),e.bindings.push(new t[i](e,n,r,l,a))}}(this),o=function(s){return function(h){var l,a,p,d,c,f,b,v,g,m,y,w,x,k,E,N,O,V,R,B,C,A,j,U,T,S,P,_,D,I;if(r.call(u,h)<0){if(3===h.nodeType){if(v=t.TextTemplateParser,(c=s.templateDelimiters)&&(w=v.parse(h.data,c)).length&&(1!==w.length||w[0].type!==v.types.text)){for(E=0,R=w.length;R>E;E++)y=w[E],m=document.createTextNode(y.value),h.parentNode.insertBefore(m,h),1===y.type&&i("TextBinding",m,null,y.value);h.parentNode.removeChild(h)}}else if(n.test(h.tagName))x=h.tagName.replace(n,"").toLowerCase(),s.bindings.push(new t.ComponentBinding(s,h,x));else if(null!=h.attributes){for(T=h.attributes,N=0,B=T.length;B>N;N++)if(l=T[N],e.test(l.name)){if(x=l.name.replace(e,""),!(p=s.binders[x])){S=s.binders;for(f in S)k=S[f],"*"!==f&&-1!==f.indexOf("*")&&(g=new RegExp("^"+f.replace("*",".+")+"$"),g.test(x)&&(p=k))}if(p||(p=s.binders["*"]),p.block){for(P=h.childNodes,O=0,C=P.length;C>O;O++)b=P[O],u.push(b);a=[l]}}for(_=a||h.attributes,V=0,A=_.length;A>V;V++)l=_[V],e.test(l.name)&&(x=l.name.replace(e,""),i("Binding",h,x,l.value))}for(D=function(){var t,e,i,n;for(i=h.childNodes,n=[],e=0,t=i.length;t>e;e++)b=i[e],n.push(b);return n}(),I=[],U=0,j=D.length;j>U;U++)d=D[U],I.push(o(d));return I}}}(this),a=this.els,h=0,l=a.length;l>h;h++)s=a[h],o(s)},e.prototype.select=function(t){var e,i,n,r,s;for(r=this.bindings,s=[],i=0,n=r.length;n>i;i++)e=r[i],t(e)&&s.push(e);return s},e.prototype.bind=function(){var t,e,i,n,r;for(n=this.bindings,r=[],e=0,i=n.length;i>e;e++)t=n[e],r.push(t.bind());return r},e.prototype.unbind=function(){var t,e,i,n,r;for(n=this.bindings,r=[],e=0,i=n.length;i>e;e++)t=n[e],r.push(t.unbind());return r},e.prototype.sync=function(){var t,e,i,n,r;for(n=this.bindings,r=[],e=0,i=n.length;i>e;e++)t=n[e],r.push(t.sync());return r},e.prototype.publish=function(){var t,e,i,n,r;for(n=this.select(function(t){return t.binder.publishes}),r=[],e=0,i=n.length;i>e;e++)t=n[e],r.push(t.publish());return r},e.prototype.update=function(t){var e,i,n,r,s,o,u;null==t&&(t={});for(i in t)n=t[i],this.models[i]=n;for(o=this.bindings,u=[],r=0,s=o.length;s>r;r++)e=o[r],u.push(e.update(t));return u},e}(),t.Binding=function(){function e(t,e,i,n,r){this.view=t,this.el=e,this.type=i,this.keypath=n,this.options=null!=r?r:{},this.update=s(this.update,this),this.unbind=s(this.unbind,this),this.bind=s(this.bind,this),this.publish=s(this.publish,this),this.sync=s(this.sync,this),this.set=s(this.set,this),this.eventHandler=s(this.eventHandler,this),this.formattedValue=s(this.formattedValue,this),this.observe=s(this.observe,this),this.setBinder=s(this.setBinder,this),this.formatters=this.options.formatters||[],this.dependencies=[],this.formatterObservers={},this.model=void 0,this.setBinder()}return e.prototype.setBinder=function(){var t,e,i,n;if(!(this.binder=this.view.binders[this.type])){n=this.view.binders;for(t in n)i=n[t],"*"!==t&&-1!==t.indexOf("*")&&(e=new RegExp("^"+t.replace("*",".+")+"$"),e.test(this.type)&&(this.binder=i,this.args=new RegExp("^"+t.replace("*","(.+)")+"$").exec(this.type),this.args.shift()))}return this.binder||(this.binder=this.view.binders["*"]),this.binder instanceof Function?this.binder={routine:this.binder}:void 0},e.prototype.observe=function(e,i,n){return t.sightglass(e,i,n,{root:this.view.rootInterface,adapters:this.view.adapters})},e.prototype.formattedValue=function(e){var i,n,r,s,u,h,l,a,p,d,c,f,b,v;for(v=this.formatters,s=d=0,f=v.length;f>d;s=++d){for(u=v[s],r=u.match(/[^\s']+|'[^']+'/g),h=r.shift(),u=this.view.formatters[h],r=t.ArgumentParser.parse(r),a=[],i=c=0,b=r.length;b>c;i=++c)n=r[i],a.push(0===n.type?n.value:((p=this.formatterObservers)[s]||(p[s]={}),(l=this.formatterObservers[s][i])?void 0:(l=this.observe(this.view.models,n.value,this.sync),this.formatterObservers[s][i]=l),l.value()));(null!=u?u.read:void 0)instanceof Function?e=u.read.apply(u,[e].concat(o.call(a))):u instanceof Function&&(e=u.apply(null,[e].concat(o.call(a))))}return e},e.prototype.eventHandler=function(t){var e,i;return i=(e=this).view.handler,function(n){return i.call(t,this,n,e)}},e.prototype.set=function(t){var e;return t=t instanceof Function&&!this.binder["function"]?this.formattedValue(t.call(this.model)):this.formattedValue(t),null!=(e=this.binder.routine)?e.call(this,this.el,t):void 0},e.prototype.sync=function(){var t,e,i,n,r,s,o,u,h;if(this.model!==this.observer.target){for(o=this.dependencies,i=0,r=o.length;r>i;i++)e=o[i],e.unobserve();if(this.dependencies=[],null!=(this.model=this.observer.target)&&(null!=(u=this.options.dependencies)?u.length:void 0))for(h=this.options.dependencies,n=0,s=h.length;s>n;n++)t=h[n],e=this.observe(this.model,t,this.sync),this.dependencies.push(e)}return this.set(this.observer.value())},e.prototype.publish=function(){var e,i,n,r,s,u,h,l,a;for(r=t.Util.getInputValue(this.el),h=this.formatters.slice(0).reverse(),s=0,u=h.length;u>s;s++)i=h[s],e=i.split(/\s+/),n=e.shift(),(null!=(l=this.view.formatters[n])?l.publish:void 0)&&(r=(a=this.view.formatters[n]).publish.apply(a,[r].concat(o.call(e))));return this.observer.setValue(r)},e.prototype.bind=function(){var t,e,i,n,r,s,o;if(null!=(r=this.binder.bind)&&r.call(this,this.el),this.observer=this.observe(this.view.models,this.keypath,this.sync),this.model=this.observer.target,null!=this.model&&(null!=(s=this.options.dependencies)?s.length:void 0))for(o=this.options.dependencies,i=0,n=o.length;n>i;i++)t=o[i],e=this.observe(this.model,t,this.sync),this.dependencies.push(e);return this.view.preloadData?this.sync():void 0},e.prototype.unbind=function(){var t,e,i,n,r,s,o,u,h;for(null!=(o=this.binder.unbind)&&o.call(this,this.el),this.observer.unobserve(),u=this.dependencies,r=0,s=u.length;s>r;r++)n=u[r],n.unobserve();this.dependencies=[],h=this.formatterObservers;for(i in h){e=h[i];for(t in e)n=e[t],n.unobserve()}return this.formatterObservers={}},e.prototype.update=function(t){var e;return null==t&&(t={}),this.model=this.observer.target,this.unbind(),null!=(e=this.binder.update)&&e.call(this,t),this.bind()},e}(),t.ComponentBinding=function(e){function i(t,e,i){var n,o,u,h,l;for(this.view=t,this.el=e,this.type=i,this.unbind=s(this.unbind,this),this.bind=s(this.bind,this),this.update=s(this.update,this),this.locals=s(this.locals,this),this.component=this.view.components[this.type],this.attributes={},this.inflections={},h=this.el.attributes||[],o=0,u=h.length;u>o;o++)n=h[o],l=n.name,r.call(this.component.attributes,l)>=0?this.attributes[n.name]=n.value:this.inflections[n.name]=n.value}return h(i,e),i.prototype.sync=function(){},i.prototype.locals=function(t){var e,i,n,r,s,o,u,h,l;null==t&&(t=this.view.models),s={},h=this.inflections;for(i in h)for(e=h[i],l=e.split("."),o=0,u=l.length;u>o;o++)r=l[o],s[i]=(s[i]||t)[r];for(i in t)n=t[i],null==s[i]&&(s[i]=n);return s},i.prototype.update=function(t){var e;return null!=(e=this.componentView)?e.update(this.locals(t)):void 0},i.prototype.bind=function(){var e,i;return null!=this.componentView?null!=(i=this.componentView)?i.bind():void 0:(e=this.component.build.call(this.attributes),(this.componentView=new t.View(e,this.locals(),this.view.options)).bind(),this.el.parentNode.replaceChild(e,this.el))},i.prototype.unbind=function(){var t;return null!=(t=this.componentView)?t.unbind():void 0},i}(t.Binding),t.TextBinding=function(t){function e(t,e,i,n,r){this.view=t,this.el=e,this.type=i,this.keypath=n,this.options=null!=r?r:{},this.sync=s(this.sync,this),this.formatters=this.options.formatters||[],this.dependencies=[],this.formatterObservers={}}return h(e,t),e.prototype.binder={routine:function(t,e){return t.data=null!=e?e:""}},e.prototype.sync=function(){return e.__super__.sync.apply(this,arguments)},e}(t.Binding),t["public"].binders.text=function(t,e){return null!=t.textContent?t.textContent=null!=e?e:"":t.innerText=null!=e?e:""},t["public"].binders.html=function(t,e){return t.innerHTML=null!=e?e:""},t["public"].binders.show=function(t,e){return t.style.display=e?"":"none"},t["public"].binders.hide=function(t,e){return t.style.display=e?"none":""},t["public"].binders.enabled=function(t,e){return t.disabled=!e},t["public"].binders.disabled=function(t,e){return t.disabled=!!e},t["public"].binders.checked={publishes:!0,bind:function(e){return t.Util.bindEvent(e,"change",this.publish)},unbind:function(e){return t.Util.unbindEvent(e,"change",this.publish)},routine:function(t,e){var i;return t.checked="radio"===t.type?(null!=(i=t.value)?i.toString():void 0)===(null!=e?e.toString():void 0):!!e}},t["public"].binders.unchecked={publishes:!0,bind:function(e){return t.Util.bindEvent(e,"change",this.publish)},unbind:function(e){return t.Util.unbindEvent(e,"change",this.publish)},routine:function(t,e){var i;return t.checked="radio"===t.type?(null!=(i=t.value)?i.toString():void 0)!==(null!=e?e.toString():void 0):!e}},t["public"].binders.value={publishes:!0,bind:function(e){return this.event="SELECT"===e.tagName?"change":"input",t.Util.bindEvent(e,this.event,this.publish)},unbind:function(e){return t.Util.unbindEvent(e,this.event,this.publish)},routine:function(t,e){var i,n,s,o,u,h,l;if(null!=window.jQuery){if(t=jQuery(t),(null!=e?e.toString():void 0)!==(null!=(o=t.val())?o.toString():void 0))return t.val(null!=e?e:"")}else if("select-multiple"===t.type){if(null!=e){for(l=[],n=0,s=t.length;s>n;n++)i=t[n],l.push(i.selected=(u=i.value,r.call(e,u)>=0));return l}}else if((null!=e?e.toString():void 0)!==(null!=(h=t.value)?h.toString():void 0))return t.value=null!=e?e:""}},t["public"].binders["if"]={block:!0,bind:function(t){var e,i;return null==this.marker?(e=[this.view.prefix,this.type].join("-").replace("--","-"),i=t.getAttribute(e),this.marker=document.createComment(" rivets: "+this.type+" "+i+" "),this.bound=!1,t.removeAttribute(e),t.parentNode.insertBefore(this.marker,t),t.parentNode.removeChild(t)):void 0},unbind:function(){var t;return null!=(t=this.nested)?t.unbind():void 0},routine:function(e,i){var n,r,s,o;if(!!i==!this.bound){if(i){s={},o=this.view.models;for(n in o)r=o[n],s[n]=r;return(this.nested||(this.nested=new t.View(e,s,this.view.options()))).bind(),this.marker.parentNode.insertBefore(e,this.marker.nextSibling),this.bound=!0}return e.parentNode.removeChild(e),this.nested.unbind(),this.bound=!1}},update:function(t){var e;return null!=(e=this.nested)?e.update(t):void 0}},t["public"].binders.unless={block:!0,bind:function(e){return t["public"].binders["if"].bind.call(this,e)},unbind:function(){return t["public"].binders["if"].unbind.call(this)},routine:function(e,i){return t["public"].binders["if"].routine.call(this,e,!i)},update:function(e){return t["public"].binders["if"].update.call(this,e)}},t["public"].binders["on-*"]={"function":!0,unbind:function(e){return this.handler?t.Util.unbindEvent(e,this.args[0],this.handler):void 0},routine:function(e,i){return this.handler&&t.Util.unbindEvent(e,this.args[0],this.handler),t.Util.bindEvent(e,this.args[0],this.handler=this.eventHandler(i))}},t["public"].binders["each-*"]={block:!0,bind:function(t){var e,i,n,r,s;if(null==this.marker)e=[this.view.prefix,this.type].join("-").replace("--","-"),this.marker=document.createComment(" rivets: "+this.type+" "),this.iterated=[],t.removeAttribute(e),t.parentNode.insertBefore(this.marker,t),t.parentNode.removeChild(t);else for(s=this.iterated,n=0,r=s.length;r>n;n++)i=s[n],i.bind()},unbind:function(){var t,e,i,n,r;if(null!=this.iterated){for(n=this.iterated,r=[],e=0,i=n.length;i>e;e++)t=n[e],r.push(t.unbind());return r}},routine:function(e,i){var n,r,s,o,u,h,l,a,p,d,c,f,b,v,g,m,y,w,x,k,E;if(l=this.args[0],i=i||[],this.iterated.length>i.length)for(w=Array(this.iterated.length-i.length),f=0,g=w.length;g>f;f++)s=w[f],c=this.iterated.pop(),c.unbind(),this.marker.parentNode.removeChild(c.els[0]);for(o=b=0,m=i.length;m>b;o=++b)if(h=i[o],r={index:o},r[l]=h,null==this.iterated[o]){x=this.view.models;for(u in x)h=x[u],null==r[u]&&(r[u]=h);p=this.iterated.length?this.iterated[this.iterated.length-1].els[0]:this.marker,a=this.view.options(),a.preloadData=!0,d=e.cloneNode(!0),c=new t.View(d,r,a),c.bind(),this.iterated.push(c),this.marker.parentNode.insertBefore(d,p.nextSibling)}else this.iterated[o].models[l]!==h&&this.iterated[o].update(r);if("OPTION"===e.nodeName){for(k=this.view.bindings,E=[],v=0,y=k.length;y>v;v++)n=k[v],n.el===this.marker.parentNode&&"value"===n.type?E.push(n.sync()):E.push(void 0);return E}},update:function(t){var e,i,n,r,s,o,u,h;e={};for(i in t)n=t[i],i!==this.args[0]&&(e[i]=n);for(u=this.iterated,h=[],s=0,o=u.length;o>s;s++)r=u[s],h.push(r.update(e));return h}},t["public"].binders["class-*"]=function(t,e){var i;return i=" "+t.className+" ",!e==(-1!==i.indexOf(" "+this.args[0]+" "))?t.className=e?""+t.className+" "+this.args[0]:i.replace(" "+this.args[0]+" "," ").trim():void 0},t["public"].binders["*"]=function(t,e){return null!=e?t.setAttribute(this.type,e):t.removeAttribute(this.type)},t["public"].adapters["."]={id:"_rv",counter:0,weakmap:{},weakReference:function(t){var e;return t.hasOwnProperty(this.id)||(e=this.counter++,this.weakmap[e]={callbacks:{}},Object.defineProperty(t,this.id,{value:e})),this.weakmap[t[this.id]]},stubFunction:function(t,e){var i,n,r;return n=t[e],i=this.weakReference(t),r=this.weakmap,t[e]=function(){var e,s,o,u,h,l,a,p,d,c;u=n.apply(t,arguments),a=i.pointers;for(o in a)for(s=a[o],c=null!=(p=null!=(d=r[o])?d.callbacks[s]:void 0)?p:[],h=0,l=c.length;l>h;h++)e=c[h],e();return u}},observeMutations:function(t,e,i){var n,s,o,u,h,l;if(Array.isArray(t)){if(o=this.weakReference(t),null==o.pointers)for(o.pointers={},s=["push","pop","shift","unshift","sort","reverse","splice"],h=0,l=s.length;l>h;h++)n=s[h],this.stubFunction(t,n);if(null==(u=o.pointers)[e]&&(u[e]=[]),r.call(o.pointers[e],i)<0)return o.pointers[e].push(i)}},unobserveMutations:function(t,e,i){var n,r,s;return Array.isArray(t&&null!=t[this.id])&&(r=null!=(s=this.weakReference(t).pointers)?s[e]:void 0)&&(n=r.indexOf(i),n>=0)?r.splice(n,1):void 0},observe:function(t,e,i){var n,s;return n=this.weakReference(t).callbacks,null==n[e]&&(n[e]=[],s=t[e],Object.defineProperty(t,e,{enumerable:!0,get:function(){return s},set:function(o){return function(u){var h,l,a;if(u!==s){for(s=u,a=n[e].slice(),h=0,l=a.length;l>h;h++)i=a[h],r.call(n[e],i)>=0&&i();return o.observeMutations(u,t[o.id],e)}}}(this)})),r.call(n[e],i)<0&&n[e].push(i),this.observeMutations(t[e],t[this.id],e)},unobserve:function(t,e,i){var n,r;return n=this.weakmap[t[this.id]].callbacks[e],r=n.indexOf(i),r>=0&&n.splice(r,1),this.unobserveMutations(t[e],t[this.id],e)},get:function(t,e){return t[e]},set:function(t,e,i){return t[e]=i}},t.factory=function(e){return t.sightglass=e,t["public"]._=t,t["public"]},"object"==typeof("undefined"!=typeof module&&null!==module?module.exports:void 0)?module.exports=t.factory(require("sightglass")):"function"==typeof define&&define.amd?define(["sightglass"],function(e){return this.rivets=t.factory(e)}):this.rivets=t.factory(sightglass)}).call(this);
// define general namespace
var octosearch = octosearch || {};

// view object
octosearch.view = (function (d) {
    // returns object with views
    return {
        user: d.getElementById('user'),
        repos: d.getElementById('repos'),
        reposTemplate: repos.innerHTML,
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
        mainPane = document.getElementById('main'),
        messagePane = document.getElementById('message'),
        avatar = document.querySelector('.user-avatar');

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
            rivets.bind(octosearch.view.user, {
                user: response.data
            });
            var usr = response.data.login;
            octosearch.model.getRepositories(usr, _resolveRepositories);
            if ('history' in w) {
                w.history.pushState(usr, 'OctoSearch // ' + usr, '?' + usr);
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
                // hack because rivets unbinds rv-each iteration templates
                octosearch.view.repos.innerHTML = octosearch.view.reposTemplate;
                rivets.bind(octosearch.view.repos, {
                    repos: response.data
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