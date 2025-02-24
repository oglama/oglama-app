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
var se = Object.defineProperty;
var T = o => {
    throw TypeError(o);
};
var ie = (o, t, e) => (t in o ? se(o, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : (o[t] = e));
var _ = (o, t) => () => (t || o((t = { exports: {} }).exports, t), t.exports);
var r = (o, t, e) => ie(o, typeof t != "symbol" ? t + "" : t, e),
    O = (o, t, e) => t.has(o) || T("Cannot " + e);
var n = (o, t, e) => (O(o, t, "read from private field"), e ? e.call(o) : t.get(o)),
    d = (o, t, e) =>
        t.has(o) ? T("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(o) : t.set(o, e),
    S = (o, t, e, s) => (O(o, t, "write to private field"), s ? s.call(o, e) : t.set(o, e), e);
var v = _((be, A) => {
    var { ipcRenderer: oe } = require("electron"),
        I,
        D;
    A.exports =
        ((D = class {
            constructor() {
                d(this, I, {});
            }
            _register(t) {
                if (typeof t == "string")
                    for (let e of Object.getOwnPropertyNames(this))
                        ["_", "#"].includes(e[0]) ||
                            typeof this[e] != "function" ||
                            (n(this, I)[e] = "ipc:".concat(t, ":").concat(e));
            }
            _runner(t, ...e) {
                let s = function (i, l, c) {
                    this.run = async function () {
                        let a = null;
                        if ((typeof n(i, I)[l] == "string" && (a = await oe.invoke(n(i, I)[l], ...c)), a instanceof Error))
                            throw new Error("IPC/".concat(n(i, I)[l], " ").concat(a));
                        return a;
                    };
                };
                return new s(this, t, e);
            }
            async _promise(t, ...e) {
                return await this._runner(t, ...e).run();
            }
        }),
        (I = new WeakMap()),
        D);
});
var W = _((xe, M) => {
    var ne = v();
    M.exports = class extends ne {
        constructor() {
            super();
            r(this, "purge", e => this._promise("purge", e));
            r(this, "sourceGet", e => this._promise("sourceGet", e));
            r(this, "sourceSet", (e, s) => this._promise("sourceSet", e, s));
            this._register("diskStorage");
        }
    };
});
var U = _((Ee, R) => {
    var ce = v();
    R.exports = class extends ce {
        constructor() {
            super();
            r(this, "getOS", () => this._promise("getOS"));
            r(this, "getName", () => this._promise("getName"));
            r(this, "getUUID", () => this._promise("getUUID"));
            r(this, "getSerialNumber", () => this._promise("getSerialNumber"));
            r(this, "setPostAuth", e => this._promise("setPostAuth", !!e));
            r(this, "getPostAuth", () => this._promise("getPostAuth"));
            this._register("device");
        }
    };
});
var G = _((De, j) => {
    var ae = v();
    j.exports = class extends ae {
        constructor() {
            super();
            r(this, "list", () => this._promise("list"));
            r(this, "closeAll", () => this._promise("closeAll"));
            r(this, "open", e => this._promise("open", e));
            r(this, "close", e => this._promise("close", e));
            r(this, "webContents", (e, s, i) => this._promise("webContents", e, s, i));
            this._register("source");
        }
    };
});
var B = _((We, L) => {
    var le = v();
    L.exports = class extends le {
        constructor() {
            super();
            r(this, "list", () => this._promise("list"));
            r(this, "removeAll", () => this._promise("removeAll"));
            r(this, "add", (e, s, i = !1) => this._promise("add", e, s, i));
            r(this, "remove", e => this._promise("remove", e));
            r(this, "select", e => this._promise("select", e));
            r(this, "getSelected", () => this._promise("getSelected"));
            r(this, "openDevTools", e => this._promise("openDevTools", e));
            r(this, "webContents", (e, s, i) => this._promise("webContents", e, s, i));
            this._register("target");
        }
    };
});
var X = _((je, H) => {
    var pe = v();
    H.exports = class extends pe {
        constructor() {
            super();
            r(this, "openExternal", e => this._promise("openExternal", "".concat(e)));
            this._register("main/login");
        }
    };
});
var V = _((Be, Q) => {
    var he = v(),
        ue = X();
    Q.exports = class extends he {
        constructor() {
            super();
            r(this, "login", null);
            r(this, "setOnTop", e => this._promise("setOnTop", !!e));
            r(this, "getOnTop", () => this._promise("getOnTop"));
            r(this, "setDarkMode", e => this._promise("setDarkMode", !!e));
            r(this, "getDarkMode", () => this._promise("getDarkMode"));
            r(this, "quit", () => this._promise("quit"));
            r(this, "openExternal", e => this._promise("openExternal", "".concat(e)));
            this._register("main"), (this.login = new ue());
        }
    };
});
var E = _((Xe, Y) => {
    var g;
    Y.exports =
        ((g = class {
            static getSourceChannelName(t) {
                return "".concat(g.WINDOW_SOURCE, "/").concat(t);
            }
            static getTargetChannelName(t) {
                return "".concat(g.WINDOW_TARGET, "/").concat(t);
            }
        }),
        r(g, "WINDOW_MAIN", "@main"),
        r(g, "WINDOW_MAIN_LOGIN", "@main/login"),
        r(g, "WINDOW_SOURCE", "@source"),
        r(g, "WINDOW_TARGET", "@target"),
        g);
});
var J = _((Ye, F) => {
    var { ipcRenderer: x, contextBridge: de } = require("electron"),
        ge = require("crypto"),
        _e = W(),
        fe = U(),
        me = G(),
        ye = B(),
        we = V(),
        C = E(),
        f,
        b,
        m,
        P,
        z;
    F.exports =
        ((z = class {
            constructor(t, e = !0) {
                d(this, f, "");
                d(this, b, {});
                d(this, m, {});
                d(this, P, {});
                r(this, "source", {
                    send: (t, e, s) => {
                        this.send(C.getSourceChannelName(t), e, s);
                    },
                    invoke: async (t, e, s, i = 0) => await this.invoke(C.getSourceChannelName(t), e, s, i)
                });
                r(this, "target", {
                    send: (t, e, s) => {
                        this.send(C.getTargetChannelName(t), e, s);
                    },
                    invoke: async (t, e, s, i = 0) => await this.invoke(C.getTargetChannelName(t), e, s, i)
                });
                let s = this;
                S(this, f, t),
                    S(this, P, {
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
                            winName: n(this, f)
                        },
                        ipc: { diskStorage: new _e(), device: new fe(), source: new me(), target: new ye(), main: new we() },
                        devMode: !1
                    }),
                    x.on(n(this, f), (i, l) => {
                        if (l.length < 3) return;
                        let [c, a, y] = l,
                            { type: p, fromWin: u, promiseId: k } = y ?? {};
                        if (p === "req")
                            (async () => {
                                let w = null;
                                try {
                                    if (typeof c != "string" || typeof n(s, b)[c] != "function")
                                        throw new Error("Inter-browser communication handle not declared");
                                    Array.isArray(a) || (a = []), (w = await n(s, b)[c](...a));
                                } catch (q) {
                                    let re = "".concat(u, " >> ").concat(n(s, f), "/").concat(c, "()");
                                    (w = new Error("".concat(re, " ").concat(q))),
                                        n(this, P).devMode && console.warn("".concat(w));
                                }
                                typeof u == "string" && typeof k == "string" && x.send(u, c, w, { type: "res", promiseId: k });
                            })();
                        else {
                            let w = typeof k == "string" ? "".concat(c, ":").concat(k) : null;
                            if (w !== null) {
                                let q = n(s, m)[w] ?? null;
                                q !== null && (a instanceof Error ? q.reject(a) : q.resolve(a), delete n(s, m)[w]);
                            }
                        }
                    }),
                    e && de.exposeInMainWorld("sdk", n(this, P));
            }
            getSdk() {
                return n(this, P);
            }
            handle(t, e) {
                typeof t == "string" && typeof e == "function" && (n(this, b)[t] = e);
            }
            send(t, e, s) {
                do {
                    if (typeof t != "string" || typeof e != "string") break;
                    Array.isArray(s) || (s = []), x.send(t, e, s, { type: "req", fromWin: n(this, f) });
                } while (!1);
            }
            async invoke(t, e, s, i = 0) {
                let l = this;
                if (typeof t != "string" || typeof e != "string") return null;
                Array.isArray(s) || (s = []);
                let c = parseInt(i, 10);
                (isNaN(c) || c < 0) && (c = 0);
                let a = (() => {
                        let p = Date.now().toString(36),
                            u = ge.randomBytes(4).toString("hex");
                        return "".concat(p).concat(u);
                    })(),
                    y = new Promise((p, u) => {
                        n(this, m)["".concat(e, ":").concat(a)] = { resolve: p, reject: u };
                    });
                return (
                    c > 0 &&
                        setTimeout(() => {
                            let p = typeof a == "string" ? "".concat(e, ":").concat(a) : null;
                            if (typeof n(l, m)[p] < "u") {
                                try {
                                    n(l, m)[p].reject(
                                        new Error("".concat(n(l, f), " >> ").concat(t, "/").concat(e, "() Timed out"))
                                    );
                                } catch {}
                                delete n(l, m)[p];
                            }
                        }, c),
                    x.send(t, e, s, { type: "req", fromWin: n(this, f), promiseId: a }),
                    y
                );
            }
        }),
        (f = new WeakMap()),
        (b = new WeakMap()),
        (m = new WeakMap()),
        (P = new WeakMap()),
        z);
});
var ee = _((Je, Z) => {
    var Ie = J(),
        ve = E(),
        $,
        h,
        N,
        K;
    Z.exports =
        ((K = class {
            constructor(t) {
                d(this, $);
                d(this, h);
                d(this, N, (t, e = 0, s = []) => {
                    if (!(t instanceof Element)) return null;
                    if (t.id) return "#".concat(t.id);
                    let i = [];
                    for (; t; ) {
                        let l = t.nodeName.toLowerCase();
                        if (i.length === 0 && Array.isArray(s) && s.length)
                            for (let y of s) {
                                let p = t.getAttribute(y);
                                p && (l += "[".concat(y, '="').concat(p, '"]'));
                            }
                        t.className && (l += "." + t.className.trim().split(/\s+/).join("."));
                        let c = t,
                            a = 1;
                        for (; c.previousElementSibling; ) (c = c.previousElementSibling), a++;
                        (l += ":nth-child(".concat(a, ")")),
                            i.unshift(l),
                            e > 0 && t.className && i.length >= e ? (t = null) : (t = t.parentElement);
                    }
                    return i.join(" > ");
                });
                r(this, "navigate", t => {
                    n(this, h).ipc.target.webContents(n(this, $), "loadURL", [t]);
                });
                r(this, "query", async (t, e = 0, s = [], i = !1) => {
                    n(this, h).devMode &&
                        console.log(
                            "%c \u{1F50D} Query Selector (classDepth: "
                                .concat(e, ", fromScreenView: ")
                                .concat(i ? "true" : "false", ")  css=")
                                .concat(t),
                            "color:lightblue"
                        );
                    let l = [...document.querySelectorAll(t)]
                        .map(c => {
                            let { top: a, left: y, width: p, height: u } = c.getBoundingClientRect();
                            return {
                                selector: n(this, N).call(this, c, e, s),
                                top: a,
                                left: y,
                                width: p,
                                height: u,
                                visible: a < 0 ? a + u > 0 : a < window.innerHeight
                            };
                        })
                        .filter(c => (i ? c.top + c.height >= 0 : !0));
                    return n(this, h).devMode && console.log(l), l;
                });
                r(this, "scrollTo", async (t, e = 0) => {
                    n(this, h).devMode &&
                        console.log("%c \u{1F5B1}\uFE0F Scrolling to +".concat(e, "px of css=").concat(t), "color:lightblue");
                    let s = document.querySelector(t);
                    if ((n(this, h).devMode && console.log(s), s)) {
                        let i = e - parseInt(s.getBoundingClientRect().top, 10);
                        await n(this, h).ipc.target.webContents(n(this, $), "sendInputEvent", [
                            { type: "mouseWheel", x: 10, y: 15, deltaX: 0, deltaY: i }
                        ]);
                    }
                });
                r(
                    this,
                    "wheels",
                    async t => (
                        await n(this, h).ipc.target.webContents(n(this, $), "sendInputEvent", [
                            { type: "mouseWheel", x: 10, y: 15, deltaX: 0, deltaY: t }
                        ]),
                        "Wheels up!"
                    )
                );
                S(this, $, t), S(this, h, new Ie(ve.getTargetChannelName(t), !1).getSdk());
                for (let e of Object.getOwnPropertyNames(this)) typeof this[e] == "function" && n(this, h).ibc.handle(e, this[e]);
            }
        }),
        ($ = new WeakMap()),
        (h = new WeakMap()),
        (N = new WeakMap()),
        K);
});
var Pe = ee(),
    te = process.argv.filter(o => o.indexOf("--agent-id=") >= 0).shift();
if (typeof te == "string") {
    let o = te.split("=")[1];
    o.length && new Pe(o);
}
