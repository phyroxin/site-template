(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,v=e.reduce,h=e.reduceRight,d=e.filter,g=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,_=Object.keys,w=i.bind,j=function(n){return n instanceof j?n:this instanceof j?void(this._wrapped=n):new j(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=j),exports._=j):n._=j,j.VERSION="1.5.1";var A=j.each=j.forEach=function(n,t,e){if(null!=n)if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a in n)if(j.has(n,a)&&t.call(e,n[a],a,n)===r)return};j.map=j.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e.push(t.call(r,n,u,i))}),e)};var E="Reduce of empty array with no initial value";j.reduce=j.foldl=j.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduce===v)return e&&(t=j.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(E);return r},j.reduceRight=j.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduceRight===h)return e&&(t=j.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=j.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(E);return r},j.find=j.detect=function(n,t,r){var e;return O(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},j.filter=j.select=function(n,t,r){var e=[];return null==n?e:d&&n.filter===d?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&e.push(n)}),e)},j.reject=function(n,t,r){return j.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},j.every=j.all=function(n,t,e){t||(t=j.identity);var u=!0;return null==n?u:g&&n.every===g?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var O=j.some=j.any=function(n,t,e){t||(t=j.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};j.contains=j.include=function(n,t){return null==n?!1:y&&n.indexOf===y?-1!=n.indexOf(t):O(n,function(n){return n===t})},j.invoke=function(n,t){var r=o.call(arguments,2),e=j.isFunction(t);return j.map(n,function(n){return(e?t:n[t]).apply(n,r)})},j.pluck=function(n,t){return j.map(n,function(n){return n[t]})},j.where=function(n,t,r){return j.isEmpty(t)?r?void 0:[]:j[r?"find":"filter"](n,function(n){for(var r in t)if(t[r]!==n[r])return!1;return!0})},j.findWhere=function(n,t){return j.where(n,t,!0)},j.max=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.max.apply(Math,n);if(!t&&j.isEmpty(n))return-1/0;var e={computed:-1/0,value:-1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a>e.computed&&(e={value:n,computed:a})}),e.value},j.min=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.min.apply(Math,n);if(!t&&j.isEmpty(n))return 1/0;var e={computed:1/0,value:1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a<e.computed&&(e={value:n,computed:a})}),e.value},j.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=j.random(r++),e[r-1]=e[t],e[t]=n}),e};var F=function(n){return j.isFunction(n)?n:function(t){return t[n]}};j.sortBy=function(n,t,r){var e=F(t);return j.pluck(j.map(n,function(n,t,u){return{value:n,index:t,criteria:e.call(r,n,t,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||void 0===r)return 1;if(e>r||void 0===e)return-1}return n.index<t.index?-1:1}),"value")};var k=function(n,t,r,e){var u={},i=F(null==t?j.identity:t);return A(n,function(t,a){var o=i.call(r,t,a,n);e(u,o,t)}),u};j.groupBy=function(n,t,r){return k(n,t,r,function(n,t,r){(j.has(n,t)?n[t]:n[t]=[]).push(r)})},j.countBy=function(n,t,r){return k(n,t,r,function(n,t){j.has(n,t)||(n[t]=0),n[t]++})},j.sortedIndex=function(n,t,r,e){r=null==r?j.identity:F(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;r.call(e,n[o])<u?i=o+1:a=o}return i},j.toArray=function(n){return n?j.isArray(n)?o.call(n):n.length===+n.length?j.map(n,j.identity):j.values(n):[]},j.size=function(n){return null==n?0:n.length===+n.length?n.length:j.keys(n).length},j.first=j.head=j.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:o.call(n,0,t)},j.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},j.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},j.rest=j.tail=j.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},j.compact=function(n){return j.filter(n,j.identity)};var R=function(n,t,r){return t&&j.every(n,j.isArray)?c.apply(r,n):(A(n,function(n){j.isArray(n)||j.isArguments(n)?t?a.apply(r,n):R(n,t,r):r.push(n)}),r)};j.flatten=function(n,t){return R(n,t,[])},j.without=function(n){return j.difference(n,o.call(arguments,1))},j.uniq=j.unique=function(n,t,r,e){j.isFunction(t)&&(e=r,r=t,t=!1);var u=r?j.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:j.contains(a,r))||(a.push(r),i.push(n[e]))}),i},j.union=function(){return j.uniq(j.flatten(arguments,!0))},j.intersection=function(n){var t=o.call(arguments,1);return j.filter(j.uniq(n),function(n){return j.every(t,function(t){return j.indexOf(t,n)>=0})})},j.difference=function(n){var t=c.apply(e,o.call(arguments,1));return j.filter(n,function(n){return!j.contains(t,n)})},j.zip=function(){for(var n=j.max(j.pluck(arguments,"length").concat(0)),t=new Array(n),r=0;n>r;r++)t[r]=j.pluck(arguments,""+r);return t},j.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},j.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=j.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},j.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},j.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=new Array(e);e>u;)i[u++]=n,n+=r;return i};var M=function(){};j.bind=function(n,t){var r,e;if(w&&n.bind===w)return w.apply(n,o.call(arguments,1));if(!j.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));M.prototype=n.prototype;var u=new M;M.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},j.partial=function(n){var t=o.call(arguments,1);return function(){return n.apply(this,t.concat(o.call(arguments)))}},j.bindAll=function(n){var t=o.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return A(t,function(t){n[t]=j.bind(n[t],n)}),n},j.memoize=function(n,t){var r={};return t||(t=j.identity),function(){var e=t.apply(this,arguments);return j.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},j.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},j.defer=function(n){return j.delay.apply(j,[n,1].concat(o.call(arguments,1)))},j.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var c=function(){o=r.leading===!1?0:new Date,a=null,i=n.apply(e,u)};return function(){var l=new Date;o||r.leading!==!1||(o=l);var f=t-(l-o);return e=this,u=arguments,0>=f?(clearTimeout(a),a=null,o=l,i=n.apply(e,u)):a||r.trailing===!1||(a=setTimeout(c,f)),i}},j.debounce=function(n,t,r){var e,u=null;return function(){var i=this,a=arguments,o=function(){u=null,r||(e=n.apply(i,a))},c=r&&!u;return clearTimeout(u),u=setTimeout(o,t),c&&(e=n.apply(i,a)),e}},j.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},j.wrap=function(n,t){return function(){var r=[n];return a.apply(r,arguments),t.apply(this,r)}},j.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},j.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},j.keys=_||function(n){if(n!==Object(n))throw new TypeError("Invalid object");var t=[];for(var r in n)j.has(n,r)&&t.push(r);return t},j.values=function(n){var t=[];for(var r in n)j.has(n,r)&&t.push(n[r]);return t},j.pairs=function(n){var t=[];for(var r in n)j.has(n,r)&&t.push([r,n[r]]);return t},j.invert=function(n){var t={};for(var r in n)j.has(n,r)&&(t[n[r]]=r);return t},j.functions=j.methods=function(n){var t=[];for(var r in n)j.isFunction(n[r])&&t.push(r);return t.sort()},j.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},j.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},j.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)j.contains(r,u)||(t[u]=n[u]);return t},j.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)void 0===n[r]&&(n[r]=t[r])}),n},j.clone=function(n){return j.isObject(n)?j.isArray(n)?n.slice():j.extend({},n):n},j.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof j&&(n=n._wrapped),t instanceof j&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==String(t);case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;var a=n.constructor,o=t.constructor;if(a!==o&&!(j.isFunction(a)&&a instanceof a&&j.isFunction(o)&&o instanceof o))return!1;r.push(n),e.push(t);var c=0,f=!0;if("[object Array]"==u){if(c=n.length,f=c==t.length)for(;c--&&(f=S(n[c],t[c],r,e)););}else{for(var s in n)if(j.has(n,s)&&(c++,!(f=j.has(t,s)&&S(n[s],t[s],r,e))))break;if(f){for(s in t)if(j.has(t,s)&&!c--)break;f=!c}}return r.pop(),e.pop(),f};j.isEqual=function(n,t){return S(n,t,[],[])},j.isEmpty=function(n){if(null==n)return!0;if(j.isArray(n)||j.isString(n))return 0===n.length;for(var t in n)if(j.has(n,t))return!1;return!0},j.isElement=function(n){return!(!n||1!==n.nodeType)},j.isArray=x||function(n){return"[object Array]"==l.call(n)},j.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){j["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),j.isArguments(arguments)||(j.isArguments=function(n){return!(!n||!j.has(n,"callee"))}),"function"!=typeof/./&&(j.isFunction=function(n){return"function"==typeof n}),j.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},j.isNaN=function(n){return j.isNumber(n)&&n!=+n},j.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},j.isNull=function(n){return null===n},j.isUndefined=function(n){return void 0===n},j.has=function(n,t){return f.call(n,t)},j.noConflict=function(){return n._=t,this},j.identity=function(n){return n},j.times=function(n,t,r){for(var e=Array(Math.max(0,n)),u=0;n>u;u++)e[u]=t.call(r,u);return e},j.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))};var I={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};I.unescape=j.invert(I.escape);var T={escape:new RegExp("["+j.keys(I.escape).join("")+"]","g"),unescape:new RegExp("("+j.keys(I.unescape).join("|")+")","g")};j.each(["escape","unescape"],function(n){j[n]=function(t){return null==t?"":(""+t).replace(T[n],function(t){return I[n][t]})}}),j.result=function(n,t){if(null==n)return void 0;var r=n[t];return j.isFunction(r)?r.call(n):r},j.mixin=function(n){A(j.functions(n),function(t){var r=j[t]=n[t];j.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(j,n))}})};var N=0;j.uniqueId=function(n){var t=++N+"";return n?n+t:t},j.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;j.template=function(n,t,r){var e;r=j.defaults({},r,j.templateSettings);var u=new RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(D,function(n){return"\\"+B[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=new Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,j);var c=function(n){return e.call(this,n,j)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},j.chain=function(n){return j(n).chain()};var z=function(n){return this._chain?j(n).chain():n};j.mixin(j),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];j.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];j.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),j.extend(j.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);
"object"!=typeof JSON&&(JSON={}),function(){function f(t){return 10>t?"0"+t:t}function quote(t){return escapable.lastIndex=0,escapable.test(t)?'"'+t.replace(escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var n,r,o,f,u,i=gap,p=e[t];switch(p&&"object"==typeof p&&"function"==typeof p.toJSON&&(p=p.toJSON(t)),"function"==typeof rep&&(p=rep.call(e,t,p)),typeof p){case"string":return quote(p);case"number":return isFinite(p)?String(p):"null";case"boolean":case"null":return String(p);case"object":if(!p)return"null";if(gap+=indent,u=[],"[object Array]"===Object.prototype.toString.apply(p)){for(f=p.length,n=0;f>n;n+=1)u[n]=str(n,p)||"null";return o=0===u.length?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+i+"]":"["+u.join(",")+"]",gap=i,o}if(rep&&"object"==typeof rep)for(f=rep.length,n=0;f>n;n+=1)"string"==typeof rep[n]&&(r=rep[n],o=str(r,p),o&&u.push(quote(r)+(gap?": ":":")+o));else for(r in p)Object.prototype.hasOwnProperty.call(p,r)&&(o=str(r,p),o&&u.push(quote(r)+(gap?": ":":")+o));return o=0===u.length?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+i+"}":"{"+u.join(",")+"}",gap=i,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;"function"!=typeof JSON.stringify&&(JSON.stringify=function(t,e,n){var r;if(gap="",indent="","number"==typeof n)for(r=0;n>r;r+=1)indent+=" ";else"string"==typeof n&&(indent=n);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(t,e){var n,r,o=t[e];if(o&&"object"==typeof o)for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(r=walk(o,n),void 0!==r?o[n]=r:delete o[n]);return reviver.call(t,e,o)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();
(function(){var t,e=this,i=e.Backbone,s=[],n=s.push,r=s.slice,a=s.splice;t="undefined"!=typeof exports?exports:e.Backbone={},t.VERSION="1.0.0";var o=e._;o||"undefined"==typeof require||(o=require("underscore")),t.$=e.jQuery||e.Zepto||e.ender||e.$,t.noConflict=function(){return e.Backbone=i,this},t.emulateHTTP=!1,t.emulateJSON=!1;var h=t.Events={on:function(t,e,i){if(!c(this,"on",t,[e,i])||!e)return this;this._events||(this._events={});var s=this._events[t]||(this._events[t]=[]);return s.push({callback:e,context:i,ctx:i||this}),this},once:function(t,e,i){if(!c(this,"once",t,[e,i])||!e)return this;var s=this,n=o.once(function(){s.off(t,n),e.apply(this,arguments)});return n._callback=e,this.on(t,n,i)},off:function(t,e,i){var s,n,r,a,h,u,l,d;if(!this._events||!c(this,"off",t,[e,i]))return this;if(!t&&!e&&!i)return this._events={},this;for(a=t?[t]:o.keys(this._events),h=0,u=a.length;u>h;h++)if(t=a[h],r=this._events[t]){if(this._events[t]=s=[],e||i)for(l=0,d=r.length;d>l;l++)n=r[l],(e&&e!==n.callback&&e!==n.callback._callback||i&&i!==n.context)&&s.push(n);s.length||delete this._events[t]}return this},trigger:function(t){if(!this._events)return this;var e=r.call(arguments,1);if(!c(this,"trigger",t,e))return this;var i=this._events[t],s=this._events.all;return i&&l(i,e),s&&l(s,arguments),this},stopListening:function(t,e,i){var s=this._listeners;if(!s)return this;var n=!e&&!i;"object"==typeof e&&(i=this),t&&((s={})[t._listenerId]=t);for(var r in s)s[r].off(e,i,this),n&&delete this._listeners[r];return this}},u=/\s+/,c=function(t,e,i,s){if(!i)return!0;if("object"==typeof i){for(var n in i)t[e].apply(t,[n,i[n]].concat(s));return!1}if(u.test(i)){for(var r=i.split(u),a=0,o=r.length;o>a;a++)t[e].apply(t,[r[a]].concat(s));return!1}return!0},l=function(t,e){var i,s=-1,n=t.length,r=e[0],a=e[1],o=e[2];switch(e.length){case 0:for(;++s<n;)(i=t[s]).callback.call(i.ctx);return;case 1:for(;++s<n;)(i=t[s]).callback.call(i.ctx,r);return;case 2:for(;++s<n;)(i=t[s]).callback.call(i.ctx,r,a);return;case 3:for(;++s<n;)(i=t[s]).callback.call(i.ctx,r,a,o);return;default:for(;++s<n;)(i=t[s]).callback.apply(i.ctx,e)}},d={listenTo:"on",listenToOnce:"once"};o.each(d,function(t,e){h[e]=function(e,i,s){var n=this._listeners||(this._listeners={}),r=e._listenerId||(e._listenerId=o.uniqueId("l"));return n[r]=e,"object"==typeof i&&(s=this),e[t](i,s,this),this}}),h.bind=h.on,h.unbind=h.off,o.extend(t,h);var f=t.Model=function(t,e){var i,s=t||{};e||(e={}),this.cid=o.uniqueId("c"),this.attributes={},o.extend(this,o.pick(e,p)),e.parse&&(s=this.parse(s,e)||{}),(i=o.result(this,"defaults"))&&(s=o.defaults({},s,i)),this.set(s,e),this.changed={},this.initialize.apply(this,arguments)},p=["url","urlRoot","collection"];o.extend(f.prototype,h,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(){return o.clone(this.attributes)},sync:function(){return t.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return o.escape(this.get(t))},has:function(t){return null!=this.get(t)},set:function(t,e,i){var s,n,r,a,h,u,c,l;if(null==t)return this;if("object"==typeof t?(n=t,i=e):(n={})[t]=e,i||(i={}),!this._validate(n,i))return!1;r=i.unset,h=i.silent,a=[],u=this._changing,this._changing=!0,u||(this._previousAttributes=o.clone(this.attributes),this.changed={}),l=this.attributes,c=this._previousAttributes,this.idAttribute in n&&(this.id=n[this.idAttribute]);for(s in n)e=n[s],o.isEqual(l[s],e)||a.push(s),o.isEqual(c[s],e)?delete this.changed[s]:this.changed[s]=e,r?delete l[s]:l[s]=e;if(!h){a.length&&(this._pending=!0);for(var d=0,f=a.length;f>d;d++)this.trigger("change:"+a[d],this,l[a[d]],i)}if(u)return this;if(!h)for(;this._pending;)this._pending=!1,this.trigger("change",this,i);return this._pending=!1,this._changing=!1,this},unset:function(t,e){return this.set(t,void 0,o.extend({},e,{unset:!0}))},clear:function(t){var e={};for(var i in this.attributes)e[i]=void 0;return this.set(e,o.extend({},t,{unset:!0}))},hasChanged:function(t){return null==t?!o.isEmpty(this.changed):o.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?o.clone(this.changed):!1;var e,i=!1,s=this._changing?this._previousAttributes:this.attributes;for(var n in t)o.isEqual(s[n],e=t[n])||((i||(i={}))[n]=e);return i},previous:function(t){return null!=t&&this._previousAttributes?this._previousAttributes[t]:null},previousAttributes:function(){return o.clone(this._previousAttributes)},fetch:function(t){t=t?o.clone(t):{},void 0===t.parse&&(t.parse=!0);var e=this,i=t.success;return t.success=function(s){return e.set(e.parse(s,t),t)?(i&&i(e,s,t),void e.trigger("sync",e,s,t)):!1},R(this,t),this.sync("read",this,t)},save:function(t,e,i){var s,n,r,a=this.attributes;if(null==t||"object"==typeof t?(s=t,i=e):(s={})[t]=e,!(!s||i&&i.wait||this.set(s,i)))return!1;if(i=o.extend({validate:!0},i),!this._validate(s,i))return!1;s&&i.wait&&(this.attributes=o.extend({},a,s)),void 0===i.parse&&(i.parse=!0);var h=this,u=i.success;return i.success=function(t){h.attributes=a;var e=h.parse(t,i);return i.wait&&(e=o.extend(s||{},e)),o.isObject(e)&&!h.set(e,i)?!1:(u&&u(h,t,i),void h.trigger("sync",h,t,i))},R(this,i),n=this.isNew()?"create":i.patch?"patch":"update","patch"===n&&(i.attrs=s),r=this.sync(n,this,i),s&&i.wait&&(this.attributes=a),r},destroy:function(t){t=t?o.clone(t):{};var e=this,i=t.success,s=function(){e.trigger("destroy",e,e.collection,t)};if(t.success=function(n){(t.wait||e.isNew())&&s(),i&&i(e,n,t),e.isNew()||e.trigger("sync",e,n,t)},this.isNew())return t.success(),!1;R(this,t);var n=this.sync("delete",this,t);return t.wait||s(),n},url:function(){var t=o.result(this,"urlRoot")||o.result(this.collection,"url")||U();return this.isNew()?t:t+("/"===t.charAt(t.length-1)?"":"/")+encodeURIComponent(this.id)},parse:function(t){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return null==this.id},isValid:function(t){return this._validate({},o.extend(t||{},{validate:!0}))},_validate:function(t,e){if(!e.validate||!this.validate)return!0;t=o.extend({},this.attributes,t);var i=this.validationError=this.validate(t,e)||null;return i?(this.trigger("invalid",this,i,o.extend(e||{},{validationError:i})),!1):!0}});var g=["keys","values","pairs","invert","pick","omit"];o.each(g,function(t){f.prototype[t]=function(){var e=r.call(arguments);return e.unshift(this.attributes),o[t].apply(o,e)}});var v=t.Collection=function(t,e){e||(e={}),e.url&&(this.url=e.url),e.model&&(this.model=e.model),void 0!==e.comparator&&(this.comparator=e.comparator),this._reset(),this.initialize.apply(this,arguments),t&&this.reset(t,o.extend({silent:!0},e))},m={add:!0,remove:!0,merge:!0},y={add:!0,merge:!1,remove:!1};o.extend(v.prototype,h,{model:f,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return t.sync.apply(this,arguments)},add:function(t,e){return this.set(t,o.defaults(e||{},y))},remove:function(t,e){t=o.isArray(t)?t.slice():[t],e||(e={});var i,s,n,r;for(i=0,s=t.length;s>i;i++)r=this.get(t[i]),r&&(delete this._byId[r.id],delete this._byId[r.cid],n=this.indexOf(r),this.models.splice(n,1),this.length--,e.silent||(e.index=n,r.trigger("remove",r,this,e)),this._removeReference(r));return this},set:function(t,e){e=o.defaults(e||{},m),e.parse&&(t=this.parse(t,e)),o.isArray(t)||(t=t?[t]:[]);var i,s,r,h,u,c=e.at,l=this.comparator&&null==c&&e.sort!==!1,d=o.isString(this.comparator)?this.comparator:null,f=[],p=[],g={};for(i=0,s=t.length;s>i;i++)(r=this._prepareModel(t[i],e))&&((h=this.get(r))?(e.remove&&(g[h.cid]=!0),e.merge&&(h.set(r.attributes,e),l&&!u&&h.hasChanged(d)&&(u=!0))):e.add&&(f.push(r),r.on("all",this._onModelEvent,this),this._byId[r.cid]=r,null!=r.id&&(this._byId[r.id]=r)));if(e.remove){for(i=0,s=this.length;s>i;++i)g[(r=this.models[i]).cid]||p.push(r);p.length&&this.remove(p,e)}if(f.length&&(l&&(u=!0),this.length+=f.length,null!=c?a.apply(this.models,[c,0].concat(f)):n.apply(this.models,f)),u&&this.sort({silent:!0}),e.silent)return this;for(i=0,s=f.length;s>i;i++)(r=f[i]).trigger("add",r,this,e);return u&&this.trigger("sort",this,e),this},reset:function(t,e){e||(e={});for(var i=0,s=this.models.length;s>i;i++)this._removeReference(this.models[i]);return e.previousModels=this.models,this._reset(),this.add(t,o.extend({silent:!0},e)),e.silent||this.trigger("reset",this,e),this},push:function(t,e){return t=this._prepareModel(t,e),this.add(t,o.extend({at:this.length},e)),t},pop:function(t){var e=this.at(this.length-1);return this.remove(e,t),e},unshift:function(t,e){return t=this._prepareModel(t,e),this.add(t,o.extend({at:0},e)),t},shift:function(t){var e=this.at(0);return this.remove(e,t),e},slice:function(t,e){return this.models.slice(t,e)},get:function(t){return null==t?void 0:this._byId[null!=t.id?t.id:t.cid||t]},at:function(t){return this.models[t]},where:function(t,e){return o.isEmpty(t)?e?void 0:[]:this[e?"find":"filter"](function(e){for(var i in t)if(t[i]!==e.get(i))return!1;return!0})},findWhere:function(t){return this.where(t,!0)},sort:function(t){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");return t||(t={}),o.isString(this.comparator)||1===this.comparator.length?this.models=this.sortBy(this.comparator,this):this.models.sort(o.bind(this.comparator,this)),t.silent||this.trigger("sort",this,t),this},sortedIndex:function(t,e,i){e||(e=this.comparator);var s=o.isFunction(e)?e:function(t){return t.get(e)};return o.sortedIndex(this.models,t,s,i)},pluck:function(t){return o.invoke(this.models,"get",t)},fetch:function(t){t=t?o.clone(t):{},void 0===t.parse&&(t.parse=!0);var e=t.success,i=this;return t.success=function(s){var n=t.reset?"reset":"set";i[n](s,t),e&&e(i,s,t),i.trigger("sync",i,s,t)},R(this,t),this.sync("read",this,t)},create:function(t,e){if(e=e?o.clone(e):{},!(t=this._prepareModel(t,e)))return!1;e.wait||this.add(t,e);var i=this,s=e.success;return e.success=function(n){e.wait&&i.add(t,e),s&&s(t,n,e)},t.save(null,e),t},parse:function(t){return t},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0,this.models=[],this._byId={}},_prepareModel:function(t,e){if(t instanceof f)return t.collection||(t.collection=this),t;e||(e={}),e.collection=this;var i=new this.model(t,e);return i._validate(t,e)?i:(this.trigger("invalid",this,t,e),!1)},_removeReference:function(t){this===t.collection&&delete t.collection,t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,s){("add"!==t&&"remove"!==t||i===this)&&("destroy"===t&&this.remove(e,s),e&&t==="change:"+e.idAttribute&&(delete this._byId[e.previous(e.idAttribute)],null!=e.id&&(this._byId[e.id]=e)),this.trigger.apply(this,arguments))}});var _=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","indexOf","shuffle","lastIndexOf","isEmpty","chain"];o.each(_,function(t){v.prototype[t]=function(){var e=r.call(arguments);return e.unshift(this.models),o[t].apply(o,e)}});var b=["groupBy","countBy","sortBy"];o.each(b,function(t){v.prototype[t]=function(e,i){var s=o.isFunction(e)?e:function(t){return t.get(e)};return o[t](this.models,s,i)}});var w=t.View=function(t){this.cid=o.uniqueId("view"),this._configure(t||{}),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()},x=/^(\S+)\s*(.*)$/,E=["model","collection","el","id","attributes","className","tagName","events"];o.extend(w.prototype,h,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){return this.$el.remove(),this.stopListening(),this},setElement:function(e,i){return this.$el&&this.undelegateEvents(),this.$el=e instanceof t.$?e:t.$(e),this.el=this.$el[0],i!==!1&&this.delegateEvents(),this},delegateEvents:function(t){if(!t&&!(t=o.result(this,"events")))return this;this.undelegateEvents();for(var e in t){var i=t[e];if(o.isFunction(i)||(i=this[t[e]]),i){var s=e.match(x),n=s[1],r=s[2];i=o.bind(i,this),n+=".delegateEvents"+this.cid,""===r?this.$el.on(n,i):this.$el.on(n,r,i)}}return this},undelegateEvents:function(){return this.$el.off(".delegateEvents"+this.cid),this},_configure:function(t){this.options&&(t=o.extend({},o.result(this,"options"),t)),o.extend(this,o.pick(t,E)),this.options=t},_ensureElement:function(){if(this.el)this.setElement(o.result(this,"el"),!1);else{var e=o.extend({},o.result(this,"attributes"));this.id&&(e.id=o.result(this,"id")),this.className&&(e["class"]=o.result(this,"className"));var i=t.$("<"+o.result(this,"tagName")+">").attr(e);this.setElement(i,!1)}}}),t.sync=function(e,i,s){var n=k[e];o.defaults(s||(s={}),{emulateHTTP:t.emulateHTTP,emulateJSON:t.emulateJSON});var r={type:n,dataType:"json"};if(s.url||(r.url=o.result(i,"url")||U()),null!=s.data||!i||"create"!==e&&"update"!==e&&"patch"!==e||(r.contentType="application/json",r.data=JSON.stringify(s.attrs||i.toJSON(s))),s.emulateJSON&&(r.contentType="application/x-www-form-urlencoded",r.data=r.data?{model:r.data}:{}),s.emulateHTTP&&("PUT"===n||"DELETE"===n||"PATCH"===n)){r.type="POST",s.emulateJSON&&(r.data._method=n);var a=s.beforeSend;s.beforeSend=function(t){return t.setRequestHeader("X-HTTP-Method-Override",n),a?a.apply(this,arguments):void 0}}"GET"===r.type||s.emulateJSON||(r.processData=!1),"PATCH"!==r.type||!window.ActiveXObject||window.external&&window.external.msActiveXFilteringEnabled||(r.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")});var h=s.xhr=t.ajax(o.extend(r,s));return i.trigger("request",i,h,s),h};var k={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};t.ajax=function(){return t.$.ajax.apply(t.$,arguments)};var S=t.Router=function(t){t||(t={}),t.routes&&(this.routes=t.routes),this._bindRoutes(),this.initialize.apply(this,arguments)},$=/\((.*?)\)/g,T=/(\(\?)?:\w+/g,H=/\*\w+/g,A=/[\-{}\[\]+?.,\\\^$|#\s]/g;o.extend(S.prototype,h,{initialize:function(){},route:function(e,i,s){o.isRegExp(e)||(e=this._routeToRegExp(e)),o.isFunction(i)&&(s=i,i=""),s||(s=this[i]);var n=this;return t.history.route(e,function(r){var a=n._extractParameters(e,r);s&&s.apply(n,a),n.trigger.apply(n,["route:"+i].concat(a)),n.trigger("route",i,a),t.history.trigger("route",n,i,a)}),this},navigate:function(e,i){return t.history.navigate(e,i),this},_bindRoutes:function(){if(this.routes){this.routes=o.result(this,"routes");for(var t,e=o.keys(this.routes);null!=(t=e.pop());)this.route(t,this.routes[t])}},_routeToRegExp:function(t){return t=t.replace(A,"\\$&").replace($,"(?:$1)?").replace(T,function(t,e){return e?t:"([^/]+)"}).replace(H,"(.*?)"),new RegExp("^"+t+"$")},_extractParameters:function(t,e){var i=t.exec(e).slice(1);return o.map(i,function(t){return t?decodeURIComponent(t):null})}});var I=t.History=function(){this.handlers=[],o.bindAll(this,"checkUrl"),"undefined"!=typeof window&&(this.location=window.location,this.history=window.history)},N=/^[#\/]|\s+$/g,P=/^\/+|\/+$/g,O=/msie [\w.]+/,C=/\/$/;I.started=!1,o.extend(I.prototype,h,{interval:50,getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getFragment:function(t,e){if(null==t)if(this._hasPushState||!this._wantsHashChange||e){t=this.location.pathname;var i=this.root.replace(C,"");t.indexOf(i)||(t=t.substr(i.length))}else t=this.getHash();return t.replace(N,"")},start:function(e){if(I.started)throw new Error("Backbone.history has already been started");I.started=!0,this.options=o.extend({},{root:"/"},this.options,e),this.root=this.options.root,this._wantsHashChange=this.options.hashChange!==!1,this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var i=this.getFragment(),s=document.documentMode,n=O.exec(navigator.userAgent.toLowerCase())&&(!s||7>=s);this.root=("/"+this.root+"/").replace(P,"/"),n&&this._wantsHashChange&&(this.iframe=t.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(i)),this._hasPushState?t.$(window).on("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!n?t.$(window).on("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this.fragment=i;var r=this.location,a=r.pathname.replace(/[^\/]$/,"$&/")===this.root;return this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!a?(this.fragment=this.getFragment(null,!0),this.location.replace(this.root+this.location.search+"#"+this.fragment),!0):(this._wantsPushState&&this._hasPushState&&a&&r.hash&&(this.fragment=this.getHash().replace(N,""),this.history.replaceState({},document.title,this.root+this.fragment+r.search)),this.options.silent?void 0:this.loadUrl())},stop:function(){t.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl),clearInterval(this._checkUrlInterval),I.started=!1},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(){var t=this.getFragment();return t===this.fragment&&this.iframe&&(t=this.getFragment(this.getHash(this.iframe))),t===this.fragment?!1:(this.iframe&&this.navigate(t),void(this.loadUrl()||this.loadUrl(this.getHash())))},loadUrl:function(t){var e=this.fragment=this.getFragment(t),i=o.any(this.handlers,function(t){return t.route.test(e)?(t.callback(e),!0):void 0});return i},navigate:function(t,e){if(!I.started)return!1;if(e&&e!==!0||(e={trigger:e}),t=this.getFragment(t||""),this.fragment!==t){this.fragment=t;var i=this.root+t;if(this._hasPushState)this.history[e.replace?"replaceState":"pushState"]({},document.title,i);else{if(!this._wantsHashChange)return this.location.assign(i);this._updateHash(this.location,t,e.replace),this.iframe&&t!==this.getFragment(this.getHash(this.iframe))&&(e.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,t,e.replace))}e.trigger&&this.loadUrl(t)}},_updateHash:function(t,e,i){if(i){var s=t.href.replace(/(javascript:|#).*$/,"");t.replace(s+"#"+e)}else t.hash="#"+e}}),t.history=new I;var j=function(t,e){var i,s=this;i=t&&o.has(t,"constructor")?t.constructor:function(){return s.apply(this,arguments)},o.extend(i,s,e);var n=function(){this.constructor=i};return n.prototype=s.prototype,i.prototype=new n,t&&o.extend(i.prototype,t),i.__super__=s.prototype,i};f.extend=v.extend=S.extend=w.extend=I.extend=j;var U=function(){throw new Error('A "url" property or function must be specified')},R=function(t,e){var i=e.error;e.error=function(s){i&&i(t,s,e),t.trigger("error",t,s,e)}}}).call(this);
Backbone.View.prototype.dispose=function(){this.$el.empty(),this.unbind()};