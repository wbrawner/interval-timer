const ii=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerpolicy&&(s.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?s.credentials="include":n.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}};ii();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Be=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,He=Symbol(),Ge=new Map;class Lt{constructor(e,t){if(this._$cssResult$=!0,t!==He)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=Ge.get(this.cssText);return Be&&e===void 0&&(Ge.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const ri=i=>new Lt(typeof i=="string"?i:i+"",He),E=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((r,n,s)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[s+1],i[0]);return new Lt(t,He)},ni=(i,e)=>{Be?i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const r=document.createElement("style"),n=window.litNonce;n!==void 0&&r.setAttribute("nonce",n),r.textContent=t.cssText,i.appendChild(r)})},qe=Be?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return ri(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var $e;const Xe=window.trustedTypes,si=Xe?Xe.emptyScript:"",Ze=window.reactiveElementPolyfillSupport,ke={toAttribute(i,e){switch(e){case Boolean:i=i?si:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},Nt=(i,e)=>e!==i&&(e==e||i==i),Ee={attribute:!0,type:String,converter:ke,reflect:!1,hasChanged:Nt};class D extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;(t=this.l)!==null&&t!==void 0||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,r)=>{const n=this._$Eh(r,t);n!==void 0&&(this._$Eu.set(n,r),e.push(n))}),e}static createProperty(e,t=Ee){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const r=typeof e=="symbol"?Symbol():"__"+e,n=this.getPropertyDescriptor(e,r,t);n!==void 0&&Object.defineProperty(this.prototype,e,n)}}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(n){const s=this[e];this[t]=n,this.requestUpdate(e,s,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Ee}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,r=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const n of r)this.createProperty(n,t[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const n of r)t.unshift(qe(n))}else e!==void 0&&t.push(qe(e));return t}static _$Eh(e,t){const r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Em(),this.requestUpdate(),(e=this.constructor.l)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,r;((t=this._$Eg)!==null&&t!==void 0?t:this._$Eg=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((r=e.hostConnected)===null||r===void 0||r.call(e))}removeController(e){var t;(t=this._$Eg)===null||t===void 0||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return ni(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var r;return(r=t.hostConnected)===null||r===void 0?void 0:r.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var r;return(r=t.hostDisconnected)===null||r===void 0?void 0:r.call(t)})}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ES(e,t,r=Ee){var n,s;const o=this.constructor._$Eh(e,r);if(o!==void 0&&r.reflect===!0){const c=((s=(n=r.converter)===null||n===void 0?void 0:n.toAttribute)!==null&&s!==void 0?s:ke.toAttribute)(t,r.type);this._$Ei=e,c==null?this.removeAttribute(o):this.setAttribute(o,c),this._$Ei=null}}_$AK(e,t){var r,n,s;const o=this.constructor,c=o._$Eu.get(e);if(c!==void 0&&this._$Ei!==c){const a=o.getPropertyOptions(c),l=a.converter,u=(s=(n=(r=l)===null||r===void 0?void 0:r.fromAttribute)!==null&&n!==void 0?n:typeof l=="function"?l:null)!==null&&s!==void 0?s:ke.fromAttribute;this._$Ei=c,this[c]=u(t,a.type),this._$Ei=null}}requestUpdate(e,t,r){let n=!0;e!==void 0&&(((r=r||this.constructor.getPropertyOptions(e)).hasChanged||Nt)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),r.reflect===!0&&this._$Ei!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,r))):n=!1),!this.isUpdatePending&&n&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((n,s)=>this[s]=n),this._$Et=void 0);let t=!1;const r=this._$AL;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),(e=this._$Eg)===null||e===void 0||e.forEach(n=>{var s;return(s=n.hostUpdate)===null||s===void 0?void 0:s.call(n)}),this.update(r)):this._$EU()}catch(n){throw t=!1,this._$EU(),n}t&&this._$AE(r)}willUpdate(e){}_$AE(e){var t;(t=this._$Eg)===null||t===void 0||t.forEach(r=>{var n;return(n=r.hostUpdated)===null||n===void 0?void 0:n.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,r)=>this._$ES(r,this[r],t)),this._$EC=void 0),this._$EU()}updated(e){}firstUpdated(e){}}D.finalized=!0,D.elementProperties=new Map,D.elementStyles=[],D.shadowRootOptions={mode:"open"},Ze==null||Ze({ReactiveElement:D}),(($e=globalThis.reactiveElementVersions)!==null&&$e!==void 0?$e:globalThis.reactiveElementVersions=[]).push("1.3.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ae;const B=globalThis.trustedTypes,Je=B?B.createPolicy("lit-html",{createHTML:i=>i}):void 0,C=`lit$${(Math.random()+"").slice(9)}$`,kt="?"+C,oi=`<${kt}>`,H=document,J=(i="")=>H.createComment(i),Q=i=>i===null||typeof i!="object"&&typeof i!="function",Dt=Array.isArray,ai=i=>{var e;return Dt(i)||typeof((e=i)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},G=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Qe=/-->/g,et=/>/g,N=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,tt=/'/g,it=/"/g,Ut=/^(?:script|style|textarea|title)$/i,li=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),v=li(1),W=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),rt=new WeakMap,ci=(i,e,t)=>{var r,n;const s=(r=t==null?void 0:t.renderBefore)!==null&&r!==void 0?r:e;let o=s._$litPart$;if(o===void 0){const c=(n=t==null?void 0:t.renderBefore)!==null&&n!==void 0?n:null;s._$litPart$=o=new re(e.insertBefore(J(),c),c,void 0,t!=null?t:{})}return o._$AI(i),o},j=H.createTreeWalker(H,129,null,!1),hi=(i,e)=>{const t=i.length-1,r=[];let n,s=e===2?"<svg>":"",o=G;for(let a=0;a<t;a++){const l=i[a];let u,d,h=-1,p=0;for(;p<l.length&&(o.lastIndex=p,d=o.exec(l),d!==null);)p=o.lastIndex,o===G?d[1]==="!--"?o=Qe:d[1]!==void 0?o=et:d[2]!==void 0?(Ut.test(d[2])&&(n=RegExp("</"+d[2],"g")),o=N):d[3]!==void 0&&(o=N):o===N?d[0]===">"?(o=n!=null?n:G,h=-1):d[1]===void 0?h=-2:(h=o.lastIndex-d[2].length,u=d[1],o=d[3]===void 0?N:d[3]==='"'?it:tt):o===it||o===tt?o=N:o===Qe||o===et?o=G:(o=N,n=void 0);const b=o===N&&i[a+1].startsWith("/>")?" ":"";s+=o===G?l+oi:h>=0?(r.push(u),l.slice(0,h)+"$lit$"+l.slice(h)+C+b):l+C+(h===-2?(r.push(void 0),a):b)}const c=s+(i[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return[Je!==void 0?Je.createHTML(c):c,r]};class ee{constructor({strings:e,_$litType$:t},r){let n;this.parts=[];let s=0,o=0;const c=e.length-1,a=this.parts,[l,u]=hi(e,t);if(this.el=ee.createElement(l,r),j.currentNode=this.el.content,t===2){const d=this.el.content,h=d.firstChild;h.remove(),d.append(...h.childNodes)}for(;(n=j.nextNode())!==null&&a.length<c;){if(n.nodeType===1){if(n.hasAttributes()){const d=[];for(const h of n.getAttributeNames())if(h.endsWith("$lit$")||h.startsWith(C)){const p=u[o++];if(d.push(h),p!==void 0){const b=n.getAttribute(p.toLowerCase()+"$lit$").split(C),T=/([.?@])?(.*)/.exec(p);a.push({type:1,index:s,name:T[2],strings:b,ctor:T[1]==="."?di:T[1]==="?"?fi:T[1]==="@"?mi:ye})}else a.push({type:6,index:s})}for(const h of d)n.removeAttribute(h)}if(Ut.test(n.tagName)){const d=n.textContent.split(C),h=d.length-1;if(h>0){n.textContent=B?B.emptyScript:"";for(let p=0;p<h;p++)n.append(d[p],J()),j.nextNode(),a.push({type:2,index:++s});n.append(d[h],J())}}}else if(n.nodeType===8)if(n.data===kt)a.push({type:2,index:s});else{let d=-1;for(;(d=n.data.indexOf(C,d+1))!==-1;)a.push({type:7,index:s}),d+=C.length-1}s++}}static createElement(e,t){const r=H.createElement("template");return r.innerHTML=e,r}}function F(i,e,t=i,r){var n,s,o,c;if(e===W)return e;let a=r!==void 0?(n=t._$Cl)===null||n===void 0?void 0:n[r]:t._$Cu;const l=Q(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==l&&((s=a==null?void 0:a._$AO)===null||s===void 0||s.call(a,!1),l===void 0?a=void 0:(a=new l(i),a._$AT(i,t,r)),r!==void 0?((o=(c=t)._$Cl)!==null&&o!==void 0?o:c._$Cl=[])[r]=a:t._$Cu=a),a!==void 0&&(e=F(i,a._$AS(i,e.values),a,r)),e}class ui{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:r},parts:n}=this._$AD,s=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:H).importNode(r,!0);j.currentNode=s;let o=j.nextNode(),c=0,a=0,l=n[0];for(;l!==void 0;){if(c===l.index){let u;l.type===2?u=new re(o,o.nextSibling,this,e):l.type===1?u=new l.ctor(o,l.name,l.strings,this,e):l.type===6&&(u=new vi(o,this,e)),this.v.push(u),l=n[++a]}c!==(l==null?void 0:l.index)&&(o=j.nextNode(),c++)}return s}m(e){let t=0;for(const r of this.v)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class re{constructor(e,t,r,n){var s;this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=n,this._$Cg=(s=n==null?void 0:n.isConnected)===null||s===void 0||s}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=F(this,e,t),Q(e)?e===m||e==null||e===""?(this._$AH!==m&&this._$AR(),this._$AH=m):e!==this._$AH&&e!==W&&this.$(e):e._$litType$!==void 0?this.T(e):e.nodeType!==void 0?this.k(e):ai(e)?this.S(e):this.$(e)}A(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}k(e){this._$AH!==e&&(this._$AR(),this._$AH=this.A(e))}$(e){this._$AH!==m&&Q(this._$AH)?this._$AA.nextSibling.data=e:this.k(H.createTextNode(e)),this._$AH=e}T(e){var t;const{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=ee.createElement(n.h,this.options)),n);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===s)this._$AH.m(r);else{const o=new ui(s,this),c=o.p(this.options);o.m(r),this.k(c),this._$AH=o}}_$AC(e){let t=rt.get(e.strings);return t===void 0&&rt.set(e.strings,t=new ee(e)),t}S(e){Dt(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,n=0;for(const s of e)n===t.length?t.push(r=new re(this.A(J()),this.A(J()),this,this.options)):r=t[n],r._$AI(s),n++;n<t.length&&(this._$AR(r&&r._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var r;for((r=this._$AP)===null||r===void 0||r.call(this,!1,!0,t);e&&e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){var t;this._$AM===void 0&&(this._$Cg=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class ye{constructor(e,t,r,n,s){this.type=1,this._$AH=m,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=m}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,r,n){const s=this.strings;let o=!1;if(s===void 0)e=F(this,e,t,0),o=!Q(e)||e!==this._$AH&&e!==W,o&&(this._$AH=e);else{const c=e;let a,l;for(e=s[0],a=0;a<s.length-1;a++)l=F(this,c[r+a],t,a),l===W&&(l=this._$AH[a]),o||(o=!Q(l)||l!==this._$AH[a]),l===m?e=m:e!==m&&(e+=(l!=null?l:"")+s[a+1]),this._$AH[a]=l}o&&!n&&this.C(e)}C(e){e===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e!=null?e:"")}}class di extends ye{constructor(){super(...arguments),this.type=3}C(e){this.element[this.name]=e===m?void 0:e}}const pi=B?B.emptyScript:"";class fi extends ye{constructor(){super(...arguments),this.type=4}C(e){e&&e!==m?this.element.setAttribute(this.name,pi):this.element.removeAttribute(this.name)}}class mi extends ye{constructor(e,t,r,n,s){super(e,t,r,n,s),this.type=5}_$AI(e,t=this){var r;if((e=(r=F(this,e,t,0))!==null&&r!==void 0?r:m)===W)return;const n=this._$AH,s=e===m&&n!==m||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==m&&(n===m||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,r;typeof this._$AH=="function"?this._$AH.call((r=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&r!==void 0?r:this.element,e):this._$AH.handleEvent(e)}}class vi{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){F(this,e)}}const nt=window.litHtmlPolyfillSupport;nt==null||nt(ee,re),((Ae=globalThis.litHtmlVersions)!==null&&Ae!==void 0?Ae:globalThis.litHtmlVersions=[]).push("2.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Se,Pe;class y extends D{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;const r=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=r.firstChild),r}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=ci(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!1)}render(){return W}}y.finalized=!0,y._$litElement$=!0,(Se=globalThis.litElementHydrateSupport)===null||Se===void 0||Se.call(globalThis,{LitElement:y});const st=globalThis.litElementPolyfillSupport;st==null||st({LitElement:y});((Pe=globalThis.litElementVersions)!==null&&Pe!==void 0?Pe:globalThis.litElementVersions=[]).push("3.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=i=>e=>typeof e=="function"?((t,r)=>(window.customElements.define(t,r),r))(i,e):((t,r)=>{const{kind:n,elements:s}=r;return{kind:n,elements:s,finisher(o){window.customElements.define(t,o)}}})(i,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gi=(i,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,i)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,i)}};function g(i){return(e,t)=>t!==void 0?((r,n,s)=>{n.constructor.createProperty(s,r)})(i,e,t):gi(i,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _i=({finisher:i,descriptor:e})=>(t,r)=>{var n;if(r===void 0){const s=(n=t.originalKey)!==null&&n!==void 0?n:t.key,o=e!=null?{kind:"method",placement:"prototype",key:s,descriptor:e(t.key)}:{...t,key:s};return i!=null&&(o.finisher=function(c){i(c,s)}),o}{const s=t.constructor;e!==void 0&&Object.defineProperty(t,r,e(r)),i==null||i(s,r)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function I(i,e){return _i({descriptor:t=>{const r={get(){var n,s;return(s=(n=this.renderRoot)===null||n===void 0?void 0:n.querySelector(i))!==null&&s!==void 0?s:null},enumerable:!0,configurable:!0};if(e){const n=typeof t=="symbol"?Symbol():"__"+t;r.get=function(){var s,o;return this[n]===void 0&&(this[n]=(o=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(i))!==null&&o!==void 0?o:null),this[n]}}return r}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Oe;((Oe=window.HTMLSlotElement)===null||Oe===void 0?void 0:Oe.prototype.assignedElements)!=null;function pe(i){return i=i||[],Array.isArray(i)?i:[i]}function O(i){return`[Vaadin.Router] ${i}`}function yi(i){if(typeof i!="object")return String(i);const e=Object.prototype.toString.call(i).match(/ (.*)\]$/)[1];return e==="Object"||e==="Array"?`${e} ${JSON.stringify(i)}`:e}const fe="module",me="nomodule",De=[fe,me];function ot(i){if(!i.match(/.+\.[m]?js$/))throw new Error(O(`Unsupported type for bundle "${i}": .js or .mjs expected.`))}function Mt(i){if(!i||!P(i.path))throw new Error(O('Expected route config to be an object with a "path" string property, or an array of such objects'));const e=i.bundle,t=["component","redirect","bundle"];if(!k(i.action)&&!Array.isArray(i.children)&&!k(i.children)&&!ve(e)&&!t.some(r=>P(i[r])))throw new Error(O(`Expected route config "${i.path}" to include either "${t.join('", "')}" or "action" function but none found.`));if(e)if(P(e))ot(e);else if(De.some(r=>r in e))De.forEach(r=>r in e&&ot(e[r]));else throw new Error(O('Expected route bundle to include either "'+me+'" or "'+fe+'" keys, or both'));i.redirect&&["bundle","component"].forEach(r=>{r in i&&console.warn(O(`Route config "${i.path}" has both "redirect" and "${r}" properties, and "redirect" will always override the latter. Did you mean to only use "${r}"?`))})}function at(i){pe(i).forEach(e=>Mt(e))}function lt(i,e){let t=document.head.querySelector('script[src="'+i+'"][async]');return t||(t=document.createElement("script"),t.setAttribute("src",i),e===fe?t.setAttribute("type",fe):e===me&&t.setAttribute(me,""),t.async=!0),new Promise((r,n)=>{t.onreadystatechange=t.onload=s=>{t.__dynamicImportLoaded=!0,r(s)},t.onerror=s=>{t.parentNode&&t.parentNode.removeChild(t),n(s)},t.parentNode===null?document.head.appendChild(t):t.__dynamicImportLoaded&&r()})}function wi(i){return P(i)?lt(i):Promise.race(De.filter(e=>e in i).map(e=>lt(i[e],e)))}function Z(i,e){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${i}`,{cancelable:i==="go",detail:e}))}function ve(i){return typeof i=="object"&&!!i}function k(i){return typeof i=="function"}function P(i){return typeof i=="string"}function jt(i){const e=new Error(O(`Page not found (${i.pathname})`));return e.context=i,e.code=404,e}const M=new class{};function bi(i){const e=i.port,t=i.protocol,s=t==="http:"&&e==="80"||t==="https:"&&e==="443"?i.hostname:i.host;return`${t}//${s}`}function ct(i){if(i.defaultPrevented||i.button!==0||i.shiftKey||i.ctrlKey||i.altKey||i.metaKey)return;let e=i.target;const t=i.composedPath?i.composedPath():i.path||[];for(let c=0;c<t.length;c++){const a=t[c];if(a.nodeName&&a.nodeName.toLowerCase()==="a"){e=a;break}}for(;e&&e.nodeName.toLowerCase()!=="a";)e=e.parentNode;if(!e||e.nodeName.toLowerCase()!=="a"||e.target&&e.target.toLowerCase()!=="_self"||e.hasAttribute("download")||e.hasAttribute("router-ignore")||e.pathname===window.location.pathname&&e.hash!==""||(e.origin||bi(e))!==window.location.origin)return;const{pathname:n,search:s,hash:o}=e;Z("go",{pathname:n,search:s,hash:o})&&(i.preventDefault(),i&&i.type==="click"&&window.scrollTo(0,0))}const $i={activate(){window.document.addEventListener("click",ct)},inactivate(){window.document.removeEventListener("click",ct)}},Ei=/Trident/.test(navigator.userAgent);Ei&&!k(window.PopStateEvent)&&(window.PopStateEvent=function(i,e){e=e||{};var t=document.createEvent("Event");return t.initEvent(i,Boolean(e.bubbles),Boolean(e.cancelable)),t.state=e.state||null,t},window.PopStateEvent.prototype=window.Event.prototype);function ht(i){if(i.state==="vaadin-router-ignore")return;const{pathname:e,search:t,hash:r}=window.location;Z("go",{pathname:e,search:t,hash:r})}const Ai={activate(){window.addEventListener("popstate",ht)},inactivate(){window.removeEventListener("popstate",ht)}};var Y=zt,Si=We,Pi=Ri,Oi=Wt,Ii=Vt,Bt="/",Ht="./",Ti=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function We(i,e){for(var t=[],r=0,n=0,s="",o=e&&e.delimiter||Bt,c=e&&e.delimiters||Ht,a=!1,l;(l=Ti.exec(i))!==null;){var u=l[0],d=l[1],h=l.index;if(s+=i.slice(n,h),n=h+u.length,d){s+=d[1],a=!0;continue}var p="",b=i[n],T=l[2],K=l[3],Jt=l[4],oe=l[5];if(!a&&s.length){var be=s.length-1;c.indexOf(s[be])>-1&&(p=s[be],s=s.slice(0,be))}s&&(t.push(s),s="",a=!1);var Qt=p!==""&&b!==void 0&&b!==p,ei=oe==="+"||oe==="*",ti=oe==="?"||oe==="*",Ye=p||o,Ke=K||Jt;t.push({name:T||r++,prefix:p,delimiter:Ye,optional:ti,repeat:ei,partial:Qt,pattern:Ke?Ci(Ke):"[^"+R(Ye)+"]+?"})}return(s||n<i.length)&&t.push(s+i.substr(n)),t}function Ri(i,e){return Wt(We(i,e))}function Wt(i){for(var e=new Array(i.length),t=0;t<i.length;t++)typeof i[t]=="object"&&(e[t]=new RegExp("^(?:"+i[t].pattern+")$"));return function(r,n){for(var s="",o=n&&n.encode||encodeURIComponent,c=0;c<i.length;c++){var a=i[c];if(typeof a=="string"){s+=a;continue}var l=r?r[a.name]:void 0,u;if(Array.isArray(l)){if(!a.repeat)throw new TypeError('Expected "'+a.name+'" to not repeat, but got array');if(l.length===0){if(a.optional)continue;throw new TypeError('Expected "'+a.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(u=o(l[d],a),!e[c].test(u))throw new TypeError('Expected all "'+a.name+'" to match "'+a.pattern+'"');s+=(d===0?a.prefix:a.delimiter)+u}continue}if(typeof l=="string"||typeof l=="number"||typeof l=="boolean"){if(u=o(String(l),a),!e[c].test(u))throw new TypeError('Expected "'+a.name+'" to match "'+a.pattern+'", but got "'+u+'"');s+=a.prefix+u;continue}if(a.optional){a.partial&&(s+=a.prefix);continue}throw new TypeError('Expected "'+a.name+'" to be '+(a.repeat?"an array":"a string"))}return s}}function R(i){return i.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function Ci(i){return i.replace(/([=!:$/()])/g,"\\$1")}function Ft(i){return i&&i.sensitive?"":"i"}function xi(i,e){if(!e)return i;var t=i.source.match(/\((?!\?)/g);if(t)for(var r=0;r<t.length;r++)e.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null});return i}function Li(i,e,t){for(var r=[],n=0;n<i.length;n++)r.push(zt(i[n],e,t).source);return new RegExp("(?:"+r.join("|")+")",Ft(t))}function Ni(i,e,t){return Vt(We(i,t),e,t)}function Vt(i,e,t){t=t||{};for(var r=t.strict,n=t.start!==!1,s=t.end!==!1,o=R(t.delimiter||Bt),c=t.delimiters||Ht,a=[].concat(t.endsWith||[]).map(R).concat("$").join("|"),l=n?"^":"",u=i.length===0,d=0;d<i.length;d++){var h=i[d];if(typeof h=="string")l+=R(h),u=d===i.length-1&&c.indexOf(h[h.length-1])>-1;else{var p=h.repeat?"(?:"+h.pattern+")(?:"+R(h.delimiter)+"(?:"+h.pattern+"))*":h.pattern;e&&e.push(h),h.optional?h.partial?l+=R(h.prefix)+"("+p+")?":l+="(?:"+R(h.prefix)+"("+p+"))?":l+=R(h.prefix)+"("+p+")"}}return s?(r||(l+="(?:"+o+")?"),l+=a==="$"?"$":"(?="+a+")"):(r||(l+="(?:"+o+"(?="+a+"))?"),u||(l+="(?="+o+"|"+a+")")),new RegExp(l,Ft(t))}function zt(i,e,t){return i instanceof RegExp?xi(i,e):Array.isArray(i)?Li(i,e,t):Ni(i,e,t)}Y.parse=Si;Y.compile=Pi;Y.tokensToFunction=Oi;Y.tokensToRegExp=Ii;const{hasOwnProperty:ki}=Object.prototype,Ue=new Map;Ue.set("|false",{keys:[],pattern:/(?:)/});function ut(i){try{return decodeURIComponent(i)}catch{return i}}function Di(i,e,t,r,n){t=!!t;const s=`${i}|${t}`;let o=Ue.get(s);if(!o){const l=[];o={keys:l,pattern:Y(i,l,{end:t,strict:i===""})},Ue.set(s,o)}const c=o.pattern.exec(e);if(!c)return null;const a=Object.assign({},n);for(let l=1;l<c.length;l++){const u=o.keys[l-1],d=u.name,h=c[l];(h!==void 0||!ki.call(a,d))&&(u.repeat?a[d]=h?h.split(u.delimiter).map(ut):[]:a[d]=h&&ut(h))}return{path:c[0],keys:(r||[]).concat(o.keys),params:a}}function Yt(i,e,t,r,n){let s,o,c=0,a=i.path||"";return a.charAt(0)==="/"&&(t&&(a=a.substr(1)),t=!0),{next(l){if(i===l)return{done:!0};const u=i.__children=i.__children||i.children;if(!s&&(s=Di(a,e,!u,r,n),s))return{done:!1,value:{route:i,keys:s.keys,params:s.params,path:s.path}};if(s&&u)for(;c<u.length;){if(!o){const h=u[c];h.parent=i;let p=s.path.length;p>0&&e.charAt(p)==="/"&&(p+=1),o=Yt(h,e.substr(p),t,s.keys,s.params)}const d=o.next(l);if(!d.done)return{done:!1,value:d.value};o=null,c++}return{done:!0}}}}function Ui(i){if(k(i.route.action))return i.route.action(i)}function Mi(i,e){let t=e;for(;t;)if(t=t.parent,t===i)return!0;return!1}function ji(i){let e=`Path '${i.pathname}' is not properly resolved due to an error.`;const t=(i.route||{}).path;return t&&(e+=` Resolution had failed on route: '${t}'`),e}function Bi(i,e){const{route:t,path:r}=e;if(t&&!t.__synthetic){const n={path:r,route:t};if(!i.chain)i.chain=[];else if(t.parent){let s=i.chain.length;for(;s--&&i.chain[s].route&&i.chain[s].route!==t.parent;)i.chain.pop()}i.chain.push(n)}}class te{constructor(e,t={}){if(Object(e)!==e)throw new TypeError("Invalid routes");this.baseUrl=t.baseUrl||"",this.errorHandler=t.errorHandler,this.resolveRoute=t.resolveRoute||Ui,this.context=Object.assign({resolver:this},t.context),this.root=Array.isArray(e)?{path:"",__children:e,parent:null,__synthetic:!0}:e,this.root.parent=null}getRoutes(){return[...this.root.__children]}setRoutes(e){at(e);const t=[...pe(e)];this.root.__children=t}addRoutes(e){return at(e),this.root.__children.push(...pe(e)),this.getRoutes()}removeRoutes(){this.setRoutes([])}resolve(e){const t=Object.assign({},this.context,P(e)?{pathname:e}:e),r=Yt(this.root,this.__normalizePathname(t.pathname),this.baseUrl),n=this.resolveRoute;let s=null,o=null,c=t;function a(l,u=s.value.route,d){const h=d===null&&s.value.route;return s=o||r.next(h),o=null,!l&&(s.done||!Mi(u,s.value.route))?(o=s,Promise.resolve(M)):s.done?Promise.reject(jt(t)):(c=Object.assign(c?{chain:c.chain?c.chain.slice(0):[]}:{},t,s.value),Bi(c,s.value),Promise.resolve(n(c)).then(p=>p!=null&&p!==M?(c.result=p.result||p,c):a(l,u,p)))}return t.next=a,Promise.resolve().then(()=>a(!0,this.root)).catch(l=>{const u=ji(c);if(l?console.warn(u):l=new Error(u),l.context=l.context||c,l instanceof DOMException||(l.code=l.code||500),this.errorHandler)return c.result=this.errorHandler(l),c;throw l})}static __createUrl(e,t){return new URL(e,t)}get __effectiveBaseUrl(){return this.baseUrl?this.constructor.__createUrl(this.baseUrl,document.baseURI||document.URL).href.replace(/[^\/]*$/,""):""}__normalizePathname(e){if(!this.baseUrl)return e;const t=this.__effectiveBaseUrl,r=this.constructor.__createUrl(e,t).href;if(r.slice(0,t.length)===t)return r.slice(t.length)}}te.pathToRegexp=Y;const{pathToRegexp:dt}=te,pt=new Map;function Kt(i,e,t){const r=e.name||e.component;if(r&&(i.has(r)?i.get(r).push(e):i.set(r,[e])),Array.isArray(t))for(let n=0;n<t.length;n++){const s=t[n];s.parent=e,Kt(i,s,s.__children||s.children)}}function ft(i,e){const t=i.get(e);if(t&&t.length>1)throw new Error(`Duplicate route with name "${e}". Try seting unique 'name' route properties.`);return t&&t[0]}function mt(i){let e=i.path;return e=Array.isArray(e)?e[0]:e,e!==void 0?e:""}function Hi(i,e={}){if(!(i instanceof te))throw new TypeError("An instance of Resolver is expected");const t=new Map;return(r,n)=>{let s=ft(t,r);if(!s&&(t.clear(),Kt(t,i.root,i.root.__children),s=ft(t,r),!s))throw new Error(`Route "${r}" not found`);let o=pt.get(s.fullPath);if(!o){let a=mt(s),l=s.parent;for(;l;){const p=mt(l);p&&(a=p.replace(/\/$/,"")+"/"+a.replace(/^\//,"")),l=l.parent}const u=dt.parse(a),d=dt.tokensToFunction(u),h=Object.create(null);for(let p=0;p<u.length;p++)P(u[p])||(h[u[p].name]=!0);o={toPath:d,keys:h},pt.set(a,o),s.fullPath=a}let c=o.toPath(n,e)||"/";if(e.stringifyQueryParams&&n){const a={},l=Object.keys(n);for(let d=0;d<l.length;d++){const h=l[d];o.keys[h]||(a[h]=n[h])}const u=e.stringifyQueryParams(a);u&&(c+=u.charAt(0)==="?"?u:`?${u}`)}return c}}let vt=[];function Wi(i){vt.forEach(e=>e.inactivate()),i.forEach(e=>e.activate()),vt=i}const Fi=i=>{const e=getComputedStyle(i).getPropertyValue("animation-name");return e&&e!=="none"},Vi=(i,e)=>{const t=()=>{i.removeEventListener("animationend",t),e()};i.addEventListener("animationend",t)};function gt(i,e){return i.classList.add(e),new Promise(t=>{if(Fi(i)){const r=i.getBoundingClientRect(),n=`height: ${r.bottom-r.top}px; width: ${r.right-r.left}px`;i.setAttribute("style",`position: absolute; ${n}`),Vi(i,()=>{i.classList.remove(e),i.removeAttribute("style"),t()})}else i.classList.remove(e),t()})}const zi=256;function Ie(i){return i!=null}function Yi(i){const e=Object.assign({},i);return delete e.next,e}function S({pathname:i="",search:e="",hash:t="",chain:r=[],params:n={},redirectFrom:s,resolver:o},c){const a=r.map(l=>l.route);return{baseUrl:o&&o.baseUrl||"",pathname:i,search:e,hash:t,routes:a,route:c||a.length&&a[a.length-1]||null,params:n,redirectFrom:s,getUrl:(l={})=>he(x.pathToRegexp.compile(Gt(a))(Object.assign({},n,l)),o)}}function _t(i,e){const t=Object.assign({},i.params);return{redirect:{pathname:e,from:i.pathname,params:t}}}function Ki(i,e){e.location=S(i);const t=i.chain.map(r=>r.route).indexOf(i.route);return i.chain[t].element=e,e}function ce(i,e,t){if(k(i))return i.apply(t,e)}function yt(i,e,t){return r=>{if(r&&(r.cancel||r.redirect))return r;if(t)return ce(t[i],e,t)}}function Gi(i,e){if(!Array.isArray(i)&&!ve(i))throw new Error(O(`Incorrect "children" value for the route ${e.path}: expected array or object, but got ${i}`));e.__children=[];const t=pe(i);for(let r=0;r<t.length;r++)Mt(t[r]),e.__children.push(t[r])}function ae(i){if(i&&i.length){const e=i[0].parentNode;for(let t=0;t<i.length;t++)e.removeChild(i[t])}}function he(i,e){const t=e.__effectiveBaseUrl;return t?e.constructor.__createUrl(i.replace(/^\//,""),t).pathname:i}function Gt(i){return i.map(e=>e.path).reduce((e,t)=>t.length?e.replace(/\/$/,"")+"/"+t.replace(/^\//,""):e,"")}class x extends te{constructor(e,t){const r=document.head.querySelector("base"),n=r&&r.getAttribute("href");super([],Object.assign({baseUrl:n&&te.__createUrl(n,document.URL).pathname.replace(/[^\/]*$/,"")},t)),this.resolveRoute=o=>this.__resolveRoute(o);const s=x.NavigationTrigger;x.setTriggers.apply(x,Object.keys(s).map(o=>s[o])),this.baseUrl,this.ready,this.ready=Promise.resolve(e),this.location,this.location=S({resolver:this}),this.__lastStartedRenderId=0,this.__navigationEventHandler=this.__onNavigationEvent.bind(this),this.setOutlet(e),this.subscribe(),this.__createdByRouter=new WeakMap,this.__addedByRouter=new WeakMap}__resolveRoute(e){const t=e.route;let r=Promise.resolve();k(t.children)&&(r=r.then(()=>t.children(Yi(e))).then(s=>{!Ie(s)&&!k(t.children)&&(s=t.children),Gi(s,t)}));const n={redirect:s=>_t(e,s),component:s=>{const o=document.createElement(s);return this.__createdByRouter.set(o,!0),o}};return r.then(()=>{if(this.__isLatestRender(e))return ce(t.action,[e,n],t)}).then(s=>{if(Ie(s)&&(s instanceof HTMLElement||s.redirect||s===M))return s;if(P(t.redirect))return n.redirect(t.redirect);if(t.bundle)return wi(t.bundle).then(()=>{},()=>{throw new Error(O(`Bundle not found: ${t.bundle}. Check if the file name is correct`))})}).then(s=>{if(Ie(s))return s;if(P(t.component))return n.component(t.component)})}setOutlet(e){e&&this.__ensureOutlet(e),this.__outlet=e}getOutlet(){return this.__outlet}setRoutes(e,t=!1){return this.__previousContext=void 0,this.__urlForName=void 0,super.setRoutes(e),t||this.__onNavigationEvent(),this.ready}render(e,t){const r=++this.__lastStartedRenderId,n=Object.assign({search:"",hash:""},P(e)?{pathname:e}:e,{__renderId:r});return this.ready=this.resolve(n).then(s=>this.__fullyResolveChain(s)).then(s=>{if(this.__isLatestRender(s)){const o=this.__previousContext;if(s===o)return this.__updateBrowserHistory(o,!0),this.location;if(this.location=S(s),t&&this.__updateBrowserHistory(s,r===1),Z("location-changed",{router:this,location:this.location}),s.__skipAttach)return this.__copyUnchangedElements(s,o),this.__previousContext=s,this.location;this.__addAppearingContent(s,o);const c=this.__animateIfNeeded(s);return this.__runOnAfterEnterCallbacks(s),this.__runOnAfterLeaveCallbacks(s,o),c.then(()=>{if(this.__isLatestRender(s))return this.__removeDisappearingContent(),this.__previousContext=s,this.location})}}).catch(s=>{if(r===this.__lastStartedRenderId)throw t&&this.__updateBrowserHistory(n),ae(this.__outlet&&this.__outlet.children),this.location=S(Object.assign(n,{resolver:this})),Z("error",Object.assign({router:this,error:s},n)),s}),this.ready}__fullyResolveChain(e,t=e){return this.__findComponentContextAfterAllRedirects(t).then(r=>{const s=r!==t?r:e,c=he(Gt(r.chain),r.resolver)===r.pathname,a=(l,u=l.route,d)=>l.next(void 0,u,d).then(h=>h===null||h===M?c?l:u.parent!==null?a(l,u.parent,h):h:h);return a(r).then(l=>{if(l===null||l===M)throw jt(s);return l&&l!==M&&l!==r?this.__fullyResolveChain(s,l):this.__amendWithOnBeforeCallbacks(r)})})}__findComponentContextAfterAllRedirects(e){const t=e.result;return t instanceof HTMLElement?(Ki(e,t),Promise.resolve(e)):t.redirect?this.__redirect(t.redirect,e.__redirectCount,e.__renderId).then(r=>this.__findComponentContextAfterAllRedirects(r)):t instanceof Error?Promise.reject(t):Promise.reject(new Error(O(`Invalid route resolution result for path "${e.pathname}". Expected redirect object or HTML element, but got: "${yi(t)}". Double check the action return value for the route.`)))}__amendWithOnBeforeCallbacks(e){return this.__runOnBeforeCallbacks(e).then(t=>t===this.__previousContext||t===e?t:this.__fullyResolveChain(t))}__runOnBeforeCallbacks(e){const t=this.__previousContext||{},r=t.chain||[],n=e.chain;let s=Promise.resolve();const o=()=>({cancel:!0}),c=a=>_t(e,a);if(e.__divergedChainIndex=0,e.__skipAttach=!1,r.length){for(let a=0;a<Math.min(r.length,n.length)&&!(r[a].route!==n[a].route||r[a].path!==n[a].path&&r[a].element!==n[a].element||!this.__isReusableElement(r[a].element,n[a].element));a=++e.__divergedChainIndex);if(e.__skipAttach=n.length===r.length&&e.__divergedChainIndex==n.length&&this.__isReusableElement(e.result,t.result),e.__skipAttach){for(let a=n.length-1;a>=0;a--)s=this.__runOnBeforeLeaveCallbacks(s,e,{prevent:o},r[a]);for(let a=0;a<n.length;a++)s=this.__runOnBeforeEnterCallbacks(s,e,{prevent:o,redirect:c},n[a]),r[a].element.location=S(e,r[a].route)}else for(let a=r.length-1;a>=e.__divergedChainIndex;a--)s=this.__runOnBeforeLeaveCallbacks(s,e,{prevent:o},r[a])}if(!e.__skipAttach)for(let a=0;a<n.length;a++)a<e.__divergedChainIndex?a<r.length&&r[a].element&&(r[a].element.location=S(e,r[a].route)):(s=this.__runOnBeforeEnterCallbacks(s,e,{prevent:o,redirect:c},n[a]),n[a].element&&(n[a].element.location=S(e,n[a].route)));return s.then(a=>{if(a){if(a.cancel)return this.__previousContext.__renderId=e.__renderId,this.__previousContext;if(a.redirect)return this.__redirect(a.redirect,e.__redirectCount,e.__renderId)}return e})}__runOnBeforeLeaveCallbacks(e,t,r,n){const s=S(t);return e.then(o=>{if(this.__isLatestRender(t))return yt("onBeforeLeave",[s,r,this],n.element)(o)}).then(o=>{if(!(o||{}).redirect)return o})}__runOnBeforeEnterCallbacks(e,t,r,n){const s=S(t,n.route);return e.then(o=>{if(this.__isLatestRender(t))return yt("onBeforeEnter",[s,r,this],n.element)(o)})}__isReusableElement(e,t){return e&&t?this.__createdByRouter.get(e)&&this.__createdByRouter.get(t)?e.localName===t.localName:e===t:!1}__isLatestRender(e){return e.__renderId===this.__lastStartedRenderId}__redirect(e,t,r){if(t>zi)throw new Error(O(`Too many redirects when rendering ${e.from}`));return this.resolve({pathname:this.urlForPath(e.pathname,e.params),redirectFrom:e.from,__redirectCount:(t||0)+1,__renderId:r})}__ensureOutlet(e=this.__outlet){if(!(e instanceof Node))throw new TypeError(O(`Expected router outlet to be a valid DOM Node (but got ${e})`))}__updateBrowserHistory({pathname:e,search:t="",hash:r=""},n){if(window.location.pathname!==e||window.location.search!==t||window.location.hash!==r){const s=n?"replaceState":"pushState";window.history[s](null,document.title,e+t+r),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}__copyUnchangedElements(e,t){let r=this.__outlet;for(let n=0;n<e.__divergedChainIndex;n++){const s=t&&t.chain[n].element;if(s)if(s.parentNode===r)e.chain[n].element=s,r=s;else break}return r}__addAppearingContent(e,t){this.__ensureOutlet(),this.__removeAppearingContent();const r=this.__copyUnchangedElements(e,t);this.__appearingContent=[],this.__disappearingContent=Array.from(r.children).filter(s=>this.__addedByRouter.get(s)&&s!==e.result);let n=r;for(let s=e.__divergedChainIndex;s<e.chain.length;s++){const o=e.chain[s].element;o&&(n.appendChild(o),this.__addedByRouter.set(o,!0),n===r&&this.__appearingContent.push(o),n=o)}}__removeDisappearingContent(){this.__disappearingContent&&ae(this.__disappearingContent),this.__disappearingContent=null,this.__appearingContent=null}__removeAppearingContent(){this.__disappearingContent&&this.__appearingContent&&(ae(this.__appearingContent),this.__disappearingContent=null,this.__appearingContent=null)}__runOnAfterLeaveCallbacks(e,t){if(!!t)for(let r=t.chain.length-1;r>=e.__divergedChainIndex&&this.__isLatestRender(e);r--){const n=t.chain[r].element;if(!!n)try{const s=S(e);ce(n.onAfterLeave,[s,{},t.resolver],n)}finally{this.__disappearingContent.indexOf(n)>-1&&ae(n.children)}}}__runOnAfterEnterCallbacks(e){for(let t=e.__divergedChainIndex;t<e.chain.length&&this.__isLatestRender(e);t++){const r=e.chain[t].element||{},n=S(e,e.chain[t].route);ce(r.onAfterEnter,[n,{},e.resolver],r)}}__animateIfNeeded(e){const t=(this.__disappearingContent||[])[0],r=(this.__appearingContent||[])[0],n=[],s=e.chain;let o;for(let c=s.length;c>0;c--)if(s[c-1].route.animate){o=s[c-1].route.animate;break}if(t&&r&&o){const c=ve(o)&&o.leave||"leaving",a=ve(o)&&o.enter||"entering";n.push(gt(t,c)),n.push(gt(r,a))}return Promise.all(n).then(()=>e)}subscribe(){window.addEventListener("vaadin-router-go",this.__navigationEventHandler)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.__navigationEventHandler)}__onNavigationEvent(e){const{pathname:t,search:r,hash:n}=e?e.detail:window.location;P(this.__normalizePathname(t))&&(e&&e.preventDefault&&e.preventDefault(),this.render({pathname:t,search:r,hash:n},!0))}static setTriggers(...e){Wi(e)}urlForName(e,t){return this.__urlForName||(this.__urlForName=Hi(this)),he(this.__urlForName(e,t),this)}urlForPath(e,t){return he(x.pathToRegexp.compile(e)(t),this)}static go(e){const{pathname:t,search:r,hash:n}=P(e)?this.__createUrl(e,"http://a"):e;return Z("go",{pathname:t,search:r,hash:n})}}const qi=/\/\*\*\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,ue=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function Xi(){function i(){return!0}return qt(i)}function Zi(){try{return Ji()?!0:Qi()?ue?!er():!Xi():!1}catch{return!1}}function Ji(){return localStorage.getItem("vaadin.developmentmode.force")}function Qi(){return["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0}function er(){return!!(ue&&Object.keys(ue).map(e=>ue[e]).filter(e=>e.productionMode).length>0)}function qt(i,e){if(typeof i!="function")return;const t=qi.exec(i.toString());if(t)try{i=new Function(t[1])}catch(r){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",r)}return i(e)}window.Vaadin=window.Vaadin||{};const wt=function(i,e){if(window.Vaadin.developmentMode)return qt(i,e)};window.Vaadin.developmentMode===void 0&&(window.Vaadin.developmentMode=Zi());function tr(){}const ir=function(){if(typeof wt=="function")return wt(tr)};window.Vaadin=window.Vaadin||{};window.Vaadin.registrations=window.Vaadin.registrations||[];window.Vaadin.registrations.push({is:"@vaadin/router",version:"1.7.4"});ir();x.NavigationTrigger={POPSTATE:Ai,CLICK:$i};try{self["workbox:window:6.5.1"]&&_()}catch{}function bt(i,e){return new Promise(function(t){var r=new MessageChannel;r.port1.onmessage=function(n){t(n.data)},i.postMessage(e,[r.port2])})}function rr(i,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(i,r.key,r)}}function $t(i,e){(e==null||e>i.length)&&(e=i.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=i[t];return r}function nr(i,e){var t;if(typeof Symbol=="undefined"||i[Symbol.iterator]==null){if(Array.isArray(i)||(t=function(n,s){if(n){if(typeof n=="string")return $t(n,s);var o=Object.prototype.toString.call(n).slice(8,-1);return o==="Object"&&n.constructor&&(o=n.constructor.name),o==="Map"||o==="Set"?Array.from(n):o==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?$t(n,s):void 0}}(i))||e&&i&&typeof i.length=="number"){t&&(i=t);var r=0;return function(){return r>=i.length?{done:!0}:{done:!1,value:i[r++]}}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}return(t=i[Symbol.iterator]()).next.bind(t)}try{self["workbox:core:6.5.1"]&&_()}catch{}var Te=function(){var i=this;this.promise=new Promise(function(e,t){i.resolve=e,i.reject=t})};function Re(i,e){var t=location.href;return new URL(i,t).href===new URL(e,t).href}var q=function(i,e){this.type=i,Object.assign(this,e)};function le(i,e,t){return t?e?e(i):i:(i&&i.then||(i=Promise.resolve(i)),e?i.then(e):i)}function sr(){}var or={type:"SKIP_WAITING"};function Et(i,e){if(!e)return i&&i.then?i.then(sr):Promise.resolve()}var ar=function(i){var e,t;function r(c,a){var l,u;return a===void 0&&(a={}),(l=i.call(this)||this).nn={},l.tn=0,l.rn=new Te,l.en=new Te,l.on=new Te,l.un=0,l.an=new Set,l.cn=function(){var d=l.fn,h=d.installing;l.tn>0||!Re(h.scriptURL,l.sn.toString())||performance.now()>l.un+6e4?(l.vn=h,d.removeEventListener("updatefound",l.cn)):(l.hn=h,l.an.add(h),l.rn.resolve(h)),++l.tn,h.addEventListener("statechange",l.ln)},l.ln=function(d){var h=l.fn,p=d.target,b=p.state,T=p===l.vn,K={sw:p,isExternal:T,originalEvent:d};!T&&l.mn&&(K.isUpdate=!0),l.dispatchEvent(new q(b,K)),b==="installed"?l.wn=self.setTimeout(function(){b==="installed"&&h.waiting===p&&l.dispatchEvent(new q("waiting",K))},200):b==="activating"&&(clearTimeout(l.wn),T||l.en.resolve(p))},l.dn=function(d){var h=l.hn,p=h!==navigator.serviceWorker.controller;l.dispatchEvent(new q("controlling",{isExternal:p,originalEvent:d,sw:h,isUpdate:l.mn})),p||l.on.resolve(h)},l.gn=(u=function(d){var h=d.data,p=d.ports,b=d.source;return le(l.getSW(),function(){l.an.has(b)&&l.dispatchEvent(new q("message",{data:h,originalEvent:d,ports:p,sw:b}))})},function(){for(var d=[],h=0;h<arguments.length;h++)d[h]=arguments[h];try{return Promise.resolve(u.apply(this,d))}catch(p){return Promise.reject(p)}}),l.sn=c,l.nn=a,navigator.serviceWorker.addEventListener("message",l.gn),l}t=i,(e=r).prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t;var n,s,o=r.prototype;return o.register=function(c){var a=(c===void 0?{}:c).immediate,l=a!==void 0&&a;try{var u=this;return function(d,h){var p=d();return p&&p.then?p.then(h):h(p)}(function(){if(!l&&document.readyState!=="complete")return Et(new Promise(function(d){return window.addEventListener("load",d)}))},function(){return u.mn=Boolean(navigator.serviceWorker.controller),u.yn=u.pn(),le(u.bn(),function(d){u.fn=d,u.yn&&(u.hn=u.yn,u.en.resolve(u.yn),u.on.resolve(u.yn),u.yn.addEventListener("statechange",u.ln,{once:!0}));var h=u.fn.waiting;return h&&Re(h.scriptURL,u.sn.toString())&&(u.hn=h,Promise.resolve().then(function(){u.dispatchEvent(new q("waiting",{sw:h,wasWaitingBeforeRegister:!0}))}).then(function(){})),u.hn&&(u.rn.resolve(u.hn),u.an.add(u.hn)),u.fn.addEventListener("updatefound",u.cn),navigator.serviceWorker.addEventListener("controllerchange",u.dn),u.fn})})}catch(d){return Promise.reject(d)}},o.update=function(){try{return this.fn?Et(this.fn.update()):void 0}catch(c){return Promise.reject(c)}},o.getSW=function(){return this.hn!==void 0?Promise.resolve(this.hn):this.rn.promise},o.messageSW=function(c){try{return le(this.getSW(),function(a){return bt(a,c)})}catch(a){return Promise.reject(a)}},o.messageSkipWaiting=function(){this.fn&&this.fn.waiting&&bt(this.fn.waiting,or)},o.pn=function(){var c=navigator.serviceWorker.controller;return c&&Re(c.scriptURL,this.sn.toString())?c:void 0},o.bn=function(){try{var c=this;return function(a,l){try{var u=a()}catch(d){return l(d)}return u&&u.then?u.then(void 0,l):u}(function(){return le(navigator.serviceWorker.register(c.sn,c.nn),function(a){return c.un=performance.now(),a})},function(a){throw a})}catch(a){return Promise.reject(a)}},n=r,(s=[{key:"active",get:function(){return this.en.promise}},{key:"controlling",get:function(){return this.on.promise}}])&&rr(n.prototype,s),r}(function(){function i(){this.Pn=new Map}var e=i.prototype;return e.addEventListener=function(t,r){this.Sn(t).add(r)},e.removeEventListener=function(t,r){this.Sn(t).delete(r)},e.dispatchEvent=function(t){t.target=this;for(var r,n=nr(this.Sn(t.type));!(r=n()).done;)(0,r.value)(t)},e.Sn=function(t){return this.Pn.has(t)||this.Pn.set(t,new Set),this.Pn.get(t)},i}());function lr(i={}){const{immediate:e=!1,onNeedRefresh:t,onOfflineReady:r,onRegistered:n,onRegisterError:s}=i;let o;const c=async(a=!0)=>{};return"serviceWorker"in navigator&&(o=new ar("/interval-timer/sw.js",{scope:"/interval-timer/",type:"classic"}),o.addEventListener("activated",a=>{a.isUpdate?window.location.reload():r==null||r()}),o.register({immediate:e}).then(a=>{n==null||n(a)}).catch(a=>{s==null||s(a)})),c}const cr=(i,e)=>e.some(t=>i instanceof t);let At,St;function hr(){return At||(At=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ur(){return St||(St=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Xt=new WeakMap,Me=new WeakMap,Zt=new WeakMap,Ce=new WeakMap,Fe=new WeakMap;function dr(i){const e=new Promise((t,r)=>{const n=()=>{i.removeEventListener("success",s),i.removeEventListener("error",o)},s=()=>{t(L(i.result)),n()},o=()=>{r(i.error),n()};i.addEventListener("success",s),i.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Xt.set(t,i)}).catch(()=>{}),Fe.set(e,i),e}function pr(i){if(Me.has(i))return;const e=new Promise((t,r)=>{const n=()=>{i.removeEventListener("complete",s),i.removeEventListener("error",o),i.removeEventListener("abort",o)},s=()=>{t(),n()},o=()=>{r(i.error||new DOMException("AbortError","AbortError")),n()};i.addEventListener("complete",s),i.addEventListener("error",o),i.addEventListener("abort",o)});Me.set(i,e)}let je={get(i,e,t){if(i instanceof IDBTransaction){if(e==="done")return Me.get(i);if(e==="objectStoreNames")return i.objectStoreNames||Zt.get(i);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return L(i[e])},set(i,e,t){return i[e]=t,!0},has(i,e){return i instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in i}};function fr(i){je=i(je)}function mr(i){return i===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=i.call(xe(this),e,...t);return Zt.set(r,e.sort?e.sort():[e]),L(r)}:ur().includes(i)?function(...e){return i.apply(xe(this),e),L(Xt.get(this))}:function(...e){return L(i.apply(xe(this),e))}}function vr(i){return typeof i=="function"?mr(i):(i instanceof IDBTransaction&&pr(i),cr(i,hr())?new Proxy(i,je):i)}function L(i){if(i instanceof IDBRequest)return dr(i);if(Ce.has(i))return Ce.get(i);const e=vr(i);return e!==i&&(Ce.set(i,e),Fe.set(e,i)),e}const xe=i=>Fe.get(i);function gr(i,e,{blocked:t,upgrade:r,blocking:n,terminated:s}={}){const o=indexedDB.open(i,e),c=L(o);return r&&o.addEventListener("upgradeneeded",a=>{r(L(o.result),a.oldVersion,a.newVersion,L(o.transaction))}),t&&o.addEventListener("blocked",()=>t()),c.then(a=>{s&&a.addEventListener("close",()=>s()),n&&a.addEventListener("versionchange",()=>n())}).catch(()=>{}),c}const _r=["get","getKey","getAll","getAllKeys","count"],yr=["put","add","delete","clear"],Le=new Map;function Pt(i,e){if(!(i instanceof IDBDatabase&&!(e in i)&&typeof e=="string"))return;if(Le.get(e))return Le.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,n=yr.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(n||_r.includes(t)))return;const s=async function(o,...c){const a=this.transaction(o,n?"readwrite":"readonly");let l=a.store;return r&&(l=l.index(c.shift())),(await Promise.all([l[t](...c),n&&a.done]))[0]};return Le.set(e,s),s}fr(i=>({...i,get:(e,t,r)=>Pt(e,t)||i.get(e,t,r),has:(e,t)=>!!Pt(e,t)||i.has(e,t)}));const wr="interval-timer",br=1,de="timers";class $r{constructor(e){this.db=e}getAll(){return this.db.getAll(de)}async save(e){const t=await this.db.put(de,e);return{...e,id:t}}delete(e){let t;if(typeof e=="number"?t=e:t=e.id,!t)throw new Error("Invalid timer ID");return this.db.delete(de,t)}}let Ne;async function Er(){if(!Ne){const i=await gr(wr,br,{upgrade(e,t,r,n){r===1&&e.createObjectStore(de,{keyPath:"id",autoIncrement:!0})}});Ne=new $r(i)}return Ne}var Ar=Object.defineProperty,Sr=Object.getOwnPropertyDescriptor,we=(i,e,t,r)=>{for(var n=r>1?void 0:r?Sr(e,t):e,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(e,t,n):o(n))||n);return r&&n&&Ar(e,t,n),n};let ie=class extends y{constructor(){super(),this.timers=[],Er().then(async i=>{var e;this.timerService=i,this.timers=await i.getAll(),this.selectedTimer||(this.selectedTimer=(e=this.timers[0])==null?void 0:e.id)})}static get styles(){return E`
      main {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      active-timer {
        flex-grow: 1;
      }
    `}share(){navigator.share&&navigator.share({title:"PWABuilder pwa-starter",text:"Check out the PWABuilder pwa-starter!",url:"https://github.com/pwa-builder/pwa-starter"})}async closeEditor(){var i,e;this.editTimer=void 0,this.timers=await((i=this.timerService)==null?void 0:i.getAll())||[],this.selectedTimer||(this.selectedTimer=(e=this.timers[0])==null?void 0:e.id)}render(){let i;const e=this.timers.filter(t=>t.id===this.selectedTimer)[0]||this.timers[0];return e?i=v`
        <active-timer .timer=${e}></active-timer>
      `:i=v`
        <p>Create a timer to begin</p>
      `,v`
      <main>
        <app-header
          .apptitle=${e==null?void 0:e.name}
          .timers=${this.timers}
          .selectedTimer=${this.selectedTimer}
          @newtimer=${()=>this.editTimer=-1}
          @selecttimer=${t=>this.selectedTimer=t.timerId}>
          <fluent-button appearance="stealth" slot="actions" @click=${()=>this.editTimer=e.id}>Edit</fluent-button>
        </app-header>
        ${i}
        <timer-form-dialog
          ?visible=${this.editTimer!==void 0}
          .timerService=${this.timerService}
          .timer=${e}
          @close=${this.closeEditor}></timer-form-dialog>
      </main>
    `}};we([g({type:Array})],ie.prototype,"timers",2);we([g({type:Number})],ie.prototype,"selectedTimer",2);we([g({type:Number})],ie.prototype,"editTimer",2);ie=we([A("app-home")],ie);class Pr{constructor(e){this.warmUp=300,this.lowIntensity=30,this.highIntensity=60,this.rest=60,this.coolDown=300,this.sets=6,this.rounds=2,this.name=e}}var f=(i=>(i.WARM_UP="Warm-Up",i.LOW_INTENSITY="Low Intensity",i.HIGH_INTENSITY="High Intensity",i.REST="Rest",i.COOLDOWN="Cooldown",i))(f||{});function Or(i){return i.toLowerCase().replaceAll(/[^a-zA-Z]/g,"")}function U(i){if(!i)return"00:00";let e=i,t="";if(e>60){const r=Math.floor(e/60);r<10&&(t+="0"),t+=r+":",e%=60}else t+="00:";return e<10&&(t+=0),t+=e,t}function X(i){if(!i)return 0;const[e,t]=i.split(":");return!t&&!e?0:t?e?Number.parseInt(e)*60+Number.parseInt(t):Number.parseInt(t):Number.parseInt(e)}class Ir{constructor(e,t){this.phase=f.WARM_UP,this.sounds=new Map([[f.WARM_UP,new Audio("assets/audio/warm.mp3")],[f.LOW_INTENSITY,new Audio("assets/audio/low.mp3")],[f.HIGH_INTENSITY,new Audio("assets/audio/high.mp3")],[f.REST,new Audio("assets/audio/rest.mp3")],[f.COOLDOWN,new Audio("assets/audio/cool.mp3")]]),this.timer=e,this.timeRemaining=this.timer.warmUp,this.set=this.timer.sets,this.round=this.timer.rounds,this.callback=t!=null?t:()=>null}active(){return this.ticker!==void 0}playSound(){var e;(e=this.sounds.get(this.phase))==null||e.play(),navigator.vibrate&&navigator.vibrate(200)}toggle(){if(this.active()){const e=this.ticker;e&&clearInterval(e),this.ticker=void 0,this.unlockScreen()}else this.ticker=setInterval(()=>this.tick(),1e3),this.lockScreen();this.callback()}lockScreen(){const e=navigator.wakeLock;if(!!e)try{e.request("screen").then(t=>{this.wakeLock=t,this.wakeLock.addEventListener("release",()=>{this.wakeLock=null})}).catch(t=>{console.error("Failed to aquire wakelock",t)})}catch(t){console.error("Failed to aquire wakelock",t)}}unlockScreen(){var e;try{(e=this.wakeLock)==null||e.release(),this.wakeLock=null}catch(t){console.error("Failed to release wakelock",t)}}restartTicker(){const e=this.ticker;e&&clearInterval(e),this.ticker=setInterval(()=>this.tick(),1e3)}tick(){this.timeRemaining=Math.max(0,this.timeRemaining-1),this.callback(),this.timeRemaining===0&&(this.phase!==f.COOLDOWN?this.goForward():this.toggle())}goBack(){switch(this.phase){case f.WARM_UP:this.timeRemaining=this.timer.warmUp;break;case f.LOW_INTENSITY:this.set<this.timer.sets?(this.phase=f.HIGH_INTENSITY,this.timeRemaining=this.timer.highIntensity,this.set++):this.round<this.timer.rounds?(this.phase=f.REST,this.timeRemaining=this.timer.rest,this.round++,this.set=1):(this.phase=f.WARM_UP,this.timeRemaining=this.timer.warmUp);break;case f.HIGH_INTENSITY:this.phase=f.LOW_INTENSITY,this.timeRemaining=this.timer.lowIntensity;break;case f.REST:this.phase=f.HIGH_INTENSITY,this.timeRemaining=this.timer.highIntensity;break;case f.COOLDOWN:this.phase=f.HIGH_INTENSITY,this.timeRemaining=this.timer.highIntensity;break}this.active()&&(this.playSound(),this.restartTicker()),this.callback()}goForward(){switch(this.phase){case f.WARM_UP:this.phase=f.LOW_INTENSITY,this.timeRemaining=this.timer.lowIntensity;break;case f.LOW_INTENSITY:this.phase=f.HIGH_INTENSITY,this.timeRemaining=this.timer.highIntensity;break;case f.HIGH_INTENSITY:this.timer.sets>1&&this.set>1?(this.phase=f.LOW_INTENSITY,this.timeRemaining=this.timer.lowIntensity,this.set--):this.timer.rounds>1&&this.round>1?(this.phase=f.REST,this.timeRemaining=this.timer.rest):(this.phase=f.COOLDOWN,this.timeRemaining=this.timer.coolDown);break;case f.REST:this.phase=f.LOW_INTENSITY,this.timeRemaining=this.timer.lowIntensity,this.round--,this.set=this.timer.sets;break;case f.COOLDOWN:this.timeRemaining=0;break}this.active()&&(this.playSound(),this.restartTicker()),this.callback()}}var Tr=Object.defineProperty,Rr=Object.getOwnPropertyDescriptor,Ve=(i,e,t,r)=>{for(var n=r>1?void 0:r?Rr(e,t):e,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(e,t,n):o(n))||n);return r&&n&&Tr(e,t,n),n};let ge=class extends y{constructor(){super(),document.addEventListener("keyup",i=>{if(i.target===document.body)switch(i.key){case"ArrowRight":this.goForward();break;case"ArrowLeft":this.goBack();break;case" ":this.toggleActiveState();break}})}static get styles(){return E`
      * {
        user-select: none;
      }

      .timer {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        transition: all 0.25s ease;
        padding: 1em;
        box-sizing: border-box
      }

      .main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
      }

      .timer.lowintensity {
        background-color: var(--timer-background-red);
      }

      .timer.highintensity {
        background-color: #0C5E0C;
      }

      .timer.rest {
        background-color: #D2AD0F;
      }

      .timer.cooldown {
        background-color: #005CA3;
      }

      p {
        margin: 0;
        padding: 0;
      }

      .time {
        font-size: 5em;
        font-family: Cascadia, "Roboto Mono", Menlo, monospace;
      }

      footer {
        display: flex;
        justify-content: space-between;
      }
    `}updated(){(!this.timerState||this.timerState.timer.id!==this.timer.id)&&(this.timerState=new Ir(this.timer,()=>this.requestUpdate()))}toggleActiveState(){this.timerState.toggle()}goBack(){this.timerState.goBack()}goForward(){this.timerState.goForward()}toggleIcon(){return this.timerState.active()?v`<pause-icon></pause-icon>`:v`<play-icon></play-icon>`}render(){if(!!this.timerState)return v`
      <div class="timer ${Or(this.timerState.phase)}">
        <div class="main">
          <p class="phase">${this.timerState.phase}</p>
          <p class="time">${U(this.timerState.timeRemaining)}</p>
          <div class="controls">
            <fluent-button appearance="stealth" @click=${this.goBack}>
              <back-icon></back-icon>
            </fluent-button>
            <fluent-button appearance="stealth" @click=${this.toggleActiveState}>
              ${this.toggleIcon()}
            </fluent-button>
            <fluent-button appearance="stealth" @click=${this.goForward}>
              <forward-icon></forward-icon>
            </fluent-button>
          </div>
        </div>
        <footer>
          <labeled-counter label="Set" .value=${this.timerState.set.toString()}></labeled-counter>
          <labeled-counter label="Round" .value=${this.timerState.round.toString()}></labeled-counter>
        </footer>
      </div>
    `}};Ve([g({type:Object})],ge.prototype,"timer",2);Ve([g({type:Object})],ge.prototype,"timerState",2);ge=Ve([A("active-timer")],ge);var Cr=Object.defineProperty,xr=Object.getOwnPropertyDescriptor,ze=(i,e,t,r)=>{for(var n=r>1?void 0:r?xr(e,t):e,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(e,t,n):o(n))||n);return r&&n&&Cr(e,t,n),n};let _e=class extends y{constructor(){super()}static get styles(){return E`
      .label {
        font-size: calc();
        text-transform: uppercase;
      }

      .label, .value {
        margin: 0;
        padding: 0;
        text-align: center;
      }

      .value {
        font-size: 2em;
        font-weight: bold;
      }
    `}render(){return v`
      <div class="counter">
        <p class="label">${this.label}</p>
        <p class="value">${this.value}</p>
      </div>
    `}};ze([g({type:String})],_e.prototype,"label",2);ze([g({type:String})],_e.prototype,"value",2);_e=ze([A("labeled-counter")],_e);var Lr=Object.defineProperty,Nr=Object.getOwnPropertyDescriptor,ne=(i,e,t,r)=>{for(var n=r>1?void 0:r?Nr(e,t):e,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(e,t,n):o(n))||n);return r&&n&&Lr(e,t,n),n};let V=class extends y{constructor(){super(),this.showSidebar=!1}static get styles(){return E`
      * {
        --neutral-fill-stealth-rest: rgba(255, 255, 255, 0);
        --neutral-fill-stealth-hover: rgba(255, 255, 255, 0.2);
        --neutral-fill-stealth-active: rgba(255, 255, 255, 0.4);
        user-select: none;
      }

      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--app-color-primary);
        color: white;
        height: 4em;
        padding: 0 1em;
      }

      header h1 {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 20px;
        font-weight: bold;
      }

      nav fluent-anchor {
        margin-left: 10px;
      }

      #menu-button-block {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      #menu-button-block img {
        display: block;
      }

      .spacer {
        width: 1em;
      }

      @media(prefers-color-scheme: light) {
        header {
          color: black;
        }

        nav fluent-anchor::part(control) {
          color: initial;
        }
      }
    `}toggleSidebar(){this.showSidebar=!this.showSidebar}closeSidebar(){this.showSidebar=!1}render(){return v`
      <header>
        <div id="menu-button-block">
          <fluent-button appearance="stealth" @click="${this.toggleSidebar}">
            <navigation-icon></navigation-icon>
          </fluent-button>
          <div class="spacer"></div>
          <h1>${this.apptitle||"Trainterval"}</h1>
        </div>
        <slot name="actions"></slot>
      </header>
      <app-sidebar
        ?visible="${this.showSidebar}"
        .timers=${this.timers}
        .selectedTimer=${this.selectedTimer}
        @closesidebar="${this.closeSidebar}"></app-sidebar>
    `}};ne([g({type:String})],V.prototype,"apptitle",2);ne([g({type:Array})],V.prototype,"timers",2);ne([g({type:Number})],V.prototype,"selectedTimer",2);ne([g({type:Boolean})],V.prototype,"showSidebar",2);V=ne([A("app-header")],V);var kr=Object.defineProperty,Dr=Object.getOwnPropertyDescriptor,Ur=(i,e,t,r)=>{for(var n=r>1?void 0:r?Dr(e,t):e,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(e,t,n):o(n))||n);return r&&n&&kr(e,t,n),n};let Ot=class extends y{static get styles(){return E`
      svg {
        display: block;
        color: var(--foreground-color);
        height: 2em;
        width: 2em;
      }
    `}render(){return v`
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 100 100" width="100pt" height="100pt"><defs><clipPath id="_clipPath_hST7dVCHzucXN2usmbRVwXvGcw614fxw"><rect width="100" height="100"/></clipPath></defs><g clip-path="url(#_clipPath_hST7dVCHzucXN2usmbRVwXvGcw614fxw)"><path d=" M 0 0 L 20 0 L 20 100 L 0 100 L 0 0 Z  M 100 100 L 20 60 L 20 40 L 100 0 L 100 100 Z " fill-rule="evenodd"/></g></svg>
    `}};Ot=Ur([A("back-icon")],Ot);var Mr=Object.defineProperty,jr=Object.getOwnPropertyDescriptor,Br=(i,e,t,r)=>{for(var n=r>1?void 0:r?jr(e,t):e,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(e,t,n):o(n))||n);return r&&n&&Mr(e,t,n),n};let It=class extends y{static get styles(){return E`
      svg {
        display: block;
        color: var(--foreground-color);
        height: 2em;
        width: 2em;
      }
    `}render(){return v`
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 100 100" width="100pt" height="100pt"><defs><clipPath id="_clipPath_KOVDpZBFpo30t6zkDMhJtopDGxIcWA0l"><rect width="100" height="100"/></clipPath></defs><g clip-path="url(#_clipPath_KOVDpZBFpo30t6zkDMhJtopDGxIcWA0l)"><path d=" M 80 0 L 100 0 L 100 100 L 80 100 L 80 0 Z  M 0 100 L 80 60 L 80 40 L 0 0 L 0 100 Z " fill-rule="evenodd"/></g></svg>
    `}};It=Br([A("forward-icon")],It);var Hr=Object.defineProperty,Wr=Object.getOwnPropertyDescriptor,Fr=(i,e,t,r)=>{for(var n=r>1?void 0:r?Wr(e,t):e,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(e,t,n):o(n))||n);return r&&n&&Hr(e,t,n),n};let Tt=class extends y{static get styles(){return E`
            svg {
                display: block;
                color: var(--foreground-color);
            }
        `}render(){return v`
            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 4.5c0-.28.22-.5.5-.5h15a.5.5 0 010 1h-15a.5.5 0 01-.5-.5zm0 5c0-.28.22-.5.5-.5h15a.5.5 0 010 1h-15a.5.5 0 01-.5-.5zm.5 4.5a.5.5 0 000 1h15a.5.5 0 000-1h-15z"/></svg>
        `}};Tt=Fr([A("navigation-icon")],Tt);var Vr=Object.defineProperty,zr=Object.getOwnPropertyDescriptor,Yr=(i,e,t,r)=>{for(var n=r>1?void 0:r?zr(e,t):e,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(e,t,n):o(n))||n);return r&&n&&Vr(e,t,n),n};let Rt=class extends y{static get styles(){return E`
      svg {
        display: block;
        color: var(--foreground-color);
        height: 2em;
        width: 2em;
      }
    `}render(){return v`
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 100 100" width="100pt" height="100pt"><defs><clipPath id="_clipPath_gghKfkXt3RrkXOpdD3Nb2uh99Yv5EXhC"><rect width="100" height="100"/></clipPath></defs><g clip-path="url(#_clipPath_gghKfkXt3RrkXOpdD3Nb2uh99Yv5EXhC)"><rect x="67" y="0" width="33" height="100""/><rect x="0" y="0" width="33" height="100"/></g></svg>
      `}};Rt=Yr([A("pause-icon")],Rt);var Kr=Object.defineProperty,Gr=Object.getOwnPropertyDescriptor,qr=(i,e,t,r)=>{for(var n=r>1?void 0:r?Gr(e,t):e,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(e,t,n):o(n))||n);return r&&n&&Kr(e,t,n),n};let Ct=class extends y{static get styles(){return E`
      svg {
        display: block;
        color: var(--foreground-color);
        height: 2em;
        width: 2em;
      }
    `}render(){return v`
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 100 100" width="100pt" height="100pt"><defs><clipPath id="_clipPath_Vk8cYX7uFNrhKajyPVlEqY6YHDbpwGFw"><rect width="100" height="100"/></clipPath></defs><g clip-path="url(#_clipPath_Vk8cYX7uFNrhKajyPVlEqY6YHDbpwGFw)"><polygon points="100,50,0,100,0,0"/></g></svg>
        `}};Ct=qr([A("play-icon")],Ct);var Xr="/interval-timer/code/add_20_regular.de820bdd.svg";class Zr extends Event{constructor(e){super("selecttimer",{bubbles:!0,composed:!0}),this.timerId=e}}var Jr=Object.defineProperty,Qr=Object.getOwnPropertyDescriptor,se=(i,e,t,r)=>{for(var n=r>1?void 0:r?Qr(e,t):e,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(e,t,n):o(n))||n);return r&&n&&Jr(e,t,n),n};let z=class extends y{constructor(){super(),this.visible=!1,this.timers=[],window.addEventListener("beforeinstallprompt",i=>{i.preventDefault()})}static get styles(){return E`
      * {
        transition: all 0.25s ease;
      }

      @media(prefers-color-scheme: light) {
        header {
          color: black;
        }

        nav fluent-anchor::part(control) {
          color: initial;
        }
      }

      .sidebar-content {
        position: absolute;
        width: 20em;
        height: 100vh;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 999;
        background: var(--background-color);
        transform: translate3d(-100%, 0, 0);
        display: flex;
        flex-direction: column;
      }

      h3 {
        margin: 0;
        padding: 1em;
      }

      fluent-listbox {
        flex-grow: 1;
        border: none;
      }

      .visible .sidebar-content {
        transform: translate3d(0, 0, 0);
      }

      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 998;
        background: rgba(0, 0, 0, 0.6);
        display: none;
      }

      .visible .overlay  {
        display: block;
      }

      pwa-install {
        position: relative;
        box-sizing: border-box;
        outline: none;
        font-family: var(--body-font);
        font-size: var(--type-ramp-base-font-size);
        line-height: var(--type-ramp-base-line-height);
        font-weight: initial;
        font-variation-settings: var(--type-ramp-base-font-variations);
        height: calc((var(--base-height-multiplier) + var(--density)) * var(--design-unit) * 1px);
        min-width: calc((var(--base-height-multiplier) + var(--density)) * var(--design-unit) * 1px);
        color: var(--neutral-foreground-rest);
        border-radius: calc(var(--control-corner-radius) * 1px);
        fill: currentcolor;
        cursor: pointer;
      }

      pwa-install::part(openButton) {
        background: var(--neutral-fill-stealth-rest);
        border: calc(var(--stroke-width) * 1px) solid transparent;
        flex-grow: 1;
        box-sizing: border-box;
        display: inline-flex;
        justify-content: start;
        align-items: center;
        padding: 0 calc((10 + (var(--design-unit) * 2 * var(--density))) * 1px);
        white-space: nowrap;
        outline: none;
        text-decoration: none;
        color: inherit;
        border-radius: inherit;
        fill: inherit;
        cursor: inherit;
        font-family: inherit;
        height: 100%;
      }

      pwa-install::part(openButton):hover {
        background: var(--neutral-fill-stealth-hover);
      }

      fluent-button, pwa-install {
        box-sizing: border-box;
        height: 42px;
        padding: 5px;
      }

      fluent-button, button, pwa-install::part(openButton) {
        justify-content: start;
        width: 100%;
      }
    `}updated(){var e,t;const i=(t=(e=this.fButton)==null?void 0:e.shadowRoot)==null?void 0:t.querySelector("button");i&&i.setAttribute("style","justify-content: start;")}toggleVisibility(){this.dispatchEvent(new CustomEvent("closesidebar"))}selectTimer(i){this.dispatchEvent(new Zr(i)),this.toggleVisibility()}newTimer(){this.dispatchEvent(new CustomEvent("newtimer",{bubbles:!0,composed:!0})),this.toggleVisibility()}render(){var i;return v`
      <div class="sidebar ${this.visible?"visible":""}">
        <div class="overlay" @click="${this.toggleVisibility}"></div>
        <div class="sidebar-content">
          <h3>Trainterval</h3>
          <fluent-listbox>
            ${(i=this.timers)==null?void 0:i.map(e=>v`
                  <fluent-option
                    @click=${()=>this.selectTimer(e.id)}
                    selected=${e.id===this.selectedTimer}
                    value=${e.name}>${e.name}</fluent-option>
                `)}
          </fluent-listbox>
          <fluent-divider></fluent-divider>
          <fluent-button appearance="stealth" @click="${this.newTimer}">
            <img slot="start" src="${Xr}" aria-hidden="true" />
            New Timer
          </fluent-button>
      </div>
    `}};se([g({type:Boolean})],z.prototype,"visible",2);se([g({type:Array})],z.prototype,"timers",2);se([g({type:Number})],z.prototype,"selectedTimer",2);se([I("fluent-button")],z.prototype,"fButton",2);z=se([A("app-sidebar")],z);var en=Object.defineProperty,tn=Object.getOwnPropertyDescriptor,$=(i,e,t,r)=>{for(var n=r>1?void 0:r?tn(e,t):e,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(e,t,n):o(n))||n);return r&&n&&en(e,t,n),n};let w=class extends y{constructor(){super(),this.visible=!1,this.saving=!1,this.durationPattern="[0-5]?[0-9]+(:[0-5][0-9]){0,2}",document.addEventListener("keyup",i=>{if(i.target===document.body)switch(i.key){case"Escape":this.toggleVisibility();break}})}static get styles(){return E`
      .dialog {
        display: flex;
        box-sizing: border-box;
        flex-direction: column;
        max-height: var(--dialog-height);
        max-width: var(--dialog-width);
        padding: 1em;
      }

      h2 {
        margin: 0;
        user-select: none;
      }

      form {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        margin: 1em 0;

      fluent-button {
        margin: 1em 0;
      }
    `}toggleVisibility(){this.dispatchEvent(new CustomEvent("close"))}async save(){var t,r,n,s,o,c,a,l,u,d,h,p;(t=this.timerId)==null||t.value;const i=(r=this.timerName)==null?void 0:r.value;if(!i){alert("Name is required");return}const e=new Pr(i);e.id=(n=this.timer)==null?void 0:n.id,e.description=(s=this.timerDescription)==null?void 0:s.value,e.warmUp=X((o=this.timerWarmUp)==null?void 0:o.value),e.lowIntensity=X((c=this.timerLowIntensity)==null?void 0:c.value),e.highIntensity=X((a=this.timerHighIntensity)==null?void 0:a.value),e.rest=X((l=this.timerRest)==null?void 0:l.value),e.coolDown=X((u=this.timerCooldown)==null?void 0:u.value),e.sets=Number.parseInt(((d=this.timerSets)==null?void 0:d.value)||"0")||1,e.rounds=Number.parseInt(((h=this.timerRounds)==null?void 0:h.value)||"0")||1,this.saving=!0,await((p=this.timerService)==null?void 0:p.save(e)),this.saving=!1,this.toggleVisibility()}render(){var e,t,r,n,s,o,c,a,l,u,d,h;let i;if(!this.saving){const p=(e=this.timer)!=null&&e.id?"Edit Timer":"New Timer";i=v`
        <div class="dialog">
          <h2>${p}</h2>
          <form @submit=${this.save}>
            <input
              id="timer-id"
              type="hidden"
              name="id"
              .value=${((r=(t=this.timer)==null?void 0:t.id)==null?void 0:r.toString())||""} />
            <fluent-text-field
              id="timer-name"
              appearance="outline"
              placeholder="My Timer"
              .value=${((n=this.timer)==null?void 0:n.name)||""}>Name</fluent-text-field>
            <fluent-text-area
              id="timer-description"
              appearance="outline"
              placeholder="More details"
              .value=${((s=this.timer)==null?void 0:s.description)||""}>Description</fluent-text-area>
            <fluent-text-field
              id="timer-warmup"
              appearance="outline"
              placeholder="05:00"
              pattern="${this.durationPattern}"
              .value=${U((o=this.timer)==null?void 0:o.warmUp)}>Warm Up</fluent-text-field>
              <fluent-text-field
              id="timer-low"
              appearance="outline"
              placeholder="00:30"
              pattern="${this.durationPattern}"
              .value=${U((c=this.timer)==null?void 0:c.lowIntensity)}>Low Intensity</fluent-text-field>
              <fluent-text-field
              id="timer-hi"
              appearance="outline"
              placeholder="01:00"
              pattern="${this.durationPattern}"
              .value=${U((a=this.timer)==null?void 0:a.highIntensity)}>High Intensity</fluent-text-field>
              <fluent-text-field
              id="timer-rest"
              appearance="outline"
              placeholder="01:00"
              pattern="${this.durationPattern}"
              .value=${U((l=this.timer)==null?void 0:l.rest)}>Rest</fluent-text-field>
              <fluent-text-field
              id="timer-cool"
              appearance="outline"
              placeholder="05:00"
              pattern="${this.durationPattern}"
              .value=${U((u=this.timer)==null?void 0:u.coolDown)}>Cooldown</fluent-text-field>
            <fluent-text-field
              id="timer-sets"
              appearance="outline"
              placeholder="4"
              .value=${(d=this.timer)==null?void 0:d.sets}>Sets</fluent-text-field>
            <fluent-text-field
              id="timer-rounds"
              appearance="outline"
              placeholder="2"
              .value=${(h=this.timer)==null?void 0:h.rounds}>Rounds</fluent-text-field>
          </form>
          <fluent-button appearance="accent" tabindex="0" @click=${this.save}>Save</fluent-button>
          <fluent-button appearance="outline" tabindex="0" @click=${this.toggleVisibility}>Cancel</fluent-button>
        </div>
      `}return v`
      <fluent-dialog ?hidden=${!this.visible} trap-focus modal>
        ${i}
      </fluent-dialog>
    `}};$([g({type:Boolean})],w.prototype,"visible",2);$([g({type:Boolean})],w.prototype,"saving",2);$([g({type:Object})],w.prototype,"timer",2);$([g({type:Object})],w.prototype,"timerService",2);$([I("#timer-id")],w.prototype,"timerId",2);$([I("#timer-name")],w.prototype,"timerName",2);$([I("#timer-description")],w.prototype,"timerDescription",2);$([I("#timer-warmup")],w.prototype,"timerWarmUp",2);$([I("#timer-low")],w.prototype,"timerLowIntensity",2);$([I("#timer-hi")],w.prototype,"timerHighIntensity",2);$([I("#timer-rest")],w.prototype,"timerRest",2);$([I("#timer-cool")],w.prototype,"timerCooldown",2);$([I("#timer-sets")],w.prototype,"timerSets",2);$([I("#timer-rounds")],w.prototype,"timerRounds",2);w=$([A("timer-form-dialog")],w);var rn=Object.defineProperty,nn=Object.getOwnPropertyDescriptor,sn=(i,e,t,r)=>{for(var n=r>1?void 0:r?nn(e,t):e,s=i.length-1,o;s>=0;s--)(o=i[s])&&(n=(r?o(e,t,n):o(n))||n);return r&&n&&rn(e,t,n),n};let xt=class extends y{static get styles(){return E`
      main {
        box-sizing: border-box;
        height: 100%;
      }

      #routerOutlet {
        height: 100%;
      }

      #routerOutlet > * {
        width: 100% !important;
        height: 100%;
      }

      #routerOutlet > .leaving {
        animation: 160ms fadeOut ease-in-out;
      }

      #routerOutlet > .entering {
        animation: 160ms fadeIn linear;
      }

      @keyframes fadeOut {
        from {
          opacity: 1;
        }

        to {
          opacity: 0;
        }
      }

      @keyframes fadeIn {
        from {
          opacity: 0.2;
        }

        to {
          opacity: 1;
        }
      }
    `}constructor(){super()}firstUpdated(){var e;new x((e=this.shadowRoot)==null?void 0:e.querySelector("#routerOutlet")).setRoutes([{path:"/interval-timer/",animate:!0,children:[{path:"",component:"app-home"}]}]),lr({immediate:!0})}render(){return v`
      <div style="height: 100%;">
        <main>
          <div id="routerOutlet"></div>
        </main>
      </div>
    `}};xt=sn([A("app-index")],xt);
//# sourceMappingURL=index.d1a35cde.js.map
