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
var oe=Object.defineProperty;var C=n=>{throw TypeError(n)};var ne=(n,t,e)=>t in n?oe(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var f=(n,t)=>()=>(t||n((t={exports:{}}).exports,t),t.exports);var i=(n,t,e)=>ne(n,typeof t!="symbol"?t+"":t,e),E=(n,t,e)=>t.has(n)||C("Cannot "+e);var l=(n,t,e)=>(E(n,t,"read from private field"),e?e.call(n):t.get(n)),_=(n,t,e)=>t.has(n)?C("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(n):t.set(n,e),T=(n,t,e,s)=>(E(n,t,"write to private field"),s?s.call(n,e):t.set(n,e),e);var S=f((xe,F)=>{var{ipcRenderer:le}=require("electron"),P,O;F.exports=(O=class{constructor(){_(this,P,{})}_register(t){if(typeof t=="string")for(let e of Object.getOwnPropertyNames(this))["_","#"].includes(e[0])||typeof this[e]!="function"||(l(this,P)[e]="ipc:".concat(t,":").concat(e))}_runner(t,...e){let s=function(r,o,a){this.run=async function(){let c=null;if(typeof l(r,P)[o]=="string"&&(c=await le.invoke(l(r,P)[o],...a)),c instanceof Error)throw new Error("IPC/".concat(l(r,P)[o]," ").concat(c));return c}};return new s(this,t,e)}async _promise(t,...e){return await this._runner(t,...e).run()}},P=new WeakMap,O)});var R=f((Ce,W)=>{var ae=S();W.exports=class extends ae{constructor(){super();i(this,"purge",e=>this._promise("purge",e));i(this,"runInit",(e,s=null,r=null,o=null)=>this._promise("runInit",e,s,r,o));i(this,"runDelete",(e,s)=>this._promise("runDelete",e,s));i(this,"sourceGet",(e,s=!0)=>this._promise("sourceGet",e,s));i(this,"sourceSet",(e,s)=>this._promise("sourceSet",e,s));i(this,"inputsGet",(e,s=null)=>this._promise("inputsGet",e,s));i(this,"inputScalarsSet",(e,s)=>this._promise("inputScalarsSet",e,s));i(this,"inputFilesAdd",(e,s,r)=>this._promise("inputFilesAdd",e,s,r));i(this,"inputFilesDelete",(e,s,r)=>this._promise("inputFilesDelete",e,s,r));i(this,"inputTableQuery",(e,s,r=1,o=5e3)=>this._promise("inputTableQuery",e,s,r,o));i(this,"inputTableAdd",(e,s,r=[])=>this._promise("inputTableAdd",e,s,r));i(this,"inputTableGet",(e,s,r,o)=>this._promise("inputTableGet",e,s,r,o));i(this,"inputTableUpdate",(e,s,r,o)=>this._promise("inputTableUpdate",e,s,r,o));i(this,"inputTableDelete",(e,s,r=null)=>this._promise("inputTableDelete",e,s,r));i(this,"outputTableQuery",(e,s,r,o=1,a=5e3)=>this._promise("outputTableQuery",e,s,r,o,a));i(this,"outputTableAdd",(e,s,r,o)=>this._promise("outputTableAdd",e,s,r,o));i(this,"outputsGet",(e,s)=>this._promise("outputsGet",e,s));i(this,"outputsQuery",(e,s,r=null,o=null,a=null)=>this._promise("outputsQuery",e,s,r,o,a));i(this,"outputScalarSet",async(e,s,r,o)=>this._promise("outputScalarSet",e,s,r,o));i(this,"outputFilesInit",async(e,s,r,o=null)=>this._promise("outputFilesInit",e,s,r,o));i(this,"outputFilesAppend",async(e,s,r,o,a=null)=>this._promise("outputFilesAppend",e,s,r,o,a));i(this,"outputFilesDelete",async(e,s,r)=>this._promise("outputFilesDelete",e,s,r));this._register("diskStorage")}}});var G=f((Fe,M)=>{var ce=S();M.exports=class extends ce{constructor(){super();i(this,"getOS",()=>this._promise("getOS"));i(this,"getName",()=>this._promise("getName"));i(this,"getUUID",()=>this._promise("getUUID"));i(this,"getSerialNumber",()=>this._promise("getSerialNumber"));i(this,"setPostAuth",e=>this._promise("setPostAuth",!!e));i(this,"getPostAuth",()=>this._promise("getPostAuth"));i(this,"showFileInFolder",e=>this._promise("showFileInFolder",e));this._register("device")}}});var L=f((Me,U)=>{var ue=S();U.exports=class extends ue{constructor(){super();i(this,"list",()=>this._promise("list"));i(this,"closeAll",()=>this._promise("closeAll"));i(this,"open",e=>this._promise("open",e));i(this,"close",e=>this._promise("close",e));i(this,"webContents",(e,s,r)=>this._promise("webContents",e,s,r));this._register("source")}}});var j=f((Le,Q)=>{var pe=S();Q.exports=class extends pe{constructor(){super();i(this,"list",()=>this._promise("list"));i(this,"removeAll",()=>this._promise("removeAll"));i(this,"add",(e,s,r=!1)=>this._promise("add",e,s,r));i(this,"remove",e=>this._promise("remove",e));i(this,"select",e=>this._promise("select",e));i(this,"getSelected",()=>this._promise("getSelected"));i(this,"openDevTools",e=>this._promise("openDevTools",e));i(this,"webContents",(e,s,r)=>this._promise("webContents",e,s,r));this._register("target")}}});var H=f((Be,B)=>{var he=S();B.exports=class extends he{constructor(){super();i(this,"openExternal",e=>this._promise("openExternal","".concat(e)));this._register("main/login")}}});var X=f((Xe,V)=>{var de=S(),ge=H();V.exports=class extends de{constructor(){super();i(this,"login",null);i(this,"setOnTop",e=>this._promise("setOnTop",!!e));i(this,"getOnTop",()=>this._promise("getOnTop"));i(this,"setDarkMode",e=>this._promise("setDarkMode",!!e));i(this,"getDarkMode",()=>this._promise("getDarkMode"));i(this,"quit",()=>this._promise("quit"));i(this,"openExternal",e=>this._promise("openExternal","".concat(e)));this._register("main"),this.login=new ge}}});var Y=f((Je,z)=>{var me=S();z.exports=class extends me{constructor(){super();i(this,"install",e=>this._promise("install",e));i(this,"getPort",()=>this._promise("getPort"));this._register("llm")}}});var A=f((Ze,J)=>{var y;J.exports=(y=class{static getSourceChannelName(t){return"".concat(y.WINDOW_SOURCE,"/").concat(t)}static getTargetChannelName(t){return"".concat(y.WINDOW_TARGET,"/").concat(t)}},i(y,"WINDOW_MAIN","@main"),i(y,"WINDOW_MAIN_LOGIN","@main/login"),i(y,"WINDOW_SOURCE","@source"),i(y,"WINDOW_TARGET","@target"),y)});var ee=f((st,Z)=>{var{ipcRenderer:D,contextBridge:fe}=require("electron"),_e=require("crypto"),ye=R(),we=G(),Ie=L(),$e=j(),Se=X(),be=Y(),q=A(),b,v,$,k,K;Z.exports=(K=class{constructor(t,e=!0){_(this,b,"");_(this,v,{});_(this,$,{});_(this,k,{});i(this,"source",{send:(t,e,s)=>{this.send(q.getSourceChannelName(t),e,s)},invoke:async(t,e,s,r=0)=>await this.invoke(q.getSourceChannelName(t),e,s,r)});i(this,"target",{send:(t,e,s)=>{this.send(q.getTargetChannelName(t),e,s)},invoke:async(t,e,s,r=0)=>await this.invoke(q.getTargetChannelName(t),e,s,r)});let s=this;T(this,b,t),T(this,k,{ibc:{handle:(...r)=>this.handle.call(this,...r),send:(...r)=>this.send.call(this,...r),invoke:async(...r)=>await this.invoke.call(this,...r),source:{send:(...r)=>this.source.send.call(this,...r),invoke:async(...r)=>await this.source.invoke.call(this,...r)},target:{send:(...r)=>this.target.send.call(this,...r),invoke:async(...r)=>await this.target.invoke.call(this,...r)},winName:l(this,b)},ipc:{diskStorage:new ye,device:new we,source:new Ie,target:new $e,main:new Se,llm:new be},devMode:!1}),D.on(l(this,b),(r,o)=>{if(o.length<3)return;let[a,c,g]=o,{type:u,fromWin:p,promiseId:h}=g??{};if(u==="req")(async()=>{let d=null;try{if(typeof a!="string"||typeof l(s,v)[a]!="function")throw new Error('Inter-Browser Communication: handle "'.concat(a,'" not declared yet'));Array.isArray(c)||(c=[]),d=await l(s,v)[a](...c)}catch(m){d=new Error("".concat("".concat(a,"()")," ").concat(m))}typeof p=="string"&&typeof h=="string"&&D.send(p,a,d,{type:"res",promiseId:h})})();else{let d=typeof h=="string"?"".concat(a,":").concat(h):null;if(d!==null){let m=l(s,$)[d]??null;m!==null&&(c instanceof Error?m.reject(c):m.resolve(c),delete l(s,$)[d])}}}),e&&fe.exposeInMainWorld("sdk",l(this,k))}getSdk(){return l(this,k)}handle(t,e){typeof t=="string"&&typeof e=="function"&&(l(this,v)[t]=e)}send(t,e,s){do{if(typeof t!="string"||typeof e!="string")break;Array.isArray(s)||(s=[]),D.send(t,e,s,{type:"req",fromWin:l(this,b)})}while(!1)}async invoke(t,e,s,r=0){let o=this;if(typeof t!="string"||typeof e!="string")return null;Array.isArray(s)||(s=[]);let a=parseInt(r,10);(isNaN(a)||a<0)&&(a=0);let c=(()=>{let u=Date.now().toString(36),p=_e.randomBytes(4).toString("hex");return"".concat(u).concat(p)})(),g=new Promise((u,p)=>{l(this,$)["".concat(e,":").concat(c)]={resolve:u,reject:p}});return a>0&&setTimeout(()=>{let u=typeof c=="string"?"".concat(e,":").concat(c):null;if(typeof l(o,$)[u]<"u"){try{l(o,$)[u].reject(new Error("".concat("".concat(e,"()")," Timed out")))}catch{}delete l(o,$)[u]}},a),D.send(t,e,s,{type:"req",fromWin:l(this,b),promiseId:c}),g}},b=new WeakMap,v=new WeakMap,$=new WeakMap,k=new WeakMap,K)});var re=f((ot,se)=>{var Pe=ee(),Te=A(),I,w,x,te;se.exports=(te=class{constructor(t){_(this,I);_(this,w);_(this,x,(t,e=0,s=[])=>{if(!(t instanceof Element))return null;if(t.id)return"#".concat(t.id);let r=[];for(;t;){let o=t.nodeName.toLowerCase();if(r.length===0&&Array.isArray(s)&&s.length)for(let g of s){let u=t.getAttribute(g);u&&(o+="[".concat(g,'="').concat(u,'"]'))}t.className&&(o+="."+t.className.trim().split(/\s+/).join("."));let a=t,c=1;for(;a.previousElementSibling;)a=a.previousElementSibling,c++;o+=":nth-child(".concat(c,")"),r.unshift(o),e>0&&t.className&&r.length>=e?t=null:t=t.parentElement}return r.join(" > ")});i(this,"navigate",t=>{l(this,w).ipc.target.webContents(l(this,I),"loadURL",[t])});i(this,"query",async(t,e=0,s=[],r=!1)=>[...document.querySelectorAll(t)].map(a=>{let{top:c,left:g,width:u,height:p}=a.getBoundingClientRect();return{selector:l(this,x).call(this,a,e,s),top:c,left:g,width:u,height:p,visible:c<0?c+p>0:c<window.innerHeight}}).filter(a=>r?a.top+a.height>=0:!0));i(this,"scrollTo",async(t,e=0)=>{let s=document.querySelector(t);if(s){let r=e-parseInt(s.getBoundingClientRect().top,10);await l(this,w).ipc.target.webContents(l(this,I),"sendInputEvent",[{type:"mouseWheel",x:10,y:15,deltaX:0,deltaY:r}])}});i(this,"chooseFiles",async(t,e)=>{let s=document.querySelector(t);if(s&&Array.isArray(e)){let r=new DataTransfer;for(let o of e)r.items.add(new File(["file://".concat(o)],o.replace(/^.*[\\\/]([^\\\/]+)$/gi,"$1"),{type:"application/octet-stream"}));s.files=r.files}});i(this,"saveUrl",async(t,e,s,r=600,o=5)=>{let a=new Date().getTime(),c=h=>{let d=null;try{let m=new URL(h).pathname.match(/\.([\w]+)$/i);m&&(d=m[1])}catch{}return d},{fileName:g,filePath:u,maxSize:p}=await l(this,w).ipc.diskStorage.outputFilesInit(l(this,I),t,e,c(s));try{let h=await fetch(s,{credentials:"include",redirect:"follow",priority:"high",signal:AbortSignal.any([AbortSignal.timeout(o*1e3)])});if(!h.ok)throw new Error('HTTP status for "'.concat(s,'": ').concat(h.status));let d=h.body.getReader();for(;;){let{done:m,value:N}=await d.read();if(typeof N<"u"){if(!await l(this,w).ipc.diskStorage.outputFilesAppend(l(this,I),t,g,Buffer.from(N),p))throw new Error('Could not save "'.concat(s,'"'));if((new Date().getTime()-a)/1e3>r)throw new Error('Download operation taking too long for "'.concat(s,'"'))}if(m)break}}catch(h){throw await l(this,w).ipc.diskStorage.outputFilesDelete(l(this,I),t,g),h}return u});i(this,"wheels",async t=>(await l(this,w).ipc.target.webContents(l(this,I),"sendInputEvent",[{type:"mouseWheel",x:10,y:15,deltaX:0,deltaY:t}]),"Wheels up!"));T(this,I,t),T(this,w,new Pe(Te.getTargetChannelName(t),!1).getSdk());for(let e of Object.getOwnPropertyNames(this))typeof this[e]=="function"&&l(this,w).ibc.handle(e,this[e])}},I=new WeakMap,w=new WeakMap,x=new WeakMap,te)});var ve=re(),ie=process.argv.filter(n=>n.indexOf("--agent-id=")>=0).shift();if(typeof ie=="string"){let n=ie.split("=")[1];n.length&&new ve(n)}
