(function(e){function t(t){for(var r,o,c=t[0],i=t[1],l=t[2],f=0,s=[];f<c.length;f++)o=c[f],a[o]&&s.push(a[o][0]),a[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);d&&d(t);while(s.length)s.shift()();return u.push.apply(u,l||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(r=!1)}r&&(u.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={app:0},a={app:0},u=[];function c(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-2b1fd78e":"bbf9d390","chunk-29ce6a16":"ce46fedb","chunk-40f47191":"cf2dc6d8"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-29ce6a16":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise(function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-2b1fd78e":"31d6cfe0","chunk-29ce6a16":"99f2a1bf","chunk-40f47191":"31d6cfe0"}[e]+".css",a=i.p+r,u=document.getElementsByTagName("link"),c=0;c<u.length;c++){var l=u[c],f=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(f===r||f===a))return t()}var s=document.getElementsByTagName("style");for(c=0;c<s.length;c++){l=s[c],f=l.getAttribute("data-href");if(f===r||f===a)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||a,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");u.request=r,delete o[e],d.parentNode.removeChild(d),n(u)},d.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(d)}).then(function(){o[e]=0}));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var u=new Promise(function(t,n){r=a[e]=[t,n]});t.push(r[2]=u);var l,f=document.createElement("script");f.charset="utf-8",f.timeout=120,i.nc&&f.setAttribute("nonce",i.nc),f.src=c(e),l=function(t){f.onerror=f.onload=null,clearTimeout(s);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src,u=new Error("Loading chunk "+e+" failed.\n("+r+": "+o+")");u.type=r,u.request=o,n[1](u)}a[e]=void 0}};var s=setTimeout(function(){l({type:"timeout",target:f})},12e4);f.onerror=f.onload=l,document.head.appendChild(f)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],f=l.push.bind(l);l.push=t,l=l.slice();for(var s=0;s<l.length;s++)t(l[s]);var d=f;u.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d"),n("f466"),n("579f"),n("587a");var r=n("a026"),o=n("9f7b"),a=n.n(o),u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("router-view")},c=[],i={name:"app"},l=i,f=(n("5c0b"),n("2877")),s=Object(f["a"])(l,u,c,!1,null,null,null),d=s.exports,p=n("8c4f"),h=function(){return Promise.all([n.e("chunk-2b1fd78e"),n.e("chunk-29ce6a16")]).then(n.bind(null,"17c3"))},v=function(){return Promise.all([n.e("chunk-2b1fd78e"),n.e("chunk-40f47191")]).then(n.bind(null,"e8c5"))};r["default"].use(p["a"]);var b=new p["a"]({mode:"hash",linkActiveClass:"open active",scrollBehavior:function(){return{y:0}},routes:[{path:"/",redirect:"/Posts",name:"Home",component:v,children:[{path:"/:id",name:"Posts",component:h}]}]}),m=(n("96cf"),n("3b8d"),n("cebc")),g=n("522d"),y=n("efe7");r["default"].use(g["a"]);var k="apollo-token",w="https://us-central1-vienvu-7e64f.cloudfunctions.net/api/graphql",O=Object({NODE_ENV:"production",VUE_APP_APOLLO_ENGINE_KEY:"vienvu",BASE_URL:"/"}).VUE_APP_FILES_ROOT||w.substr(0,w.indexOf("/graphql"));r["default"].prototype.$filesRoot=O;var E={httpEndpoint:w,tokenName:k,persisting:!1,websocketsOnly:!1,ssr:!1};function P(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object(y["createApolloClient"])(Object(m["a"])({},E,e)),n=t.apolloClient,r=t.wsClient;n.wsClient=r;var o=new g["a"]({defaultClient:n,defaultOptions:{$query:{}},errorHandler:function(e){console.log("%cError","background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;",e.message)}});return o}r["default"].use(a.a),new r["default"]({el:"#app",router:b,template:"<App/>",apolloProvider:P(),components:{App:d}})},"5c0b":function(e,t,n){"use strict";var r=n("5e27"),o=n.n(r);o.a},"5e27":function(e,t,n){}});
//# sourceMappingURL=app.efe05469.js.map