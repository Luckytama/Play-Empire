(function () {/*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    'use strict';
    var p,
        q = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this,
        ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
            a != Array.prototype && a != Object.prototype && (a[b] = c.value)
        };

    function ca() {
        ca = function () {
        };
        q.Symbol || (q.Symbol = da)
    }

    var da = function () {
        var a = 0;
        return function (b) {
            return "jscomp_symbol_" + (b || "") + a++
        }
    }();

    function ea() {
        ca();
        var a = q.Symbol.iterator;
        a || (a = q.Symbol.iterator = q.Symbol("iterator"));
        "function" != typeof Array.prototype[a] && ba(Array.prototype, a, {
            configurable: !0,
            writable: !0,
            value: function () {
                return fa(this)
            }
        });
        ea = function () {
        }
    }

    function fa(a) {
        var b = 0;
        return ha(function () {
            return b < a.length ? {done: !1, value: a[b++]} : {done: !0}
        })
    }

    function ha(a) {
        ea();
        a = {next: a};
        a[q.Symbol.iterator] = function () {
            return this
        };
        return a
    }

    function ia(a) {
        ea();
        var b = a[Symbol.iterator];
        return b ? b.call(a) : fa(a)
    }

    function ja(a) {
        for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
        return c
    }

    (function () {
        if (!function () {
            var a = document.createEvent("Event");
            a.initEvent("foo", !0, !0);
            a.preventDefault();
            return a.defaultPrevented
        }()) {
            var a = Event.prototype.preventDefault;
            Event.prototype.preventDefault = function () {
                this.cancelable && (a.call(this), Object.defineProperty(this, "defaultPrevented", {
                    get: function () {
                        return !0
                    }, configurable: !0
                }))
            }
        }
        var b = /Trident/.test(navigator.userAgent);
        if (!window.CustomEvent || b && "function" !== typeof window.CustomEvent) window.CustomEvent = function (a, b) {
            b = b || {};
            var c = document.createEvent("CustomEvent");
            c.initCustomEvent(a, !!b.bubbles, !!b.cancelable, b.detail);
            return c
        }, window.CustomEvent.prototype = window.Event.prototype;
        if (!window.Event || b && "function" !== typeof window.Event) {
            var c = window.Event;
            window.Event = function (a, b) {
                b = b || {};
                var c = document.createEvent("Event");
                c.initEvent(a, !!b.bubbles, !!b.cancelable);
                return c
            };
            if (c) for (var d in c) window.Event[d] = c[d];
            window.Event.prototype = c.prototype
        }
        if (!window.MouseEvent || b && "function" !== typeof window.MouseEvent) {
            b = window.MouseEvent;
            window.MouseEvent = function (a,
                                          b) {
                b = b || {};
                var c = document.createEvent("MouseEvent");
                c.initMouseEvent(a, !!b.bubbles, !!b.cancelable, b.view || window, b.detail, b.screenX, b.screenY, b.clientX, b.clientY, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button, b.relatedTarget);
                return c
            };
            if (b) for (d in b) window.MouseEvent[d] = b[d];
            window.MouseEvent.prototype = b.prototype
        }
        Array.from || (Array.from = function (a) {
            return [].slice.call(a)
        });
        Object.assign || (Object.assign = function (a, b) {
            for (var c = [].slice.call(arguments, 1), d = 0, e; d < c.length; d++) if (e = c[d]) for (var f =
                a, m = e, n = Object.getOwnPropertyNames(m), w = 0; w < n.length; w++) e = n[w], f[e] = m[e];
            return a
        })
    })(window.WebComponents);
    (function () {
        function a() {
        }

        function b(a, b) {
            switch (a.nodeType) {
                case Node.DOCUMENT_NODE:
                    return w.call(a, b);
                case Node.DOCUMENT_FRAGMENT_NODE:
                    return I.call(a, b);
                default:
                    return n.call(a, b)
            }
        }

        var c = "undefined" === typeof HTMLTemplateElement,
            d = !(document.createDocumentFragment().cloneNode() instanceof DocumentFragment), e = !1;
        /Trident/.test(navigator.userAgent) && function () {
            function a(a, b) {
                if (a instanceof DocumentFragment) for (var d; d = a.firstChild;) c.call(this, d, b); else c.call(this, a, b);
                return a
            }

            e = !0;
            var b = Node.prototype.cloneNode;
            Node.prototype.cloneNode = function (a) {
                a = b.call(this, a);
                this instanceof DocumentFragment && (a.__proto__ = DocumentFragment.prototype);
                return a
            };
            DocumentFragment.prototype.querySelectorAll = HTMLElement.prototype.querySelectorAll;
            DocumentFragment.prototype.querySelector = HTMLElement.prototype.querySelector;
            Object.defineProperties(DocumentFragment.prototype, {
                nodeType: {
                    get: function () {
                        return Node.DOCUMENT_FRAGMENT_NODE
                    }, configurable: !0
                }, localName: {
                    get: function () {
                    }, configurable: !0
                }, nodeName: {
                    get: function () {
                        return "#document-fragment"
                    },
                    configurable: !0
                }
            });
            var c = Node.prototype.insertBefore;
            Node.prototype.insertBefore = a;
            var d = Node.prototype.appendChild;
            Node.prototype.appendChild = function (b) {
                b instanceof DocumentFragment ? a.call(this, b, null) : d.call(this, b);
                return b
            };
            var f = Node.prototype.removeChild, h = Node.prototype.replaceChild;
            Node.prototype.replaceChild = function (b, c) {
                b instanceof DocumentFragment ? (a.call(this, b, c), f.call(this, c)) : h.call(this, b, c);
                return c
            };
            Document.prototype.createDocumentFragment = function () {
                var a = this.createElement("df");
                a.__proto__ = DocumentFragment.prototype;
                return a
            };
            var g = Document.prototype.importNode;
            Document.prototype.importNode = function (a, b) {
                b = g.call(this, a, b || !1);
                a instanceof DocumentFragment && (b.__proto__ = DocumentFragment.prototype);
                return b
            }
        }();
        var f = Node.prototype.cloneNode, h = Document.prototype.createElement, g = Document.prototype.importNode,
            k = Node.prototype.removeChild, l = Node.prototype.appendChild, m = Node.prototype.replaceChild,
            n = Element.prototype.querySelectorAll, w = Document.prototype.querySelectorAll,
            I = DocumentFragment.prototype.querySelectorAll,
            Za = function () {
                if (!c) {
                    var a = document.createElement("template"), b = document.createElement("template");
                    b.content.appendChild(document.createElement("div"));
                    a.content.appendChild(b);
                    a = a.cloneNode(!0);
                    return 0 === a.content.childNodes.length || 0 === a.content.firstChild.content.childNodes.length || d
                }
            }();
        if (c) {
            var t = document.implementation.createHTMLDocument("template"), na = !0,
                aa = document.createElement("style");
            aa.textContent = "template{display:none;}";
            var T = document.head;
            T.insertBefore(aa, T.firstElementChild);
            a.prototype = Object.create(HTMLElement.prototype);
            var U = !document.createElement("div").hasOwnProperty("innerHTML");
            a.D = function (b) {
                if (!b.content) {
                    b.content = t.createDocumentFragment();
                    for (var c; c = b.firstChild;) l.call(b.content, c);
                    if (U) b.__proto__ = a.prototype; else if (b.cloneNode = function (b) {
                        return a.a(this, b)
                    }, na) try {
                        nc(b), oc(b)
                    } catch (Ng) {
                        na = !1
                    }
                    a.J(b.content)
                }
            };
            var nc = function (b) {
                Object.defineProperty(b, "innerHTML", {
                    get: function () {
                        for (var a = "", b = this.content.firstChild; b; b = b.nextSibling) a += b.outerHTML ||
                            b.data.replace(Ge, pc);
                        return a
                    }, set: function (b) {
                        t.body.innerHTML = b;
                        for (a.J(t); this.content.firstChild;) k.call(this.content, this.content.firstChild);
                        for (; t.body.firstChild;) l.call(this.content, t.body.firstChild)
                    }, configurable: !0
                })
            }, oc = function (a) {
                Object.defineProperty(a, "outerHTML", {
                    get: function () {
                        return "<template>" + this.innerHTML + "</template>"
                    }, set: function (a) {
                        if (this.parentNode) {
                            t.body.innerHTML = a;
                            for (a = this.ownerDocument.createDocumentFragment(); t.body.firstChild;) l.call(a, t.body.firstChild);
                            m.call(this.parentNode,
                                a, this)
                        } else throw Error("Failed to set the 'outerHTML' property on 'Element': This element has no parent node.");
                    }, configurable: !0
                })
            };
            nc(a.prototype);
            oc(a.prototype);
            a.J = function (c) {
                c = b(c, "template");
                for (var d = 0, e = c.length, f; d < e && (f = c[d]); d++) a.D(f)
            };
            document.addEventListener("DOMContentLoaded", function () {
                a.J(document)
            });
            Document.prototype.createElement = function () {
                var b = h.apply(this, arguments);
                "template" === b.localName && a.D(b);
                return b
            };
            var Ge = /[&\u00A0<>]/g, pc = function (a) {
                switch (a) {
                    case "&":
                        return "&amp;";
                    case "<":
                        return "&lt;";
                    case ">":
                        return "&gt;";
                    case "\u00a0":
                        return "&nbsp;"
                }
            }
        }
        if (c || Za) {
            a.a = function (a, b) {
                var c = f.call(a, !1);
                this.D && this.D(c);
                b && (l.call(c.content, f.call(a.content, !0)), $a(c.content, a.content));
                return c
            };
            var $a = function (c, d) {
                if (d.querySelectorAll && (d = b(d, "template"), 0 !== d.length)) {
                    c = b(c, "template");
                    for (var e = 0, f = c.length, h, g; e < f; e++) g = d[e], h = c[e], a && a.D && a.D(g), m.call(h.parentNode, He.call(g, !0), h)
                }
            }, He = Node.prototype.cloneNode = function (b) {
                if (!e && d && this instanceof DocumentFragment) if (b) var c =
                    Ie.call(this.ownerDocument, this, !0); else return this.ownerDocument.createDocumentFragment(); else this.nodeType === Node.ELEMENT_NODE && "template" === this.localName ? c = a.a(this, b) : c = f.call(this, b);
                b && $a(c, this);
                return c
            }, Ie = Document.prototype.importNode = function (b, c) {
                c = c || !1;
                if ("template" === b.localName) return a.a(b, c);
                var d = g.call(this, b, c);
                c && $a(d, b);
                return d
            }
        }
        c && (window.HTMLTemplateElement = a)
    })();
    var ka;
    Array.isArray ? ka = Array.isArray : ka = function (a) {
        return "[object Array]" === Object.prototype.toString.call(a)
    };
    var la = ka;
    var ma = 0, oa, pa = "undefined" !== typeof window ? window : void 0, qa = pa || {},
        ra = qa.MutationObserver || qa.WebKitMutationObserver,
        sa = "undefined" !== typeof Uint8ClampedArray && "undefined" !== typeof importScripts && "undefined" !== typeof MessageChannel;

    function ta() {
        return "undefined" !== typeof oa ? function () {
            oa(ua)
        } : va()
    }

    function wa() {
        var a = 0, b = new ra(ua), c = document.createTextNode("");
        b.observe(c, {characterData: !0});
        return function () {
            c.data = a = ++a % 2
        }
    }

    function xa() {
        var a = new MessageChannel;
        a.port1.onmessage = ua;
        return function () {
            return a.port2.postMessage(0)
        }
    }

    function va() {
        var a = setTimeout;
        return function () {
            return a(ua, 1)
        }
    }

    var ya = Array(1E3);

    function ua() {
        for (var a = 0; a < ma; a += 2) (0, ya[a])(ya[a + 1]), ya[a] = void 0, ya[a + 1] = void 0;
        ma = 0
    }

    var za, Aa;
    if ("undefined" === typeof self && "undefined" !== typeof process && "[object process]" === {}.toString.call(process)) Aa = function () {
        return process.jb(ua)
    }; else {
        var Ba;
        if (ra) Ba = wa(); else {
            var Ca;
            if (sa) Ca = xa(); else {
                var Da;
                if (void 0 === pa && "function" === typeof require) try {
                    var Ea = require("vertx");
                    oa = Ea.lb || Ea.kb;
                    Da = ta()
                } catch (a) {
                    Da = va()
                } else Da = va();
                Ca = Da
            }
            Ba = Ca
        }
        Aa = Ba
    }
    za = Aa;

    function Fa(a, b) {
        ya[ma] = a;
        ya[ma + 1] = b;
        ma += 2;
        2 === ma && za()
    };

    function Ga(a, b) {
        var c = this, d = new this.constructor(Ha);
        void 0 === d[Ia] && Ja(d);
        var e = c.g;
        if (e) {
            var f = arguments[e - 1];
            Fa(function () {
                return Ka(e, d, f, c.f)
            })
        } else La(c, d, a, b);
        return d
    };

    function Ma(a) {
        if (a && "object" === typeof a && a.constructor === this) return a;
        var b = new this(Ha);
        Na(b, a);
        return b
    };var Ia = Math.random().toString(36).substring(16);

    function Ha() {
    }

    var Pa = new Oa;

    function Qa(a) {
        try {
            return a.then
        } catch (b) {
            return Pa.error = b, Pa
        }
    }

    function Ra(a, b, c, d) {
        try {
            a.call(b, c, d)
        } catch (e) {
            return e
        }
    }

    function Sa(a, b, c) {
        Fa(function (a) {
            var d = !1, f = Ra(c, b, function (c) {
                d || (d = !0, b !== c ? Na(a, c) : r(a, c))
            }, function (b) {
                d || (d = !0, u(a, b))
            });
            !d && f && (d = !0, u(a, f))
        }, a)
    }

    function Ta(a, b) {
        1 === b.g ? r(a, b.f) : 2 === b.g ? u(a, b.f) : La(b, void 0, function (b) {
            return Na(a, b)
        }, function (b) {
            return u(a, b)
        })
    }

    function Ua(a, b, c) {
        b.constructor === a.constructor && c === Ga && b.constructor.resolve === Ma ? Ta(a, b) : c === Pa ? (u(a, Pa.error), Pa.error = null) : void 0 === c ? r(a, b) : "function" === typeof c ? Sa(a, b, c) : r(a, b)
    }

    function Na(a, b) {
        if (a === b) u(a, new TypeError("You cannot resolve a promise with itself")); else {
            var c = typeof b;
            null === b || "object" !== c && "function" !== c ? r(a, b) : Ua(a, b, Qa(b))
        }
    }

    function Va(a) {
        a.pa && a.pa(a.f);
        Wa(a)
    }

    function r(a, b) {
        void 0 === a.g && (a.f = b, a.g = 1, 0 !== a.I.length && Fa(Wa, a))
    }

    function u(a, b) {
        void 0 === a.g && (a.g = 2, a.f = b, Fa(Va, a))
    }

    function La(a, b, c, d) {
        var e = a.I, f = e.length;
        a.pa = null;
        e[f] = b;
        e[f + 1] = c;
        e[f + 2] = d;
        0 === f && a.g && Fa(Wa, a)
    }

    function Wa(a) {
        var b = a.I, c = a.g;
        if (0 !== b.length) {
            for (var d, e, f = a.f, h = 0; h < b.length; h += 3) d = b[h], e = b[h + c], d ? Ka(c, d, e, f) : e(f);
            a.I.length = 0
        }
    }

    function Oa() {
        this.error = null
    }

    var Xa = new Oa;

    function Ka(a, b, c, d) {
        var e = "function" === typeof c;
        if (e) {
            try {
                var f = c(d)
            } catch (l) {
                Xa.error = l, f = Xa
            }
            if (f === Xa) {
                var h = !0;
                var g = f.error;
                f.error = null
            } else var k = !0;
            if (b === f) {
                u(b, new TypeError("A promises callback cannot return that same promise."));
                return
            }
        } else f = d, k = !0;
        void 0 === b.g && (e && k ? Na(b, f) : h ? u(b, g) : 1 === a ? r(b, f) : 2 === a && u(b, f))
    }

    function Ya(a, b) {
        try {
            b(function (b) {
                Na(a, b)
            }, function (b) {
                u(a, b)
            })
        } catch (c) {
            u(a, c)
        }
    }

    var ab = 0;

    function Ja(a) {
        a[Ia] = ab++;
        a.g = void 0;
        a.f = void 0;
        a.I = []
    };

    function bb(a, b) {
        this.Ga = a;
        this.A = new a(Ha);
        this.A[Ia] || Ja(this.A);
        if (la(b)) if (this.S = this.length = b.length, this.f = Array(this.length), 0 === this.length) r(this.A, this.f); else {
            this.length = this.length || 0;
            for (a = 0; void 0 === this.g && a < b.length; a++) cb(this, b[a], a);
            0 === this.S && r(this.A, this.f)
        } else u(this.A, Error("Array Methods must be provided an Array"))
    }

    function cb(a, b, c) {
        var d = a.Ga, e = d.resolve;
        e === Ma ? (e = Qa(b), e === Ga && void 0 !== b.g ? db(a, b.g, c, b.f) : "function" !== typeof e ? (a.S--, a.f[c] = b) : d === v ? (d = new d(Ha), Ua(d, b, e), eb(a, d, c)) : eb(a, new d(function (a) {
            return a(b)
        }), c)) : eb(a, e(b), c)
    }

    function db(a, b, c, d) {
        var e = a.A;
        void 0 === e.g && (a.S--, 2 === b ? u(e, d) : a.f[c] = d);
        0 === a.S && r(e, a.f)
    }

    function eb(a, b, c) {
        La(b, void 0, function (b) {
            return db(a, 1, c, b)
        }, function (b) {
            return db(a, 2, c, b)
        })
    };

    function fb(a) {
        return (new bb(this, a)).A
    };

    function gb(a) {
        var b = this;
        return la(a) ? new b(function (c, d) {
            for (var e = a.length, f = 0; f < e; f++) b.resolve(a[f]).then(c, d)
        }) : new b(function (a, b) {
            return b(new TypeError("You must pass an array to race."))
        })
    };

    function hb(a) {
        var b = new this(Ha);
        u(b, a);
        return b
    };

    function v(a) {
        this[Ia] = ab++;
        this.f = this.g = void 0;
        this.I = [];
        if (Ha !== a) {
            if ("function" !== typeof a) throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
            if (this instanceof v) Ya(this, a); else throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
        }
    }

    v.prototype = {
        constructor: v, then: Ga, a: function (a) {
            return this.then(null, a)
        }
    };
    /*

Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    window.Promise || (window.Promise = v, v.prototype["catch"] = v.prototype.a, v.prototype.then = v.prototype.then, v.all = fb, v.race = gb, v.resolve = Ma, v.reject = hb);
    (function (a) {
        function b(a, b) {
            if ("function" === typeof window.CustomEvent) return new CustomEvent(a, b);
            var c = document.createEvent("CustomEvent");
            c.initCustomEvent(a, !!b.bubbles, !!b.cancelable, b.detail);
            return c
        }

        function c(a) {
            if (m) return a.ownerDocument !== document ? a.ownerDocument : null;
            var b = a.__importDoc;
            if (!b && a.parentNode) {
                b = a.parentNode;
                if ("function" === typeof b.closest) b = b.closest("link[rel=import]"); else for (; !g(b) && (b = b.parentNode);) ;
                a.__importDoc = b
            }
            return b
        }

        function d(a) {
            var b = document.querySelectorAll("link[rel=import]:not([import-dependency])"),
                c = b.length;
            c ? l(b, function (b) {
                return h(b, function () {
                    0 === --c && a()
                })
            }) : a()
        }

        function e(a) {
            function b() {
                "loading" !== document.readyState && document.body && (document.removeEventListener("readystatechange", b), a())
            }

            document.addEventListener("readystatechange", b);
            b()
        }

        function f(a) {
            e(function () {
                return d(function () {
                    return a && a()
                })
            })
        }

        function h(a, b) {
            if (a.__loaded) b && b(); else if ("script" === a.localName && !a.src || "style" === a.localName && !a.firstChild) a.__loaded = !0, b && b(); else {
                var c = function (d) {
                    a.removeEventListener(d.type,
                        c);
                    a.__loaded = !0;
                    b && b()
                };
                a.addEventListener("load", c);
                aa && "style" === a.localName || a.addEventListener("error", c)
            }
        }

        function g(a) {
            return a.nodeType === Node.ELEMENT_NODE && "link" === a.localName && "import" === a.rel
        }

        function k() {
            var a = this;
            this.a = {};
            this.b = 0;
            this.h = new MutationObserver(function (b) {
                return a.Qa(b)
            });
            this.h.observe(document.head, {childList: !0, subtree: !0});
            this.c(document)
        }

        function l(a, b, c) {
            var d = a ? a.length : 0, e = c ? -1 : 1;
            for (c = c ? d - 1 : 0; c < d && 0 <= c; c += e) b(a[c], c)
        }

        var m = "import" in document.createElement("link"),
            n = null;
        !1 === "currentScript" in document && Object.defineProperty(document, "currentScript", {
            get: function () {
                return n || ("complete" !== document.readyState ? document.scripts[document.scripts.length - 1] : null)
            }, configurable: !0
        });
        var w = /(url\()([^)]*)(\))/g, I = /(@import[\s]+(?!url\())([^;]*)(;)/g,
            Za = /(<link[^>]*)(rel=['|"]?stylesheet['|"]?[^>]*>)/g, t = {
                Ka: function (a, b) {
                    a.href && a.setAttribute("href", t.Y(a.getAttribute("href"), b));
                    a.src && a.setAttribute("src", t.Y(a.getAttribute("src"), b));
                    if ("style" === a.localName) {
                        var c =
                            t.ua(a.textContent, b, w);
                        a.textContent = t.ua(c, b, I)
                    }
                }, ua: function (a, b, c) {
                    return a.replace(c, function (a, c, d, e) {
                        a = d.replace(/["']/g, "");
                        b && (a = t.Y(a, b));
                        return c + "'" + a + "'" + e
                    })
                }, Y: function (a, b) {
                    if (void 0 === t.ca) {
                        t.ca = !1;
                        try {
                            var c = new URL("b", "http://a");
                            c.pathname = "c%20d";
                            t.ca = "http://a/c%20d" === c.href
                        } catch (pc) {
                        }
                    }
                    if (t.ca) return (new URL(a, b)).href;
                    c = t.Da;
                    c || (c = document.implementation.createHTMLDocument("temp"), t.Da = c, c.ma = c.createElement("base"), c.head.appendChild(c.ma), c.la = c.createElement("a"));
                    c.ma.href =
                        b;
                    c.la.href = a;
                    return c.la.href || a
                }
            }, na = {
                async: !0, load: function (a, b, c) {
                    if (a) if (a.match(/^data:/)) {
                        a = a.split(",");
                        var d = a[1];
                        d = -1 < a[0].indexOf(";base64") ? atob(d) : decodeURIComponent(d);
                        b(d)
                    } else {
                        var e = new XMLHttpRequest;
                        e.open("GET", a, na.async);
                        e.onload = function () {
                            var a = e.responseURL || e.getResponseHeader("Location");
                            a && 0 === a.indexOf("/") && (a = (location.origin || location.protocol + "//" + location.host) + a);
                            var d = e.response || e.responseText;
                            304 === e.status || 0 === e.status || 200 <= e.status && 300 > e.status ? b(d, a) : c(d)
                        };
                        e.send()
                    } else c("error: href must be specified")
                }
            }, aa = /Trident/.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent);
        k.prototype.c = function (a) {
            var b = this;
            a = a.querySelectorAll("link[rel=import]");
            l(a, function (a) {
                return b.L(a)
            })
        };
        k.prototype.L = function (a) {
            var b = this, c = a.href;
            if (void 0 !== this.a[c]) {
                var d = this.a[c];
                d && d.__loaded && (a.import = d, this.o(a))
            } else this.b++, this.a[c] = "pending", na.load(c, function (a, d) {
                a = b.Ra(a, d || c);
                b.a[c] = a;
                b.b--;
                b.c(a);
                b.sa()
            }, function () {
                b.a[c] = null;
                b.b--;
                b.sa()
            })
        };
        k.prototype.Ra = function (a, b) {
            if (!a) return document.createDocumentFragment();
            aa && (a = a.replace(Za, function (a, b, c) {
                return -1 === a.indexOf("type=") ? b + " type=import-disable " + c : a
            }));
            var c = document.createElement("template");
            c.innerHTML = a;
            if (c.content) a = c.content; else for (a = document.createDocumentFragment(); c.firstChild;) a.appendChild(c.firstChild);
            if (c = a.querySelector("base")) b = t.Y(c.getAttribute("href"), b), c.removeAttribute("href");
            c = a.querySelectorAll('link[rel=import], link[rel=stylesheet][href][type=import-disable],\n    style:not([type]), link[rel=stylesheet][href]:not([type]),\n    script:not([type]), script[type="application/javascript"],\n    script[type="text/javascript"]');
            var d = 0;
            l(c, function (a) {
                h(a);
                t.Ka(a, b);
                a.setAttribute("import-dependency", "");
                "script" === a.localName && !a.src && a.textContent && (a.setAttribute("src", "data:text/javascript;charset=utf-8," + encodeURIComponent(a.textContent + ("\n//# sourceURL=" + b + (d ? "-" + d : "") + ".js\n"))), a.textContent = "", d++)
            });
            return a
        };
        k.prototype.sa = function () {
            var a = this;
            if (!this.b) {
                this.h.disconnect();
                this.flatten(document);
                var b = !1, c = !1, d = function () {
                    c && b && (a.c(document), a.b || (a.h.observe(document.head, {childList: !0, subtree: !0}), a.Pa()))
                };
                this.Wa(function () {
                    c = !0;
                    d()
                });
                this.Sa(function () {
                    b = !0;
                    d()
                })
            }
        };
        k.prototype.flatten = function (a) {
            var b = this;
            a = a.querySelectorAll("link[rel=import]");
            l(a, function (a) {
                var c = b.a[a.href];
                (a.import = c) && c.nodeType === Node.DOCUMENT_FRAGMENT_NODE && (b.a[a.href] = a, a.readyState = "loading", a.import = a, b.flatten(c), a.appendChild(c))
            })
        };
        k.prototype.Sa = function (a) {
            function b(e) {
                if (e < d) {
                    var f = c[e], g = document.createElement("script");
                    f.removeAttribute("import-dependency");
                    l(f.attributes, function (a) {
                        return g.setAttribute(a.name,
                            a.value)
                    });
                    n = g;
                    f.parentNode.replaceChild(g, f);
                    h(g, function () {
                        n = null;
                        b(e + 1)
                    })
                } else a()
            }

            var c = document.querySelectorAll("script[import-dependency]"), d = c.length;
            b(0)
        };
        k.prototype.Wa = function (a) {
            var b = document.querySelectorAll("style[import-dependency],\n    link[rel=stylesheet][import-dependency]"),
                d = b.length;
            if (d) {
                var e = aa && !!document.querySelector("link[rel=stylesheet][href][type=import-disable]");
                l(b, function (b) {
                    h(b, function () {
                        b.removeAttribute("import-dependency");
                        0 === --d && a()
                    });
                    if (e && b.parentNode !==
                        document.head) {
                        var f = document.createElement(b.localName);
                        f.__appliedElement = b;
                        f.setAttribute("type", "import-placeholder");
                        b.parentNode.insertBefore(f, b.nextSibling);
                        for (f = c(b); f && c(f);) f = c(f);
                        f.parentNode !== document.head && (f = null);
                        document.head.insertBefore(b, f);
                        b.removeAttribute("type")
                    }
                })
            } else a()
        };
        k.prototype.Pa = function () {
            var a = this, b = document.querySelectorAll("link[rel=import]");
            l(b, function (b) {
                return a.o(b)
            }, !0)
        };
        k.prototype.o = function (a) {
            a.__loaded || (a.__loaded = !0, a.import && (a.import.readyState =
                "complete"), a.dispatchEvent(b(a.import ? "load" : "error", {
                bubbles: !1,
                cancelable: !1,
                detail: void 0
            })))
        };
        k.prototype.Qa = function (a) {
            var b = this;
            l(a, function (a) {
                return l(a.addedNodes, function (a) {
                    a && a.nodeType === Node.ELEMENT_NODE && (g(a) ? b.L(a) : b.c(a))
                })
            })
        };
        if (m) {
            var T = document.querySelectorAll("link[rel=import]");
            l(T, function (a) {
                a.import && "loading" === a.import.readyState || (a.__loaded = !0)
            });
            T = function (a) {
                a = a.target;
                g(a) && (a.__loaded = !0)
            };
            document.addEventListener("load", T, !0);
            document.addEventListener("error",
                T, !0)
        } else {
            var U = Object.getOwnPropertyDescriptor(Node.prototype, "baseURI");
            Object.defineProperty((!U || U.configurable ? Node : Element).prototype, "baseURI", {
                get: function () {
                    var a = g(this) ? this : c(this);
                    return a ? a.href : U && U.get ? U.get.call(this) : (document.querySelector("base") || window.location).href
                }, configurable: !0, enumerable: !0
            });
            e(function () {
                return new k
            })
        }
        f(function () {
            return document.dispatchEvent(b("HTMLImportsLoaded", {cancelable: !0, bubbles: !0, detail: void 0}))
        });
        a.useNative = m;
        a.whenReady = f;
        a.importForElement =
            c
    })(window.HTMLImports = window.HTMLImports || {});
    /*

 Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    window.WebComponents = window.WebComponents || {flags: {}};
    var ib = document.querySelector('script[src*="webcomponents-lite.js"]'), jb = /wc-(.+)/, x = {};
    if (!x.noOpts) {
        location.search.slice(1).split("&").forEach(function (a) {
            a = a.split("=");
            var b;
            a[0] && (b = a[0].match(jb)) && (x[b[1]] = a[1] || !0)
        });
        if (ib) for (var kb = 0, lb; lb = ib.attributes[kb]; kb++) "src" !== lb.name && (x[lb.name] = lb.value || !0);
        if (x.log && x.log.split) {
            var mb = x.log.split(",");
            x.log = {};
            mb.forEach(function (a) {
                x.log[a] = !0
            })
        } else x.log = {}
    }
    window.WebComponents.flags = x;
    var nb = x.shadydom;
    nb && (window.ShadyDOM = window.ShadyDOM || {}, window.ShadyDOM.force = nb);
    var ob = x.register || x.ce;
    ob && window.customElements && (window.customElements.forcePolyfill = ob);
    /*

Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    var y = window.ShadyDOM || {};
    y.Ma = !(!Element.prototype.attachShadow || !Node.prototype.getRootNode);
    var pb = Object.getOwnPropertyDescriptor(Node.prototype, "firstChild");
    y.M = !!(pb && pb.configurable && pb.get);
    y.ta = y.force || !y.Ma;

    function qb(a) {
        return a.__shady && void 0 !== a.__shady.firstChild
    }

    function z(a) {
        return "ShadyRoot" === a.Aa
    }

    function rb(a) {
        a = a.getRootNode();
        if (z(a)) return a
    }

    var sb = Element.prototype,
        tb = sb.matches || sb.matchesSelector || sb.mozMatchesSelector || sb.msMatchesSelector || sb.oMatchesSelector || sb.webkitMatchesSelector;

    function ub(a, b) {
        if (a && b) for (var c = Object.getOwnPropertyNames(b), d = 0, e; d < c.length && (e = c[d]); d++) {
            var f = Object.getOwnPropertyDescriptor(b, e);
            f && Object.defineProperty(a, e, f)
        }
    }

    function vb(a, b) {
        for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
        for (d = 0; d < c.length; d++) ub(a, c[d]);
        return a
    }

    function wb(a, b) {
        for (var c in b) a[c] = b[c]
    }

    var xb = document.createTextNode(""), yb = 0, zb = [];
    (new MutationObserver(function () {
        for (; zb.length;) try {
            zb.shift()()
        } catch (a) {
            throw xb.textContent = yb++, a;
        }
    })).observe(xb, {characterData: !0});

    function Ab(a) {
        zb.push(a);
        xb.textContent = yb++
    }

    var Bb = !!document.contains;

    function Cb(a, b) {
        for (; b;) {
            if (b == a) return !0;
            b = b.parentNode
        }
        return !1
    };var Db = [], Eb;

    function Fb(a) {
        Eb || (Eb = !0, Ab(Gb));
        Db.push(a)
    }

    function Gb() {
        Eb = !1;
        for (var a = !!Db.length; Db.length;) Db.shift()();
        return a
    }

    Gb.list = Db;

    function Hb() {
        this.a = !1;
        this.addedNodes = [];
        this.removedNodes = [];
        this.V = new Set
    }

    function Ib(a) {
        a.a || (a.a = !0, Ab(function () {
            Jb(a)
        }))
    }

    function Jb(a) {
        if (a.a) {
            a.a = !1;
            var b = a.takeRecords();
            b.length && a.V.forEach(function (a) {
                a(b)
            })
        }
    }

    Hb.prototype.takeRecords = function () {
        if (this.addedNodes.length || this.removedNodes.length) {
            var a = [{addedNodes: this.addedNodes, removedNodes: this.removedNodes}];
            this.addedNodes = [];
            this.removedNodes = [];
            return a
        }
        return []
    };

    function Kb(a, b) {
        a.__shady = a.__shady || {};
        a.__shady.N || (a.__shady.N = new Hb);
        a.__shady.N.V.add(b);
        var c = a.__shady.N;
        return {
            Ea: b, C: c, Ha: a, takeRecords: function () {
                return c.takeRecords()
            }
        }
    }

    function Lb(a) {
        var b = a && a.C;
        b && (b.V.delete(a.Ea), b.V.size || (a.Ha.__shady.N = null))
    }

    function Mb(a, b) {
        var c = b.getRootNode();
        return a.map(function (a) {
            var b = c === a.target.getRootNode();
            if (b && a.addedNodes) {
                if (b = Array.from(a.addedNodes).filter(function (a) {
                    return c === a.getRootNode()
                }), b.length) return a = Object.create(a), Object.defineProperty(a, "addedNodes", {
                    value: b,
                    configurable: !0
                }), a
            } else if (b) return a
        }).filter(function (a) {
            return a
        })
    };var A = {}, Nb = Element.prototype.insertBefore, Ob = Element.prototype.removeChild,
        Pb = Element.prototype.setAttribute, Qb = Element.prototype.removeAttribute, Rb = Element.prototype.cloneNode,
        Sb = Document.prototype.importNode, Tb = Element.prototype.addEventListener,
        Ub = Element.prototype.removeEventListener, Vb = Window.prototype.addEventListener,
        Wb = Window.prototype.removeEventListener, Xb = Element.prototype.dispatchEvent,
        Yb = Element.prototype.querySelector, Zb = Element.prototype.querySelectorAll, $b = Node.prototype.contains ||
            HTMLElement.prototype.contains;
    A.appendChild = Element.prototype.appendChild;
    A.insertBefore = Nb;
    A.removeChild = Ob;
    A.setAttribute = Pb;
    A.removeAttribute = Qb;
    A.cloneNode = Rb;
    A.importNode = Sb;
    A.addEventListener = Tb;
    A.removeEventListener = Ub;
    A.ab = Vb;
    A.bb = Wb;
    A.dispatchEvent = Xb;
    A.querySelector = Yb;
    A.querySelectorAll = Zb;
    A.contains = $b;
    var ac = /[&\u00A0"]/g, bc = /[&\u00A0<>]/g;

    function cc(a) {
        switch (a) {
            case "&":
                return "&amp;";
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case '"':
                return "&quot;";
            case "\u00a0":
                return "&nbsp;"
        }
    }

    function dc(a) {
        for (var b = {}, c = 0; c < a.length; c++) b[a[c]] = !0;
        return b
    }

    var ec = dc("area base br col command embed hr img input keygen link meta param source track wbr".split(" ")),
        fc = dc("style script xmp iframe noembed noframes plaintext noscript".split(" "));

    function gc(a, b) {
        "template" === a.localName && (a = a.content);
        for (var c = "", d = b ? b(a) : a.childNodes, e = 0, f = d.length, h; e < f && (h = d[e]); e++) {
            a:{
                var g = h;
                var k = a;
                var l = b;
                switch (g.nodeType) {
                    case Node.ELEMENT_NODE:
                        for (var m = g.localName, n = "<" + m, w = g.attributes, I = 0; k = w[I]; I++) n += " " + k.name + '="' + k.value.replace(ac, cc) + '"';
                        n += ">";
                        g = ec[m] ? n : n + gc(g, l) + "</" + m + ">";
                        break a;
                    case Node.TEXT_NODE:
                        g = g.data;
                        g = k && fc[k.localName] ? g : g.replace(bc, cc);
                        break a;
                    case Node.COMMENT_NODE:
                        g = "\x3c!--" + g.data + "--\x3e";
                        break a;
                    default:
                        throw window.console.error(g),
                            Error("not implemented");
                }
            }
            c += g
        }
        return c
    };var B = {}, C = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, !1),
        D = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT, null, !1);

    function hc(a) {
        var b = [];
        C.currentNode = a;
        for (a = C.firstChild(); a;) b.push(a), a = C.nextSibling();
        return b
    }

    B.parentNode = function (a) {
        C.currentNode = a;
        return C.parentNode()
    };
    B.firstChild = function (a) {
        C.currentNode = a;
        return C.firstChild()
    };
    B.lastChild = function (a) {
        C.currentNode = a;
        return C.lastChild()
    };
    B.previousSibling = function (a) {
        C.currentNode = a;
        return C.previousSibling()
    };
    B.nextSibling = function (a) {
        C.currentNode = a;
        return C.nextSibling()
    };
    B.childNodes = hc;
    B.parentElement = function (a) {
        D.currentNode = a;
        return D.parentNode()
    };
    B.firstElementChild = function (a) {
        D.currentNode = a;
        return D.firstChild()
    };
    B.lastElementChild = function (a) {
        D.currentNode = a;
        return D.lastChild()
    };
    B.previousElementSibling = function (a) {
        D.currentNode = a;
        return D.previousSibling()
    };
    B.nextElementSibling = function (a) {
        D.currentNode = a;
        return D.nextSibling()
    };
    B.children = function (a) {
        var b = [];
        D.currentNode = a;
        for (a = D.firstChild(); a;) b.push(a), a = D.nextSibling();
        return b
    };
    B.innerHTML = function (a) {
        return gc(a, function (a) {
            return hc(a)
        })
    };
    B.textContent = function (a) {
        switch (a.nodeType) {
            case Node.ELEMENT_NODE:
            case Node.DOCUMENT_FRAGMENT_NODE:
                a = document.createTreeWalker(a, NodeFilter.SHOW_TEXT, null, !1);
                for (var b = "", c; c = a.nextNode();) b += c.nodeValue;
                return b;
            default:
                return a.nodeValue
        }
    };
    var ic = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML") || Object.getOwnPropertyDescriptor(HTMLElement.prototype, "innerHTML"),
        jc = document.implementation.createHTMLDocument("inert"),
        kc = Object.getOwnPropertyDescriptor(Document.prototype, "activeElement"), lc = {
            parentElement: {
                get: function () {
                    var a = this.__shady && this.__shady.parentNode;
                    a && a.nodeType !== Node.ELEMENT_NODE && (a = null);
                    return void 0 !== a ? a : B.parentElement(this)
                }, configurable: !0
            }, parentNode: {
                get: function () {
                    var a = this.__shady && this.__shady.parentNode;
                    return void 0 !== a ? a : B.parentNode(this)
                }, configurable: !0
            }, nextSibling: {
                get: function () {
                    var a = this.__shady && this.__shady.nextSibling;
                    return void 0 !== a ? a : B.nextSibling(this)
                }, configurable: !0
            }, previousSibling: {
                get: function () {
                    var a = this.__shady && this.__shady.previousSibling;
                    return void 0 !== a ? a : B.previousSibling(this)
                }, configurable: !0
            }, className: {
                get: function () {
                    return this.getAttribute("class") || ""
                }, set: function (a) {
                    this.setAttribute("class", a)
                }, configurable: !0
            }, nextElementSibling: {
                get: function () {
                    if (this.__shady &&
                        void 0 !== this.__shady.nextSibling) {
                        for (var a = this.nextSibling; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.nextSibling;
                        return a
                    }
                    return B.nextElementSibling(this)
                }, configurable: !0
            }, previousElementSibling: {
                get: function () {
                    if (this.__shady && void 0 !== this.__shady.previousSibling) {
                        for (var a = this.previousSibling; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.previousSibling;
                        return a
                    }
                    return B.previousElementSibling(this)
                }, configurable: !0
            }
        }, mc = {
            childNodes: {
                get: function () {
                    if (qb(this)) {
                        if (!this.__shady.childNodes) {
                            this.__shady.childNodes =
                                [];
                            for (var a = this.firstChild; a; a = a.nextSibling) this.__shady.childNodes.push(a)
                        }
                        var b = this.__shady.childNodes
                    } else b = B.childNodes(this);
                    b.item = function (a) {
                        return b[a]
                    };
                    return b
                }, configurable: !0
            }, childElementCount: {
                get: function () {
                    return this.children.length
                }, configurable: !0
            }, firstChild: {
                get: function () {
                    var a = this.__shady && this.__shady.firstChild;
                    return void 0 !== a ? a : B.firstChild(this)
                }, configurable: !0
            }, lastChild: {
                get: function () {
                    var a = this.__shady && this.__shady.lastChild;
                    return void 0 !== a ? a : B.lastChild(this)
                },
                configurable: !0
            }, textContent: {
                get: function () {
                    if (qb(this)) {
                        for (var a = [], b = 0, c = this.childNodes, d; d = c[b]; b++) d.nodeType !== Node.COMMENT_NODE && a.push(d.textContent);
                        return a.join("")
                    }
                    return B.textContent(this)
                }, set: function (a) {
                    switch (this.nodeType) {
                        case Node.ELEMENT_NODE:
                        case Node.DOCUMENT_FRAGMENT_NODE:
                            for (; this.firstChild;) this.removeChild(this.firstChild);
                            (0 < a.length || this.nodeType === Node.ELEMENT_NODE) && this.appendChild(document.createTextNode(a));
                            break;
                        default:
                            this.nodeValue = a
                    }
                }, configurable: !0
            }, firstElementChild: {
                get: function () {
                    if (this.__shady &&
                        void 0 !== this.__shady.firstChild) {
                        for (var a = this.firstChild; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.nextSibling;
                        return a
                    }
                    return B.firstElementChild(this)
                }, configurable: !0
            }, lastElementChild: {
                get: function () {
                    if (this.__shady && void 0 !== this.__shady.lastChild) {
                        for (var a = this.lastChild; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.previousSibling;
                        return a
                    }
                    return B.lastElementChild(this)
                }, configurable: !0
            }, children: {
                get: function () {
                    var a;
                    qb(this) ? a = Array.prototype.filter.call(this.childNodes, function (a) {
                        return a.nodeType ===
                            Node.ELEMENT_NODE
                    }) : a = B.children(this);
                    a.item = function (b) {
                        return a[b]
                    };
                    return a
                }, configurable: !0
            }, innerHTML: {
                get: function () {
                    var a = "template" === this.localName ? this.content : this;
                    return qb(this) ? gc(a) : B.innerHTML(a)
                }, set: function (a) {
                    for (var b = "template" === this.localName ? this.content : this; b.firstChild;) b.removeChild(b.firstChild);
                    var c = this.localName;
                    c && "template" !== c || (c = "div");
                    c = jc.createElement(c);
                    for (ic && ic.set ? ic.set.call(c, a) : c.innerHTML = a; c.firstChild;) b.appendChild(c.firstChild)
                }, configurable: !0
            }
        },
        qc = {
            shadowRoot: {
                get: function () {
                    return this.__shady && this.__shady.Ua || null
                }, configurable: !0
            }
        }, rc = {
            activeElement: {
                get: function () {
                    var a = kc && kc.get ? kc.get.call(document) : y.M ? void 0 : document.activeElement;
                    if (a && a.nodeType) {
                        var b = !!z(this);
                        if (this === document || b && this.host !== a && A.contains.call(this.host, a)) {
                            for (b = rb(a); b && b !== this;) a = b.host, b = rb(a);
                            a = this === document ? b ? null : a : b === this ? a : null
                        } else a = null
                    } else a = null;
                    return a
                }, set: function () {
                }, configurable: !0
            }
        };

    function E(a, b, c) {
        for (var d in b) {
            var e = Object.getOwnPropertyDescriptor(a, d);
            e && e.configurable || !e && c ? Object.defineProperty(a, d, b[d]) : c && console.warn("Could not define", d, "on", a)
        }
    }

    function F(a) {
        E(a, lc);
        E(a, mc);
        E(a, rc)
    }

    var sc = y.M ? function () {
    } : function (a) {
        a.__shady && a.__shady.Ba || (a.__shady = a.__shady || {}, a.__shady.Ba = !0, E(a, lc, !0))
    }, tc = y.M ? function () {
    } : function (a) {
        a.__shady && a.__shady.za || (a.__shady = a.__shady || {}, a.__shady.za = !0, E(a, mc, !0), E(a, qc, !0))
    };

    function uc(a, b, c) {
        sc(a);
        c = c || null;
        a.__shady = a.__shady || {};
        b.__shady = b.__shady || {};
        c && (c.__shady = c.__shady || {});
        a.__shady.previousSibling = c ? c.__shady.previousSibling : b.lastChild;
        var d = a.__shady.previousSibling;
        d && d.__shady && (d.__shady.nextSibling = a);
        (d = a.__shady.nextSibling = c) && d.__shady && (d.__shady.previousSibling = a);
        a.__shady.parentNode = b;
        c ? c === b.__shady.firstChild && (b.__shady.firstChild = a) : (b.__shady.lastChild = a, b.__shady.firstChild || (b.__shady.firstChild = a));
        b.__shady.childNodes = null
    }

    function vc(a) {
        if (!a.__shady || void 0 === a.__shady.firstChild) {
            a.__shady = a.__shady || {};
            a.__shady.firstChild = B.firstChild(a);
            a.__shady.lastChild = B.lastChild(a);
            tc(a);
            for (var b = a.__shady.childNodes = B.childNodes(a), c = 0, d; c < b.length && (d = b[c]); c++) d.__shady = d.__shady || {}, d.__shady.parentNode = a, d.__shady.nextSibling = b[c + 1] || null, d.__shady.previousSibling = b[c - 1] || null, sc(d)
        }
    };

    function wc(a, b, c) {
        if (b === a) throw Error("Failed to execute 'appendChild' on 'Node': The new child element contains the parent.");
        if (c) {
            var d = c.__shady && c.__shady.parentNode;
            if (void 0 !== d && d !== a || void 0 === d && B.parentNode(c) !== a) throw Error("Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.");
        }
        if (c === b) return b;
        b.parentNode && xc(b.parentNode, b);
        d = rb(a);
        var e;
        if (e = d) a:{
            if (!b.__noInsertionPoint) {
                var f;
                "slot" === b.localName ? f = [b] :
                    b.querySelectorAll && (f = b.querySelectorAll("slot"));
                if (f && f.length) {
                    e = f;
                    break a
                }
            }
            e = void 0
        }
        (f = e) && d.H.push.apply(d.H, [].concat(f instanceof Array ? f : ja(ia(f))));
        d && ("slot" === a.localName || f) && yc(d);
        if (qb(a)) {
            d = c;
            tc(a);
            a.__shady = a.__shady || {};
            void 0 !== a.__shady.firstChild && (a.__shady.childNodes = null);
            if (b.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                f = b.childNodes;
                for (e = 0; e < f.length; e++) uc(f[e], a, d);
                b.__shady = b.__shady || {};
                d = void 0 !== b.__shady.firstChild ? null : void 0;
                b.__shady.firstChild = b.__shady.lastChild =
                    d;
                b.__shady.childNodes = d
            } else uc(b, a, d);
            if (zc(a)) {
                yc(a.__shady.root);
                var h = !0
            } else a.__shady.root && (h = !0)
        }
        h || (h = z(a) ? a.host : a, c ? (c = Ac(c), A.insertBefore.call(h, b, c)) : A.appendChild.call(h, b));
        Bc(a, b);
        return b
    }

    function xc(a, b) {
        if (b.parentNode !== a) throw Error("The node to be removed is not a child of this node: " + b);
        var c = rb(b);
        if (qb(a)) {
            b.__shady = b.__shady || {};
            a.__shady = a.__shady || {};
            b === a.__shady.firstChild && (a.__shady.firstChild = b.__shady.nextSibling);
            b === a.__shady.lastChild && (a.__shady.lastChild = b.__shady.previousSibling);
            var d = b.__shady.previousSibling, e = b.__shady.nextSibling;
            d && (d.__shady = d.__shady || {}, d.__shady.nextSibling = e);
            e && (e.__shady = e.__shady || {}, e.__shady.previousSibling = d);
            b.__shady.parentNode =
                b.__shady.previousSibling = b.__shady.nextSibling = void 0;
            void 0 !== a.__shady.childNodes && (a.__shady.childNodes = null);
            if (zc(a)) {
                yc(a.__shady.root);
                var f = !0
            }
        }
        Cc(b);
        if (c) {
            (d = a && "slot" === a.localName) && (f = !0);
            Dc(c);
            e = c.l;
            for (var h in e) for (var g = e[h], k = 0; k < g.length; k++) {
                var l = g[k];
                if (Cb(b, l)) {
                    g.splice(k, 1);
                    var m = c.s.indexOf(l);
                    0 <= m && c.s.splice(m, 1);
                    k--;
                    if (m = l.__shady.K) for (l = 0; l < m.length; l++) {
                        var n = m[l], w = B.parentNode(n);
                        w && A.removeChild.call(w, n)
                    }
                    m = !0
                }
            }
            (m || d) && yc(c)
        }
        f || (f = z(a) ? a.host : a, (!a.__shady.root &&
            "slot" !== b.localName || f === B.parentNode(b)) && A.removeChild.call(f, b));
        Bc(a, null, b);
        return b
    }

    function Cc(a) {
        if (a.__shady && void 0 !== a.__shady.ka) for (var b = a.childNodes, c = 0, d = b.length, e; c < d && (e = b[c]); c++) Cc(e);
        a.__shady && (a.__shady.ka = void 0)
    }

    function Ac(a) {
        var b = a;
        a && "slot" === a.localName && (b = (b = a.__shady && a.__shady.K) && b.length ? b[0] : Ac(a.nextSibling));
        return b
    }

    function zc(a) {
        return (a = a && a.__shady && a.__shady.root) && Ec(a)
    }

    function Fc(a, b) {
        if ("slot" === b) a = a.parentNode, zc(a) && yc(a.__shady.root); else if ("slot" === a.localName && "name" === b && (b = rb(a))) {
            var c = a.Ca, d = Gc(a);
            if (d !== c) {
                c = b.l[c];
                var e = c.indexOf(a);
                0 <= e && c.splice(e, 1);
                c = b.l[d] || (b.l[d] = []);
                c.push(a);
                1 < c.length && (b.l[d] = Hc(c))
            }
            yc(b)
        }
    }

    function Bc(a, b, c) {
        if (a = a.__shady && a.__shady.N) b && a.addedNodes.push(b), c && a.removedNodes.push(c), Ib(a)
    }

    function Ic(a) {
        if (a && a.nodeType) {
            a.__shady = a.__shady || {};
            var b = a.__shady.ka;
            void 0 === b && (z(a) ? b = a : b = (b = a.parentNode) ? Ic(b) : a, A.contains.call(document.documentElement, a) && (a.__shady.ka = b));
            return b
        }
    }

    function Jc(a, b, c) {
        var d = [];
        Kc(a.childNodes, b, c, d);
        return d
    }

    function Kc(a, b, c, d) {
        for (var e = 0, f = a.length, h; e < f && (h = a[e]); e++) {
            var g;
            if (g = h.nodeType === Node.ELEMENT_NODE) {
                g = h;
                var k = b, l = c, m = d, n = k(g);
                n && m.push(g);
                l && l(n) ? g = n : (Kc(g.childNodes, k, l, m), g = void 0)
            }
            if (g) break
        }
    }

    var Lc = null;

    function Mc(a, b, c) {
        Lc || (Lc = window.ShadyCSS && window.ShadyCSS.ScopingShim);
        Lc && "class" === b ? Lc.setElementClass(a, c) : (A.setAttribute.call(a, b, c), Fc(a, b))
    }

    function Nc(a, b) {
        if (a.ownerDocument !== document) return A.importNode.call(document, a, b);
        var c = A.importNode.call(document, a, !1);
        if (b) {
            a = a.childNodes;
            b = 0;
            for (var d; b < a.length; b++) d = Nc(a[b], !0), c.appendChild(d)
        }
        return c
    };var Oc = "__eventWrappers" + Date.now(), Pc = {
        blur: !0,
        focus: !0,
        focusin: !0,
        focusout: !0,
        click: !0,
        dblclick: !0,
        mousedown: !0,
        mouseenter: !0,
        mouseleave: !0,
        mousemove: !0,
        mouseout: !0,
        mouseover: !0,
        mouseup: !0,
        wheel: !0,
        beforeinput: !0,
        input: !0,
        keydown: !0,
        keyup: !0,
        compositionstart: !0,
        compositionupdate: !0,
        compositionend: !0,
        touchstart: !0,
        touchend: !0,
        touchmove: !0,
        touchcancel: !0,
        pointerover: !0,
        pointerenter: !0,
        pointerdown: !0,
        pointermove: !0,
        pointerup: !0,
        pointercancel: !0,
        pointerout: !0,
        pointerleave: !0,
        gotpointercapture: !0,
        lostpointercapture: !0,
        dragstart: !0,
        drag: !0,
        dragenter: !0,
        dragleave: !0,
        dragover: !0,
        drop: !0,
        dragend: !0,
        DOMActivate: !0,
        DOMFocusIn: !0,
        DOMFocusOut: !0,
        keypress: !0
    };

    function Qc(a, b) {
        var c = [], d = a;
        for (a = a === window ? window : a.getRootNode(); d;) c.push(d), d = d.assignedSlot ? d.assignedSlot : d.nodeType === Node.DOCUMENT_FRAGMENT_NODE && d.host && (b || d !== a) ? d.host : d.parentNode;
        c[c.length - 1] === document && c.push(window);
        return c
    }

    function Rc(a, b) {
        if (!z) return a;
        a = Qc(a, !0);
        for (var c = 0, d, e, f, h; c < b.length; c++) if (d = b[c], f = d === window ? window : d.getRootNode(), f !== e && (h = a.indexOf(f), e = f), !z(f) || -1 < h) return d
    }

    var Sc = {
        get composed() {
            !1 !== this.isTrusted && void 0 === this.Z && (this.Z = Pc[this.type]);
            return this.Z || !1
        }, composedPath: function () {
            this.na || (this.na = Qc(this.__target, this.composed));
            return this.na
        }, get target() {
            return Rc(this.currentTarget, this.composedPath())
        }, get relatedTarget() {
            if (!this.aa) return null;
            this.oa || (this.oa = Qc(this.aa, !0));
            return Rc(this.currentTarget, this.oa)
        }, stopPropagation: function () {
            Event.prototype.stopPropagation.call(this);
            this.$ = !0
        }, stopImmediatePropagation: function () {
            Event.prototype.stopImmediatePropagation.call(this);
            this.$ = this.ya = !0
        }
    };

    function Tc(a) {
        function b(b, d) {
            b = new a(b, d);
            b.Z = d && !!d.composed;
            return b
        }

        wb(b, a);
        b.prototype = a.prototype;
        return b
    }

    var Uc = {focus: !0, blur: !0};

    function Vc(a) {
        return a.__target !== a.target || a.aa !== a.relatedTarget
    }

    function Wc(a, b, c) {
        if (c = b.__handlers && b.__handlers[a.type] && b.__handlers[a.type][c]) for (var d = 0, e; (e = c[d]) && (!Vc(a) || a.target !== a.relatedTarget) && (e.call(b, a), !a.ya); d++) ;
    }

    function Xc(a) {
        var b = a.composedPath();
        Object.defineProperty(a, "currentTarget", {
            get: function () {
                return d
            }, configurable: !0
        });
        for (var c = b.length - 1; 0 <= c; c--) {
            var d = b[c];
            Wc(a, d, "capture");
            if (a.$) return
        }
        Object.defineProperty(a, "eventPhase", {
            get: function () {
                return Event.AT_TARGET
            }
        });
        var e;
        for (c = 0; c < b.length; c++) {
            d = b[c];
            var f = d.__shady && d.__shady.root;
            if (0 === c || f && f === e) if (Wc(a, d, "bubble"), d !== window && (e = d.getRootNode()), a.$) break
        }
    }

    function Yc(a, b, c, d, e, f) {
        for (var h = 0; h < a.length; h++) {
            var g = a[h], k = g.type, l = g.capture, m = g.once, n = g.passive;
            if (b === g.node && c === k && d === l && e === m && f === n) return h
        }
        return -1
    }

    function Zc(a, b, c) {
        if (b) {
            if (c && "object" === typeof c) {
                var d = !!c.capture;
                var e = !!c.once;
                var f = !!c.passive
            } else d = !!c, f = e = !1;
            var h = c && c.ba || this, g = b[Oc];
            if (g) {
                if (-1 < Yc(g, h, a, d, e, f)) return
            } else b[Oc] = [];
            g = function (d) {
                e && this.removeEventListener(a, b, c);
                d.__target || $c(d);
                if (h !== this) {
                    var f = Object.getOwnPropertyDescriptor(d, "currentTarget");
                    Object.defineProperty(d, "currentTarget", {
                        get: function () {
                            return h
                        }, configurable: !0
                    })
                }
                if (d.composed || -1 < d.composedPath().indexOf(h)) if (Vc(d) && d.target === d.relatedTarget) d.eventPhase ===
                Event.BUBBLING_PHASE && d.stopImmediatePropagation(); else if (d.eventPhase === Event.CAPTURING_PHASE || d.bubbles || d.target === h || h instanceof Window) {
                    var g = "object" === typeof b && b.handleEvent ? b.handleEvent(d) : b.call(h, d);
                    h !== this && (f ? (Object.defineProperty(d, "currentTarget", f), f = null) : delete d.currentTarget);
                    return g
                }
            };
            b[Oc].push({node: this, type: a, capture: d, once: e, passive: f, cb: g});
            Uc[a] ? (this.__handlers = this.__handlers || {}, this.__handlers[a] = this.__handlers[a] || {
                capture: [],
                bubble: []
            }, this.__handlers[a][d ?
                "capture" : "bubble"].push(g)) : (this instanceof Window ? A.ab : A.addEventListener).call(this, a, g, c)
        }
    }

    function ad(a, b, c) {
        if (b) {
            if (c && "object" === typeof c) {
                var d = !!c.capture;
                var e = !!c.once;
                var f = !!c.passive
            } else d = !!c, f = e = !1;
            var h = c && c.ba || this, g = void 0;
            var k = null;
            try {
                k = b[Oc]
            } catch (l) {
            }
            k && (e = Yc(k, h, a, d, e, f), -1 < e && (g = k.splice(e, 1)[0].cb, k.length || (b[Oc] = void 0)));
            (this instanceof Window ? A.bb : A.removeEventListener).call(this, a, g || b, c);
            g && Uc[a] && this.__handlers && this.__handlers[a] && (a = this.__handlers[a][d ? "capture" : "bubble"], g = a.indexOf(g), -1 < g && a.splice(g, 1))
        }
    }

    function bd() {
        for (var a in Uc) window.addEventListener(a, function (a) {
            a.__target || ($c(a), Xc(a))
        }, !0)
    }

    function $c(a) {
        a.__target = a.target;
        a.aa = a.relatedTarget;
        if (y.M) {
            var b = Object.getPrototypeOf(a);
            if (!b.hasOwnProperty("__patchProto")) {
                var c = Object.create(b);
                c.fb = b;
                ub(c, Sc);
                b.__patchProto = c
            }
            a.__proto__ = b.__patchProto
        } else ub(a, Sc)
    }

    var cd = Tc(window.Event), dd = Tc(window.CustomEvent), ed = Tc(window.MouseEvent);

    function fd(a, b) {
        return {index: a, O: [], U: b}
    }

    function gd(a, b, c, d) {
        var e = 0, f = 0, h = 0, g = 0, k = Math.min(b - e, d - f);
        if (0 == e && 0 == f) a:{
            for (h = 0; h < k; h++) if (a[h] !== c[h]) break a;
            h = k
        }
        if (b == a.length && d == c.length) {
            g = a.length;
            for (var l = c.length, m = 0; m < k - h && hd(a[--g], c[--l]);) m++;
            g = m
        }
        e += h;
        f += h;
        b -= g;
        d -= g;
        if (0 == b - e && 0 == d - f) return [];
        if (e == b) {
            for (b = fd(e, 0); f < d;) b.O.push(c[f++]);
            return [b]
        }
        if (f == d) return [fd(e, b - e)];
        k = e;
        h = f;
        d = d - h + 1;
        g = b - k + 1;
        b = Array(d);
        for (l = 0; l < d; l++) b[l] = Array(g), b[l][0] = l;
        for (l = 0; l < g; l++) b[0][l] = l;
        for (l = 1; l < d; l++) for (m = 1; m < g; m++) if (a[k + m - 1] === c[h + l - 1]) b[l][m] =
            b[l - 1][m - 1]; else {
            var n = b[l - 1][m] + 1, w = b[l][m - 1] + 1;
            b[l][m] = n < w ? n : w
        }
        k = b.length - 1;
        h = b[0].length - 1;
        d = b[k][h];
        for (a = []; 0 < k || 0 < h;) 0 == k ? (a.push(2), h--) : 0 == h ? (a.push(3), k--) : (g = b[k - 1][h - 1], l = b[k - 1][h], m = b[k][h - 1], n = l < m ? l < g ? l : g : m < g ? m : g, n == g ? (g == d ? a.push(0) : (a.push(1), d = g), k--, h--) : n == l ? (a.push(3), k--, d = l) : (a.push(2), h--, d = m));
        a.reverse();
        b = void 0;
        k = [];
        for (h = 0; h < a.length; h++) switch (a[h]) {
            case 0:
                b && (k.push(b), b = void 0);
                e++;
                f++;
                break;
            case 1:
                b || (b = fd(e, 0));
                b.U++;
                e++;
                b.O.push(c[f]);
                f++;
                break;
            case 2:
                b || (b = fd(e, 0));
                b.U++;
                e++;
                break;
            case 3:
                b || (b = fd(e, 0)), b.O.push(c[f]), f++
        }
        b && k.push(b);
        return k
    }

    function hd(a, b) {
        return a === b
    };var id = {};

    function G(a, b, c) {
        if (a !== id) throw new TypeError("Illegal constructor");
        a = document.createDocumentFragment();
        a.__proto__ = G.prototype;
        a.Aa = "ShadyRoot";
        vc(b);
        vc(a);
        a.host = b;
        a.a = c && c.mode;
        b.__shady = b.__shady || {};
        b.__shady.root = a;
        b.__shady.Ua = "closed" !== a.a ? a : null;
        a.T = !1;
        a.s = [];
        a.l = {};
        a.H = [];
        c = B.childNodes(b);
        for (var d = 0, e = c.length; d < e; d++) A.removeChild.call(b, c[d]);
        return a
    }

    G.prototype = Object.create(DocumentFragment.prototype);

    function yc(a) {
        a.T || (a.T = !0, Fb(function () {
            return jd(a)
        }))
    }

    function jd(a) {
        for (var b; a;) {
            a.T && (b = a);
            a:{
                var c = a;
                a = c.host.getRootNode();
                if (z(a)) for (var d = c.host.childNodes, e = 0; e < d.length; e++) if (c = d[e], "slot" == c.localName) break a;
                a = void 0
            }
        }
        b && b._renderRoot()
    }

    G.prototype._renderRoot = function () {
        this.T = !1;
        Dc(this);
        for (var a = 0, b; a < this.s.length; a++) {
            b = this.s[a];
            var c = b.__shady.assignedNodes;
            b.__shady.assignedNodes = [];
            b.__shady.K = [];
            if (b.__shady.qa = c) for (var d = 0; d < c.length; d++) {
                var e = c[d];
                e.__shady.ga = e.__shady.assignedSlot;
                e.__shady.assignedSlot === b && (e.__shady.assignedSlot = null)
            }
        }
        for (b = this.host.firstChild; b; b = b.nextSibling) kd(this, b);
        for (a = 0; a < this.s.length; a++) {
            b = this.s[a];
            if (!b.__shady.assignedNodes.length) for (c = b.firstChild; c; c = c.nextSibling) kd(this,
                c, b);
            c = b.parentNode;
            (c = c.__shady && c.__shady.root) && Ec(c) && c._renderRoot();
            ld(this, b.__shady.K, b.__shady.assignedNodes);
            if (c = b.__shady.qa) {
                for (d = 0; d < c.length; d++) c[d].__shady.ga = null;
                b.__shady.qa = null;
                c.length > b.__shady.assignedNodes.length && (b.__shady.ia = !0)
            }
            b.__shady.ia && (b.__shady.ia = !1, md(this, b))
        }
        a = this.s;
        b = [];
        for (c = 0; c < a.length; c++) d = a[c].parentNode, d.__shady && d.__shady.root || !(0 > b.indexOf(d)) || b.push(d);
        for (a = 0; a < b.length; a++) {
            c = b[a];
            d = c === this ? this.host : c;
            e = [];
            c = c.childNodes;
            for (var f = 0; f <
            c.length; f++) {
                var h = c[f];
                if ("slot" == h.localName) {
                    h = h.__shady.K;
                    for (var g = 0; g < h.length; g++) e.push(h[g])
                } else e.push(h)
            }
            c = void 0;
            f = B.childNodes(d);
            h = gd(e, e.length, f, f.length);
            for (var k = g = 0; g < h.length && (c = h[g]); g++) {
                for (var l = 0, m; l < c.O.length && (m = c.O[l]); l++) B.parentNode(m) === d && A.removeChild.call(d, m), f.splice(c.index + k, 1);
                k -= c.U
            }
            for (k = 0; k < h.length && (c = h[k]); k++) for (g = f[c.index], l = c.index; l < c.index + c.U; l++) m = e[l], A.insertBefore.call(d, m, g), f.splice(l, 0, m)
        }
    };

    function kd(a, b, c) {
        b.__shady = b.__shady || {};
        var d = b.__shady.ga;
        b.__shady.ga = null;
        c || (c = (a = a.l[b.slot || "__catchall"]) && a[0]);
        c ? (c.__shady.assignedNodes.push(b), b.__shady.assignedSlot = c) : b.__shady.assignedSlot = void 0;
        d !== b.__shady.assignedSlot && b.__shady.assignedSlot && (b.__shady.assignedSlot.__shady.ia = !0)
    }

    function ld(a, b, c) {
        for (var d = 0, e; d < c.length && (e = c[d]); d++) if ("slot" == e.localName) {
            var f = e.__shady.assignedNodes;
            f && f.length && ld(a, b, f)
        } else b.push(c[d])
    }

    function md(a, b) {
        A.dispatchEvent.call(b, new Event("slotchange"));
        b.__shady.assignedSlot && md(a, b.__shady.assignedSlot)
    }

    function Dc(a) {
        if (a.H.length) {
            for (var b = a.H, c, d = 0; d < b.length; d++) {
                var e = b[d];
                e.__shady = e.__shady || {};
                vc(e);
                vc(e.parentNode);
                var f = Gc(e);
                a.l[f] ? (c = c || {}, c[f] = !0, a.l[f].push(e)) : a.l[f] = [e];
                a.s.push(e)
            }
            if (c) for (var h in c) a.l[h] = Hc(a.l[h]);
            a.H = []
        }
    }

    function Gc(a) {
        var b = a.name || a.getAttribute("name") || "__catchall";
        return a.Ca = b
    }

    function Hc(a) {
        return a.sort(function (a, c) {
            a = nd(a);
            for (var b = nd(c), e = 0; e < a.length; e++) {
                c = a[e];
                var f = b[e];
                if (c !== f) return a = Array.from(c.parentNode.childNodes), a.indexOf(c) - a.indexOf(f)
            }
        })
    }

    function nd(a) {
        var b = [];
        do b.unshift(a); while (a = a.parentNode);
        return b
    }

    function Ec(a) {
        Dc(a);
        return !!a.s.length
    }

    G.prototype.addEventListener = function (a, b, c) {
        "object" !== typeof c && (c = {capture: !!c});
        c.ba = this;
        this.host.addEventListener(a, b, c)
    };
    G.prototype.removeEventListener = function (a, b, c) {
        "object" !== typeof c && (c = {capture: !!c});
        c.ba = this;
        this.host.removeEventListener(a, b, c)
    };
    G.prototype.getElementById = function (a) {
        return Jc(this, function (b) {
            return b.id == a
        }, function (a) {
            return !!a
        })[0] || null
    };
    var od = G.prototype;
    E(od, mc, !0);
    E(od, rc, !0);

    function pd(a) {
        var b = a.getRootNode();
        z(b) && jd(b);
        return a.__shady && a.__shady.assignedSlot || null
    }

    var qd = {addEventListener: Zc.bind(window), removeEventListener: ad.bind(window)}, rd = {
        addEventListener: Zc, removeEventListener: ad, appendChild: function (a) {
            return wc(this, a)
        }, insertBefore: function (a, b) {
            return wc(this, a, b)
        }, removeChild: function (a) {
            return xc(this, a)
        }, replaceChild: function (a, b) {
            wc(this, a, b);
            xc(this, b);
            return a
        }, cloneNode: function (a) {
            if ("template" == this.localName) var b = A.cloneNode.call(this, a); else if (b = A.cloneNode.call(this, !1), a) {
                a = this.childNodes;
                for (var c = 0, d; c < a.length; c++) d = a[c].cloneNode(!0),
                    b.appendChild(d)
            }
            return b
        }, getRootNode: function () {
            return Ic(this)
        }, contains: function (a) {
            return Cb(this, a)
        }, get isConnected() {
            var a = this.ownerDocument;
            if (Bb && A.contains.call(a, this) || a.documentElement && A.contains.call(a.documentElement, this)) return !0;
            for (a = this; a && !(a instanceof Document);) a = a.parentNode || (a instanceof G ? a.host : void 0);
            return !!(a && a instanceof Document)
        }, dispatchEvent: function (a) {
            Gb();
            return A.dispatchEvent.call(this, a)
        }
    }, sd = {
        get assignedSlot() {
            return pd(this)
        }
    }, td = {
        querySelector: function (a) {
            return Jc(this,
                function (b) {
                    return tb.call(b, a)
                }, function (a) {
                    return !!a
                })[0] || null
        }, querySelectorAll: function (a) {
            return Jc(this, function (b) {
                return tb.call(b, a)
            })
        }
    }, ud = {
        assignedNodes: function (a) {
            if ("slot" === this.localName) {
                var b = this.getRootNode();
                z(b) && jd(b);
                return this.__shady ? (a && a.flatten ? this.__shady.K : this.__shady.assignedNodes) || [] : []
            }
        }
    }, vd = vb({
        setAttribute: function (a, b) {
            Mc(this, a, b)
        }, removeAttribute: function (a) {
            A.removeAttribute.call(this, a);
            Fc(this, a)
        }, attachShadow: function (a) {
            if (!this) throw"Must provide a host.";
            if (!a) throw"Not enough arguments.";
            return new G(id, this, a)
        }, get slot() {
            return this.getAttribute("slot")
        }, set slot(a) {
            Mc(this, "slot", a)
        }, get assignedSlot() {
            return pd(this)
        }
    }, td, ud);
    Object.defineProperties(vd, qc);
    var wd = vb({
        importNode: function (a, b) {
            return Nc(a, b)
        }, getElementById: function (a) {
            return Jc(this, function (b) {
                return b.id == a
            }, function (a) {
                return !!a
            })[0] || null
        }
    }, td);
    Object.defineProperties(wd, {_activeElement: rc.activeElement});
    var xd = HTMLElement.prototype.blur, yd = vb({
        blur: function () {
            var a = this.__shady && this.__shady.root;
            (a = a && a.activeElement) ? a.blur() : xd.call(this)
        }
    });

    function H(a, b) {
        for (var c = Object.getOwnPropertyNames(b), d = 0; d < c.length; d++) {
            var e = c[d], f = Object.getOwnPropertyDescriptor(b, e);
            f.value ? a[e] = f.value : Object.defineProperty(a, e, f)
        }
    };
    if (y.ta) {
        var ShadyDOM = {
            inUse: y.ta,
            patch: function (a) {
                return a
            },
            isShadyRoot: z,
            enqueue: Fb,
            flush: Gb,
            settings: y,
            filterMutations: Mb,
            observeChildren: Kb,
            unobserveChildren: Lb,
            nativeMethods: A,
            nativeTree: B
        };
        window.ShadyDOM = ShadyDOM;
        window.Event = cd;
        window.CustomEvent = dd;
        window.MouseEvent = ed;
        bd();
        var zd = window.customElements && window.customElements.nativeHTMLElement || HTMLElement;
        H(window.Node.prototype, rd);
        H(window.Window.prototype, qd);
        H(window.Text.prototype, sd);
        H(window.DocumentFragment.prototype, td);
        H(window.Element.prototype,
            vd);
        H(window.Document.prototype, wd);
        window.HTMLSlotElement && H(window.HTMLSlotElement.prototype, ud);
        H(zd.prototype, yd);
        y.M && (F(window.Node.prototype), F(window.Text.prototype), F(window.DocumentFragment.prototype), F(window.Element.prototype), F(zd.prototype), F(window.Document.prototype), window.HTMLSlotElement && F(window.HTMLSlotElement.prototype));
        window.ShadowRoot = G
    }
    ;var Ad = new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));

    function Bd(a) {
        var b = Ad.has(a);
        a = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);
        return !b && a
    }

    function J(a) {
        var b = a.isConnected;
        if (void 0 !== b) return b;
        for (; a && !(a.__CE_isImportDocument || a instanceof Document);) a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);
        return !(!a || !(a.__CE_isImportDocument || a instanceof Document))
    }

    function Cd(a, b) {
        for (; b && b !== a && !b.nextSibling;) b = b.parentNode;
        return b && b !== a ? b.nextSibling : null
    }

    function K(a, b, c) {
        c = void 0 === c ? new Set : c;
        for (var d = a; d;) {
            if (d.nodeType === Node.ELEMENT_NODE) {
                var e = d;
                b(e);
                var f = e.localName;
                if ("link" === f && "import" === e.getAttribute("rel")) {
                    d = e.import;
                    if (d instanceof Node && !c.has(d)) for (c.add(d), d = d.firstChild; d; d = d.nextSibling) K(d, b, c);
                    d = Cd(a, e);
                    continue
                } else if ("template" === f) {
                    d = Cd(a, e);
                    continue
                }
                if (e = e.__CE_shadowRoot) for (e = e.firstChild; e; e = e.nextSibling) K(e, b, c)
            }
            d = d.firstChild ? d.firstChild : Cd(a, d)
        }
    }

    function L(a, b, c) {
        a[b] = c
    };

    function Dd() {
        this.a = new Map;
        this.o = new Map;
        this.h = [];
        this.c = !1
    }

    function Ed(a, b, c) {
        a.a.set(b, c);
        a.o.set(c.constructor, c)
    }

    function Fd(a, b) {
        a.c = !0;
        a.h.push(b)
    }

    function Gd(a, b) {
        a.c && K(b, function (b) {
            return a.b(b)
        })
    }

    Dd.prototype.b = function (a) {
        if (this.c && !a.__CE_patched) {
            a.__CE_patched = !0;
            for (var b = 0; b < this.h.length; b++) this.h[b](a)
        }
    };

    function M(a, b) {
        var c = [];
        K(b, function (a) {
            return c.push(a)
        });
        for (b = 0; b < c.length; b++) {
            var d = c[b];
            1 === d.__CE_state ? a.connectedCallback(d) : Hd(a, d)
        }
    }

    function N(a, b) {
        var c = [];
        K(b, function (a) {
            return c.push(a)
        });
        for (b = 0; b < c.length; b++) {
            var d = c[b];
            1 === d.__CE_state && a.disconnectedCallback(d)
        }
    }

    function O(a, b, c) {
        c = void 0 === c ? {} : c;
        var d = c.$a || new Set, e = c.wa || function (b) {
            return Hd(a, b)
        }, f = [];
        K(b, function (b) {
            if ("link" === b.localName && "import" === b.getAttribute("rel")) {
                var c = b.import;
                c instanceof Node && (c.__CE_isImportDocument = !0, c.__CE_hasRegistry = !0);
                c && "complete" === c.readyState ? c.__CE_documentLoadHandled = !0 : b.addEventListener("load", function () {
                    var c = b.import;
                    if (!c.__CE_documentLoadHandled) {
                        c.__CE_documentLoadHandled = !0;
                        var f = new Set(d);
                        f.delete(c);
                        O(a, c, {$a: f, wa: e})
                    }
                })
            } else f.push(b)
        }, d);
        if (a.c) for (b =
                          0; b < f.length; b++) a.b(f[b]);
        for (b = 0; b < f.length; b++) e(f[b])
    }

    function Hd(a, b) {
        if (void 0 === b.__CE_state) {
            var c = b.ownerDocument;
            if (c.defaultView || c.__CE_isImportDocument && c.__CE_hasRegistry) if (c = a.a.get(b.localName)) {
                c.constructionStack.push(b);
                var d = c.constructor;
                try {
                    try {
                        if (new d !== b) throw Error("The custom element constructor did not produce the element being upgraded.");
                    } finally {
                        c.constructionStack.pop()
                    }
                } catch (h) {
                    throw b.__CE_state = 2, h;
                }
                b.__CE_state = 1;
                b.__CE_definition = c;
                if (c.attributeChangedCallback) for (c = c.observedAttributes, d = 0; d < c.length; d++) {
                    var e = c[d],
                        f = b.getAttribute(e);
                    null !== f && a.attributeChangedCallback(b, e, null, f, null)
                }
                J(b) && a.connectedCallback(b)
            }
        }
    }

    Dd.prototype.connectedCallback = function (a) {
        var b = a.__CE_definition;
        b.connectedCallback && b.connectedCallback.call(a)
    };
    Dd.prototype.disconnectedCallback = function (a) {
        var b = a.__CE_definition;
        b.disconnectedCallback && b.disconnectedCallback.call(a)
    };
    Dd.prototype.attributeChangedCallback = function (a, b, c, d, e) {
        var f = a.__CE_definition;
        f.attributeChangedCallback && -1 < f.observedAttributes.indexOf(b) && f.attributeChangedCallback.call(a, b, c, d, e)
    };

    function Id(a) {
        var b = document;
        this.j = a;
        this.a = b;
        this.C = void 0;
        O(this.j, this.a);
        "loading" === this.a.readyState && (this.C = new MutationObserver(this.b.bind(this)), this.C.observe(this.a, {
            childList: !0,
            subtree: !0
        }))
    }

    function Jd(a) {
        a.C && a.C.disconnect()
    }

    Id.prototype.b = function (a) {
        var b = this.a.readyState;
        "interactive" !== b && "complete" !== b || Jd(this);
        for (b = 0; b < a.length; b++) for (var c = a[b].addedNodes, d = 0; d < c.length; d++) O(this.j, c[d])
    };

    function Kd() {
        var a = this;
        this.b = this.a = void 0;
        this.c = new Promise(function (b) {
            a.b = b;
            a.a && b(a.a)
        })
    }

    Kd.prototype.resolve = function (a) {
        if (this.a) throw Error("Already resolved.");
        this.a = a;
        this.b && this.b(a)
    };

    function P(a) {
        this.da = !1;
        this.j = a;
        this.ha = new Map;
        this.ea = function (a) {
            return a()
        };
        this.R = !1;
        this.fa = [];
        this.Fa = new Id(a)
    }

    P.prototype.define = function (a, b) {
        var c = this;
        if (!(b instanceof Function)) throw new TypeError("Custom element constructors must be functions.");
        if (!Bd(a)) throw new SyntaxError("The element name '" + a + "' is not valid.");
        if (this.j.a.get(a)) throw Error("A custom element with name '" + a + "' has already been defined.");
        if (this.da) throw Error("A custom element is already being defined.");
        this.da = !0;
        try {
            var d = function (a) {
                var b = e[a];
                if (void 0 !== b && !(b instanceof Function)) throw Error("The '" + a + "' callback must be a function.");
                return b
            }, e = b.prototype;
            if (!(e instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");
            var f = d("connectedCallback");
            var h = d("disconnectedCallback");
            var g = d("adoptedCallback");
            var k = d("attributeChangedCallback");
            var l = b.observedAttributes || []
        } catch (m) {
            return
        } finally {
            this.da = !1
        }
        b = {
            localName: a,
            constructor: b,
            connectedCallback: f,
            disconnectedCallback: h,
            adoptedCallback: g,
            attributeChangedCallback: k,
            observedAttributes: l,
            constructionStack: []
        };
        Ed(this.j, a, b);
        this.fa.push(b);
        this.R || (this.R = !0, this.ea(function () {
            return Ld(c)
        }))
    };

    function Ld(a) {
        if (!1 !== a.R) {
            a.R = !1;
            for (var b = a.fa, c = [], d = new Map, e = 0; e < b.length; e++) d.set(b[e].localName, []);
            O(a.j, document, {
                wa: function (b) {
                    if (void 0 === b.__CE_state) {
                        var e = b.localName, f = d.get(e);
                        f ? f.push(b) : a.j.a.get(e) && c.push(b)
                    }
                }
            });
            for (e = 0; e < c.length; e++) Hd(a.j, c[e]);
            for (; 0 < b.length;) {
                var f = b.shift();
                e = f.localName;
                f = d.get(f.localName);
                for (var h = 0; h < f.length; h++) Hd(a.j, f[h]);
                (e = a.ha.get(e)) && e.resolve(void 0)
            }
        }
    }

    P.prototype.get = function (a) {
        if (a = this.j.a.get(a)) return a.constructor
    };
    P.prototype.whenDefined = function (a) {
        if (!Bd(a)) return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));
        var b = this.ha.get(a);
        if (b) return b.c;
        b = new Kd;
        this.ha.set(a, b);
        this.j.a.get(a) && !this.fa.some(function (b) {
            return b.localName === a
        }) && b.resolve(void 0);
        return b.c
    };
    P.prototype.Ta = function (a) {
        Jd(this.Fa);
        var b = this.ea;
        this.ea = function (c) {
            return a(function () {
                return b(c)
            })
        }
    };
    window.CustomElementRegistry = P;
    P.prototype.define = P.prototype.define;
    P.prototype.get = P.prototype.get;
    P.prototype.whenDefined = P.prototype.whenDefined;
    P.prototype.polyfillWrapFlushCallback = P.prototype.Ta;
    var Md = window.Document.prototype.createElement, Nd = window.Document.prototype.createElementNS,
        Od = window.Document.prototype.importNode, Pd = window.Document.prototype.prepend,
        Qd = window.Document.prototype.append, Rd = window.DocumentFragment.prototype.prepend,
        Sd = window.DocumentFragment.prototype.append, Td = window.Node.prototype.cloneNode,
        Ud = window.Node.prototype.appendChild, Vd = window.Node.prototype.insertBefore,
        Wd = window.Node.prototype.removeChild, Xd = window.Node.prototype.replaceChild,
        Yd = Object.getOwnPropertyDescriptor(window.Node.prototype,
            "textContent"), Zd = window.Element.prototype.attachShadow,
        $d = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
        ae = window.Element.prototype.getAttribute, be = window.Element.prototype.setAttribute,
        ce = window.Element.prototype.removeAttribute, de = window.Element.prototype.getAttributeNS,
        ee = window.Element.prototype.setAttributeNS, fe = window.Element.prototype.removeAttributeNS,
        ge = window.Element.prototype.insertAdjacentElement, he = window.Element.prototype.prepend,
        ie = window.Element.prototype.append,
        je = window.Element.prototype.before, ke = window.Element.prototype.after,
        le = window.Element.prototype.replaceWith, me = window.Element.prototype.remove, ne = window.HTMLElement,
        oe = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
        pe = window.HTMLElement.prototype.insertAdjacentElement;
    var qe = new function () {
    };

    function re() {
        var a = se;
        window.HTMLElement = function () {
            function b() {
                var b = this.constructor, d = a.o.get(b);
                if (!d) throw Error("The custom element being constructed was not registered with `customElements`.");
                var e = d.constructionStack;
                if (0 === e.length) return e = Md.call(document, d.localName), Object.setPrototypeOf(e, b.prototype), e.__CE_state = 1, e.__CE_definition = d, a.b(e), e;
                d = e.length - 1;
                var f = e[d];
                if (f === qe) throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
                e[d] = qe;
                Object.setPrototypeOf(f, b.prototype);
                a.b(f);
                return f
            }

            b.prototype = ne.prototype;
            return b
        }()
    };

    function te(a, b, c) {
        function d(b) {
            return function (c) {
                for (var d = [], e = 0; e < arguments.length; ++e) d[e - 0] = arguments[e];
                e = [];
                for (var f = [], l = 0; l < d.length; l++) {
                    var m = d[l];
                    m instanceof Element && J(m) && f.push(m);
                    if (m instanceof DocumentFragment) for (m = m.firstChild; m; m = m.nextSibling) e.push(m); else e.push(m)
                }
                b.apply(this, d);
                for (d = 0; d < f.length; d++) N(a, f[d]);
                if (J(this)) for (d = 0; d < e.length; d++) f = e[d], f instanceof Element && M(a, f)
            }
        }

        void 0 !== c.X && (b.prepend = d(c.X));
        void 0 !== c.append && (b.append = d(c.append))
    };

    function ue() {
        var a = se;
        L(Document.prototype, "createElement", function (b) {
            if (this.__CE_hasRegistry) {
                var c = a.a.get(b);
                if (c) return new c.constructor
            }
            b = Md.call(this, b);
            a.b(b);
            return b
        });
        L(Document.prototype, "importNode", function (b, c) {
            b = Od.call(this, b, c);
            this.__CE_hasRegistry ? O(a, b) : Gd(a, b);
            return b
        });
        L(Document.prototype, "createElementNS", function (b, c) {
            if (this.__CE_hasRegistry && (null === b || "http://www.w3.org/1999/xhtml" === b)) {
                var d = a.a.get(c);
                if (d) return new d.constructor
            }
            b = Nd.call(this, b, c);
            a.b(b);
            return b
        });
        te(a, Document.prototype, {X: Pd, append: Qd})
    };

    function ve() {
        var a = se;

        function b(b, d) {
            Object.defineProperty(b, "textContent", {
                enumerable: d.enumerable,
                configurable: !0,
                get: d.get,
                set: function (b) {
                    if (this.nodeType === Node.TEXT_NODE) d.set.call(this, b); else {
                        var c = void 0;
                        if (this.firstChild) {
                            var e = this.childNodes, g = e.length;
                            if (0 < g && J(this)) {
                                c = Array(g);
                                for (var k = 0; k < g; k++) c[k] = e[k]
                            }
                        }
                        d.set.call(this, b);
                        if (c) for (b = 0; b < c.length; b++) N(a, c[b])
                    }
                }
            })
        }

        L(Node.prototype, "insertBefore", function (b, d) {
            if (b instanceof DocumentFragment) {
                var c = Array.prototype.slice.apply(b.childNodes);
                b = Vd.call(this, b, d);
                if (J(this)) for (d = 0; d < c.length; d++) M(a, c[d]);
                return b
            }
            c = J(b);
            d = Vd.call(this, b, d);
            c && N(a, b);
            J(this) && M(a, b);
            return d
        });
        L(Node.prototype, "appendChild", function (b) {
            if (b instanceof DocumentFragment) {
                var c = Array.prototype.slice.apply(b.childNodes);
                b = Ud.call(this, b);
                if (J(this)) for (var e = 0; e < c.length; e++) M(a, c[e]);
                return b
            }
            c = J(b);
            e = Ud.call(this, b);
            c && N(a, b);
            J(this) && M(a, b);
            return e
        });
        L(Node.prototype, "cloneNode", function (b) {
            b = Td.call(this, b);
            this.ownerDocument.__CE_hasRegistry ? O(a, b) :
                Gd(a, b);
            return b
        });
        L(Node.prototype, "removeChild", function (b) {
            var c = J(b), e = Wd.call(this, b);
            c && N(a, b);
            return e
        });
        L(Node.prototype, "replaceChild", function (b, d) {
            if (b instanceof DocumentFragment) {
                var c = Array.prototype.slice.apply(b.childNodes);
                b = Xd.call(this, b, d);
                if (J(this)) for (N(a, d), d = 0; d < c.length; d++) M(a, c[d]);
                return b
            }
            c = J(b);
            var f = Xd.call(this, b, d), h = J(this);
            h && N(a, d);
            c && N(a, b);
            h && M(a, b);
            return f
        });
        Yd && Yd.get ? b(Node.prototype, Yd) : Fd(a, function (a) {
            b(a, {
                enumerable: !0, configurable: !0, get: function () {
                    for (var a =
                        [], b = 0; b < this.childNodes.length; b++) a.push(this.childNodes[b].textContent);
                    return a.join("")
                }, set: function (a) {
                    for (; this.firstChild;) Wd.call(this, this.firstChild);
                    Ud.call(this, document.createTextNode(a))
                }
            })
        })
    };

    function we(a) {
        var b = Element.prototype;

        function c(b) {
            return function (c) {
                for (var d = [], e = 0; e < arguments.length; ++e) d[e - 0] = arguments[e];
                e = [];
                for (var g = [], k = 0; k < d.length; k++) {
                    var l = d[k];
                    l instanceof Element && J(l) && g.push(l);
                    if (l instanceof DocumentFragment) for (l = l.firstChild; l; l = l.nextSibling) e.push(l); else e.push(l)
                }
                b.apply(this, d);
                for (d = 0; d < g.length; d++) N(a, g[d]);
                if (J(this)) for (d = 0; d < e.length; d++) g = e[d], g instanceof Element && M(a, g)
            }
        }

        void 0 !== je && (b.before = c(je));
        void 0 !== je && (b.after = c(ke));
        void 0 !==
        le && L(b, "replaceWith", function (b) {
            for (var c = [], d = 0; d < arguments.length; ++d) c[d - 0] = arguments[d];
            d = [];
            for (var h = [], g = 0; g < c.length; g++) {
                var k = c[g];
                k instanceof Element && J(k) && h.push(k);
                if (k instanceof DocumentFragment) for (k = k.firstChild; k; k = k.nextSibling) d.push(k); else d.push(k)
            }
            g = J(this);
            le.apply(this, c);
            for (c = 0; c < h.length; c++) N(a, h[c]);
            if (g) for (N(a, this), c = 0; c < d.length; c++) h = d[c], h instanceof Element && M(a, h)
        });
        void 0 !== me && L(b, "remove", function () {
            var b = J(this);
            me.call(this);
            b && N(a, this)
        })
    };

    function xe() {
        var a = se;

        function b(b, c) {
            Object.defineProperty(b, "innerHTML", {
                enumerable: c.enumerable,
                configurable: !0,
                get: c.get,
                set: function (b) {
                    var d = this, e = void 0;
                    J(this) && (e = [], K(this, function (a) {
                        a !== d && e.push(a)
                    }));
                    c.set.call(this, b);
                    if (e) for (var f = 0; f < e.length; f++) {
                        var l = e[f];
                        1 === l.__CE_state && a.disconnectedCallback(l)
                    }
                    this.ownerDocument.__CE_hasRegistry ? O(a, this) : Gd(a, this);
                    return b
                }
            })
        }

        function c(b, c) {
            L(b, "insertAdjacentElement", function (b, d) {
                var e = J(d);
                b = c.call(this, b, d);
                e && N(a, d);
                J(b) && M(a, d);
                return b
            })
        }

        Zd && L(Element.prototype, "attachShadow", function (a) {
            return this.__CE_shadowRoot = a = Zd.call(this, a)
        });
        $d && $d.get ? b(Element.prototype, $d) : oe && oe.get ? b(HTMLElement.prototype, oe) : Fd(a, function (a) {
            b(a, {
                enumerable: !0, configurable: !0, get: function () {
                    return Td.call(this, !0).innerHTML
                }, set: function (a) {
                    var b = "template" === this.localName, c = b ? this.content : this,
                        d = Md.call(document, this.localName);
                    for (d.innerHTML = a; 0 < c.childNodes.length;) Wd.call(c, c.childNodes[0]);
                    for (a = b ? d.content : d; 0 < a.childNodes.length;) Ud.call(c,
                        a.childNodes[0])
                }
            })
        });
        L(Element.prototype, "setAttribute", function (b, c) {
            if (1 !== this.__CE_state) return be.call(this, b, c);
            var d = ae.call(this, b);
            be.call(this, b, c);
            c = ae.call(this, b);
            a.attributeChangedCallback(this, b, d, c, null)
        });
        L(Element.prototype, "setAttributeNS", function (b, c, f) {
            if (1 !== this.__CE_state) return ee.call(this, b, c, f);
            var d = de.call(this, b, c);
            ee.call(this, b, c, f);
            f = de.call(this, b, c);
            a.attributeChangedCallback(this, c, d, f, b)
        });
        L(Element.prototype, "removeAttribute", function (b) {
            if (1 !== this.__CE_state) return ce.call(this,
                b);
            var c = ae.call(this, b);
            ce.call(this, b);
            null !== c && a.attributeChangedCallback(this, b, c, null, null)
        });
        L(Element.prototype, "removeAttributeNS", function (b, c) {
            if (1 !== this.__CE_state) return fe.call(this, b, c);
            var d = de.call(this, b, c);
            fe.call(this, b, c);
            var e = de.call(this, b, c);
            d !== e && a.attributeChangedCallback(this, c, d, e, b)
        });
        pe ? c(HTMLElement.prototype, pe) : ge ? c(Element.prototype, ge) : console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");
        te(a, Element.prototype, {X: he, append: ie});
        we(a)
    }
    ;var ye = window.customElements;
    if (!ye || ye.forcePolyfill || "function" != typeof ye.define || "function" != typeof ye.get) {
        var se = new Dd;
        re();
        ue();
        te(se, DocumentFragment.prototype, {X: Rd, append: Sd});
        ve();
        xe();
        document.__CE_hasRegistry = !0;
        var customElements = new P(se);
        Object.defineProperty(window, "customElements", {configurable: !0, enumerable: !0, value: customElements})
    }
    ;

    function ze() {
        this.end = this.start = 0;
        this.rules = this.parent = this.previous = null;
        this.cssText = this.parsedCssText = "";
        this.atRule = !1;
        this.type = 0;
        this.parsedSelector = this.selector = this.keyframesName = ""
    }

    function Ae(a) {
        a = a.replace(Be, "").replace(Ce, "");
        var b = De, c = a, d = new ze;
        d.start = 0;
        d.end = c.length;
        for (var e = d, f = 0, h = c.length; f < h; f++) if ("{" === c[f]) {
            e.rules || (e.rules = []);
            var g = e, k = g.rules[g.rules.length - 1] || null;
            e = new ze;
            e.start = f + 1;
            e.parent = g;
            e.previous = k;
            g.rules.push(e)
        } else "}" === c[f] && (e.end = f + 1, e = e.parent || d);
        return b(d, a)
    }

    function De(a, b) {
        var c = b.substring(a.start, a.end - 1);
        a.parsedCssText = a.cssText = c.trim();
        a.parent && (c = b.substring(a.previous ? a.previous.end : a.parent.start, a.start - 1), c = Ee(c), c = c.replace(Fe, " "), c = c.substring(c.lastIndexOf(";") + 1), c = a.parsedSelector = a.selector = c.trim(), a.atRule = 0 === c.indexOf("@"), a.atRule ? 0 === c.indexOf("@media") ? a.type = Je : c.match(Ke) && (a.type = Le, a.keyframesName = a.selector.split(Fe).pop()) : a.type = 0 === c.indexOf("--") ? Me : Ne);
        if (c = a.rules) for (var d = 0, e = c.length, f; d < e && (f = c[d]); d++) De(f,
            b);
        return a
    }

    function Ee(a) {
        return a.replace(/\\([0-9a-f]{1,6})\s/gi, function (a, c) {
            a = c;
            for (c = 6 - a.length; c--;) a = "0" + a;
            return "\\" + a
        })
    }

    function Oe(a, b, c) {
        c = void 0 === c ? "" : c;
        var d = "";
        if (a.cssText || a.rules) {
            var e = a.rules, f;
            if (f = e) f = e[0], f = !(f && f.selector && 0 === f.selector.indexOf("--"));
            if (f) {
                f = 0;
                for (var h = e.length, g; f < h && (g = e[f]); f++) d = Oe(g, b, d)
            } else b ? b = a.cssText : (b = a.cssText, b = b.replace(Pe, "").replace(Qe, ""), b = b.replace(Re, "").replace(Se, "")), (d = b.trim()) && (d = "  " + d + "\n")
        }
        d && (a.selector && (c += a.selector + " {\n"), c += d, a.selector && (c += "}\n\n"));
        return c
    }

    var Ne = 1, Le = 7, Je = 4, Me = 1E3, Be = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim, Ce = /@import[^;]*;/gim,
        Pe = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
        Qe = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
        Re = /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim, Se = /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
        Ke = /^@[^\s]*keyframes/, Fe = /\s+/g;
    var Q = !(window.ShadyDOM && window.ShadyDOM.inUse), Te;

    function Ue(a) {
        Te = a && a.shimcssproperties ? !1 : Q || !(navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) || !window.CSS || !CSS.supports || !CSS.supports("box-shadow", "0 0 0 var(--foo)"))
    }

    window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss ? Te = window.ShadyCSS.nativeCss : window.ShadyCSS ? (Ue(window.ShadyCSS), window.ShadyCSS = void 0) : Ue(window.WebComponents && window.WebComponents.flags);
    var R = Te;
    var Ve = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
        We = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi, Xe = /(--[\w-]+)\s*([:,;)]|$)/gi,
        Ye = /(animation\s*:)|(animation-name\s*:)/, Ze = /@media\s(.*)/, $e = /\{[^}]*\}/g;
    var af = new Set;

    function bf(a, b) {
        if (!a) return "";
        "string" === typeof a && (a = Ae(a));
        b && cf(a, b);
        return Oe(a, R)
    }

    function df(a) {
        !a.__cssRules && a.textContent && (a.__cssRules = Ae(a.textContent));
        return a.__cssRules || null
    }

    function ef(a) {
        return !!a.parent && a.parent.type === Le
    }

    function cf(a, b, c, d) {
        if (a) {
            var e = !1, f = a.type;
            if (d && f === Je) {
                var h = a.selector.match(Ze);
                h && (window.matchMedia(h[1]).matches || (e = !0))
            }
            f === Ne ? b(a) : c && f === Le ? c(a) : f === Me && (e = !0);
            if ((a = a.rules) && !e) {
                e = 0;
                f = a.length;
                for (var g; e < f && (g = a[e]); e++) cf(g, b, c, d)
            }
        }
    }

    function ff(a, b, c, d) {
        var e = document.createElement("style");
        b && e.setAttribute("scope", b);
        e.textContent = a;
        gf(e, c, d);
        return e
    }

    var S = null;

    function gf(a, b, c) {
        b = b || document.head;
        b.insertBefore(a, c && c.nextSibling || b.firstChild);
        S ? a.compareDocumentPosition(S) === Node.DOCUMENT_POSITION_PRECEDING && (S = a) : S = a
    }

    function hf(a, b) {
        var c = a.indexOf("var(");
        if (-1 === c) return b(a, "", "", "");
        a:{
            var d = 0;
            var e = c + 3;
            for (var f = a.length; e < f; e++) if ("(" === a[e]) d++; else if (")" === a[e] && 0 === --d) break a;
            e = -1
        }
        d = a.substring(c + 4, e);
        c = a.substring(0, c);
        a = hf(a.substring(e + 1), b);
        e = d.indexOf(",");
        return -1 === e ? b(c, d.trim(), "", a) : b(c, d.substring(0, e).trim(), d.substring(e + 1).trim(), a)
    }

    function jf(a, b) {
        Q ? a.setAttribute("class", b) : window.ShadyDOM.nativeMethods.setAttribute.call(a, "class", b)
    }

    function V(a) {
        var b = a.localName, c = "";
        b ? -1 < b.indexOf("-") || (c = b, b = a.getAttribute && a.getAttribute("is") || "") : (b = a.is, c = a.extends);
        return {is: b, P: c}
    };

    function kf() {
    }

    function lf(a, b, c) {
        var d = W;
        a.__styleScoped ? a.__styleScoped = null : mf(d, a, b || "", c)
    }

    function mf(a, b, c, d) {
        b.nodeType === Node.ELEMENT_NODE && nf(b, c, d);
        if (b = "template" === b.localName ? (b.content || b.gb).childNodes : b.children || b.childNodes) for (var e = 0; e < b.length; e++) mf(a, b[e], c, d)
    }

    function nf(a, b, c) {
        if (b) if (a.classList) c ? (a.classList.remove("style-scope"), a.classList.remove(b)) : (a.classList.add("style-scope"), a.classList.add(b)); else if (a.getAttribute) {
            var d = a.getAttribute(of);
            c ? d && (b = d.replace("style-scope", "").replace(b, ""), jf(a, b)) : jf(a, (d ? d + " " : "") + "style-scope " + b)
        }
    }

    function pf(a, b, c) {
        var d = W, e = a.__cssBuild;
        Q || "shady" === e ? b = bf(b, c) : (a = V(a), b = qf(d, b, a.is, a.P, c) + "\n\n");
        return b.trim()
    }

    function qf(a, b, c, d, e) {
        var f = rf(c, d);
        c = c ? sf + c : "";
        return bf(b, function (b) {
            b.c || (b.selector = b.m = tf(a, b, a.b, c, f), b.c = !0);
            e && e(b, c, f)
        })
    }

    function rf(a, b) {
        return b ? "[is=" + a + "]" : a
    }

    function tf(a, b, c, d, e) {
        var f = b.selector.split(uf);
        if (!ef(b)) {
            b = 0;
            for (var h = f.length, g; b < h && (g = f[b]); b++) f[b] = c.call(a, g, d, e)
        }
        return f.join(uf)
    }

    function vf(a) {
        return a.replace(wf, function (a, c, d) {
            -1 < d.indexOf("+") ? d = d.replace(/\+/g, "___") : -1 < d.indexOf("___") && (d = d.replace(/___/g, "+"));
            return ":" + c + "(" + d + ")"
        })
    }

    kf.prototype.b = function (a, b, c) {
        var d = !1;
        a = a.trim();
        var e = wf.test(a);
        e && (a = a.replace(wf, function (a, b, c) {
            return ":" + b + "(" + c.replace(/\s/g, "") + ")"
        }), a = vf(a));
        a = a.replace(xf, yf + " $1");
        a = a.replace(zf, function (a, e, g) {
            d || (a = Af(g, e, b, c), d = d || a.stop, e = a.Ja, g = a.value);
            return e + g
        });
        e && (a = vf(a));
        return a
    };

    function Af(a, b, c, d) {
        var e = a.indexOf(Bf);
        0 <= a.indexOf(yf) ? a = Cf(a, d) : 0 !== e && (a = c ? Df(a, c) : a);
        c = !1;
        0 <= e && (b = "", c = !0);
        if (c) {
            var f = !0;
            c && (a = a.replace(Ef, function (a, b) {
                return " > " + b
            }))
        }
        a = a.replace(Ff, function (a, b, c) {
            return '[dir="' + c + '"] ' + b + ", " + b + '[dir="' + c + '"]'
        });
        return {value: a, Ja: b, stop: f}
    }

    function Df(a, b) {
        a = a.split(Gf);
        a[0] += b;
        return a.join(Gf)
    }

    function Cf(a, b) {
        var c = a.match(Hf);
        return (c = c && c[2].trim() || "") ? c[0].match(If) ? a.replace(Hf, function (a, c, f) {
            return b + f
        }) : c.split(If)[0] === b ? c : Jf : a.replace(yf, b)
    }

    function Kf(a) {
        a.selector === Lf && (a.selector = "html")
    }

    kf.prototype.c = function (a) {
        return a.match(Bf) ? this.b(a, Mf) : Df(a.trim(), Mf)
    };
    q.Object.defineProperties(kf.prototype, {
        a: {
            configurable: !0, enumerable: !0, get: function () {
                return "style-scope"
            }
        }
    });
    var wf = /:(nth[-\w]+)\(([^)]+)\)/, Mf = ":not(.style-scope)", uf = ",",
        zf = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g, If = /[[.:#*]/, yf = ":host", Lf = ":root", Bf = "::slotted",
        xf = new RegExp("^(" + Bf + ")"), Hf = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
        Ef = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/, Ff = /(.*):dir\((?:(ltr|rtl))\)/, sf = ".", Gf = ":",
        of = "class", Jf = "should_not_match", W = new kf;

    function Nf(a, b, c, d) {
        this.w = a || null;
        this.b = b || null;
        this.ja = c || [];
        this.G = null;
        this.P = d || "";
        this.a = this.u = this.B = null
    }

    function X(a) {
        return a ? a.__styleInfo : null
    }

    function Of(a, b) {
        return a.__styleInfo = b
    }

    Nf.prototype.c = function () {
        return this.w
    };
    Nf.prototype._getStyleRules = Nf.prototype.c;
    var Pf, Qf = window.Element.prototype;
    Pf = Qf.matches || Qf.matchesSelector || Qf.mozMatchesSelector || Qf.msMatchesSelector || Qf.oMatchesSelector || Qf.webkitMatchesSelector;
    var Rf = navigator.userAgent.match("Trident");

    function Sf() {
    }

    function Tf(a) {
        var b = {}, c = [], d = 0;
        cf(a, function (a) {
            Uf(a);
            a.index = d++;
            a = a.i.cssText;
            for (var c; c = Xe.exec(a);) {
                var e = c[1];
                ":" !== c[2] && (b[e] = !0)
            }
        }, function (a) {
            c.push(a)
        });
        a.b = c;
        a = [];
        for (var e in b) a.push(e);
        return a
    }

    function Uf(a) {
        if (!a.i) {
            var b = {}, c = {};
            Vf(a, c) && (b.v = c, a.rules = null);
            b.cssText = a.parsedCssText.replace($e, "").replace(Ve, "");
            a.i = b
        }
    }

    function Vf(a, b) {
        var c = a.i;
        if (c) {
            if (c.v) return Object.assign(b, c.v), !0
        } else {
            c = a.parsedCssText;
            for (var d; a = Ve.exec(c);) {
                d = (a[2] || a[3]).trim();
                if ("inherit" !== d || "unset" !== d) b[a[1].trim()] = d;
                d = !0
            }
            return d
        }
    }

    function Wf(a, b, c) {
        b && (b = 0 <= b.indexOf(";") ? Xf(a, b, c) : hf(b, function (b, e, f, h) {
            if (!e) return b + h;
            (e = Wf(a, c[e], c)) && "initial" !== e ? "apply-shim-inherit" === e && (e = "inherit") : e = Wf(a, c[f] || f, c) || f;
            return b + (e || "") + h
        }));
        return b && b.trim() || ""
    }

    function Xf(a, b, c) {
        b = b.split(";");
        for (var d = 0, e, f; d < b.length; d++) if (e = b[d]) {
            We.lastIndex = 0;
            if (f = We.exec(e)) e = Wf(a, c[f[1]], c); else if (f = e.indexOf(":"), -1 !== f) {
                var h = e.substring(f);
                h = h.trim();
                h = Wf(a, h, c) || h;
                e = e.substring(0, f) + h
            }
            b[d] = e && e.lastIndexOf(";") === e.length - 1 ? e.slice(0, -1) : e || ""
        }
        return b.join(";")
    }

    function Yf(a, b) {
        var c = {}, d = [];
        cf(a, function (a) {
            a.i || Uf(a);
            var e = a.m || a.parsedSelector;
            b && a.i.v && e && Pf.call(b, e) && (Vf(a, c), a = a.index, e = parseInt(a / 32, 10), d[e] = (d[e] || 0) | 1 << a % 32)
        }, null, !0);
        return {v: c, key: d}
    }

    function Zf(a, b, c, d) {
        b.i || Uf(b);
        if (b.i.v) {
            var e = V(a);
            a = e.is;
            e = e.P;
            e = a ? rf(a, e) : "html";
            var f = b.parsedSelector, h = ":host > *" === f || "html" === f, g = 0 === f.indexOf(":host") && !h;
            "shady" === c && (h = f === e + " > *." + e || -1 !== f.indexOf("html"), g = !h && 0 === f.indexOf(e));
            "shadow" === c && (h = ":host > *" === f || "html" === f, g = g && !h);
            if (h || g) c = e, g && (Q && !b.m && (b.m = tf(W, b, W.b, a ? sf + a : "", e)), c = b.m || e), d({
                Xa: c,
                Oa: g,
                ib: h
            })
        }
    }

    function $f(a, b) {
        var c = {}, d = {}, e = b && b.__cssBuild;
        cf(b, function (b) {
            Zf(a, b, e, function (e) {
                Pf.call(a.hb || a, e.Xa) && (e.Oa ? Vf(b, c) : Vf(b, d))
            })
        }, null, !0);
        return {Va: d, Na: c}
    }

    function ag(a, b, c, d) {
        var e = V(b), f = rf(e.is, e.P),
            h = new RegExp("(?:^|[^.#[:])" + (b.extends ? "\\" + f.slice(0, -1) + "\\]" : f) + "($|[.:[\\s>+~])");
        e = X(b).w;
        var g = bg(e, d);
        return pf(b, e, function (b) {
            var e = "";
            b.i || Uf(b);
            b.i.cssText && (e = Xf(a, b.i.cssText, c));
            b.cssText = e;
            if (!Q && !ef(b) && b.cssText) {
                var k = e = b.cssText;
                null == b.ra && (b.ra = Ye.test(e));
                if (b.ra) if (null == b.W) {
                    b.W = [];
                    for (var n in g) k = g[n], k = k(e), e !== k && (e = k, b.W.push(n))
                } else {
                    for (n = 0; n < b.W.length; ++n) k = g[b.W[n]], e = k(e);
                    k = e
                }
                b.cssText = k;
                b.m = b.m || b.selector;
                e = "." + d;
                n = b.m.split(",");
                k = 0;
                for (var w = n.length, I; k < w && (I = n[k]); k++) n[k] = I.match(h) ? I.replace(f, e) : e + " " + I;
                b.selector = n.join(",")
            }
        })
    }

    function bg(a, b) {
        a = a.b;
        var c = {};
        if (!Q && a) for (var d = 0, e = a[d]; d < a.length; e = a[++d]) {
            var f = e, h = b;
            f.h = new RegExp(f.keyframesName, "g");
            f.a = f.keyframesName + "-" + h;
            f.m = f.m || f.selector;
            f.selector = f.m.replace(f.keyframesName, f.a);
            c[e.keyframesName] = cg(e)
        }
        return c
    }

    function cg(a) {
        return function (b) {
            return b.replace(a.h, a.a)
        }
    }

    function dg(a, b) {
        var c = eg, d = df(a);
        a.textContent = bf(d, function (a) {
            var d = a.cssText = a.parsedCssText;
            a.i && a.i.cssText && (d = d.replace(Pe, "").replace(Qe, ""), a.cssText = Xf(c, d, b))
        })
    }

    q.Object.defineProperties(Sf.prototype, {
        a: {
            configurable: !0, enumerable: !0, get: function () {
                return "x-scope"
            }
        }
    });
    var eg = new Sf;
    var fg = {}, gg = window.customElements;
    if (gg && !Q) {
        var hg = gg.define;
        gg.define = function (a, b, c) {
            var d = document.createComment(" Shady DOM styles for " + a + " "), e = document.head;
            e.insertBefore(d, (S ? S.nextSibling : null) || e.firstChild);
            S = d;
            fg[a] = d;
            return hg.call(gg, a, b, c)
        }
    }
    ;

    function ig() {
        this.cache = {}
    }

    ig.prototype.store = function (a, b, c, d) {
        var e = this.cache[a] || [];
        e.push({v: b, styleElement: c, u: d});
        100 < e.length && e.shift();
        this.cache[a] = e
    };
    ig.prototype.fetch = function (a, b, c) {
        if (a = this.cache[a]) for (var d = a.length - 1; 0 <= d; d--) {
            var e = a[d], f;
            a:{
                for (f = 0; f < c.length; f++) {
                    var h = c[f];
                    if (e.v[h] !== b[h]) {
                        f = !1;
                        break a
                    }
                }
                f = !0
            }
            if (f) return e
        }
    };

    function jg() {
    }

    function kg(a) {
        for (var b = 0; b < a.length; b++) {
            var c = a[b];
            if (c.target !== document.documentElement && c.target !== document.head) for (var d = 0; d < c.addedNodes.length; d++) {
                var e = c.addedNodes[d];
                if (e.nodeType === Node.ELEMENT_NODE) {
                    var f = e.getRootNode();
                    var h = e;
                    var g = [];
                    h.classList ? g = Array.from(h.classList) : h instanceof window.SVGElement && h.hasAttribute("class") && (g = h.getAttribute("class").split(/\s+/));
                    h = g;
                    g = h.indexOf(W.a);
                    if ((h = -1 < g ? h[g + 1] : "") && f === e.ownerDocument) lf(e, h, !0); else if (f.nodeType === Node.DOCUMENT_FRAGMENT_NODE &&
                        (f = f.host)) if (f = V(f).is, h === f) for (e = window.ShadyDOM.nativeMethods.querySelectorAll.call(e, ":not(." + W.a + ")"), f = 0; f < e.length; f++) nf(e[f], h); else h && lf(e, h, !0), lf(e, f)
                }
            }
        }
    }

    if (!Q) {
        var lg = new MutationObserver(kg), mg = function (a) {
            lg.observe(a, {childList: !0, subtree: !0})
        };
        if (window.customElements && !window.customElements.polyfillWrapFlushCallback) mg(document); else {
            var ng = function () {
                mg(document.body)
            };
            window.HTMLImports ? window.HTMLImports.whenReady(ng) : requestAnimationFrame(function () {
                if ("loading" === document.readyState) {
                    var a = function () {
                        ng();
                        document.removeEventListener("readystatechange", a)
                    };
                    document.addEventListener("readystatechange", a)
                } else ng()
            })
        }
        jg = function () {
            kg(lg.takeRecords())
        }
    }
    var og = jg;
    var pg = {};
    var qg = Promise.resolve();

    function rg(a) {
        if (a = pg[a]) a._applyShimCurrentVersion = a._applyShimCurrentVersion || 0, a._applyShimValidatingVersion = a._applyShimValidatingVersion || 0, a._applyShimNextVersion = (a._applyShimNextVersion || 0) + 1
    }

    function sg(a) {
        return a._applyShimCurrentVersion === a._applyShimNextVersion
    }

    function tg(a) {
        a._applyShimValidatingVersion = a._applyShimNextVersion;
        a.b || (a.b = !0, qg.then(function () {
            a._applyShimCurrentVersion = a._applyShimNextVersion;
            a.b = !1
        }))
    };var ug = null, vg = window.HTMLImports && window.HTMLImports.whenReady || null, wg;

    function xg(a) {
        requestAnimationFrame(function () {
            vg ? vg(a) : (ug || (ug = new Promise(function (a) {
                wg = a
            }), "complete" === document.readyState ? wg() : document.addEventListener("readystatechange", function () {
                "complete" === document.readyState && wg()
            })), ug.then(function () {
                a && a()
            }))
        })
    };var yg = new ig;

    function Y() {
        var a = this;
        this.L = {};
        this.c = document.documentElement;
        var b = new ze;
        b.rules = [];
        this.h = Of(this.c, new Nf(b));
        this.o = !1;
        this.b = this.a = null;
        xg(function () {
            zg(a)
        })
    }

    p = Y.prototype;
    p.xa = function () {
        og()
    };
    p.La = function (a) {
        return df(a)
    };
    p.Za = function (a) {
        return bf(a)
    };
    p.prepareTemplate = function (a, b, c) {
        if (!a.h) {
            a.h = !0;
            a.name = b;
            a.extends = c;
            pg[b] = a;
            var d = (d = a.content.querySelector("style")) ? d.getAttribute("css-build") || "" : "";
            var e = [];
            for (var f = a.content.querySelectorAll("style"), h = 0; h < f.length; h++) {
                var g = f[h];
                if (g.hasAttribute("shady-unscoped")) {
                    if (!Q) {
                        var k = g.textContent;
                        af.has(k) || (af.add(k), k = g.cloneNode(!0), document.head.appendChild(k));
                        g.parentNode.removeChild(g)
                    }
                } else e.push(g.textContent), g.parentNode.removeChild(g)
            }
            e = e.join("").trim();
            c = {is: b, extends: c, eb: d};
            Q || lf(a.content, b);
            zg(this);
            f = We.test(e) || Ve.test(e);
            We.lastIndex = 0;
            Ve.lastIndex = 0;
            e = Ae(e);
            f && R && this.a && this.a.transformRules(e, b);
            a._styleAst = e;
            a.o = d;
            d = [];
            R || (d = Tf(a._styleAst));
            if (!d.length || R) e = Q ? a.content : null, b = fg[b], f = pf(c, a._styleAst), b = f.length ? ff(f, c.is, e, b) : void 0, a.a = b;
            a.c = d
        }
    };

    function Ag(a) {
        !a.b && window.ShadyCSS && window.ShadyCSS.CustomStyleInterface && (a.b = window.ShadyCSS.CustomStyleInterface, a.b.transformCallback = function (b) {
            a.va(b)
        }, a.b.validateCallback = function () {
            requestAnimationFrame(function () {
                (a.b.enqueued || a.o) && a.F()
            })
        })
    }

    function zg(a) {
        !a.a && window.ShadyCSS && window.ShadyCSS.ApplyShim && (a.a = window.ShadyCSS.ApplyShim, a.a.invalidCallback = rg);
        Ag(a)
    }

    p.F = function () {
        zg(this);
        if (this.b) {
            var a = this.b.processStyles();
            if (this.b.enqueued) {
                if (R) for (var b = 0; b < a.length; b++) {
                    var c = this.b.getStyleForCustomStyle(a[b]);
                    if (c && R && this.a) {
                        var d = df(c);
                        zg(this);
                        this.a.transformRules(d);
                        c.textContent = bf(d)
                    }
                } else for (Bg(this, this.c, this.h), b = 0; b < a.length; b++) (c = this.b.getStyleForCustomStyle(a[b])) && dg(c, this.h.B);
                this.b.enqueued = !1;
                this.o && !R && this.styleDocument()
            }
        }
    };
    p.styleElement = function (a, b) {
        var c = V(a).is, d = X(a);
        if (!d) {
            var e = V(a);
            d = e.is;
            e = e.P;
            var f = fg[d];
            d = pg[d];
            if (d) {
                var h = d._styleAst;
                var g = d.c
            }
            d = Of(a, new Nf(h, f, g, e))
        }
        a !== this.c && (this.o = !0);
        b && (d.G = d.G || {}, Object.assign(d.G, b));
        if (R) {
            if (d.G) {
                b = d.G;
                for (var k in b) null === k ? a.style.removeProperty(k) : a.style.setProperty(k, b[k])
            }
            if (((k = pg[c]) || a === this.c) && k && k.a && !sg(k)) {
                if (sg(k) || k._applyShimValidatingVersion !== k._applyShimNextVersion) zg(this), this.a && this.a.transformRules(k._styleAst, c), k.a.textContent = pf(a,
                    d.w), tg(k);
                Q && (c = a.shadowRoot) && (c.querySelector("style").textContent = pf(a, d.w));
                d.w = k._styleAst
            }
        } else if (Bg(this, a, d), d.ja && d.ja.length) {
            c = d;
            k = V(a).is;
            d = (b = yg.fetch(k, c.B, c.ja)) ? b.styleElement : null;
            h = c.u;
            (g = b && b.u) || (g = this.L[k] = (this.L[k] || 0) + 1, g = k + "-" + g);
            c.u = g;
            g = c.u;
            e = eg;
            e = d ? d.textContent || "" : ag(e, a, c.B, g);
            f = X(a);
            var l = f.a;
            l && !Q && l !== d && (l._useCount--, 0 >= l._useCount && l.parentNode && l.parentNode.removeChild(l));
            Q ? f.a ? (f.a.textContent = e, d = f.a) : e && (d = ff(e, g, a.shadowRoot, f.b)) : d ? d.parentNode || (Rf &&
            -1 < e.indexOf("@media") && (d.textContent = e), gf(d, null, f.b)) : e && (d = ff(e, g, null, f.b));
            d && (d._useCount = d._useCount || 0, f.a != d && d._useCount++, f.a = d);
            g = d;
            Q || (d = c.u, f = e = a.getAttribute("class") || "", h && (f = e.replace(new RegExp("\\s*x-scope\\s*" + h + "\\s*", "g"), " ")), f += (f ? " " : "") + "x-scope " + d, e !== f && jf(a, f));
            b || yg.store(k, c.B, g, c.u)
        }
    };

    function Cg(a, b) {
        return (b = b.getRootNode().host) ? X(b) ? b : Cg(a, b) : a.c
    }

    function Bg(a, b, c) {
        a = Cg(a, b);
        var d = X(a);
        a = Object.create(d.B || null);
        var e = $f(b, c.w);
        b = Yf(d.w, b).v;
        Object.assign(a, e.Na, b, e.Va);
        b = c.G;
        for (var f in b) if ((e = b[f]) || 0 === e) a[f] = e;
        f = eg;
        b = Object.getOwnPropertyNames(a);
        for (e = 0; e < b.length; e++) d = b[e], a[d] = Wf(f, a[d], a);
        c.B = a
    }

    p.styleDocument = function (a) {
        this.styleSubtree(this.c, a)
    };
    p.styleSubtree = function (a, b) {
        var c = a.shadowRoot;
        (c || a === this.c) && this.styleElement(a, b);
        if (b = c && (c.children || c.childNodes)) for (a = 0; a < b.length; a++) this.styleSubtree(b[a]); else if (a = a.children || a.childNodes) for (b = 0; b < a.length; b++) this.styleSubtree(a[b])
    };
    p.va = function (a) {
        var b = this, c = df(a);
        cf(c, function (a) {
            if (Q) Kf(a); else {
                var c = W;
                a.selector = a.parsedSelector;
                Kf(a);
                a.selector = a.m = tf(c, a, c.c, void 0, void 0)
            }
            R && (zg(b), b.a && b.a.transformRule(a))
        });
        R ? a.textContent = bf(c) : this.h.w.rules.push(c)
    };
    p.getComputedStyleValue = function (a, b) {
        var c;
        R || (c = (X(a) || X(Cg(this, a))).B[b]);
        return (c = c || window.getComputedStyle(a).getPropertyValue(b)) ? c.trim() : ""
    };
    p.Ya = function (a, b) {
        var c = a.getRootNode();
        b = b ? b.split(/\s/) : [];
        c = c.host && c.host.localName;
        if (!c) {
            var d = a.getAttribute("class");
            if (d) {
                d = d.split(/\s/);
                for (var e = 0; e < d.length; e++) if (d[e] === W.a) {
                    c = d[e + 1];
                    break
                }
            }
        }
        c && b.push(W.a, c);
        R || (c = X(a)) && c.u && b.push(eg.a, c.u);
        jf(a, b.join(" "))
    };
    p.Ia = function (a) {
        return X(a)
    };
    Y.prototype.flush = Y.prototype.xa;
    Y.prototype.prepareTemplate = Y.prototype.prepareTemplate;
    Y.prototype.styleElement = Y.prototype.styleElement;
    Y.prototype.styleDocument = Y.prototype.styleDocument;
    Y.prototype.styleSubtree = Y.prototype.styleSubtree;
    Y.prototype.getComputedStyleValue = Y.prototype.getComputedStyleValue;
    Y.prototype.setElementClass = Y.prototype.Ya;
    Y.prototype._styleInfoForNode = Y.prototype.Ia;
    Y.prototype.transformCustomStyleForDocument = Y.prototype.va;
    Y.prototype.getStyleAst = Y.prototype.La;
    Y.prototype.styleAstToString = Y.prototype.Za;
    Y.prototype.flushCustomStyles = Y.prototype.F;
    Object.defineProperties(Y.prototype, {
        nativeShadow: {
            get: function () {
                return Q
            }
        }, nativeCss: {
            get: function () {
                return R
            }
        }
    });
    var Z = new Y, Dg, Eg;
    window.ShadyCSS && (Dg = window.ShadyCSS.ApplyShim, Eg = window.ShadyCSS.CustomStyleInterface);
    window.ShadyCSS = {
        ScopingShim: Z, prepareTemplate: function (a, b, c) {
            Z.F();
            Z.prepareTemplate(a, b, c)
        }, styleSubtree: function (a, b) {
            Z.F();
            Z.styleSubtree(a, b)
        }, styleElement: function (a) {
            Z.F();
            Z.styleElement(a)
        }, styleDocument: function (a) {
            Z.F();
            Z.styleDocument(a)
        }, getComputedStyleValue: function (a, b) {
            return Z.getComputedStyleValue(a, b)
        }, nativeCss: R, nativeShadow: Q
    };
    Dg && (window.ShadyCSS.ApplyShim = Dg);
    Eg && (window.ShadyCSS.CustomStyleInterface = Eg);
    var Fg = window.customElements, Gg = window.HTMLImports, Hg = window.HTMLTemplateElement;
    window.WebComponents = window.WebComponents || {};
    if (Fg && Fg.polyfillWrapFlushCallback) {
        var Ig, Jg = function () {
            if (Ig) {
                Hg.J && Hg.J(window.document);
                var a = Ig;
                Ig = null;
                a();
                return !0
            }
        }, Kg = Gg.whenReady;
        Fg.polyfillWrapFlushCallback(function (a) {
            Ig = a;
            Kg(Jg)
        });
        Gg.whenReady = function (a) {
            Kg(function () {
                Jg() ? Gg.whenReady(a) : a()
            })
        }
    }
    Gg.whenReady(function () {
        requestAnimationFrame(function () {
            window.WebComponents.ready = !0;
            document.dispatchEvent(new CustomEvent("WebComponentsReady", {bubbles: !0}))
        })
    });
    var Lg = document.createElement("style");
    Lg.textContent = "body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n";
    var Mg = document.querySelector("head");
    Mg.insertBefore(Lg, Mg.firstChild);
}).call(this);

//# sourceMappingURL=webcomponents-lite.js.map
