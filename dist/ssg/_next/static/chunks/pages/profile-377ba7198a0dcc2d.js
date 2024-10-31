/*!
 * @architect Mark Jivko <mark@socialdetox.ai>
 * @copyright © 2024 SocialDetox.ai https://socialdetox.ai
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
(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[277],{31969:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/profile",function(){return n(87671)}])},42274:function(e,t,n){"use strict";var r=n(26042),i=n(85893),o=n(67294),a=n(89609);t.Z=function(e){var t,n=function(e){var t=y>u&&e===y-1?u%1*100:100,n=[];if(h>1)for(var r=1;r<=h;r++){var a=t-100/h*(r-1);n.push(a<100/h?a>0?a:0:100/h)}else n.push(t);Z.push((0,i.jsx)(o.Fragment,{children:n.map((function(t,n){var r=0===p?"".concat(t,"%"):"calc(".concat(t,"% - ").concat(p,"px)"),o=0===p?null:"".concat(p,"px"),a={width:r,marginLeft:o,marginTop:o};return v&&(a.borderRadius="50%"),null!==j&&(a.height=j),(0,i.jsx)("div",{className:"skeleton",style:a,children:"\u200c"},"".concat(e,"-").concat(n))}))},e))},s=e.className,l=e.sx,c=e.count,u=void 0===c?1:c,d=e.columns,h=void 0===d?1:d,g=e.spacing,p=void 0===g?20:g,m=e.justify,f=void 0===m?"start":m,x=e.rounded,v=void 0!==x&&x,b=e.rowHeight,j=void 0===b?null:b,Z=[],y=Math.ceil(u);h=null!==(t=Math.abs(parseInt(h,10)))&&void 0!==t?t:1,p=Math.abs(parseInt(p,10)),f=-1===["start","center","end","space-between"].indexOf(f)?"start":f;for(var w=0;w<y;w++)n(w);var C=0===p?null:"".concat(p,"px");return(0,i.jsx)(a.Z,{sx:(0,r.Z)({},l),className:s,children:(0,i.jsx)("div",{"aria-live":"polite","aria-busy":!0,style:{paddingRight:C,paddingBottom:C,display:"inline-flex",flexFlow:"wrap",width:"100%",height:"100%",top:"-3px",position:"relative",justifyContent:f},children:Z})})}},57063:function(e,t,n){"use strict";n.d(t,{m:function(){return i},p:function(){return r}});var r=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"en",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{month:"long",day:"numeric",year:"numeric"};return e?new Intl.DateTimeFormat(t,n).format(new Date(e)):e},i=function(e){var t=Math.floor(e/3600),n=Math.floor(e%3600/60),r=e%60,i=String(t).padStart(2,"0"),o=String(n).padStart(2,"0"),a=String(r).padStart(2,"0");return"".concat(i,":").concat(o,":").concat(a)}},87671:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return me}});var r=n(47568),i=n(828),o=n(97582),a=n(85893),s=n(67294),l=n(88073),c=n(11163),u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"tab",r=(0,l.r)().settings,i=(0,c.useRouter)();n="".concat(n).replace(/[^\w-]+/g,"")||"tab";var o,a=[];null!==t&&"object"===typeof t&&(a=Object.keys(t).filter((function(e){return"undefined"===typeof t[e].visible||t[e].visible})),null!==e&&-1===a.indexOf(e)&&(e=null!==(o=a[0])&&void 0!==o?o:null));var u=function(){var r=location.hash.replace(/^#\/?|\/$/g,"").match(new RegExp("".concat(n,":(.*?)(?=,|$)"),"i")),i=null===r||0===r[1].trim().length?e:r[1];do{if(null===e)break;if(null===t||-1!==a.indexOf(i))break;i=e}while(0);return i},d=function(r){null!==t&&-1===a.indexOf(r)&&null!==e&&(r=e);var i=location.hash.replace(/^#\/?|\/$/g,""),o=new RegExp("".concat(n,":.*?(?=,|$)"),"i"),s="string"===typeof r&&r.length?"".concat(n,":").concat(r):"";return(i.match(o)?i.replace(o,s).replace(/^,+|,+$/,""):"".concat(i).concat(s.length&&i.length?",":"").concat(s)).replace(/,{2,}/g,",")},h=(0,s.useState)(!1),g=h[0],p=h[1],m=(0,s.useState)((function(){return u()})),f=m[0],x=m[1],v=(0,s.useCallback)((function(){x(u())}),[r,a]);(0,s.useEffect)((function(){return x(u()),addEventListener("hashchange",v),function(){return removeEventListener("hashchange",v)}}),[r,i.route,a]);var b=(0,s.useCallback)((function(e){(e=d(e))!==f&&(e.length?location.hash="#/".concat(e):(history.replaceState({},document.title,location.search.length?location.search:"."),v()))}),[r,i.route,a,f]);return g||(p(!0),null===e||u()||(x(e),b(e))),[f,b]},d=n(83373),h=n(20214),g=n(56267),p=n(80822),m=n(14924),f=n(26042),x=n(45670),v=n(45511),b=n(55050),j=n(40044),Z=n(77058),y=n(90948),w=n(42274),C=(0,y.ZP)(j.Z)((function(e){var t,n=e.theme;return t={},(0,m.Z)(t,n.breakpoints.down("md"),{minWidth:100}),(0,m.Z)(t,n.breakpoints.down("sm"),{minWidth:67}),t})),k=(0,y.ZP)("span")((function(e){var t=e.theme;return(0,m.Z)({lineHeight:1.71,fontSize:"0.875rem",marginLeft:t.spacing(2.4)},t.breakpoints.down("md"),{display:"none"})})),I=function(e){var t=e.tabs,n=e.hash,r=e.setHash,i=e.sx,o=void 0===i?{}:i,s=e.tabsReady,l=void 0===s||s,c=e.hideSingleTab,u=void 0===c||c,d=(0,Z.$)().i18n,h={};return Object.keys(t).map((function(e){("undefined"===typeof t[e].visible||t[e].visible)&&(h[e]=t[e])})),null!==o&&"object"===typeof o||(o={}),(0,a.jsxs)(x.ZP,{value:n,children:[Object.keys(h).length<=1&&u?null:l?(0,a.jsx)(v.Z,{sx:{mb:6,pl:3},onChange:function(e,t){return r(t)},"aria-label":"Tabs",children:Object.keys(h).map((function(e,t){return(0,a.jsx)(C,{value:e,label:(0,a.jsxs)(p.Z,{sx:{display:"flex",alignItems:"center",px:2},children:[h[e].icon,(0,a.jsx)(k,{children:d.t(h[e].label)})]})},t)}))}):(0,a.jsx)(p.Z,{sx:{mb:6,height:"48px",width:{xs:"100%",md:"50%"}},children:(0,a.jsx)(w.Z,{count:1,columns:3})}),(0,a.jsx)(p.Z,{sx:(0,f.Z)({},o),children:Object.keys(h).map((function(e,t){return(0,a.jsx)(b.Z,{value:e,sx:{p:0},children:n===e?h[e].content:null},t)}))})]})},S=n(87066),N=n(65582),U=(0,y.ZP)(N.Z)((function(e){var t=e.theme;return(0,m.Z)({marginLeft:"auto",marginRight:"auto",marginTop:t.spacing(10)},t.breakpoints.up("lg"),{maxWidth:1200})})),_=n(74231),P=n(32342),R=n(47533),E=n(87536),O=n(86501),T=n(2734),D=n(58951),W=n(56815),z=n(6514),A=n(31425),L=n(44267),M=n(37645),F=n(93946),q=n(15861),$=n(78445),H=n(50135),X=n(23599),B=n(1292),J=n(50657),V=n(69417),K=n(86886),Q=n(66242),Y=n(63375),G=n(20835),ee=n(3690),te=n(67570),ne=n(46160),re=n(68832),ie=n(69396),oe=n(32512),ae=n(69661),se=n(96544),le=(0,y.ZP)("img")((function(){return{width:200,height:200}})),ce=function(e){var t=e.uploadPath,n=e.getSrc,i=e.onChange,l=e.crop,c=void 0===l?"fit":l,u=e.backgroundColor,d=void 0===u?null:u,m=e.borderColor,x=void 0===m?null:m,v=e.borderWidth,b=void 0===v?null:v,j=e.radius,y=void 0===j?5:j,C=e.alt,k=void 0===C?"Logo":C,I=e.inputName,N=void 0===I?"logo":I,U=e.label,_=void 0===U?"Select logo":U,P=e.active,R=void 0!==P&&P,E=e.width,D=void 0===E?256:E,W=e.height,z=void 0===W?256:W;"function"!==typeof n&&(n=function(){return"/img/logo/192.png"});var A=(0,h.a)(),L=(0,T.Z)(),M=(0,s.useState)(n()),F=M[0],$=M[1],H=(0,s.useState)(!1),X=H[0],B=H[1],J=(0,Z.$)().i18n,V=null!==x&&null!==b?"solid":null,K=(0,oe.uI)({multiple:!1,accept:{"image/png":[".png"],"image/jpg":[".jpg",".jpeg"],"image/webp":[".webp"]},onDrop:function(e){var n=document.createElement("img");n.onload=function(){B(!0),setTimeout((function(){var e=n.width,a=n.height,s=0,l=0;if(e>a)if("fill"===c)a=z,e*=z/n.height,s=parseInt((D-e)/2,10);else e=D,a*=D/n.width,l=parseInt((z-a)/2,10);else if("fill"===c)e=D,a*=D/n.width,l=parseInt((z-a)/2,10);else a=z,e*=z/n.height,s=parseInt((D-e)/2,10);var u=document.createElement("canvas");u.width=D,u.height=z,u.getContext("2d").drawImage(n,s,l,e,a),u.toBlob((function(e){var n=new FormData;n.append(N,e),(0,r.Z)((function(){var r,a;return(0,o.__generator)(this,(function(o){switch(o.label){case 0:return o.trys.push([0,3,,4]),[4,S.Z.post(t,n,{headers:{"Content-Type":"multipart/form-data"}})];case 1:return r=o.sent(),"function"===typeof i&&i(r.data,URL.createObjectURL(e)),[4,S.Z.get("account")];case 2:return a=o.sent(),$(URL.createObjectURL(e)),B(!1),A.setUser(a.data),[3,4];case 3:return o.sent(),B(!1),[3,4];case 4:return[2]}}))}))()}),"png"),u.remove(),n.remove()}),g.Z.delay.request)},n.onerror=function(){O.Am.error(J.t("The selected file is not a valid image"))},n.src=URL.createObjectURL(Object.assign(e[0]))},validator:function(){}}),Q=K.getRootProps,Y=K.getInputProps;return(0,a.jsx)(p.Z,{children:X?(0,a.jsx)(p.Z,{sx:{width:"100%",display:"flex",alignItems:"center",flexDirection:"column"},children:(0,a.jsx)(w.Z,{count:1,spacing:0,rounded:!0,sx:{mt:4,mb:12,width:200,height:200}})}):R?(0,a.jsxs)(p.Z,(0,ie.Z)((0,f.Z)({},Q({className:"dropzone"})),{sx:{position:"relative",alignItems:"center",justifyContent:"center",display:"flex",flexDirection:"column"},children:[(0,a.jsx)("input",(0,f.Z)({},Y())),(0,a.jsx)(le,{src:F,alt:"logo",sx:{m:0,pointerEvents:"none",borderRadius:y,backgroundColor:d,borderStyle:V,borderWidth:b,borderColor:x}}),(0,a.jsxs)(p.Z,{sx:{cursor:"pointer",position:"absolute",width:"70%",height:"70%",background:"dark"===L.palette.mode?"rgba(0,0,0,0.6)":"rgba(255,255,255,0.6)",borderRadius:"50%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center","&:hover > p":{display:"none"},"&:hover > svg":{transform:"scale(2)"}},children:[(0,a.jsx)(se.Z,{}),(0,a.jsx)(q.Z,{size:"large",color:"inherit",sx:{mt:2,textAlign:"center"},children:_})]})]})):(0,a.jsx)(ae.Z,{src:F,sx:{m:0,pointerEvents:"none",width:200,height:200,borderRadius:y,backgroundColor:d,borderStyle:V,borderWidth:b,borderColor:x},alt:k})})},ue=n(55630),de=n(57063),he=function(e){var t,n=e.userId,i=e.profileData,c=e.profileDataReady,u=(0,l.r)().settings,m=(0,Z.$)().i18n,f=(0,h.a)(),x=(0,d.W)(),v=(0,T.Z)(),b=(0,s.useState)(null),j=b[0],C=b[1],k=(0,s.useState)(null),I=k[0],N=k[1],U=(0,s.useState)(!0),ie=U[0],oe=U[1],ae=(0,s.useState)(!1),se=ae[0],le=ae[1],he=(0,s.useState)(!1),ge=he[0],pe=he[1],me=(0,s.useState)(!1),fe=me[0],xe=me[1],ve=(0,s.useState)(!0),be=ve[0],je=ve[1],Ze=(0,s.useState)(null),ye=Ze[0],we=Ze[1],Ce=(0,E.cI)({defaultValues:{userName:null!==(t=null===i||void 0===i?void 0:i.userName)&&void 0!==t?t:m.t("User Name")},mode:"onChange",resolver:(0,R.X)(_.Ry().shape({userName:_.Z_().min(3,(function(){return m.t("Must be at least {{n}} characters long",{n:3})})).max(64,(function(){return m.t("Must be at most {{n}} characters long",{n:64})})).required()}))}),ke=Ce.control,Ie=Ce.setValue,Se=Ce.handleSubmit,Ne=Ce.formState.errors,Ue=(0,y.ZP)(p.Z)((function(){return{display:"flex",position:"absolute",justifyContent:"flex-end",alignItems:"end",top:0,left:0,width:"100%",height:200,zIndex:0,opacity:1,background:ye,animation:null!==ye&&be?"header-opacity 1s forwards linear":"none","@keyframes header-opacity":{"0%":{opacity:0},"100%":{opacity:1}}}}));(0,s.useEffect)((function(){x.getUserId()!==n&&le(!1),Ie("userName",null===i||void 0===i?void 0:i.userName);var e=setTimeout((0,r.Z)((function(){var e;return(0,o.__generator)(this,(function(t){return we(null!==(e=v.palette.customColors.userColors.gradient[null===i||void 0===i?void 0:i.userColor])&&void 0!==e?e:v.palette.background.default),be&&window.setTimeout((function(){return je(!1)}),1e3),[2]}))})),g.Z.delay.request);return function(){return clearTimeout(e)}}),[u,i]),(0,s.useEffect)((function(){var e;we(null!==(e=v.palette.customColors.userColors.gradient[null===i||void 0===i?void 0:i.userColor])&&void 0!==e?e:v.palette.background.default)}),[u.mode]);var _e,Pe=function(){var e=(0,r.Z)((function(e){var t,r;return(0,o.__generator)(this,(function(i){switch(i.label){case 0:if(x.getUserId()!==n||!ie)return[3,5];oe(!1),i.label=1;case 1:return i.trys.push([1,3,,4]),O.Am.loading(m.t("Working..."),{duration:1e3}),[4,S.Z.post("account",e)];case 2:return"string"===typeof(null===(r=i.sent())||void 0===r||null===(t=r.data)||void 0===t?void 0:t.userName)&&(Ie("userName",r.data.userName),f.setUser(r.data)),[3,4];case 3:return i.sent(),[3,4];case 4:oe(!0),le(!1),i.label=5;case 5:return[2]}}))}));return function(t){return e.apply(this,arguments)}}(),Re=function(){var e=(0,r.Z)((function(e){var t,r;return(0,o.__generator)(this,(function(i){switch(i.label){case 0:if(x.getUserId()!==n||!ie)return[3,5];oe(!1),i.label=1;case 1:return i.trys.push([1,3,,4]),O.Am.loading(m.t("Working..."),{duration:1e3}),[4,S.Z.post("account",{userColor:e})];case 2:return"string"===typeof(null===(r=i.sent())||void 0===r||null===(t=r.data)||void 0===t?void 0:t.userName)&&(Ie("userName",r.data.userName),f.setUser(r.data)),[3,4];case 3:return i.sent(),[3,4];case 4:oe(!0),i.label=5;case 5:return[2]}}))}));return function(t){return e.apply(this,arguments)}}(),Ee=function(e){x.getUserId()===n&&xe(i.userName===e.target.value)},Oe=function(){var e=(0,r.Z)((function(){return(0,o.__generator)(this,(function(e){switch(e.label){case 0:if(!fe)return[3,4];if(xe(!1),x.getUserId()!==n)return[3,4];pe(!1),e.label=1;case 1:return e.trys.push([1,3,,4]),O.Am.loading(m.t("Working..."),{duration:1e3}),[4,S.Z.delete("account")];case 2:return e.sent(),f.logout(),[3,4];case 3:return e.sent(),[3,4];case 4:return[2]}}))}));return function(){return e.apply(this,arguments)}}();return(0,a.jsx)(K.ZP,{container:!0,spacing:6,children:(0,a.jsx)(K.ZP,{item:!0,xs:12,children:(0,a.jsxs)(Q.Z,{sx:{position:"relative"},children:[(0,a.jsxs)(Ue,{children:[(0,a.jsx)(p.Z,{sx:{width:"100%",height:"100%",position:"absolute",background:"url(/img/pages/circles-profile-".concat(v.palette.mode,".svg)"),backgroundPosition:{xs:"50% -600px",md:"-680px -600px"},backgroundSize:"auto",backgroundRepeat:"no-repeat",zIndex:1}}),x.getUserId()===n&&c&&se&&ie?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(F.Z,{"aria-label":m.t("Edit"),size:"large",sx:{zIndex:10,m:4,background:"light"===v.palette.mode?"rgba(255,255,255,0.6)":"rgba(0,0,0,0.6)","&:hover":{background:"light"===v.palette.mode?"rgba(255,255,255,0.8)":"rgba(0,0,0,0.8)"}},onClick:function(){N((function(){return document.querySelector("#color-picker-anchor")}))},children:(0,a.jsx)(ue.Z,{})}),(0,a.jsx)(Y.Z,{keepMounted:!0,anchorEl:I,open:!!I,onClose:function(){N(null)},anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},PaperProps:{style:{minWidth:20}},children:Object.keys(v.palette.customColors.userColors.solid).map((function(e){return(0,a.jsx)(X.Z,{selected:(null===i||void 0===i?void 0:i.userColor)==e,onClick:function(){N(null),Re(e)},children:(0,a.jsx)(p.Z,{sx:{width:20,height:20,borderRadius:"50%",background:v.palette.customColors.userColors.solid[e]}})},"user-color-".concat(e))}))})]}):null]}),(0,a.jsx)($.Z,{sx:{zIndex:10,position:"relative"},action:x.getUserId()!==n?(0,a.jsx)(p.Z,{sx:{width:40,height:40}}):(0,a.jsxs)(p.Z,{children:[c&&se?(0,a.jsx)(V.Z,{color:"warning",variant:"contained",sx:{mr:3},startIcon:(0,a.jsx)(G.Z,{}),onClick:function(){C(null),Ie("userName",i.userName),le(!1)},children:m.t("Exit edit mode")}):null,c?(0,a.jsx)(F.Z,{"aria-label":m.t("Options"),sx:{background:"light"===v.palette.mode?"rgba(255,255,255,0.6)":"rgba(0,0,0,0.6)","&:hover":{background:"light"===v.palette.mode?"rgba(255,255,255,0.8)":"rgba(0,0,0,0.8)"}},id:"color-picker-anchor",onClick:function(e){C(e.currentTarget)},children:(0,a.jsx)(ne.Z,{})}):(0,a.jsx)(w.Z,{count:1,spacing:0,rounded:!0,sx:{width:40,height:40}}),(0,a.jsx)(Y.Z,{keepMounted:!0,anchorEl:j,open:!!j,onClose:function(){C(null)},anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},PaperProps:{style:{minWidth:"8rem"}},children:x.getUserId()!==n||se?null:(0,a.jsxs)(X.Z,{onClick:function(){C(null),le(!0)},children:[(0,a.jsx)(ee.Z,{}),(0,a.jsx)(q.Z,{sx:{ml:4},children:m.t("Edit")})]})})]})}),(0,a.jsx)(L.Z,{sx:{zIndex:10},children:c?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("form",{onSubmit:Se(Pe),autoComplete:"off",children:(0,a.jsx)(K.ZP,{container:!0,spacing:7,sx:{justifyContent:"left"},children:(0,a.jsx)(K.ZP,{item:!0,xs:12,sx:{my:3,display:"flex"},children:(0,a.jsxs)(p.Z,{sx:{display:"flex",width:"100%",alignItems:{xs:"center",md:"flex-end"},flexDirection:{xs:"column",md:"row"}},children:[(0,a.jsx)(ce,{crop:"fill",borderWidth:10,borderColor:v.palette.background.paper,backgroundColor:v.palette.background.paper,inputName:"avatar",uploadPath:"account/avatar",active:se,label:m.t("Select avatar"),radius:"50%",alt:null!==(_e=null===i||void 0===i?void 0:i.userName)&&void 0!==_e?_e:m.t("User Name"),getSrc:function(){var e,t=(new Date).toJSON().slice(0,10),n="".concat(P.Z.s3Url,"/users/").concat(null===i||void 0===i?void 0:i.id,"/?cb=").concat(t);return(null===(e=f.user)||void 0===e?void 0:e.id)==(null===i||void 0===i?void 0:i.id)&&(n="string"===typeof(null===i||void 0===i?void 0:i.userAvatarId)?"".concat(P.Z.s3Url,"/users/").concat(i.id,"/").concat(i.userAvatarId,".png"):"/img/placeholder/user.png"),n}}),(0,a.jsx)(p.Z,{sx:{ml:{xs:0,md:6}},children:se?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(p.Z,{sx:{width:"100%",display:"flex"},children:[(0,a.jsx)(E.Qr,{name:"userName",control:ke,rules:{required:!0},render:function(e){var t=e.field,n=t.value,r=t.onChange;return(0,a.jsx)(H.Z,{sx:{mb:-3,textAlign:"center"},fullWidth:!0,required:!0,spellCheck:!1,autoComplete:"off",autoFocus:!0,disabled:!ie,value:n,label:m.t("User Name"),onChange:r,placeholder:"John Doe"})}}),(0,a.jsx)(V.Z,{variant:"outlined",sx:{mb:-3,ml:3},type:"submit",disabled:!ie,children:(0,a.jsx)(te.Z,{fontSize:"small"})})]}),Ne.userName&&(0,a.jsx)(W.Z,{sx:{color:"error.main",position:"absolute",bottom:5},children:Ne.userName.message})]}):(0,a.jsx)(p.Z,{sx:{display:"flex",alignItems:"center"},children:(0,a.jsx)(B.Z,{title:(null===i||void 0===i?void 0:i.createdAt)?"".concat(m.t("Member since")," ").concat((0,de.p)(i.createdAt,u.lang,{month:"long",day:"numeric",year:"numeric",hour:"numeric",minute:"numeric"})):null,children:(0,a.jsxs)(p.Z,{sx:{display:"flex",alignItems:"start",flexDirection:"column"},children:[(0,a.jsxs)(p.Z,{sx:{display:"flex",alignItems:"center"},children:[(null===i||void 0===i?void 0:i.closedTime)>0?(0,a.jsx)(B.Z,{title:m.t("Closed Account"),children:(0,a.jsx)(re.Z,{sx:{mr:3}})}):null,(0,a.jsx)(q.Z,{variant:"h6",children:i.userName})]}),(0,a.jsx)(q.Z,{variant:"caption",children:null===i||void 0===i?void 0:i.userEmail})]})})})})]})})})}),ge?(0,a.jsxs)(J.Z,{open:!0,onClose:function(){pe(!1)},children:[(0,a.jsx)(M.Z,{children:m.t("Close Account")}),(0,a.jsxs)(z.Z,{children:[(0,a.jsx)(D.Z,{sx:{mb:3},children:m.t("You can revert this action by signing in within the next 14 days. To confirm closing your account, please type the account name below")}),(0,a.jsx)(H.Z,{id:"name",autoFocus:!0,fullWidth:!0,spellCheck:!1,autoComplete:"off",required:!0,type:"text",color:fe?"primary":"error",label:m.t("User Name"),onChange:Ee,onKeyUp:Ee})]}),(0,a.jsx)(A.Z,{children:(0,a.jsx)(V.Z,{color:"error",onClick:Oe,disabled:!fe,children:m.t("Close Account")})})]}):null]}):(0,a.jsx)(K.ZP,{container:!0,spacing:7,sx:{justifyContent:"left"},children:(0,a.jsx)(K.ZP,{item:!0,xs:12,sx:{mb:3,mt:3,display:"flex"},children:(0,a.jsxs)(p.Z,{sx:{display:"flex",width:"100%",alignItems:{xs:"center",md:"flex-end"},flexDirection:{xs:"column",md:"row"}},children:[(0,a.jsx)(w.Z,{count:1,spacing:0,rounded:!0,sx:{width:200,height:200}}),(0,a.jsx)(p.Z,{sx:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",my:3,ml:{xs:0,md:6},width:{xs:"90%",md:"30%"}},children:(0,a.jsx)(w.Z,{count:1,justify:"start",sx:{mt:{xs:0,md:-15},mb:{xs:3,md:0},ml:{xs:0,md:-10},height:20,width:"100%"}})})]})})})})]})})})},ge=n(79155),pe=function(e){var t=e.i18n,n=(0,l.r)().settings,m=(0,d.W)(),f=(0,h.a)(),x=(0,c.useRouter)(),v=(0,s.useState)(!1),b=v[0],j=v[1],Z=(0,s.useState)(!1),y=Z[0],w=Z[1],C=(0,i.Z)(u(m.getUserId(),null,"user-id"),1)[0],k={"":{label:"My profile",icon:(0,a.jsx)(ge.Z,{}),content:(0,a.jsx)(he,{userId:C,profileData:b,profileDataReady:y})}};(0,s.useEffect)((function(){w(!1);var e=setTimeout((0,r.Z)((function(){var e;return(0,o.__generator)(this,(function(t){switch(t.label){case 0:return m.getUserId()!==C?[3,1]:(j(m.getUserData()),[3,4]);case 1:return t.trys.push([1,3,,4]),[4,S.Z.get("users/".concat(C))];case 2:return e=t.sent(),j(e.data),[3,4];case 3:return t.sent(),j(null),[3,4];case 4:return w(!0),[2]}}))})),g.Z.delay.request);return function(){return clearTimeout(e)}}),[n,f,x.route,C]);var N=(0,i.Z)(u("",k,"tab"),2),_=N[0],P=N[1];return(0,a.jsx)(U,{children:null===b?(0,a.jsx)(p.Z,{sx:{position:"relative",borderRadius:10,overflow:"hidden"},children:t.t("User not found")}):(0,a.jsx)(I,{tabs:k,hash:_,setHash:P})})};pe.getTitle=function(){return"Profile"};var me=pe}},function(e){e.O(0,[149,504,774,888,179],(function(){return t=31969,e(e.s=t);var t}));var t=e.O();_N_E=t}]);