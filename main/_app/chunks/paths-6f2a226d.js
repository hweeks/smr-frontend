import{V as t,N as n,i as e,K as o,d as r,j as s,l as c,n as u,o as i,u as a}from"./vendor-230f6850.js";function f(){}function l(t,n){for(const e in n)t[e]=n[e];return t}function d(t){return t()}function h(){return Object.create(null)}function p(t){t.forEach(d)}function g(t){return"function"==typeof t}function $(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function b(t,...n){if(null==t)return f;const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function m(t,n,e){t.$$.on_destroy.push(b(n,e))}function y(t,n,e,o){if(t){const r=v(t,n,e,o);return t[0](r)}}function v(t,n,e,o){return t[1]&&o?l(e.ctx.slice(),t[1](o(n))):e.ctx}function x(t,n,e,o,r,s,c){const u=function(t,n,e,o){if(t[2]&&o){const r=t[2](o(e));if(void 0===n.dirty)return r;if("object"==typeof r){const t=[],e=Math.max(n.dirty.length,r.length);for(let o=0;o<e;o+=1)t[o]=n.dirty[o]|r[o];return t}return n.dirty|r}return n.dirty}(n,o,r,s);if(u){const r=v(n,e,o,c);t.p(r,u)}}function _(t){const n={};for(const e in t)"$"!==e[0]&&(n[e]=t[e]);return n}function w(t,n,e=n){return t.set(e),n}function j(t,n){t.appendChild(n)}function k(t,n,e){t.insertBefore(n,e||null)}function E(t){t.parentNode.removeChild(t)}function O(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function q(t){return document.createElement(t)}function A(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function N(t){return document.createTextNode(t)}function S(){return N(" ")}function P(){return N("")}function T(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function C(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function L(t,n){for(const e in n)C(t,e,n[e])}function M(t){return Array.from(t.childNodes)}function z(t,n,e,o){for(let r=0;r<t.length;r+=1){const o=t[r];if(o.nodeName===n){let n=0;const s=[];for(;n<o.attributes.length;){const t=o.attributes[n++];e[t.name]||s.push(t.name)}for(let t=0;t<s.length;t++)o.removeAttribute(s[t]);return t.splice(r,1)[0]}}return o?A(n):q(n)}function B(t,n){for(let e=0;e<t.length;e+=1){const o=t[e];if(3===o.nodeType)return o.data=""+n,t.splice(e,1)[0]}return N(n)}function F(t){return B(t," ")}function Q(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function D(t,n=document.body){return Array.from(n.querySelectorAll(t))}let G;function H(t){G=t}function I(){if(!G)throw new Error("Function called outside component initialization");return G}function J(t){I().$$.on_mount.push(t)}function K(t){I().$$.after_update.push(t)}function R(t,n){I().$$.context.set(t,n)}const U=[],V=[],W=[],X=[],Y=Promise.resolve();let Z=!1;function tt(t){W.push(t)}let nt=!1;const et=new Set;function ot(){if(!nt){nt=!0;do{for(let t=0;t<U.length;t+=1){const n=U[t];H(n),rt(n.$$)}for(H(null),U.length=0;V.length;)V.pop()();for(let t=0;t<W.length;t+=1){const n=W[t];et.has(n)||(et.add(n),n())}W.length=0}while(U.length);for(;X.length;)X.pop()();Z=!1,nt=!1,et.clear()}}function rt(t){if(null!==t.fragment){t.update(),p(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(tt)}}const st=new Set;let ct;function ut(){ct={r:0,c:[],p:ct}}function it(){ct.r||p(ct.c),ct=ct.p}function at(t,n){t&&t.i&&(st.delete(t),t.i(n))}function ft(t,n,e,o){if(t&&t.o){if(st.has(t))return;st.add(t),ct.c.push((()=>{st.delete(t),o&&(e&&t.d(1),o())})),t.o(n)}}function lt(t,n){const e={},o={},r={$$scope:1};let s=t.length;for(;s--;){const c=t[s],u=n[s];if(u){for(const t in c)t in u||(o[t]=1);for(const t in u)r[t]||(e[t]=u[t],r[t]=1);t[s]=u}else for(const t in c)r[t]=1}for(const c in o)c in e||(e[c]=void 0);return e}function dt(t){return"object"==typeof t&&null!==t?t:{}}function ht(t){t&&t.c()}function pt(t,n){t&&t.l(n)}function gt(t,n,e,o){const{fragment:r,on_mount:s,on_destroy:c,after_update:u}=t.$$;r&&r.m(n,e),o||tt((()=>{const n=s.map(d).filter(g);c?c.push(...n):p(n),t.$$.on_mount=[]})),u.forEach(tt)}function $t(t,n){const e=t.$$;null!==e.fragment&&(p(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function bt(t,n){-1===t.$$.dirty[0]&&(U.push(t),Z||(Z=!0,Y.then(ot)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function mt(t,n,e,o,r,s,c=[-1]){const u=G;H(t);const i=t.$$={fragment:null,ctx:null,props:s,update:f,not_equal:r,bound:h(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:n.context||[]),callbacks:h(),dirty:c,skip_bound:!1};let a=!1;if(i.ctx=e?e(t,n.props||{},((n,e,...o)=>{const s=o.length?o[0]:e;return i.ctx&&r(i.ctx[n],i.ctx[n]=s)&&(!i.skip_bound&&i.bound[n]&&i.bound[n](s),a&&bt(t,n)),e})):[],i.update(),a=!0,p(i.before_update),i.fragment=!!o&&o(i.ctx),n.target){if(n.hydrate){const t=M(n.target);i.fragment&&i.fragment.l(t),t.forEach(E)}else i.fragment&&i.fragment.c();n.intro&&at(t.$$.fragment),gt(t,n.target,n.anchor,n.customElement),ot()}H(u)}class yt{$destroy(){$t(this,1),this.$destroy=f}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const vt=[];function xt(t,n=f){let e;const o=[];function r(n){if($(t,n)&&(t=n,e)){const n=!vt.length;for(let e=0;e<o.length;e+=1){const n=o[e];n[1](),vt.push(n,t)}if(n){for(let t=0;t<vt.length;t+=2)vt[t][0](vt[t+1]);vt.length=0}}}return{set:r,update:function(n){r(n(t))},subscribe:function(s,c=f){const u=[s,c];return o.push(u),1===o.length&&(e=n(r)||f),s(t),()=>{const t=o.indexOf(u);-1!==t&&o.splice(t,1),0===o.length&&(e(),e=null)}}}}function _t(){return(_t=Object.assign||function(t){var n,e,o;for(n=1;n<arguments.length;n++)for(o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)}function wt(t,n,e){var o={query:t,variables:n||null,context:e},r={stale:!1,fetching:!0,data:void 0,error:void 0,extensions:void 0},s=xt(r),c=!1;return r.set=function(t){var n;for(n in t&&t!==r||(t=qt),c=!0,t)"query"===n||"variables"===n||"context"===n?o[n]=t[n]:"fetching"===n?r[n]=!!t[n]:n in r&&(r[n]=t[n]);r.stale=!!t.stale,c=!1,s.set(r)},r.update=function(t){r.set(t(r))},r.subscribe=function(t,n){return s.subscribe(t,n)},Object.keys(o).forEach((function(t){Object.defineProperty(r,t,{configurable:!1,get:function(){return o[t]},set:function(n){o[t]=n,c||s.set(r)}})})),r}function jt(t,n){return _t({},t,n)}function kt(t){return _t({},{fetching:!1},t,{stale:!!t.stale})}function Et(t){var f,l=At(),d=n((function(n){Ot(n),t.set(n)}))(e(jt,Pt)(o((function(t){return t.context&&t.context.pause?r({fetching:!1,stale:!1}):s([r({fetching:!0,stale:!1}),c(kt)(l.executeQuery(t,t.context)),r({fetching:!1,stale:!1})])}))(function(t){return u((function(n){var e,o;return t.subscribe((function(t){var r=i(t.query,t.variables),s=a(r.context=t.context);void 0!==e&&r.key===e.key&&void 0!==o&&s===o||(o=s,e=r,n.next(r))}))}))}(t))));return f=d.unsubscribe,I().$$.on_destroy.push(f),t}var Ot,qt,At,Nt,St,Pt;Ot=function(){},qt=Object.create(null),At=function(){return t="$$_urql",I().$$.context.get(t);var t},Nt=function(t){R("$$_urql",t)},St=function(n){var e=new t(n);return Nt(e),e},Pt={fetching:!1,stale:!1,error:void 0,data:void 0,extensions:void 0};let Tt="",Ct="/.";function Lt(t){({base:Tt,assets:Ct}=t)}export{K as A,J as B,ut as C,it as D,St as E,y as F,D as G,x as H,Tt as I,xt as J,Lt as K,A as L,L as M,_ as N,Ct as O,T as P,p as Q,b as R,yt as S,wt as T,m as U,w as V,Et as W,O as X,M as a,B as b,z as c,E as d,q as e,k as f,j as g,Q as h,mt as i,S as j,P as k,F as l,l as m,f as n,C as o,ht as p,pt as q,gt as r,$ as s,N as t,lt as u,dt as v,at as w,ft as x,$t as y,R as z};