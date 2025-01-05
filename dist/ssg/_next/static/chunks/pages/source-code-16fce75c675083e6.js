/*!
 * @architect Mark Jivko <mark@oglama.com>
 * @copyright © 2024-2025 Oglama https://oglama.com
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[373],{25877:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/source-code",function(){return n(93207)}])},93207:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return F}});var r=n(85893),o=n(14924),a=n(90948),s=n(63366),i=n(87462),u=n(67294),d=n(70828),c=n(34867),l=n(94780),m=n(14142),p=n(20539),h=n(96682);var f=n(63390),x=n(4953),v=n(17172),g=n(86523);const Z=["ownerState"],b=["variants"],w=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function y(e){return"ownerState"!==e&&"theme"!==e&&"sx"!==e&&"as"!==e}const S=(0,v.Z)(),k=e=>e?e.charAt(0).toLowerCase()+e.slice(1):e;function _({defaultTheme:e,theme:t,themeId:n}){return r=t,0===Object.keys(r).length?e:t[n]||t;var r}function W(e){return e?(t,n)=>n[e]:null}function C(e,t){let{ownerState:n}=t,r=(0,s.Z)(t,Z);const o="function"===typeof e?e((0,i.Z)({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap((e=>C(e,(0,i.Z)({ownerState:n},r))));if(o&&"object"===typeof o&&Array.isArray(o.variants)){const{variants:e=[]}=o;let t=(0,s.Z)(o,b);return e.forEach((e=>{let o=!0;"function"===typeof e.props?o=e.props((0,i.Z)({ownerState:n},r,n)):Object.keys(e.props).forEach((t=>{(null==n?void 0:n[t])!==e.props[t]&&r[t]!==e.props[t]&&(o=!1)})),o&&(Array.isArray(t)||(t=[t]),t.push("function"===typeof e.style?e.style((0,i.Z)({ownerState:n},r,n)):e.style))})),t}return o}const R=function(e={}){const{themeId:t,defaultTheme:n=S,rootShouldForwardProp:r=y,slotShouldForwardProp:o=y}=e,a=e=>(0,g.Z)((0,i.Z)({},e,{theme:_((0,i.Z)({},e,{defaultTheme:n,themeId:t}))}));return a.__mui_systemSx=!0,(e,u={})=>{(0,f.internal_processStyles)(e,(e=>e.filter((e=>!(null!=e&&e.__mui_systemSx)))));const{name:d,slot:c,skipVariantsResolver:l,skipSx:m,overridesResolver:p=W(k(c))}=u,h=(0,s.Z)(u,w),v=void 0!==l?l:c&&"Root"!==c&&"root"!==c||!1,g=m||!1;let Z=y;"Root"===c||"root"===c?Z=r:c?Z=o:function(e){return"string"===typeof e&&e.charCodeAt(0)>96}(e)&&(Z=void 0);const b=(0,f.default)(e,(0,i.Z)({shouldForwardProp:Z,label:undefined},h)),S=e=>"function"===typeof e&&e.__emotion_real!==e||(0,x.P)(e)?r=>C(e,(0,i.Z)({},r,{theme:_({theme:r.theme,defaultTheme:n,themeId:t})})):e,R=(r,...o)=>{let s=S(r);const u=o?o.map(S):[];d&&p&&u.push((e=>{const r=_((0,i.Z)({},e,{defaultTheme:n,themeId:t}));if(!r.components||!r.components[d]||!r.components[d].styleOverrides)return null;const o=r.components[d].styleOverrides,a={};return Object.entries(o).forEach((([t,n])=>{a[t]=C(n,(0,i.Z)({},e,{theme:r}))})),p(e,a)})),d&&!v&&u.push((e=>{var r;const o=_((0,i.Z)({},e,{defaultTheme:n,themeId:t}));return C({variants:null==o||null==(r=o.components)||null==(r=r[d])?void 0:r.variants},(0,i.Z)({},e,{theme:o}))})),g||u.push(a);const c=u.length-o.length;if(Array.isArray(r)&&c>0){const e=new Array(c).fill("");s=[...r,...e],s.raw=[...r.raw,...e]}const l=b(s,...u);return e.muiName&&(l.muiName=e.muiName),l};return b.withConfig&&(R.withConfig=b.withConfig),R}}();var T=R;const N=["className","component","disableGutters","fixed","maxWidth","classes"],A=(0,v.Z)(),G=T("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[`maxWidth${(0,m.Z)(String(n.maxWidth))}`],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),P=e=>function({props:e,name:t,defaultTheme:n,themeId:r}){let o=(0,h.Z)(n);return r&&(o=o[r]||o),(0,p.Z)({theme:o,name:t,props:e})}({props:e,name:"MuiContainer",defaultTheme:A});var j=n(98216),E=n(28628);const O=function(e={}){const{createStyledComponent:t=G,useThemeProps:n=P,componentName:o="MuiContainer"}=e,a=t((({theme:e,ownerState:t})=>(0,i.Z)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!t.disableGutters&&{paddingLeft:e.spacing(2),paddingRight:e.spacing(2),[e.breakpoints.up("sm")]:{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}})),(({theme:e,ownerState:t})=>t.fixed&&Object.keys(e.breakpoints.values).reduce(((t,n)=>{const r=n,o=e.breakpoints.values[r];return 0!==o&&(t[e.breakpoints.up(r)]={maxWidth:`${o}${e.breakpoints.unit}`}),t}),{})),(({theme:e,ownerState:t})=>(0,i.Z)({},"xs"===t.maxWidth&&{[e.breakpoints.up("xs")]:{maxWidth:Math.max(e.breakpoints.values.xs,444)}},t.maxWidth&&"xs"!==t.maxWidth&&{[e.breakpoints.up(t.maxWidth)]:{maxWidth:`${e.breakpoints.values[t.maxWidth]}${e.breakpoints.unit}`}}))),p=u.forwardRef((function(e,t){const u=n(e),{className:p,component:h="div",disableGutters:f=!1,fixed:x=!1,maxWidth:v="lg"}=u,g=(0,s.Z)(u,N),Z=(0,i.Z)({},u,{component:h,disableGutters:f,fixed:x,maxWidth:v}),b=((e,t)=>{const{classes:n,fixed:r,disableGutters:o,maxWidth:a}=e,s={root:["root",a&&`maxWidth${(0,m.Z)(String(a))}`,r&&"fixed",o&&"disableGutters"]};return(0,l.Z)(s,(e=>(0,c.ZP)(t,e)),n)})(Z,o);return(0,r.jsx)(a,(0,i.Z)({as:h,ownerState:Z,className:(0,d.Z)(b.root,p),ref:t},g))}));return p}({createStyledComponent:(0,a.ZP)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[`maxWidth${(0,j.Z)(String(n.maxWidth))}`],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),useThemeProps:e=>(0,E.i)({props:e,name:"MuiContainer"})});var I=O,M=(0,a.ZP)(I)((function(e){var t=e.theme;return(0,o.Z)({marginLeft:"auto",marginRight:"auto",marginTop:t.spacing(10)},t.breakpoints.up("lg"),{maxWidth:1200})})),$=n(15064),L=function(){var e="".concat(window.sdk.ibc.winName).replace(/^@source\//,"");return(0,r.jsxs)(M,{sx:{m:0},children:["Source code for ",e]})};L.getTitle=function(){return"Agent Source Code"},L.getLayout=function(e){return(0,r.jsx)($.Z,{children:e})},L.guestGuard=!0;var F=L}},function(e){e.O(0,[774,888,179],(function(){return t=25877,e(e.s=t);var t}));var t=e.O();_N_E=t}]);