var APP=function(t,o){var n={url:"http://"+window.location.hostname+":8080/"},e=function(t){for(var o=0;o<t.length;o+=1)t[o]=null;return t},r=function(o,n,r,c,i){console.log("Ajax call====================================>>"),console.log(o),t.ajax({url:o,type:n,data:r?r:{},dataType:c}).done(function(t){console.log("result================>"),console.log(t),i(t),e(arguments)})};t.fn.extend({loading:function(){return this.addClass("csspinner duo")},loaded:function(){return this.removeClass("csspinner duo")}});var c=function(){var t=0,o="";return{START:function(n){t=(new Date).getTime(),o=n},STOP:function(){var n=(new Date).getTime()-t;console.log(o),console.log(n+" milliseconds"),this.RESET()},RESET:function(){t=0,t=""}}}();Function.prototype.method=function(t,o){return this.prototype[t]||(this.prototype[t]=o),this},String.method("deentityify",function(){var t={quot:'"',lt:"<",gt:">","amp;rsquo":"'","amp;amp;rsquo":"'","amp;rdquo":'"',"amp;amp;rdquo":'"',"amp;lsquo":"'","amp;amp;lsquo":"'","amp;ldquo":'"',"amp;amp;ldquo":'"',"amp;pound":"£"};return function(){return this.replace(/&([^&]+);/gm,function(o,n){var e=t[n];return"string"==typeof e?e:o}).replace(/\\/gm,"")}}()),String.method("reentityify",function(){var t={"<":"&lt;",">":"&gt;","/":"&#47;"};return function(){return this.replace(/([<|>|/])/gm,function(o,n){var e=t[n];return"string"==typeof e?e:o})}}()),String.method("addLineBreaks",function(){var t={"\r\n":"<br>","\r":"<br>","\n":"<br>"};return function(){return this.replace(/([\r\n|\r|\n])/gm,function(o,n){var e=t[n];return"string"==typeof e?e:o})}}());var i=function(){return n.url},u=function(t,o){"object"==typeof t?config[t[0]][t[1]]=o:config[t]=o,e(arguments)},a=function(t){return"object"==typeof t?config[t[0]][t[1]]:config[t]},p=function(t,o){config[t].push(o),e(arguments)},s=function(t){config[t].pop(),e(arguments)},l=function(t,o){var n=config[t].indexOf(o);config[t].splice(n,1),e(arguments)},f=function(t){return"[object Array]"===Object.prototype.toString.call(t)?!0:!1},g=function(o,n,e){APP.prototype.TIMER.START("Render time: ");var r=document.createDocumentFragment();"[object Array]"===Object.prototype.toString.call(e),t.each(e,function(t,n){var e=document.createElement(o);e.className="texDiv",e.appendChild(document.createTextNode(n)),r.appendChild(e)}),t("#"+n).append(r),APP.prototype.TIMER.STOP()},m=function(t){var o={id:"test"}||{};r(APP.prototype.GET_URL()+"api/getData","GET",o,"json",function(o){t(o)})};return o.prototype.TIMER=c,o.prototype.GET_URL=i,o.prototype.GET_DATA=m,o.prototype.SET_VAL=u,o.prototype.GET_VAL=a,o.prototype.PUSH_VAL=p,o.prototype.POP_VAL=s,o.prototype.REMOVE_ARR_VAL=l,o.prototype.IS_ARRAY=f,o.prototype.RENDER=g,o.prototype.GET_DATA=m,o}(jQuery,APP||function(){}),socket;!function(t){socket=io.connect(t.prototype.GET_URL()),socket.on("pong",function(){latency=Date.now()-startTime,console.log("Sever latency: "+latency+"ms")}),socket.on("socket start",function(){console.log("Hello socket...")})}(APP||function(){});