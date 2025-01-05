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
var te = Object.defineProperty;
var T = n => {
    throw TypeError(n);
};
var re = (n, e, t) => (e in n ? te(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : (n[e] = t));
var f = (n, e) => () => (e || n((e = { exports: {} }).exports, e), e.exports);
var r = (n, e, t) => re(n, typeof e != "symbol" ? e + "" : e, t),
    O = (n, e, t) => e.has(n) || T("Cannot " + t);
var o = (n, e, t) => (O(n, e, "read from private field"), t ? t.call(n) : e.get(n)),
    d = (n, e, t) =>
        e.has(n) ? T("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t),
    P = (n, e, t, s) => (O(n, e, "write to private field"), s ? s.call(n, t) : e.set(n, t), t);
var b = f((ve, D) => {
    var { ipcRenderer: se } = require("electron"),
        I,
        A;
    D.exports =
        ((A = class {
            constructor() {
                d(this, I, {});
            }
            _register(e) {
                if (typeof e == "string")
                    for (let t of Object.getOwnPropertyNames(this))
                        ["_", "#"].includes(t[0]) ||
                            typeof this[t] != "function" ||
                            (o(this, I)[t] = "ipc:".concat(e, ":").concat(t));
            }
            _runner(e, ...t) {
                let s = function (i, l, a) {
                    this.run = async function () {
                        let c = null;
                        if ((typeof o(i, I)[l] == "string" && (c = await se.invoke(o(i, I)[l], ...a)), c instanceof Error))
                            throw new Error("IPC/".concat(o(i, I)[l], " ").concat(c));
                        return c;
                    };
                };
                return new s(this, e, t);
            }
            async _promise(e, ...t) {
                return await this._runner(e, ...t).run();
            }
        }),
        (I = new WeakMap()),
        A);
});
var W = f((be, M) => {
    var ie = b();
    M.exports = class extends ie {
        constructor() {
            super();
            r(this, "getOS", () => this._promise("getOS"));
            r(this, "getName", () => this._promise("getName"));
            r(this, "getUUID", () => this._promise("getUUID"));
            r(this, "getSerialNumber", () => this._promise("getSerialNumber"));
            r(this, "setPostAuth", t => this._promise("setPostAuth", !!t));
            r(this, "getPostAuth", () => this._promise("getPostAuth"));
            this._register("device");
        }
    };
});
var U = f((xe, R) => {
    var oe = b();
    R.exports = class extends oe {
        constructor() {
            super();
            r(this, "list", () => this._promise("list"));
            r(this, "closeAll", () => this._promise("closeAll"));
            r(this, "open", t => this._promise("open", t));
            r(this, "close", t => this._promise("close", t));
            r(this, "webContents", (t, s, i) => this._promise("webContents", t, s, i));
            this._register("source");
        }
    };
});
var L = f((ke, j) => {
    var ne = b();
    j.exports = class extends ne {
        constructor() {
            super();
            r(this, "list", () => this._promise("list"));
            r(this, "removeAll", () => this._promise("removeAll"));
            r(this, "add", (t, s, i = !1) => this._promise("add", t, s, i));
            r(this, "remove", t => this._promise("remove", t));
            r(this, "select", t => this._promise("select", t));
            r(this, "getSelected", () => this._promise("getSelected"));
            r(this, "openDevTools", t => this._promise("openDevTools", t));
            r(this, "webContents", (t, s, i) => this._promise("webContents", t, s, i));
            this._register("target");
        }
    };
});
var G = f((Oe, B) => {
    var ae = b();
    B.exports = class extends ae {
        constructor() {
            super();
            r(this, "openExternal", t => this._promise("openExternal", "".concat(t)));
            this._register("main/login");
        }
    };
});
var X = f((Me, H) => {
    var ce = b(),
        le = G();
    H.exports = class extends ce {
        constructor() {
            super();
            r(this, "login", null);
            r(this, "setOnTop", t => this._promise("setOnTop", !!t));
            r(this, "getOnTop", () => this._promise("getOnTop"));
            r(this, "setDarkMode", t => this._promise("setDarkMode", !!t));
            r(this, "getDarkMode", () => this._promise("getDarkMode"));
            r(this, "quit", () => this._promise("quit"));
            r(this, "openExternal", t => this._promise("openExternal", "".concat(t)));
            this._register("main"), (this.login = new le());
        }
    };
});
var E = f((Re, Q) => {
    var g;
    Q.exports =
        ((g = class {
            static getSourceChannelName(e) {
                return "".concat(g.WINDOW_SOURCE, "/").concat(e);
            }
            static getTargetChannelName(e) {
                return "".concat(g.WINDOW_TARGET, "/").concat(e);
            }
        }),
        r(g, "WINDOW_MAIN", "@main"),
        r(g, "WINDOW_MAIN_LOGIN", "@main/login"),
        r(g, "WINDOW_SOURCE", "@source"),
        r(g, "WINDOW_TARGET", "@target"),
        g);
});
var z = f((Le, Y) => {
    var { ipcRenderer: C, contextBridge: he } = require("electron"),
        pe = require("crypto"),
        ue = W(),
        de = U(),
        ge = L(),
        _e = X(),
        N = E(),
        _,
        q,
        m,
        v,
        V;
    Y.exports =
        ((V = class {
            constructor(e, t = !0) {
                d(this, _, "");
                d(this, q, {});
                d(this, m, {});
                d(this, v, {});
                r(this, "source", {
                    send: (e, t, s) => {
                        this.send(N.getSourceChannelName(e), t, s);
                    },
                    invoke: async (e, t, s, i = 0) => await this.invoke(N.getSourceChannelName(e), t, s, i)
                });
                r(this, "target", {
                    send: (e, t, s) => {
                        this.send(N.getTargetChannelName(e), t, s);
                    },
                    invoke: async (e, t, s, i = 0) => await this.invoke(N.getTargetChannelName(e), t, s, i)
                });
                let s = this;
                P(this, _, e),
                    P(this, v, {
                        ibc: {
                            handle: (...i) => this.handle.call(this, ...i),
                            send: (...i) => this.send.call(this, ...i),
                            invoke: async (...i) => await this.invoke.call(this, ...i),
                            source: {
                                send: (...i) => this.source.send.call(this, ...i),
                                invoke: async (...i) => await this.source.invoke.call(this, ...i)
                            },
                            target: {
                                send: (...i) => this.target.send.call(this, ...i),
                                invoke: async (...i) => await this.target.invoke.call(this, ...i)
                            },
                            winName: o(this, _)
                        },
                        ipc: { device: new ue(), source: new de(), target: new ge(), main: new _e() },
                        devMode: !1
                    }),
                    C.on(o(this, _), (i, l) => {
                        if (l.length < 3) return;
                        let [a, c, y] = l,
                            { type: h, fromWin: u, promiseId: x } = y ?? {};
                        if (h === "req")
                            (async () => {
                                let w = null;
                                try {
                                    if (typeof a != "string" || typeof o(s, q)[a] != "function")
                                        throw new Error("Inter-browser communication handle not declared");
                                    Array.isArray(c) || (c = []), (w = await o(s, q)[a](...c));
                                } catch (S) {
                                    let ee = "".concat(u, " >> ").concat(o(s, _), "/").concat(a, "()");
                                    (w = new Error("".concat(ee, " ").concat(S))),
                                        o(this, v).devMode && console.warn("".concat(w));
                                }
                                typeof u == "string" && typeof x == "string" && C.send(u, a, w, { type: "res", promiseId: x });
                            })();
                        else {
                            let w = typeof x == "string" ? "".concat(a, ":").concat(x) : null;
                            if (w !== null) {
                                let S = o(s, m)[w] ?? null;
                                S !== null && (c instanceof Error ? S.reject(c) : S.resolve(c), delete o(s, m)[w]);
                            }
                        }
                    }),
                    t && he.exposeInMainWorld("sdk", o(this, v));
            }
            getSdk() {
                return o(this, v);
            }
            handle(e, t) {
                typeof e == "string" && typeof t == "function" && (o(this, q)[e] = t);
            }
            send(e, t, s) {
                do {
                    if (typeof e != "string" || typeof t != "string") break;
                    Array.isArray(s) || (s = []), C.send(e, t, s, { type: "req", fromWin: o(this, _) });
                } while (!1);
            }
            async invoke(e, t, s, i = 0) {
                let l = this;
                if (typeof e != "string" || typeof t != "string") return null;
                Array.isArray(s) || (s = []);
                let a = parseInt(i, 10);
                (isNaN(a) || a < 0) && (a = 0);
                let c = (() => {
                        let h = Date.now().toString(36),
                            u = pe.randomBytes(4).toString("hex");
                        return "".concat(h).concat(u);
                    })(),
                    y = new Promise((h, u) => {
                        o(this, m)["".concat(t, ":").concat(c)] = { resolve: h, reject: u };
                    });
                return (
                    a > 0 &&
                        setTimeout(() => {
                            let h = typeof c == "string" ? "".concat(t, ":").concat(c) : null;
                            if (typeof o(l, m)[h] < "u") {
                                try {
                                    o(l, m)[h].reject(
                                        new Error("".concat(o(l, _), " >> ").concat(e, "/").concat(t, "() Timed out"))
                                    );
                                } catch {}
                                delete o(l, m)[h];
                            }
                        }, a),
                    C.send(e, t, s, { type: "req", fromWin: o(this, _), promiseId: c }),
                    y
                );
            }
        }),
        (_ = new WeakMap()),
        (q = new WeakMap()),
        (m = new WeakMap()),
        (v = new WeakMap()),
        V);
});
var K = f((He, J) => {
    var fe = z(),
        me = E(),
        $,
        p,
        k,
        F;
    J.exports =
        ((F = class {
            constructor(e) {
                d(this, $);
                d(this, p);
                d(this, k, (e, t = 0, s = []) => {
                    if (!(e instanceof Element)) return null;
                    if (e.id) return "#".concat(e.id);
                    let i = [];
                    for (; e; ) {
                        let l = e.nodeName.toLowerCase();
                        if (i.length === 0 && Array.isArray(s) && s.length)
                            for (let y of s) {
                                let h = e.getAttribute(y);
                                h && (l += "[".concat(y, '="').concat(h, '"]'));
                            }
                        e.className && (l += "." + e.className.trim().split(/\s+/).join("."));
                        let a = e,
                            c = 1;
                        for (; a.previousElementSibling; ) (a = a.previousElementSibling), c++;
                        (l += ":nth-child(".concat(c, ")")),
                            i.unshift(l),
                            t > 0 && e.className && i.length >= t ? (e = null) : (e = e.parentElement);
                    }
                    return i.join(" > ");
                });
                r(this, "navigate", e => {
                    o(this, p).ipc.target.webContents(o(this, $), "loadURL", [e]);
                });
                r(this, "query", async (e, t = 0, s = [], i = !1) => {
                    o(this, p).devMode &&
                        console.log(
                            "%c \u{1F50D} Query Selector (classDepth: "
                                .concat(t, ", fromScreenView: ")
                                .concat(i ? "true" : "false", ")  css=")
                                .concat(e),
                            "color:lightblue"
                        );
                    let l = [...document.querySelectorAll(e)]
                        .map(a => {
                            let { top: c, left: y, width: h, height: u } = a.getBoundingClientRect();
                            return {
                                selector: o(this, k).call(this, a, t, s),
                                top: c,
                                left: y,
                                width: h,
                                height: u,
                                visible: c < 0 ? c + u > 0 : c < window.innerHeight
                            };
                        })
                        .filter(a => (i ? a.top + a.height >= 0 : !0));
                    return o(this, p).devMode && console.log(l), l;
                });
                r(this, "scrollTo", async (e, t = 0) => {
                    o(this, p).devMode &&
                        console.log("%c \u{1F5B1}\uFE0F Scrolling to +".concat(t, "px of css=").concat(e), "color:lightblue");
                    let s = document.querySelector(e);
                    if ((o(this, p).devMode && console.log(s), s)) {
                        let i = t - parseInt(s.getBoundingClientRect().top, 10);
                        await o(this, p).ipc.target.webContents(o(this, $), "sendInputEvent", [
                            { type: "mouseWheel", x: 10, y: 15, deltaX: 0, deltaY: i }
                        ]);
                    }
                });
                r(
                    this,
                    "wheels",
                    async e => (
                        await o(this, p).ipc.target.webContents(o(this, $), "sendInputEvent", [
                            { type: "mouseWheel", x: 10, y: 15, deltaX: 0, deltaY: e }
                        ]),
                        "Wheels up!"
                    )
                );
                P(this, $, e), P(this, p, new fe(me.getTargetChannelName(e), !1).getSdk());
                for (let t of Object.getOwnPropertyNames(this)) typeof this[t] == "function" && o(this, p).ibc.handle(t, this[t]);
            }
        }),
        ($ = new WeakMap()),
        (p = new WeakMap()),
        (k = new WeakMap()),
        F);
});
var ye = K(),
    Z = process.argv.filter(n => n.indexOf("--agent-id=") >= 0).shift();
if (typeof Z == "string") {
    let n = Z.split("=")[1];
    n.length && new ye(n);
}
