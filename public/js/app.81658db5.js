(function(e){function n(n){for(var r,o,c=n[0],l=n[1],i=n[2],f=0,s=[];f<c.length;f++)o=c[f],u[o]&&s.push(u[o][0]),u[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);d&&d(n);while(s.length)s.shift()();return a.push.apply(a,i||[]),t()}function t(){for(var e,n=0;n<a.length;n++){for(var t=a[n],r=!0,o=1;o<t.length;o++){var c=t[o];0!==u[c]&&(r=!1)}r&&(a.splice(n--,1),e=l(l.s=t[0]))}return e}var r={},o={app:0},u={app:0},a=[];function c(e){return l.p+"js/"+({}[e]||e)+"."+{"chunk-2b1fd78e":"bbf9d390","chunk-1ca284db":"fa404771","chunk-28918897":"3c5b655a","chunk-40f47191":"8756539b","chunk-4a3ebde4":"ed04e81b"}[e]+".js"}function l(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,l),t.l=!0,t.exports}l.e=function(e){var n=[],t={"chunk-1ca284db":1,"chunk-28918897":1,"chunk-4a3ebde4":1};o[e]?n.push(o[e]):0!==o[e]&&t[e]&&n.push(o[e]=new Promise(function(n,t){for(var r="css/"+({}[e]||e)+"."+{"chunk-2b1fd78e":"31d6cfe0","chunk-1ca284db":"c99c971e","chunk-28918897":"9f230bf2","chunk-40f47191":"31d6cfe0","chunk-4a3ebde4":"c99c971e"}[e]+".css",u=l.p+r,a=document.getElementsByTagName("link"),c=0;c<a.length;c++){var i=a[c],f=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(f===r||f===u))return n()}var s=document.getElementsByTagName("style");for(c=0;c<s.length;c++){i=s[c],f=i.getAttribute("data-href");if(f===r||f===u)return n()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=n,d.onerror=function(n){var r=n&&n.target&&n.target.src||u,a=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");a.request=r,delete o[e],d.parentNode.removeChild(d),t(a)},d.href=u;var p=document.getElementsByTagName("head")[0];p.appendChild(d)}).then(function(){o[e]=0}));var r=u[e];if(0!==r)if(r)n.push(r[2]);else{var a=new Promise(function(n,t){r=u[e]=[n,t]});n.push(r[2]=a);var i,f=document.createElement("script");f.charset="utf-8",f.timeout=120,l.nc&&f.setAttribute("nonce",l.nc),f.src=c(e),i=function(n){f.onerror=f.onload=null,clearTimeout(s);var t=u[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src,a=new Error("Loading chunk "+e+" failed.\n("+r+": "+o+")");a.type=r,a.request=o,t[1](a)}u[e]=void 0}};var s=setTimeout(function(){i({type:"timeout",target:f})},12e4);f.onerror=f.onload=i,document.head.appendChild(f)}return Promise.all(n)},l.m=e,l.c=r,l.d=function(e,n,t){l.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,n){if(1&n&&(e=l(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(l.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)l.d(t,r,function(n){return e[n]}.bind(null,r));return t},l.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(n,"a",n),n},l.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},l.p="/",l.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],f=i.push.bind(i);i.push=n,i=i.slice();for(var s=0;s<i.length;s++)n(i[s]);var d=f;a.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"56d7":function(e,n,t){"use strict";t.r(n);t("cadf"),t("551c"),t("f751"),t("097d"),t("f466"),t("579f"),t("587a");var r=t("a026"),o=t("9f7b"),u=t.n(o),a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("router-view")},c=[],l={name:"app"},i=l,f=(t("5c0b"),t("2877")),s=Object(f["a"])(i,a,c,!1,null,null,null),d=s.exports,p=t("8c4f"),h=function(){return Promise.all([t.e("chunk-2b1fd78e"),t.e("chunk-28918897")]).then(t.bind(null,"17c3"))},b=function(){return Promise.all([t.e("chunk-2b1fd78e"),t.e("chunk-1ca284db")]).then(t.bind(null,"ffef"))},m=function(){return Promise.all([t.e("chunk-2b1fd78e"),t.e("chunk-4a3ebde4")]).then(t.bind(null,"ed81"))},v=function(){return Promise.all([t.e("chunk-2b1fd78e"),t.e("chunk-40f47191")]).then(t.bind(null,"e8c5"))};r["default"].use(p["a"]);var g=new p["a"]({mode:"hash",linkActiveClass:"open active",scrollBehavior:function(){return{y:0}},routes:[{path:"/",redirect:"/Posts",name:"Home",component:v,children:[{path:"/file",name:"FileManager",component:b},{path:"/users",name:"User",component:m},{path:"/:id",name:"Posts",component:h}]}]}),k=(t("96cf"),t("3b8d"),t("cebc")),y=t("522d"),w=t("efe7");r["default"].use(y["a"]);var O="apollo-token",P="https://us-central1-vienvu-7e64f.cloudfunctions.net/api/graphql",E=Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_FILES_ROOT||P.substr(0,P.indexOf("/graphql"));r["default"].prototype.$filesRoot=E;var j={httpEndpoint:P,tokenName:O,persisting:!1,websocketsOnly:!1,ssr:!1};function _(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object(w["createApolloClient"])(Object(k["a"])({},j,e)),t=n.apolloClient,r=n.wsClient;t.wsClient=r;var o=new y["a"]({defaultClient:t,defaultOptions:{$query:{}},errorHandler:function(e){console.log("%cError","background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;",e.message)}});return o}r["default"].use(u.a),new r["default"]({el:"#app",router:g,template:"<App/>",apolloProvider:_(),components:{App:d}})},"5c0b":function(e,n,t){"use strict";var r=t("5e27"),o=t.n(r);o.a},"5e27":function(e,n,t){}});
//# sourceMappingURL=app.81658db5.js.map