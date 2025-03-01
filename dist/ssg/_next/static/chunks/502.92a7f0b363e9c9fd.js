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
"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[502],{3502:function(e,n,t){t.r(n);var i=t(85893),a=t(29656),r=(t(96876),t(71707),t(4631)),o=t.n(r),s=t(2734),l="$",c={args:{doc:"[i](array)[/i] Arguments passed by previous state"},prev:{doc:"[i](string)[/i] Previous state key"},sleep:{doc:"Pause execution of the current thread\n@param [i]{integer}[/i] [b]ms[/b] Sleep time in milliseconds",async:!0,args:{ms:null}},log:{doc:'Append a message to the Agent Logs\n@param [i]{string}[/i] [b]message[/b] Message\n@param [i]{"info"|"success"|"warning"|"error"}[/i] [b]status[/b] (optional) Status; default [i]"info"[/i]',async:!1,args:{message:null,status:'"info"'}},tick:{doc:'Increment a named counter in the Status bar. At most 5 counters can be displayed at a time.\n@param [i]{string}[/i] [b]name[/b] Counter name. The following strings are displayed as icons:\n"contact", "view", "like", "post", "repost", "comment",\n"upload", "download", "screenshot", "collect",\n"success", "warning"\n@param [i]{integer}[/i] [b]amount[/b] (optional) Strictly positive integer; [1,1000]; default [i]1[/i]',async:!1,args:{name:null,amount:"1"}},highlight:{doc:"Highlight an area in the Browser view for 1 second\n@param [i]{integer}[/i] [b]x[/b] X coordinate in pixels\n@param [i]{integer}[/i] [b]y[/b] Y coordinate in pixels\n@param [i]{integer}[/i] [b]width[/b] Rectangle width in pixels\n@param [i]{integer}[/i] [b]height[/b] Rectangle height in pixels",async:!1,args:{x:null,y:null,width:null,height:null}},ioSaveUrl:{doc:"IO: Save URL to file\n@param [i]{string}[/i] [b]key[/b] Output key\n@param [i]{string}[/i] [b]url[/b] URL of resource to save in the current run\n@param [i]{integer}[/i] [b]timeout[/b] Download timeout in seconds; default [i]600[/i]\n@param [i]{integer}[/i] [b]connectTimeout[/b] Connection timeout in seconds; default [i]5[/i]\n@return {string|null} Saved file path on disk",async:!0,args:{key:null,url:null,timeout:"600",connectTimeout:"5"}},domChooseFiles:{doc:'Set files to <input type="file" /> element\n@param [i]{string}[/i] [b]selector[/b] CSS Selector\n@param [i]{string[]}[/i] [b]filePaths[/b] Array of file paths\n@return {boolean} True on success, false on failure',async:!0,args:{selector:null,filePaths:null}}},u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,t=Object.keys(c),i=null!==n&&"keyword"===n.type?n.string.replace(/\W+/g,""):"",a="".concat(e).trim().toLowerCase();return a.length&&(t=t.filter((function(e){return-1!==e.toLowerCase().indexOf(a)}))),t.map((function(e){var n="object"===typeof c[e].args&&null!==c[e].args,r=n&&!!c[e].async,o=1===t.length,s=n&&Object.keys(c[e].args).length?Object.keys(c[e].args).filter((function(n){return"string"!==typeof c[e].args[n]})).join(", "):"",u=n&&o?" "+Object.keys(c[e].args).map((function(n){var t="string"===typeof c[e].args[n]?" = [i]".concat(c[e].args[n],"[/i]"):"";return"[b]".concat(n,"[/b]").concat(t)})).join(", ")+" ":"",g="".concat(r&&"await"!==i?"await ":""),d="".concat(l,".").concat(e).concat(n?"(".concat(s,")"):""),p=e.replace(new RegExp("(".concat(a,")"),"gi"),"<u>$1</u>"),m="".concat(o&&r?"async ":""),f="".concat(p).concat(n?"(".concat(u,")"):"");return{text:g+d,displayText:(o?"".concat(c[e].doc?"\ud83d\udcd6 "+c[e].doc:"","\n\n"):"")+m+f,className:n?"cm-hint-function":"cm-hint-variable",render:function(e,n,t){o&&e.classList.add("cm-focused"),e.innerHTML=t.displayText.replace(/\[u\](.*?)\[\/u\]/g,"<u>$1</u>").replace(/\[b\](.*?)\[\/b\]/g,"<b>$1</b>").replace(/\[i\](.*?)\[\/i\]/g,"<i>$1</i>")}}}))},g=function(e,n){n||(n=e.getCursor());for(var t=n.line,i=n.ch;i>0;){var a=e.getTokenAt({line:t,ch:i}),r=e.getTokenAt({line:t,ch:i-1});if(null!==r&&!r.string.match(RegExp("^\\s+$","gs"))&&r.start!==a.start)return{token:r,cursor:{line:t,ch:i-1}};i--}if(t>0){var o=t-1,s=e.getLine(o).length;return g(e,{line:o,ch:s})}return{token:null,cursor:null}};n.default=function(e){var n=e.defaultValue,t=e.onChange,r=e.maxLength,c=void 0===r?5e4:r,d=(0,s.Z)();return(0,i.jsx)(a.Rt,{options:{mode:"javascript",lineWrapping:!0,autofocus:!0,spellcheck:!1,autocorrect:!1,autocapitalize:!1,indentUnit:4,smartIndent:!0,electricChars:!1,theme:"light"===d.palette.mode?"default":"monokai",lineNumbers:!0},onBeforeChange:function(e,n,t,i){var a=e.getDoc(),r=n.text.join("\n"),o=a.indexFromPos({line:1/0,ch:0}),s=a.indexFromPos(n.to)-a.indexFromPos(n.from);if(o+r.length-s>c){var l=r.substring(0,c-(o-s));n.update(n.from,n.to,l.split("\n"))}else i()},onChange:function(e){return t(e.getValue())},editorDidMount:function(e){e.setValue("".concat(n).substring(0,c)),e.on("inputRead",(function(e,n){e.showHint({hint:function(e){var n,t=e.getCursor(),i=e.getTokenAt(t),a=[],r=null!==(n=null===i||void 0===i?void 0:i.start)&&void 0!==n?n:null;do{if(null===i)break;if("variable"===i.type&&l===i.string){a=[{text:l,displayText:"Oglama Tools"}];break}var s=g(e),c=s.token,d=s.cursor;if("variable"===(null===c||void 0===c?void 0:c.type)&&l===(null===c||void 0===c?void 0:c.string)&&"."===i.string){r=null===c||void 0===c?void 0:c.start,a=u("",g(e,d).token);break}if("property"===i.type&&"."===(null===c||void 0===c?void 0:c.string)){var p=g(e,d),m=p.token,f=p.cursor;"variable"===(null===m||void 0===m?void 0:m.type)&&l===(null===m||void 0===m?void 0:m.string)&&(r=m.start,a=u(i.string,g(e,f).token))}}while(0);return{list:a,from:o().Pos(t.line,r),to:o().Pos(t.line,t.ch)}},completeSingle:!1})}))}})}}}]);