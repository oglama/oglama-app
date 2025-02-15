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
(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[459],{42070:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/login",function(){return n(4194)}])},42274:function(t,e,n){"use strict";var i=n(26042),r=n(85893),a=n(67294),s=n(89609);e.Z=function(t){var e,n=function(t){var e=w>u&&t===w-1?u%1*100:100,n=[];if(p>1)for(var i=1;i<=p;i++){var s=e-100/p*(i-1);n.push(s<100/p?s>0?s:0:100/p)}else n.push(e);b.push((0,r.jsx)(a.Fragment,{children:n.map((function(e,n){var i=0===m?"".concat(e,"%"):"calc(".concat(e,"% - ").concat(m,"px)"),a=0===m?null:"".concat(m,"px"),s={width:i,marginLeft:a,marginTop:a};return v&&(s.borderRadius="50%"),null!==j&&(s.height=j),(0,r.jsx)("div",{className:"skeleton",style:s,children:"\u200c"},"".concat(t,"-").concat(n))}))},t))},o=t.className,l=t.sx,c=t.count,u=void 0===c?1:c,d=t.columns,p=void 0===d?1:d,h=t.spacing,m=void 0===h?20:h,f=t.justify,x=void 0===f?"start":f,g=t.rounded,v=void 0!==g&&g,Z=t.rowHeight,j=void 0===Z?null:Z,b=[],w=Math.ceil(u);p=null!==(e=Math.abs(parseInt(p,10)))&&void 0!==e?e:1,m=Math.abs(parseInt(m,10)),x=-1===["start","center","end","space-between"].indexOf(x)?"start":x;for(var y=0;y<w;y++)n(y);var k=0===m?null:"".concat(m,"px");return(0,r.jsx)(s.Z,{sx:(0,i.Z)({},l),className:o,children:(0,r.jsx)("div",{"aria-live":"polite","aria-busy":!0,style:{paddingRight:k,paddingBottom:k,display:"inline-flex",flexFlow:"wrap",width:"100%",height:"100%",top:"-3px",position:"relative",justifyContent:x},children:b})})}},4194:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return B}});var i=n(85893),r=n(2734),a=n(82670),s=n(29815),o=n(77058),l=n(67294),c=n(11163),u=n(86501),d=n(90948),p=n(69417),h=n(15861),m=n(21737),f=n(80822),x=n(27313),g=n(42274),v=(0,d.ZP)(f.Z)((function(t){var e=t.theme;return{width:"3rem",height:"5rem",background:e.palette.background.paper,display:"flex",justifyContent:"center",alignItems:"center",fontSize:"3rem",borderRadius:"1rem",marginLeft:"2px",marginRight:"2px",border:"1px solid ".concat(e.palette.divider)}}));function Z(){var t=(0,o.$)().i18n,e=(0,c.useRouter)(),n=(0,l.useState)(!1),r=n[0],d=n[1],Z=(0,l.useState)(null),j=Z[0],b=Z[1],w=(0,l.useState)(null),y=w[0],k=w[1],C=(0,l.useState)(!1),I=C[0],S=C[1];(0,l.useEffect)((function(){var t=x.h.onClaimStateChanged((function(t){return S(null!==t)})),e=x.h.onCountdown((function(t){"number"===typeof t&&(t>0?k(t):(S(!1),b("Authorization attempt timed out. Please try again!")))}));return function(){return t(),e()}}),[e.route]);var z=[0,0,":",0,0];return"number"===typeof y&&y>0&&I&&(z=function(){var t="".concat(parseInt(y/60)).padStart(2,"0").split(""),e="".concat(y%60).padStart(2,"0").split("");return(0,s.Z)(t).concat([":"],(0,s.Z)(e))}()),(0,i.jsx)(f.Z,{children:r?(0,i.jsx)(g.Z,{count:2,sx:{width:"100%",minWidth:"250px"}}):(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(f.Z,{sx:{display:"flex",alignItems:"center",justifyContent:"center"},children:I?(0,i.jsxs)(f.Z,{sx:{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",userSelect:"none"},children:[(0,i.jsx)(f.Z,{sx:{display:"flex",justifyContent:"space-between",mb:6},children:z.map((function(t,e){return(0,i.jsx)(v,{children:t},e)}))}),(0,i.jsx)(h.Z,{variant:"caption",children:t.t("Waiting to confirm connection")})]}):(0,i.jsx)(p.Z,{fullWidth:!0,size:"large",variant:"contained",onClick:function(){b(null),d(!0),x.h.connect().then((function(){u.Am.success("Please log into your Oglama account"),d(!1)})).catch((function(t){d(!1),b((0,a.Z)(t,Error)?t.message:"Could not connect")}))},children:t.t("Connect")})}),"string"===typeof j&&j.length?(0,i.jsx)(m.Z,{severity:"warning",variant:"outlined",sx:{mt:3,mb:-3},children:j}):null]})})}var j=n(47568),b=n(14924),w=n(26042),y=n(97582),k=n(56267),C=n(20214),I=n(61730),S=n(93946),z=n(42734),P=n(66242),_=n(84165),W=n(40045),N=n(88073),R=(0,d.ZP)("img")((function(){return{userSelect:"none",position:"absolute",top:0,right:0,height:"100%"}})),E=function(){var t=(0,N.r)().settings,e=(0,r.Z)();return(0,I.Z)(e.breakpoints.up("md"))?(0,i.jsx)(f.Z,{sx:{position:"absolute",width:"50%",height:"100%",top:0,right:0},children:(0,i.jsx)(R,{src:"/img/pages/card.svg",alt:"card",sx:"rtl"===t.direction?{transform:"scaleX(-1)"}:{}})}):null},O=n(77381),F=(0,d.ZP)(f.Z)((function(t){var e=t.theme;return(0,b.Z)({padding:e.spacing(20),position:"relative",zIndex:4,justifyContent:"start",display:"flex",width:"100%",paddingLeft:"0 !important"},e.breakpoints.down("lg"),{padding:e.spacing(10)})})),T=(0,d.ZP)("img")((function(t){var e=t.theme;return(0,w.Z)((0,b.Z)({maxWidth:"30rem",userSelect:"none"},e.breakpoints.down("lg"),{maxWidth:"25rem"}),"rtl"===e.direction?{transform:"scaleX(-1)"}:{})})),D=(0,d.ZP)(f.Z)((function(){return{flex:1,width:"100%",height:"100%",display:"flex",position:"absolute",alignItems:"center",justifyContent:"center",zIndex:1}})),L=(0,d.ZP)(P.Z)((function(t){var e,n=t.theme;return e={width:"75vw",maxWidth:"70rem",position:"relative",zIndex:10,background:n.palette.background.sandblasted,borderRadius:n.spacing(6),boxShadow:n.shadows[12],justifySelf:"end"},(0,b.Z)(e,n.breakpoints.down("md"),{width:400}),(0,b.Z)(e,"animation","slideDownRepaint 1000ms cubic-bezier(0.25, 1.75, 0.5, 1)"),e})),M=(0,d.ZP)(f.Z)((function(t){var e,n=t.theme;return e={},(0,b.Z)(e,n.breakpoints.down("xl"),{width:"100%"}),(0,b.Z)(e,n.breakpoints.down("md"),{maxWidth:450}),e})),X=(0,d.ZP)(f.Z)((function(t){return{top:"5%",left:"5%",width:"90%",height:"90%",position:"absolute",zIndex:0,background:"light"===t.theme.palette.mode?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.2)",transformOrigin:"center",willChange:"transform",animation:"slideUp 1200ms cubic-bezier(0.25, 1.25, 0.5, 1) forwards",borderRadius:"1.5rem",overflow:"hidden"}})),A=(0,d.ZP)(h.Z)((function(t){var e=t.theme;return{"&.MuiTypography-root":{fontFamily:"Yaldevi",fontWeight:600},lineHeight:"normal",marginLeft:e.spacing(4.5),color:e.palette.text.primary,transition:"opacity .25s ease-in-out, margin .25s ease-in-out",textDecoration:"none"}})),H=(0,d.ZP)("img")((function(t){var e=t.theme;return(0,b.Z)({position:"absolute",top:"-15.5rem",right:"-2.5rem",zIndex:2,maxWidth:"25rem",userSelect:"none",opacity:0,transition:"opacity 1250ms linear"},e.breakpoints.down("lg"),{maxWidth:"25rem"})})),Y=function(t){var e=t.src,n=t.children,a=(0,C.a)(),s=(0,r.Z)(),o=(0,l.useRef)(null),c=(0,I.Z)(s.breakpoints.up("md")),u=(0,I.Z)(s.breakpoints.up("lg"));"string"!==typeof e&&(e="/img/pages/page-login-light.png");var d=function(){var t=(0,j.Z)((function(){var t;return(0,y.__generator)(this,(function(e){switch(e.label){case 0:return[4,null===(t=window.sdk)||void 0===t?void 0:t.ipc.main.quit()];case 1:return e.sent(),[2]}}))}));return function(){return t.apply(this,arguments)}}();return(0,l.useEffect)((function(){setTimeout((function(){a.user||null===o.current||(o.current.style.opacity=1)}),250)}),[a.user]),a.user?null:(0,i.jsxs)(f.Z,{className:"content-center",sx:{flexDirection:"column"},children:[(0,i.jsxs)(L,{children:[(0,i.jsxs)(f.Z,{sx:{position:"absolute",zIndex:10,display:"flex",justifyContent:"end",alignItems:"center",top:u?"3rem":c?"2.5rem":"1rem",right:"1rem",transformOrigin:"top right",transform:c?"rotate(".concat("rtl"===s.direction?-9:9,"deg)"):null},children:[(0,i.jsx)(_.Z,{}),(0,i.jsx)(S.Z,{color:"error",sx:{ml:2},onClick:d,children:(0,i.jsx)(z.Z,{})})]}),(0,i.jsxs)(f.Z,{sx:{display:"flex",alignItems:"center",my:6},children:[(0,i.jsx)(f.Z,{sx:{p:12,position:"relative",zIndex:2,minWidth:400,height:"100%",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"0 2rem 2rem 0"},children:(0,i.jsxs)(M,{children:[(0,i.jsxs)(f.Z,{sx:{display:"flex",alignItems:"center",justifyContent:"center",mb:6,userSelect:"none"},children:[(0,i.jsx)(O.Z,{size:64,animate:!0}),(0,i.jsx)(A,{variant:"h5",sx:{ml:3,userSelect:"none",fontSize:"2rem !important",fontFamily:"Yaldevi !important",fontWeight:600},children:k.Z.appName})]}),n]})}),c?(0,i.jsx)(f.Z,{sx:{width:"100%"},children:(0,i.jsx)(F,{className:"iwrp",children:(0,i.jsx)(T,{alt:"illustration",src:e})})}):null,(0,i.jsx)(E,{})]})]}),(0,i.jsx)(f.Z,{sx:{top:"50vh",position:"absolute",height:"25vh",width:"80vw",maxWidth:"70rem",zIndex:2},children:(0,i.jsx)(H,{src:"/img/pages/dots.svg",alt:"dots",className:"rotate",ref:o})}),(0,i.jsx)(D,{children:(0,i.jsx)(W.Z,{})}),(0,i.jsx)(X,{})]})},q=function(){var t=(0,r.Z)();return(0,i.jsx)(Y,{src:"/img/pages/page-login-".concat(t.palette.mode,".png"),children:(0,i.jsx)(Z,{})})};q.guestGuard=!0;var B=q}},function(t){t.O(0,[690,774,888,179],(function(){return e=42070,t(t.s=e);var e}));var e=t.O();_N_E=e}]);