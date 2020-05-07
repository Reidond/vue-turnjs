'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopDefault(e){return(e&&(typeof e==='object')&&'default'in e)?e['default']:e}var $=_interopDefault(require('jquery')),nanoid=require('nanoid');function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}/* turn.js 4.1.0 | Copyright (c) 2012 Emmanuel Garcia | turnjs.com | turnjs.com/license.txt */

(function (f) {
  function J(a, b, c) {
    if (!c[0] || "object" == _typeof(c[0])) return b.init.apply(a, c);
    if (b[c[0]]) return b[c[0]].apply(a, Array.prototype.slice.call(c, 1));
    throw q(c[0] + " is not a method or property");
  }

  function l(a, b, c, d) {
    return {
      css: {
        position: "absolute",
        top: a,
        left: b,
        overflow: d || "hidden",
        zIndex: c || "auto"
      }
    };
  }

  function S(a, b, c, d, e) {
    var h = 1 - e,
        f = h * h * h,
        g = e * e * e;
    return j(Math.round(f * a.x + 3 * e * h * h * b.x + 3 * e * e * h * c.x + g * d.x), Math.round(f * a.y + 3 * e * h * h * b.y + 3 * e * e * h * c.y + g * d.y));
  }

  function j(a, b) {
    return {
      x: a,
      y: b
    };
  }

  function F(a, b, c) {
    return z && c ? " translate3d(" + a + "px," + b + "px, 0px) " : " translate(" + a + "px, " + b + "px) ";
  }

  function G(a) {
    return " rotate(" + a + "deg) ";
  }

  function n(a, b) {
    return Object.prototype.hasOwnProperty.call(b, a);
  }

  function T() {
    for (var a = ["Moz", "Webkit", "Khtml", "O", "ms"], b = a.length, c = ""; b--;) {
      a[b] + "Transform" in document.body.style && (c = "-" + a[b].toLowerCase() + "-");
    }

    return c;
  }

  function P(a, b, c, d, e) {
    var h,
        f = [];

    if ("-webkit-" == w) {
      for (h = 0; h < e; h++) {
        f.push("color-stop(" + d[h][0] + ", " + d[h][1] + ")");
      }

      a.css({
        "background-image": "-webkit-gradient(linear, " + b.x + "% " + b.y + "%," + c.x + "% " + c.y + "%, " + f.join(",") + " )"
      });
    } else {
      var b = {
        x: b.x / 100 * a.width(),
        y: b.y / 100 * a.height()
      },
          c = {
        x: c.x / 100 * a.width(),
        y: c.y / 100 * a.height()
      },
          g = c.x - b.x;
      h = c.y - b.y;
      var i = Math.atan2(h, g),
          x = i - Math.PI / 2,
          x = Math.abs(a.width() * Math.sin(x)) + Math.abs(a.height() * Math.cos(x)),
          g = Math.sqrt(h * h + g * g),
          c = j(c.x < b.x ? a.width() : 0, c.y < b.y ? a.height() : 0),
          k = Math.tan(i);
      h = -1 / k;
      k = (h * c.x - c.y - k * b.x + b.y) / (h - k);
      c = h * k - h * c.x + c.y;
      b = Math.sqrt(Math.pow(k - b.x, 2) + Math.pow(c - b.y, 2));

      for (h = 0; h < e; h++) {
        f.push(" " + d[h][1] + " " + 100 * (b + g * d[h][0]) / x + "%");
      }

      a.css({
        "background-image": w + "linear-gradient(" + -i + "rad," + f.join(",") + ")"
      });
    }
  }

  function t(a, b, c) {
    a = f.Event(a);
    b.trigger(a, c);
    return a.isDefaultPrevented() ? "prevented" : a.isPropagationStopped() ? "stopped" : "";
  }

  function q(a) {
    function b(a) {
      this.name = "TurnJsError";
      this.message = a;
    }

    b.prototype = Error();
    b.prototype.constructor = b;
    return new b(a);
  }

  function D(a) {
    var b = {
      top: 0,
      left: 0
    };

    do {
      b.left += a.offsetLeft, b.top += a.offsetTop;
    } while (a = a.offsetParent);

    return b;
  }

  var z,
      U,
      w = "",
      K = Math.PI,
      L = K / 2,
      u = ("ontouchstart" in window),
      r = u ? {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
    over: "touchstart",
    out: "touchend"
  } : {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
    over: "mouseover",
    out: "mouseout"
  },
      p = {
    backward: ["bl", "tl"],
    forward: ["br", "tr"],
    all: "tl bl tr br l r".split(" ")
  },
      V = ["single", "double"],
      W = ["ltr", "rtl"],
      X = {
    acceleration: !0,
    display: "double",
    duration: 600,
    page: 1,
    gradients: !0,
    turnCorners: "bl,br",
    when: null
  },
      Y = {
    cornerSize: 100
  },
      g = {
    init: function init(a) {
      z = "WebKitCSSMatrix" in window || "MozPerspective" in document.body.style;
      var b;
      U = (b = /AppleWebkit\/([0-9\.]+)/i.exec(navigator.userAgent)) ? 534.3 < parseFloat(b[1]) : !0;
      w = T();
      var c;
      b = 0;
      var d = this.data(),
          e = this.children(),
          a = f.extend({
        width: this.width(),
        height: this.height(),
        direction: this.attr("dir") || this.css("direction") || "ltr"
      }, X, a);
      d.opts = a;
      d.pageObjs = {};
      d.pages = {};
      d.pageWrap = {};
      d.pageZoom = {};
      d.pagePlace = {};
      d.pageMv = [];
      d.zoom = 1;
      d.totalPages = a.pages || 0;
      d.eventHandlers = {
        touchStart: f.proxy(g._touchStart, this),
        touchMove: f.proxy(g._touchMove, this),
        touchEnd: f.proxy(g._touchEnd, this),
        start: f.proxy(g._eventStart, this)
      };
      if (a.when) for (c in a.when) {
        n(c, a.when) && this.bind(c, a.when[c]);
      }
      this.css({
        position: "relative",
        width: a.width,
        height: a.height
      });
      this.turn("display", a.display);
      "" !== a.direction && this.turn("direction", a.direction);
      z && !u && a.acceleration && this.transform(F(0, 0, !0));

      for (c = 0; c < e.length; c++) {
        "1" != f(e[c]).attr("ignore") && this.turn("addPage", e[c], ++b);
      }

      f(this).bind(r.down, d.eventHandlers.touchStart).bind("end", g._eventEnd).bind("pressed", g._eventPressed).bind("released", g._eventReleased).bind("flip", g._flip);
      f(this).parent().bind("start", d.eventHandlers.start);
      f(document).bind(r.move, d.eventHandlers.touchMove).bind(r.up, d.eventHandlers.touchEnd);
      this.turn("page", a.page);
      d.done = !0;
      return this;
    },
    addPage: function addPage(a, b) {
      var c,
          d = !1,
          e = this.data(),
          h = e.totalPages + 1;
      if (e.destroying) return !1;
      if (c = /\bp([0-9]+)\b/.exec(f(a).attr("class"))) b = parseInt(c[1], 10);
      if (b) {
        if (b == h) d = !0;else {
          if (b > h) throw q('Page "' + b + '" cannot be inserted');
        }
      } else b = h, d = !0;
      1 <= b && b <= h && (c = "double" == e.display ? b % 2 ? " odd" : " even" : "", e.done && this.turn("stop"), b in e.pageObjs && g._movePages.call(this, b, 1), d && (e.totalPages = h), e.pageObjs[b] = f(a).css({
        "float": "left"
      }).addClass("page p" + b + c), -1 != navigator.userAgent.indexOf("MSIE 9.0") && e.pageObjs[b].hasClass("hard") && e.pageObjs[b].removeClass("hard"), g._addPage.call(this, b), g._removeFromDOM.call(this));
      return this;
    },
    _addPage: function _addPage(a) {
      var b = this.data(),
          c = b.pageObjs[a];
      if (c) if (g._necessPage.call(this, a)) {
        if (!b.pageWrap[a]) {
          b.pageWrap[a] = f("<div/>", {
            "class": "page-wrapper",
            page: a,
            css: {
              position: "absolute",
              overflow: "hidden"
            }
          });
          this.append(b.pageWrap[a]);
          b.pagePlace[a] || (b.pagePlace[a] = a, b.pageObjs[a].appendTo(b.pageWrap[a]));

          var d = g._pageSize.call(this, a, !0);

          c.css({
            width: d.width,
            height: d.height
          });
          b.pageWrap[a].css(d);
        }

        b.pagePlace[a] == a && g._makeFlip.call(this, a);
      } else b.pagePlace[a] = 0, b.pageObjs[a] && b.pageObjs[a].remove();
    },
    hasPage: function hasPage(a) {
      return n(a, this.data().pageObjs);
    },
    center: function center(a) {
      var b = this.data(),
          c = f(this).turn("size"),
          d = 0;
      b.noCenter || ("double" == b.display && (a = this.turn("view", a || b.tpage || b.page), "ltr" == b.direction ? a[0] ? a[1] || (d += c.width / 4) : d -= c.width / 4 : a[0] ? a[1] || (d -= c.width / 4) : d += c.width / 4), f(this).css({
        marginLeft: d
      }));
      return this;
    },
    destroy: function destroy() {
      var a = this,
          b = this.data(),
          c = "end first flip last pressed released start turning turned zooming missing".split(" ");

      if ("prevented" != t("destroying", this)) {
        b.destroying = !0;
        f.each(c, function (b, c) {
          a.unbind(c);
        });
        this.parent().unbind("start", b.eventHandlers.start);

        for (f(document).unbind(r.move, b.eventHandlers.touchMove).unbind(r.up, b.eventHandlers.touchEnd); 0 !== b.totalPages;) {
          this.turn("removePage", b.totalPages);
        }

        b.fparent && b.fparent.remove();
        b.shadow && b.shadow.remove();
        this.removeData();
        b = null;
        return this;
      }
    },
    is: function is() {
      return "object" == _typeof(this.data().pages);
    },
    zoom: function zoom(a) {
      var b = this.data();

      if ("number" == typeof a) {
        if (0.0010 > a || 100 < a) throw q(a + " is not a value for zoom");
        if ("prevented" == t("zooming", this, [a, b.zoom])) return this;
        var c = this.turn("size"),
            d = this.turn("view"),
            e = 1 / b.zoom,
            h = Math.round(c.width * e * a),
            c = Math.round(c.height * e * a);
        b.zoom = a;
        f(this).turn("stop").turn("size", h, c);
        b.opts.autoCenter && this.turn("center");

        g._updateShadow.call(this);

        for (a = 0; a < d.length; a++) {
          d[a] && b.pageZoom[d[a]] != b.zoom && (this.trigger("zoomed", [d[a], d, b.pageZoom[d[a]], b.zoom]), b.pageZoom[d[a]] = b.zoom);
        }

        return this;
      }

      return b.zoom;
    },
    _pageSize: function _pageSize(a, b) {
      var c = this.data(),
          d = {};
      if ("single" == c.display) d.width = this.width(), d.height = this.height(), b && (d.top = 0, d.left = 0, d.right = "auto");else {
        var e = this.width() / 2,
            h = this.height();
        c.pageObjs[a].hasClass("own-size") ? (d.width = c.pageObjs[a].width(), d.height = c.pageObjs[a].height()) : (d.width = e, d.height = h);

        if (b) {
          var f = a % 2;
          d.top = (h - d.height) / 2;
          "ltr" == c.direction ? (d[f ? "right" : "left"] = e - d.width, d[f ? "left" : "right"] = "auto") : (d[f ? "left" : "right"] = e - d.width, d[f ? "right" : "left"] = "auto");
        }
      }
      return d;
    },
    _makeFlip: function _makeFlip(a) {
      var b = this.data();

      if (!b.pages[a] && b.pagePlace[a] == a) {
        var c = "single" == b.display,
            d = a % 2;
        b.pages[a] = b.pageObjs[a].css(g._pageSize.call(this, a)).flip({
          page: a,
          next: d || c ? a + 1 : a - 1,
          turn: this
        }).flip("disable", b.disabled);

        g._setPageLoc.call(this, a);

        b.pageZoom[a] = b.zoom;
      }

      return b.pages[a];
    },
    _makeRange: function _makeRange() {
      var a, b;

      if (!(1 > this.data().totalPages)) {
        b = this.turn("range");

        for (a = b[0]; a <= b[1]; a++) {
          g._addPage.call(this, a);
        }
      }
    },
    range: function range(a) {
      var b,
          c,
          d,
          e = this.data(),
          a = a || e.tpage || e.page || 1;
      d = g._view.call(this, a);
      if (1 > a || a > e.totalPages) throw q('"' + a + '" is not a valid page');
      d[1] = d[1] || d[0];
      1 <= d[0] && d[1] <= e.totalPages ? (a = Math.floor(2), e.totalPages - d[1] > d[0] ? (b = Math.min(d[0] - 1, a), c = 2 * a - b) : (c = Math.min(e.totalPages - d[1], a), b = 2 * a - c)) : c = b = 5;
      return [Math.max(1, d[0] - b), Math.min(e.totalPages, d[1] + c)];
    },
    _necessPage: function _necessPage(a) {
      if (0 === a) return !0;
      var b = this.turn("range");
      return this.data().pageObjs[a].hasClass("fixed") || a >= b[0] && a <= b[1];
    },
    _removeFromDOM: function _removeFromDOM() {
      var a,
          b = this.data();

      for (a in b.pageWrap) {
        n(a, b.pageWrap) && !g._necessPage.call(this, a) && g._removePageFromDOM.call(this, a);
      }
    },
    _removePageFromDOM: function _removePageFromDOM(a) {
      var b = this.data();

      if (b.pages[a]) {
        var c = b.pages[a].data();

        i._moveFoldingPage.call(b.pages[a], !1);

        c.f && c.f.fwrapper && c.f.fwrapper.remove();
        b.pages[a].removeData();
        b.pages[a].remove();
        delete b.pages[a];
      }

      b.pageObjs[a] && b.pageObjs[a].remove();
      b.pageWrap[a] && (b.pageWrap[a].remove(), delete b.pageWrap[a]);

      g._removeMv.call(this, a);

      delete b.pagePlace[a];
      delete b.pageZoom[a];
    },
    removePage: function removePage(a) {
      var b = this.data();
      if ("*" == a) for (; 0 !== b.totalPages;) {
        this.turn("removePage", b.totalPages);
      } else {
        if (1 > a || a > b.totalPages) throw q("The page " + a + " doesn't exist");
        b.pageObjs[a] && (this.turn("stop"), g._removePageFromDOM.call(this, a), delete b.pageObjs[a]);

        g._movePages.call(this, a, -1);

        b.totalPages -= 1;
        b.page > b.totalPages ? (b.page = null, g._fitPage.call(this, b.totalPages)) : (g._makeRange.call(this), this.turn("update"));
      }
      return this;
    },
    _movePages: function _movePages(a, b) {
      var c,
          d = this,
          e = this.data(),
          h = "single" == e.display,
          f = function f(a) {
        var c = a + b,
            f = c % 2,
            i = f ? " odd " : " even ";
        e.pageObjs[a] && (e.pageObjs[c] = e.pageObjs[a].removeClass("p" + a + " odd even").addClass("p" + c + i));
        e.pagePlace[a] && e.pageWrap[a] && (e.pagePlace[c] = c, e.pageWrap[c] = e.pageObjs[c].hasClass("fixed") ? e.pageWrap[a].attr("page", c) : e.pageWrap[a].css(g._pageSize.call(d, c, !0)).attr("page", c), e.pages[a] && (e.pages[c] = e.pages[a].flip("options", {
          page: c,
          next: h || f ? c + 1 : c - 1
        })), b && (delete e.pages[a], delete e.pagePlace[a], delete e.pageZoom[a], delete e.pageObjs[a], delete e.pageWrap[a]));
      };

      if (0 < b) for (c = e.totalPages; c >= a; c--) {
        f(c);
      } else for (c = a; c <= e.totalPages; c++) {
        f(c);
      }
    },
    display: function display(a) {
      var b = this.data(),
          c = b.display;
      if (void 0 === a) return c;
      if (-1 == f.inArray(a, V)) throw q('"' + a + '" is not a value for display');

      switch (a) {
        case "single":
          b.pageObjs[0] || (this.turn("stop").css({
            overflow: "hidden"
          }), b.pageObjs[0] = f("<div />", {
            "class": "page p-temporal"
          }).css({
            width: this.width(),
            height: this.height()
          }).appendTo(this));
          this.addClass("shadow");
          break;

        case "double":
          b.pageObjs[0] && (this.turn("stop").css({
            overflow: ""
          }), b.pageObjs[0].remove(), delete b.pageObjs[0]), this.removeClass("shadow");
      }

      b.display = a;
      c && (a = this.turn("size"), g._movePages.call(this, 1, 0), this.turn("size", a.width, a.height).turn("update"));
      return this;
    },
    direction: function direction(a) {
      var b = this.data();
      if (void 0 === a) return b.direction;
      a = a.toLowerCase();
      if (-1 == f.inArray(a, W)) throw q('"' + a + '" is not a value for direction');
      "rtl" == a && f(this).attr("dir", "ltr").css({
        direction: "ltr"
      });
      b.direction = a;
      b.done && this.turn("size", f(this).width(), f(this).height());
      return this;
    },
    animating: function animating() {
      return 0 < this.data().pageMv.length;
    },
    corner: function corner() {
      var a,
          b,
          c = this.data();

      for (b in c.pages) {
        if (n(b, c.pages) && (a = c.pages[b].flip("corner"))) return a;
      }

      return !1;
    },
    data: function data() {
      return this.data();
    },
    disable: function disable(a) {
      var b,
          c = this.data(),
          d = this.turn("view");
      c.disabled = void 0 === a || !0 === a;

      for (b in c.pages) {
        n(b, c.pages) && c.pages[b].flip("disable", c.disabled ? !0 : -1 == f.inArray(parseInt(b, 10), d));
      }

      return this;
    },
    disabled: function disabled(a) {
      return void 0 === a ? !0 === this.data().disabled : this.turn("disable", a);
    },
    size: function size(a, b) {
      if (void 0 === a || void 0 === b) return {
        width: this.width(),
        height: this.height()
      };
      this.turn("stop");
      var c,
          d,
          e = this.data();
      d = "double" == e.display ? a / 2 : a;
      this.css({
        width: a,
        height: b
      });
      e.pageObjs[0] && e.pageObjs[0].css({
        width: d,
        height: b
      });

      for (c in e.pageWrap) {
        n(c, e.pageWrap) && (d = g._pageSize.call(this, c, !0), e.pageObjs[c].css({
          width: d.width,
          height: d.height
        }), e.pageWrap[c].css(d), e.pages[c] && e.pages[c].css({
          width: d.width,
          height: d.height
        }));
      }

      this.turn("resize");
      return this;
    },
    resize: function resize() {
      var a,
          b = this.data();
      b.pages[0] && (b.pageWrap[0].css({
        left: -this.width()
      }), b.pages[0].flip("resize", !0));

      for (a = 1; a <= b.totalPages; a++) {
        b.pages[a] && b.pages[a].flip("resize", !0);
      }

      g._updateShadow.call(this);

      b.opts.autoCenter && this.turn("center");
    },
    _removeMv: function _removeMv(a) {
      var b,
          c = this.data();

      for (b = 0; b < c.pageMv.length; b++) {
        if (c.pageMv[b] == a) return c.pageMv.splice(b, 1), !0;
      }

      return !1;
    },
    _addMv: function _addMv(a) {
      var b = this.data();

      g._removeMv.call(this, a);

      b.pageMv.push(a);
    },
    _view: function _view(a) {
      var b = this.data(),
          a = a || b.page;
      return "double" == b.display ? a % 2 ? [a - 1, a] : [a, a + 1] : [a];
    },
    view: function view(a) {
      var b = this.data(),
          a = g._view.call(this, a);

      return "double" == b.display ? [0 < a[0] ? a[0] : 0, a[1] <= b.totalPages ? a[1] : 0] : [0 < a[0] && a[0] <= b.totalPages ? a[0] : 0];
    },
    stop: function stop(a, b) {
      if (this.turn("animating")) {
        var c,
            d,
            e,
            h = this.data();
        h.tpage && (h.page = h.tpage, delete h.tpage);

        for (c = 0; c < h.pageMv.length; c++) {
          h.pageMv[c] && h.pageMv[c] !== a && (e = h.pages[h.pageMv[c]], d = e.data().f.opts, e.flip("hideFoldedPage", b), b || i._moveFoldingPage.call(e, !1), d.force && (d.next = 0 === d.page % 2 ? d.page - 1 : d.page + 1, delete d.force));
        }
      }

      this.turn("update");
      return this;
    },
    pages: function pages(a) {
      var b = this.data();

      if (a) {
        if (a < b.totalPages) for (var c = b.totalPages; c > a; c--) {
          this.turn("removePage", c);
        }
        b.totalPages = a;

        g._fitPage.call(this, b.page);

        return this;
      }

      return b.totalPages;
    },
    _missing: function _missing(a) {
      var b = this.data();

      if (!(1 > b.totalPages)) {
        for (var c = this.turn("range", a), d = [], a = c[0]; a <= c[1]; a++) {
          b.pageObjs[a] || d.push(a);
        }

        0 < d.length && this.trigger("missing", [d]);
      }
    },
    _fitPage: function _fitPage(a) {
      var b = this.data(),
          c = this.turn("view", a);

      g._missing.call(this, a);

      if (b.pageObjs[a]) {
        b.page = a;
        this.turn("stop");

        for (var d = 0; d < c.length; d++) {
          c[d] && b.pageZoom[c[d]] != b.zoom && (this.trigger("zoomed", [c[d], c, b.pageZoom[c[d]], b.zoom]), b.pageZoom[c[d]] = b.zoom);
        }

        g._removeFromDOM.call(this);

        g._makeRange.call(this);

        g._updateShadow.call(this);

        this.trigger("turned", [a, c]);
        this.turn("update");
        b.opts.autoCenter && this.turn("center");
      }
    },
    _turnPage: function _turnPage(a) {
      var b,
          c,
          d = this.data(),
          e = d.pagePlace[a],
          h = this.turn("view"),
          i = this.turn("view", a);

      if (d.page != a) {
        var j = d.page;

        if ("prevented" == t("turning", this, [a, i])) {
          j == d.page && -1 != f.inArray(e, d.pageMv) && d.pages[e].flip("hideFoldedPage", !0);
          return;
        }

        -1 != f.inArray(1, i) && this.trigger("first");
        -1 != f.inArray(d.totalPages, i) && this.trigger("last");
      }

      "single" == d.display ? (b = h[0], c = i[0]) : h[1] && a > h[1] ? (b = h[1], c = i[0]) : h[0] && a < h[0] && (b = h[0], c = i[1]);
      e = d.opts.turnCorners.split(",");
      h = d.pages[b].data().f;
      i = h.opts;
      j = h.point;

      g._missing.call(this, a);

      d.pageObjs[a] && (this.turn("stop"), d.page = a, g._makeRange.call(this), d.tpage = c, i.next != c && (i.next = c, i.force = !0), this.turn("update"), h.point = j, "hard" == h.effect ? "ltr" == d.direction ? d.pages[b].flip("turnPage", a > b ? "r" : "l") : d.pages[b].flip("turnPage", a > b ? "l" : "r") : "ltr" == d.direction ? d.pages[b].flip("turnPage", e[a > b ? 1 : 0]) : d.pages[b].flip("turnPage", e[a > b ? 0 : 1]));
    },
    page: function page(a) {
      var b = this.data();
      if (void 0 === a) return b.page;

      if (!b.disabled && !b.destroying) {
        a = parseInt(a, 10);
        if (0 < a && a <= b.totalPages) return a != b.page && (!b.done || -1 != f.inArray(a, this.turn("view")) ? g._fitPage.call(this, a) : g._turnPage.call(this, a)), this;
        throw q("The page " + a + " does not exist");
      }
    },
    next: function next() {
      return this.turn("page", Math.min(this.data().totalPages, g._view.call(this, this.data().page).pop() + 1));
    },
    previous: function previous() {
      return this.turn("page", Math.max(1, g._view.call(this, this.data().page).shift() - 1));
    },
    peel: function peel(a, b) {
      var c = this.data(),
          d = this.turn("view"),
          b = void 0 === b ? !0 : !0 === b;
      !1 === a ? this.turn("stop", null, b) : "single" == c.display ? c.pages[c.page].flip("peel", a, b) : (d = "ltr" == c.direction ? -1 != a.indexOf("l") ? d[0] : d[1] : -1 != a.indexOf("l") ? d[1] : d[0], c.pages[d] && c.pages[d].flip("peel", a, b));
      return this;
    },
    _addMotionPage: function _addMotionPage() {
      var a = f(this).data().f.opts,
          b = a.turn;
      b.data();

      g._addMv.call(b, a.page);
    },
    _eventStart: function _eventStart(a, b, c) {
      var d = b.turn.data(),
          e = d.pageZoom[b.page];
      a.isDefaultPrevented() || (e && e != d.zoom && (b.turn.trigger("zoomed", [b.page, b.turn.turn("view", b.page), e, d.zoom]), d.pageZoom[b.page] = d.zoom), "single" == d.display && c && ("l" == c.charAt(1) && "ltr" == d.direction || "r" == c.charAt(1) && "rtl" == d.direction ? (b.next = b.next < b.page ? b.next : b.page - 1, b.force = !0) : b.next = b.next > b.page ? b.next : b.page + 1), g._addMotionPage.call(a.target));

      g._updateShadow.call(b.turn);
    },
    _eventEnd: function _eventEnd(a, b, c) {
      f(a.target).data();
      var a = b.turn,
          d = a.data();

      if (c) {
        if (c = d.tpage || d.page, c == b.next || c == b.page) delete d.tpage, g._fitPage.call(a, c || b.next, !0);
      } else g._removeMv.call(a, b.page), g._updateShadow.call(a), a.turn("update");
    },
    _eventPressed: function _eventPressed(a) {
      var a = f(a.target).data().f,
          b = a.opts.turn;
      b.data().mouseAction = !0;
      b.turn("update");
      return a.time = new Date().getTime();
    },
    _eventReleased: function _eventReleased(a, b) {
      var c;
      c = f(a.target);
      var d = c.data().f,
          e = d.opts.turn,
          h = e.data();
      c = "single" == h.display ? "br" == b.corner || "tr" == b.corner ? b.x < c.width() / 2 : b.x > c.width() / 2 : 0 > b.x || b.x > c.width();
      if (200 > new Date().getTime() - d.time || c) a.preventDefault(), g._turnPage.call(e, d.opts.next);
      h.mouseAction = !1;
    },
    _flip: function _flip(a) {
      a.stopPropagation();
      a = f(a.target).data().f.opts;
      a.turn.trigger("turn", [a.next]);
      a.turn.data().opts.autoCenter && a.turn.turn("center", a.next);
    },
    _touchStart: function _touchStart() {
      var a = this.data(),
          b;

      for (b in a.pages) {
        if (n(b, a.pages) && !1 === i._eventStart.apply(a.pages[b], arguments)) return !1;
      }
    },
    _touchMove: function _touchMove() {
      var a = this.data(),
          b;

      for (b in a.pages) {
        n(b, a.pages) && i._eventMove.apply(a.pages[b], arguments);
      }
    },
    _touchEnd: function _touchEnd() {
      var a = this.data(),
          b;

      for (b in a.pages) {
        n(b, a.pages) && i._eventEnd.apply(a.pages[b], arguments);
      }
    },
    calculateZ: function calculateZ(a) {
      var b,
          c,
          d,
          e,
          h = this,
          f = this.data();
      b = this.turn("view");

      var i = b[0] || b[1],
          g = a.length - 1,
          j = {
        pageZ: {},
        partZ: {},
        pageV: {}
      },
          k = function k(a) {
        a = h.turn("view", a);
        a[0] && (j.pageV[a[0]] = !0);
        a[1] && (j.pageV[a[1]] = !0);
      };

      for (b = 0; b <= g; b++) {
        c = a[b], d = f.pages[c].data().f.opts.next, e = f.pagePlace[c], k(c), k(d), c = f.pagePlace[d] == d ? d : c, j.pageZ[c] = f.totalPages - Math.abs(i - c), j.partZ[e] = 2 * f.totalPages - g + b;
      }

      return j;
    },
    update: function update() {
      var a,
          b = this.data();

      if (this.turn("animating") && 0 !== b.pageMv[0]) {
        var c,
            d = this.turn("calculateZ", b.pageMv),
            e = this.turn("corner"),
            h = this.turn("view"),
            i = this.turn("view", b.tpage);

        for (a in b.pageWrap) {
          if (n(a, b.pageWrap) && (c = b.pageObjs[a].hasClass("fixed"), b.pageWrap[a].css({
            display: d.pageV[a] || c ? "" : "none",
            zIndex: (b.pageObjs[a].hasClass("hard") ? d.partZ[a] : d.pageZ[a]) || (c ? -1 : 0)
          }), c = b.pages[a])) c.flip("z", d.partZ[a] || null), d.pageV[a] && c.flip("resize"), b.tpage ? c.flip("hover", !1).flip("disable", -1 == f.inArray(parseInt(a, 10), b.pageMv) && a != i[0] && a != i[1]) : c.flip("hover", !1 === e).flip("disable", a != h[0] && a != h[1]);
        }
      } else for (a in b.pageWrap) {
        n(a, b.pageWrap) && (d = g._setPageLoc.call(this, a), b.pages[a] && b.pages[a].flip("disable", b.disabled || 1 != d).flip("hover", !0).flip("z", null));
      }

      return this;
    },
    _updateShadow: function _updateShadow() {
      var a,
          b,
          c = this.data(),
          d = this.width(),
          e = this.height(),
          h = "single" == c.display ? d : d / 2;
      a = this.turn("view");
      c.shadow || (c.shadow = f("<div />", {
        "class": "shadow",
        css: l(0, 0, 0).css
      }).appendTo(this));

      for (var i = 0; i < c.pageMv.length && a[0] && a[1]; i++) {
        a = this.turn("view", c.pages[c.pageMv[i]].data().f.opts.next), b = this.turn("view", c.pageMv[i]), a[0] = a[0] && b[0], a[1] = a[1] && b[1];
      }

      switch (a[0] ? a[1] ? 3 : "ltr" == c.direction ? 2 : 1 : "ltr" == c.direction ? 1 : 2) {
        case 1:
          c.shadow.css({
            width: h,
            height: e,
            top: 0,
            left: h
          });
          break;

        case 2:
          c.shadow.css({
            width: h,
            height: e,
            top: 0,
            left: 0
          });
          break;

        case 3:
          c.shadow.css({
            width: d,
            height: e,
            top: 0,
            left: 0
          });
      }
    },
    _setPageLoc: function _setPageLoc(a) {
      var b = this.data(),
          c = this.turn("view"),
          d = 0;
      if (a == c[0] || a == c[1]) d = 1;else if ("single" == b.display && a == c[0] + 1 || "double" == b.display && a == c[0] - 2 || a == c[1] + 2) d = 2;
      if (!this.turn("animating")) switch (d) {
        case 1:
          b.pageWrap[a].css({
            zIndex: b.totalPages,
            display: ""
          });
          break;

        case 2:
          b.pageWrap[a].css({
            zIndex: b.totalPages - 1,
            display: ""
          });
          break;

        case 0:
          b.pageWrap[a].css({
            zIndex: 0,
            display: b.pageObjs[a].hasClass("fixed") ? "" : "none"
          });
      }
      return d;
    },
    options: function options(a) {
      if (void 0 === a) return this.data().opts;
      var b = this.data();
      f.extend(b.opts, a);
      a.pages && this.turn("pages", a.pages);
      a.page && this.turn("page", a.page);
      a.display && this.turn("display", a.display);
      a.direction && this.turn("direction", a.direction);
      a.width && a.height && this.turn("size", a.width, a.height);
      if (a.when) for (var c in a.when) {
        n(c, a.when) && this.unbind(c).bind(c, a.when[c]);
      }
      return this;
    },
    version: function version() {
      return "4.1.0";
    }
  },
      i = {
    init: function init(a) {
      this.data({
        f: {
          disabled: !1,
          hover: !1,
          effect: this.hasClass("hard") ? "hard" : "sheet"
        }
      });
      this.flip("options", a);

      i._addPageWrapper.call(this);

      return this;
    },
    setData: function setData(a) {
      var b = this.data();
      b.f = f.extend(b.f, a);
      return this;
    },
    options: function options(a) {
      var b = this.data().f;
      return a ? (i.setData.call(this, {
        opts: f.extend({}, b.opts || Y, a)
      }), this) : b.opts;
    },
    z: function z(a) {
      var b = this.data().f;
      b.opts["z-index"] = a;
      b.fwrapper && b.fwrapper.css({
        zIndex: a || parseInt(b.parent.css("z-index"), 10) || 0
      });
      return this;
    },
    _cAllowed: function _cAllowed() {
      var a = this.data().f,
          b = a.opts.page,
          c = a.opts.turn.data(),
          d = b % 2;
      return "hard" == a.effect ? "ltr" == c.direction ? [d ? "r" : "l"] : [d ? "l" : "r"] : "single" == c.display ? 1 == b ? "ltr" == c.direction ? p.forward : p.backward : b == c.totalPages ? "ltr" == c.direction ? p.backward : p.forward : p.all : "ltr" == c.direction ? p[d ? "forward" : "backward"] : p[d ? "backward" : "forward"];
    },
    _cornerActivated: function _cornerActivated(a) {
      var b = this.data().f,
          c = this.width(),
          d = this.height(),
          a = {
        x: a.x,
        y: a.y,
        corner: ""
      },
          e = b.opts.cornerSize;
      if (0 >= a.x || 0 >= a.y || a.x >= c || a.y >= d) return !1;

      var h = i._cAllowed.call(this);

      switch (b.effect) {
        case "hard":
          if (a.x > c - e) a.corner = "r";else if (a.x < e) a.corner = "l";else return !1;
          break;

        case "sheet":
          if (a.y < e) a.corner += "t";else if (a.y >= d - e) a.corner += "b";else return !1;
          if (a.x <= e) a.corner += "l";else if (a.x >= c - e) a.corner += "r";else return !1;
      }

      return !a.corner || -1 == f.inArray(a.corner, h) ? !1 : a;
    },
    _isIArea: function _isIArea(a) {
      var b = this.data().f.parent.offset(),
          a = u && a.originalEvent ? a.originalEvent.touches[0] : a;
      return i._cornerActivated.call(this, {
        x: a.pageX - b.left,
        y: a.pageY - b.top
      });
    },
    _c: function _c(a, b) {
      b = b || 0;

      switch (a) {
        case "tl":
          return j(b, b);

        case "tr":
          return j(this.width() - b, b);

        case "bl":
          return j(b, this.height() - b);

        case "br":
          return j(this.width() - b, this.height() - b);

        case "l":
          return j(b, 0);

        case "r":
          return j(this.width() - b, 0);
      }
    },
    _c2: function _c2(a) {
      switch (a) {
        case "tl":
          return j(2 * this.width(), 0);

        case "tr":
          return j(-this.width(), 0);

        case "bl":
          return j(2 * this.width(), this.height());

        case "br":
          return j(-this.width(), this.height());

        case "l":
          return j(2 * this.width(), 0);

        case "r":
          return j(-this.width(), 0);
      }
    },
    _foldingPage: function _foldingPage() {
      var a = this.data().f;

      if (a) {
        var b = a.opts;
        if (b.turn) return a = b.turn.data(), "single" == a.display ? 1 < b.next || 1 < b.page ? a.pageObjs[0] : null : a.pageObjs[b.next];
      }
    },
    _backGradient: function _backGradient() {
      var a = this.data().f,
          b = a.opts.turn.data();
      if ((b = b.opts.gradients && ("single" == b.display || 2 != a.opts.page && a.opts.page != b.totalPages - 1)) && !a.bshadow) a.bshadow = f("<div/>", l(0, 0, 1)).css({
        position: "",
        width: this.width(),
        height: this.height()
      }).appendTo(a.parent);
      return b;
    },
    type: function type() {
      return this.data().f.effect;
    },
    resize: function resize(a) {
      var b = this.data().f,
          c = b.opts.turn.data(),
          d = this.width(),
          e = this.height();

      switch (b.effect) {
        case "hard":
          a && (b.wrapper.css({
            width: d,
            height: e
          }), b.fpage.css({
            width: d,
            height: e
          }), c.opts.gradients && (b.ashadow.css({
            width: d,
            height: e
          }), b.bshadow.css({
            width: d,
            height: e
          })));
          break;

        case "sheet":
          a && (a = Math.round(Math.sqrt(Math.pow(d, 2) + Math.pow(e, 2))), b.wrapper.css({
            width: a,
            height: a
          }), b.fwrapper.css({
            width: a,
            height: a
          }).children(":first-child").css({
            width: d,
            height: e
          }), b.fpage.css({
            width: d,
            height: e
          }), c.opts.gradients && b.ashadow.css({
            width: d,
            height: e
          }), i._backGradient.call(this) && b.bshadow.css({
            width: d,
            height: e
          })), b.parent.is(":visible") && (c = D(b.parent[0]), b.fwrapper.css({
            top: c.top,
            left: c.left
          }), c = D(b.opts.turn[0]), b.fparent.css({
            top: -c.top,
            left: -c.left
          })), this.flip("z", b.opts["z-index"]);
      }
    },
    _addPageWrapper: function _addPageWrapper() {
      var a = this.data().f,
          b = a.opts.turn.data(),
          c = this.parent();
      a.parent = c;
      if (!a.wrapper) switch (a.effect) {
        case "hard":
          var d = {};
          d[w + "transform-style"] = "preserve-3d";
          d[w + "backface-visibility"] = "hidden";
          a.wrapper = f("<div/>", l(0, 0, 2)).css(d).appendTo(c).prepend(this);
          a.fpage = f("<div/>", l(0, 0, 1)).css(d).appendTo(c);
          b.opts.gradients && (a.ashadow = f("<div/>", l(0, 0, 0)).hide().appendTo(c), a.bshadow = f("<div/>", l(0, 0, 0)));
          break;

        case "sheet":
          var d = this.width(),
              e = this.height();
          a.fparent = a.opts.turn.data().fparent;
          a.fparent || (d = f("<div/>", {
            css: {
              "pointer-events": "none"
            }
          }).hide(), d.data().flips = 0, d.css(l(0, 0, "auto", "visible").css).appendTo(a.opts.turn), a.opts.turn.data().fparent = d, a.fparent = d);
          this.css({
            position: "absolute",
            top: 0,
            left: 0,
            bottom: "auto",
            right: "auto"
          });
          a.wrapper = f("<div/>", l(0, 0, this.css("z-index"))).appendTo(c).prepend(this);
          a.fwrapper = f("<div/>", l(c.offset().top, c.offset().left)).hide().appendTo(a.fparent);
          a.fpage = f("<div/>", l(0, 0, 0, "visible")).css({
            cursor: "default"
          }).appendTo(a.fwrapper);
          b.opts.gradients && (a.ashadow = f("<div/>", l(0, 0, 1)).appendTo(a.fpage));
          i.setData.call(this, a);
      }
      i.resize.call(this, !0);
    },
    _fold: function _fold(a) {
      var b = this.data().f,
          c = b.opts.turn.data(),
          d = i._c.call(this, a.corner),
          e = this.width(),
          h = this.height();

      switch (b.effect) {
        case "hard":
          a.x = "l" == a.corner ? Math.min(Math.max(a.x, 0), 2 * e) : Math.max(Math.min(a.x, e), -e);
          var f,
              g,
              s,
              x,
              k,
              n = c.totalPages,
              l = b.opts["z-index"] || n,
              q = {
            overflow: "visible"
          },
              p = d.x ? (d.x - a.x) / e : a.x / e,
              r = 90 * p,
              t = 90 > r;

          switch (a.corner) {
            case "l":
              x = "0% 50%";
              k = "100% 50%";
              t ? (f = 0, g = 0 < b.opts.next - 1, s = 1) : (f = "100%", g = b.opts.page + 1 < n, s = 0);
              break;

            case "r":
              x = "100% 50%", k = "0% 50%", r = -r, e = -e, t ? (f = 0, g = b.opts.next + 1 < n, s = 0) : (f = "-100%", g = 1 != b.opts.page, s = 1);
          }

          q[w + "perspective-origin"] = k;
          b.wrapper.transform("rotateY(" + r + "deg)translate3d(0px, 0px, " + (this.attr("depth") || 0) + "px)", k);
          b.fpage.transform("translateX(" + e + "px) rotateY(" + (180 + r) + "deg)", x);
          b.parent.css(q);
          t ? (p = -p + 1, b.wrapper.css({
            zIndex: l + 1
          }), b.fpage.css({
            zIndex: l
          })) : (p -= 1, b.wrapper.css({
            zIndex: l
          }), b.fpage.css({
            zIndex: l + 1
          }));
          c.opts.gradients && (g ? b.ashadow.css({
            display: "",
            left: f,
            backgroundColor: "rgba(0,0,0," + 0.5 * p + ")"
          }).transform("rotateY(0deg)") : b.ashadow.hide(), b.bshadow.css({
            opacity: -p + 1
          }), t ? b.bshadow.parent()[0] != b.wrapper[0] && b.bshadow.appendTo(b.wrapper) : b.bshadow.parent()[0] != b.fpage[0] && b.bshadow.appendTo(b.fpage), P(b.bshadow, j(100 * s, 0), j(100 * (-s + 1), 0), [[0, "rgba(0,0,0,0.3)"], [1, "rgba(0,0,0,0)"]], 2));
          break;

        case "sheet":
          var u = this,
              H = 0,
              z,
              A,
              B,
              M,
              y,
              N,
              D,
              v = j(0, 0),
              Q = j(0, 0),
              m = j(0, 0),
              J = i._foldingPage.call(this);

          var O = c.opts.acceleration,
              R = b.wrapper.height(),
              E = "t" == a.corner.substr(0, 1),
              C = "l" == a.corner.substr(1, 1),
              I = function I() {
            var b = j(0, 0),
                f = j(0, 0);
            b.x = d.x ? d.x - a.x : a.x;
            b.y = U ? d.y ? d.y - a.y : a.y : 0;
            f.x = C ? e - b.x / 2 : a.x + b.x / 2;
            f.y = b.y / 2;
            var g = L - Math.atan2(b.y, b.x),
                k = g - Math.atan2(f.y, f.x),
                k = Math.max(0, Math.sin(k) * Math.sqrt(Math.pow(f.x, 2) + Math.pow(f.y, 2)));
            H = 180 * (g / K);
            m = j(k * Math.sin(g), k * Math.cos(g));
            if (g > L && (m.x += Math.abs(m.y * b.y / b.x), m.y = 0, Math.round(m.x * Math.tan(K - g)) < h)) return a.y = Math.sqrt(Math.pow(h, 2) + 2 * f.x * b.x), E && (a.y = h - a.y), I();
            g > L && (b = K - g, f = R - h / Math.sin(b), v = j(Math.round(f * Math.cos(b)), Math.round(f * Math.sin(b))), C && (v.x = -v.x), E && (v.y = -v.y));
            z = Math.round(m.y / Math.tan(g) + m.x);
            b = e - z;
            f = b * Math.cos(2 * g);
            k = b * Math.sin(2 * g);
            Q = j(Math.round(C ? b - f : z + f), Math.round(E ? k : h - k));
            c.opts.gradients && (y = b * Math.sin(g), b = i._c2.call(u, a.corner), b = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2)) / e, D = Math.sin(L * (1 < b ? 2 - b : b)), N = Math.min(b, 1), M = 100 < y ? (y - 100) / y : 0, A = j(100 * (y * Math.sin(g) / e), 100 * (y * Math.cos(g) / h)), i._backGradient.call(u) && (B = j(100 * (1.2 * y * Math.sin(g) / e), 100 * (1.2 * y * Math.cos(g) / h)), C || (B.x = 100 - B.x), E || (B.y = 100 - B.y)));
            m.x = Math.round(m.x);
            m.y = Math.round(m.y);
            return !0;
          };

          f = function f(a, d, _f, g) {
            var k = ["0", "auto"],
                m = (e - R) * _f[0] / 100,
                l = (h - R) * _f[1] / 100,
                d = {
              left: k[d[0]],
              top: k[d[1]],
              right: k[d[2]],
              bottom: k[d[3]]
            },
                k = {},
                n = 90 != g && -90 != g ? C ? -1 : 1 : 0,
                s = _f[0] + "% " + _f[1] + "%";
            u.css(d).transform(G(g) + F(a.x + n, a.y, O), s);
            b.fpage.css(d).transform(G(g) + F(a.x + Q.x - v.x - e * _f[0] / 100, a.y + Q.y - v.y - h * _f[1] / 100, O) + G((180 / g - 2) * g), s);
            b.wrapper.transform(F(-a.x + m - n, -a.y + l, O) + G(-g), s);
            b.fwrapper.transform(F(-a.x + v.x + m, -a.y + v.y + l, O) + G(-g), s);
            c.opts.gradients && (_f[0] && (A.x = 100 - A.x), _f[1] && (A.y = 100 - A.y), k["box-shadow"] = "0 0 20px rgba(0,0,0," + 0.5 * D + ")", J.css(k), P(b.ashadow, j(C ? 100 : 0, E ? 0 : 100), j(A.x, A.y), [[M, "rgba(0,0,0,0)"], [0.8 * (1 - M) + M, "rgba(0,0,0," + 0.2 * N + ")"], [1, "rgba(255,255,255," + 0.2 * N + ")"]], 3), i._backGradient.call(u) && P(b.bshadow, j(C ? 0 : 100, E ? 0 : 100), j(B.x, B.y), [[0.6, "rgba(0,0,0,0)"], [0.8, "rgba(0,0,0," + 0.3 * N + ")"], [1, "rgba(0,0,0,0)"]], 3));
          };

          switch (a.corner) {
            case "tl":
              a.x = Math.max(a.x, 1);
              I();
              f(m, [1, 0, 0, 1], [100, 0], H);
              break;

            case "tr":
              a.x = Math.min(a.x, e - 1);
              I();
              f(j(-m.x, m.y), [0, 0, 0, 1], [0, 0], -H);
              break;

            case "bl":
              a.x = Math.max(a.x, 1);
              I();
              f(j(m.x, -m.y), [1, 1, 0, 0], [100, 100], -H);
              break;

            case "br":
              a.x = Math.min(a.x, e - 1), I(), f(j(-m.x, -m.y), [0, 1, 1, 0], [0, 100], H);
          }

      }

      b.point = a;
    },
    _moveFoldingPage: function _moveFoldingPage(a) {
      var b = this.data().f;

      if (b) {
        var c = b.opts.turn,
            d = c.data(),
            e = d.pagePlace;
        a ? (d = b.opts.next, e[d] != b.opts.page && (b.folding && i._moveFoldingPage.call(this, !1), i._foldingPage.call(this).appendTo(b.fpage), e[d] = b.opts.page, b.folding = d), c.turn("update")) : b.folding && (d.pages[b.folding] ? (c = d.pages[b.folding].data().f, d.pageObjs[b.folding].appendTo(c.wrapper)) : d.pageWrap[b.folding] && d.pageObjs[b.folding].appendTo(d.pageWrap[b.folding]), b.folding in e && (e[b.folding] = b.folding), delete b.folding);
      }
    },
    _showFoldedPage: function _showFoldedPage(a, b) {
      var c = i._foldingPage.call(this),
          d = this.data(),
          e = d.f,
          f = e.visible;

      if (c) {
        if (!f || !e.point || e.point.corner != a.corner) if (c = "hover" == e.status || "peel" == e.status || e.opts.turn.data().mouseAction ? a.corner : null, f = !1, "prevented" == t("start", this, [e.opts, c])) return !1;

        if (b) {
          var g = this,
              d = e.point && e.point.corner == a.corner ? e.point : i._c.call(this, a.corner, 1);
          this.animatef({
            from: [d.x, d.y],
            to: [a.x, a.y],
            duration: 500,
            frame: function frame(b) {
              a.x = Math.round(b[0]);
              a.y = Math.round(b[1]);

              i._fold.call(g, a);
            }
          });
        } else i._fold.call(this, a), d.effect && !d.effect.turning && this.animatef(!1);

        if (!f) switch (e.effect) {
          case "hard":
            e.visible = !0;

            i._moveFoldingPage.call(this, !0);

            e.fpage.show();
            e.opts.shadows && e.bshadow.show();
            break;

          case "sheet":
            e.visible = !0, e.fparent.show().data().flips++, i._moveFoldingPage.call(this, !0), e.fwrapper.show(), e.bshadow && e.bshadow.show();
        }
        return !0;
      }

      return !1;
    },
    hide: function hide() {
      var a = this.data().f,
          b = a.opts.turn.data(),
          c = i._foldingPage.call(this);

      switch (a.effect) {
        case "hard":
          b.opts.gradients && (a.bshadowLoc = 0, a.bshadow.remove(), a.ashadow.hide());
          a.wrapper.transform("");
          a.fpage.hide();
          break;

        case "sheet":
          0 === --a.fparent.data().flips && a.fparent.hide(), this.css({
            left: 0,
            top: 0,
            right: "auto",
            bottom: "auto"
          }).transform(""), a.wrapper.transform(""), a.fwrapper.hide(), a.bshadow && a.bshadow.hide(), c.transform("");
      }

      a.visible = !1;
      return this;
    },
    hideFoldedPage: function hideFoldedPage(a) {
      var b = this.data().f;

      if (b.point) {
        var c = this,
            d = b.point,
            e = function e() {
          b.point = null;
          b.status = "";
          c.flip("hide");
          c.trigger("end", [b.opts, !1]);
        };

        if (a) {
          var f = i._c.call(this, d.corner),
              a = "t" == d.corner.substr(0, 1) ? Math.min(0, d.y - f.y) / 2 : Math.max(0, d.y - f.y) / 2,
              g = j(d.x, d.y + a),
              l = j(f.x, f.y - a);

          this.animatef({
            from: 0,
            to: 1,
            frame: function frame(a) {
              a = S(d, g, l, f, a);
              d.x = a.x;
              d.y = a.y;

              i._fold.call(c, d);
            },
            complete: e,
            duration: 800,
            hiding: !0
          });
        } else this.animatef(!1), e();
      }
    },
    turnPage: function turnPage(a) {
      var b = this,
          c = this.data().f,
          d = c.opts.turn.data(),
          a = {
        corner: c.corner ? c.corner.corner : a || i._cAllowed.call(this)[0]
      },
          e = c.point || i._c.call(this, a.corner, c.opts.turn ? d.opts.elevation : 0),
          f = i._c2.call(this, a.corner);

      this.trigger("flip").animatef({
        from: 0,
        to: 1,
        frame: function frame(c) {
          c = S(e, e, f, f, c);
          a.x = c.x;
          a.y = c.y;

          i._showFoldedPage.call(b, a);
        },
        complete: function complete() {
          b.trigger("end", [c.opts, !0]);
        },
        duration: d.opts.duration,
        turning: !0
      });
      c.corner = null;
    },
    moving: function moving() {
      return "effect" in this.data();
    },
    isTurning: function isTurning() {
      return this.flip("moving") && this.data().effect.turning;
    },
    corner: function corner() {
      return this.data().f.corner;
    },
    _eventStart: function _eventStart(a) {
      var b = this.data().f,
          c = b.opts.turn;

      if (!b.corner && !b.disabled && !this.flip("isTurning") && b.opts.page == c.data().pagePlace[b.opts.page]) {
        b.corner = i._isIArea.call(this, a);
        if (b.corner && i._foldingPage.call(this)) return this.trigger("pressed", [b.point]), i._showFoldedPage.call(this, b.corner), !1;
        b.corner = null;
      }
    },
    _eventMove: function _eventMove(a) {
      var b = this.data().f;
      if (!b.disabled) if (a = u ? a.originalEvent.touches : [a], b.corner) {
        var c = b.parent.offset();
        b.corner.x = a[0].pageX - c.left;
        b.corner.y = a[0].pageY - c.top;

        i._showFoldedPage.call(this, b.corner);
      } else if (b.hover && !this.data().effect && this.is(":visible")) if (a = i._isIArea.call(this, a[0])) {
        if ("sheet" == b.effect && 2 == a.corner.length || "hard" == b.effect) b.status = "hover", b = i._c.call(this, a.corner, b.opts.cornerSize / 2), a.x = b.x, a.y = b.y, i._showFoldedPage.call(this, a, !0);
      } else "hover" == b.status && (b.status = "", i.hideFoldedPage.call(this, !0));
    },
    _eventEnd: function _eventEnd() {
      var a = this.data().f,
          b = a.corner;
      !a.disabled && b && "prevented" != t("released", this, [a.point || b]) && i.hideFoldedPage.call(this, !0);
      a.corner = null;
    },
    disable: function disable(a) {
      i.setData.call(this, {
        disabled: a
      });
      return this;
    },
    hover: function hover(a) {
      i.setData.call(this, {
        hover: a
      });
      return this;
    },
    peel: function peel(a, b) {
      var c = this.data().f;

      if (a) {
        if (-1 == f.inArray(a, p.all)) throw q("Corner " + a + " is not permitted");

        if (-1 != f.inArray(a, i._cAllowed.call(this))) {
          var d = i._c.call(this, a, c.opts.cornerSize / 2);

          c.status = "peel";

          i._showFoldedPage.call(this, {
            corner: a,
            x: d.x,
            y: d.y
          }, b);
        }
      } else c.status = "", i.hideFoldedPage.call(this, b);

      return this;
    }
  };

  window.requestAnim = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
    window.setTimeout(a, 1E3 / 60);
  };

  f.extend(f.fn, {
    flip: function flip() {
      return J(f(this[0]), i, arguments);
    },
    turn: function turn() {
      return J(f(this[0]), g, arguments);
    },
    transform: function transform(a, b) {
      var c = {};
      b && (c[w + "transform-origin"] = b);
      c[w + "transform"] = a;
      return this.css(c);
    },
    animatef: function animatef(a) {
      var b = this.data();
      b.effect && b.effect.stop();

      if (a) {
        a.to.length || (a.to = [a.to]);
        a.from.length || (a.from = [a.from]);

        for (var c = [], d = a.to.length, e = !0, g = this, i = new Date().getTime(), j = function j() {
          if (b.effect && e) {
            for (var f = [], k = Math.min(a.duration, new Date().getTime() - i), l = 0; l < d; l++) {
              f.push(b.effect.easing(1, k, a.from[l], c[l], a.duration));
            }

            a.frame(1 == d ? f[0] : f);
            k == a.duration ? (delete b.effect, g.data(b), a.complete && a.complete()) : window.requestAnim(j);
          }
        }, l = 0; l < d; l++) {
          c.push(a.to[l] - a.from[l]);
        }

        b.effect = f.extend({
          stop: function stop() {
            e = !1;
          },
          easing: function easing(a, b, c, d, e) {
            return d * Math.sqrt(1 - (b = b / e - 1) * b) + c;
          }
        }, a);
        this.data(b);
        j();
      } else delete b.effect;
    }
  });
  f.isTouch = u;
  f.mouseEvents = r;
  f.cssPrefix = T;

  f.cssTransitionEnd = function () {
    var a,
        b = document.createElement("fakeelement"),
        c = {
      transition: "transitionend",
      OTransition: "oTransitionEnd",
      MSTransition: "transitionend",
      MozTransition: "transitionend",
      WebkitTransition: "webkitTransitionEnd"
    };

    for (a in c) {
      if (void 0 !== b.style[a]) return c[a];
    }
  };

  f.findPos = D;
})($);var script = {
  name: "Turn",
  // vue component name
  data: function data() {
    return {
      nanoid: nanoid.nanoid(),
      currentPage: 1,
      triggerClicking: false,
      setIntervalId: null
    };
  },
  props: {
    id: {
      type: String
    },
    options: {
      type: Object,
      default: function _default() {}
    }
  },
  watch: {
    currentPage: {
      handler: function handler(val) {
        this.$emit("changePage", val);
        this.goTo(val);
      },
      immediately: true
    },
    defaultOptions: function defaultOptions(val) {
      $("#".concat(this.uid)).turn(val);
    }
  },
  computed: {
    uid: function uid() {
      return !this.id ? this.nanoid : "".concat(this.id, "-").concat(this.nanoid);
    },
    defaultOptions: function defaultOptions() {
      var _this = this;

      return _objectSpread2({
        width: 800,
        height: 600,
        display: "double",
        duration: 1800,
        autoFlip: false,
        autoFlipDelay: 2000,
        page: 1,
        when: {
          turning: function turning(event, page, pageObj) {
            _this.currentPage = page;
          },
          // triggered before turned
          first: function first() {
            _this.first();
          },
          // triggered before turned
          last: function last() {
            _this.last();
          }
        }
      }, this.options);
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    $("#".concat(this.uid)).turn(this.defaultOptions);

    if (this.defaultOptions.autoFlip) {
      this.setIntervalId = setInterval(function () {
        _this2.currentPage++;
      }, this.defaultOptions.autoFlipDelay);
    }
  },
  methods: {
    goTo: function goTo(page) {
      $("#".concat(this.uid)).turn("page", page);
    },
    first: function first() {},
    last: function last() {
      if (this.defaultOptions.autoFlip) {
        this.currentPage = 1;
      }
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}
//# sourceMappingURL=normalize-component.mjs.map
function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "flip-book",
    attrs: {
      "id": this.uid
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-80c8ab18_0", {
    source: ".flip-book[data-v-80c8ab18]{width:800px;height:600px;position:relative;margin:10px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-80c8ab18";
/* module identifier */

var __vue_module_identifier__ = "data-v-80c8ab18";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);(function (window, document, undefined$1) {
  var tests = [];
  /**
   *
   * ModernizrProto is the constructor for Modernizr
   *
   * @class
   * @access public
   */

  var ModernizrProto = {
    // The current version, dummy
    _version: '3.6.0',
    // Any settings that don't work as separate modules
    // can go in here as configuration.
    _config: {
      'classPrefix': '',
      'enableClasses': true,
      'enableJSClass': true,
      'usePrefixes': true
    },
    // Queue of tests
    _q: [],
    // Stub these for people who are listening
    on: function on(test, cb) {
      // I don't really think people should do this, but we can
      // safe guard it a bit.
      // -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
      // This is in case people listen to synchronous tests. I would leave it out,
      // but the code to *disallow* sync tests in the real version of this
      // function is actually larger than this.
      var self = this;
      setTimeout(function () {
        cb(self[test]);
      }, 0);
    },
    addTest: function addTest(name, fn, options) {
      tests.push({
        name: name,
        fn: fn,
        options: options
      });
    },
    addAsyncTest: function addAsyncTest(fn) {
      tests.push({
        name: null,
        fn: fn
      });
    }
  }; // Fake some of Object.create so we can force non test results to be non "own" properties.

  var Modernizr = function Modernizr() {};

  Modernizr.prototype = ModernizrProto; // Leak modernizr globally when you `require` it rather than force it here.
  // Overwrite name so constructor name is nicer :D

  Modernizr = new Modernizr();
  var classes = [];
  /**
   * is returns a boolean if the typeof an obj is exactly type.
   *
   * @access private
   * @function is
   * @param {*} obj - A thing we want to check the type of
   * @param {string} type - A string to compare the typeof against
   * @returns {boolean}
   */

  function is(obj, type) {
    return _typeof(obj) === type;
  }
  /**
   * Run through all tests and detect their support in the current UA.
   *
   * @access private
   */

  function testRunner() {
    var featureNames;
    var feature;
    var aliasIdx;
    var result;
    var nameIdx;
    var featureName;
    var featureNameSplit;

    for (var featureIdx in tests) {
      if (tests.hasOwnProperty(featureIdx)) {
        featureNames = [];
        feature = tests[featureIdx]; // run the test, throw the return value into the Modernizr,
        // then based on that boolean, define an appropriate className
        // and push it into an array of classes we'll join later.
        //
        // If there is no name, it's an 'async' test that is run,
        // but not directly added to the object. That should
        // be done with a post-run addTest call.

        if (feature.name) {
          featureNames.push(feature.name.toLowerCase());

          if (feature.options && feature.options.aliases && feature.options.aliases.length) {
            // Add all the aliases into the names list
            for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
              featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
            }
          }
        } // Run the test, or use the raw value if it's not a function


        result = is(feature.fn, 'function') ? feature.fn() : feature.fn; // Set each of the names on the Modernizr object

        for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
          featureName = featureNames[nameIdx]; // Support dot properties as sub tests. We don't do checking to make sure
          // that the implied parent tests have been added. You must call them in
          // order (either in the test, or make the parent test a dependency).
          //
          // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
          // hashtag famous last words

          featureNameSplit = featureName.split('.');

          if (featureNameSplit.length === 1) {
            Modernizr[featureNameSplit[0]] = result;
          } else {
            // cast to a Boolean, if not one already
            if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
              Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
            }

            Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
          }

          classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
        }
      }
    }
  }
  /**
   * hasOwnProp is a shim for hasOwnProperty that is needed for Safari 2.0 support
   *
   * @author kangax
   * @access private
   * @function hasOwnProp
   * @param {object} object - The object to check for a property
   * @param {string} property - The property to check for
   * @returns {boolean}
   */
  // hasOwnProperty shim by kangax needed for Safari 2.0 support

  var hasOwnProp;

  (function () {
    var _hasOwnProperty = {}.hasOwnProperty;
    /* istanbul ignore else */

    /* we have no way of testing IE 5.5 or safari 2,
     * so just assume the else gets hit */

    if (!is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined')) {
      hasOwnProp = function hasOwnProp(object, property) {
        return _hasOwnProperty.call(object, property);
      };
    } else {
      hasOwnProp = function hasOwnProp(object, property) {
        /* yes, this can give false positives/negatives, but most of the time we don't care about those */
        return property in object && is(object.constructor.prototype[property], 'undefined');
      };
    }
  })();
  /**
   * cssToDOM takes a kebab-case string and converts it to camelCase
   * e.g. box-sizing -> boxSizing
   *
   * @access private
   * @function cssToDOM
   * @param {string} name - String name of kebab-case prop we want to convert
   * @returns {string} The camelCase version of the supplied name
   */


  function cssToDOM(name) {
    return name.replace(/([a-z])-([a-z])/g, function (str, m1, m2) {
      return m1 + m2.toUpperCase();
    }).replace(/^-/, '');
  }
  /*!
  {
    "name": "CSS Supports",
    "property": "supports",
    "caniuse": "css-featurequeries",
    "tags": ["css"],
    "builderAliases": ["css_supports"],
    "notes": [{
      "name": "W3 Spec",
      "href": "http://dev.w3.org/csswg/css3-conditional/#at-supports"
    },{
      "name": "Related Github Issue",
      "href": "https://github.com/Modernizr/Modernizr/issues/648"
    },{
      "name": "W3 Info",
      "href": "http://dev.w3.org/csswg/css3-conditional/#the-csssupportsrule-interface"
    }]
  }
  !*/

  var newSyntax = 'CSS' in window && 'supports' in window.CSS;
  var oldSyntax = ('supportsCSS' in window);
  Modernizr.addTest('supports', newSyntax || oldSyntax);
  /**
   * docElement is a convenience wrapper to grab the root element of the document
   *
   * @access private
   * @returns {HTMLElement|SVGElement} The root element of the document
   */

  var docElement = document.documentElement;
  /**
   * A convenience helper to check if the document we are running in is an SVG document
   *
   * @access private
   * @returns {boolean}
   */

  var isSVG = docElement.nodeName.toLowerCase() === 'svg';
  /**
   * setClasses takes an array of class names and adds them to the root element
   *
   * @access private
   * @function setClasses
   * @param {string[]} classes - Array of class names
   */
  // Pass in an and array of class names, e.g.:
  //  ['no-webp', 'borderradius', ...]

  function setClasses(classes) {
    var className = docElement.className;
    var classPrefix = Modernizr._config.classPrefix || '';

    if (isSVG) {
      className = className.baseVal;
    } // Change `no-js` to `js` (independently of the `enableClasses` option)
    // Handle classPrefix on this too


    if (Modernizr._config.enableJSClass) {
      var reJS = new RegExp('(^|\\s)' + classPrefix + 'no-js(\\s|$)');
      className = className.replace(reJS, '$1' + classPrefix + 'js$2');
    }

    if (Modernizr._config.enableClasses) {
      // Add the new classes
      className += ' ' + classPrefix + classes.join(' ' + classPrefix);

      if (isSVG) {
        docElement.className.baseVal = className;
      } else {
        docElement.className = className;
      }
    }
  }

  ModernizrProto._l = {};
  /**
   * Modernizr.on is a way to listen for the completion of async tests. Being
   * asynchronous, they may not finish before your scripts run. As a result you
   * will get a possibly false negative `undefined` value.
   *
   * @memberof Modernizr
   * @name Modernizr.on
   * @access public
   * @function on
   * @param {string} feature - String name of the feature detect
   * @param {function} cb - Callback function returning a Boolean - true if feature is supported, false if not
   * @example
   *
   * ```js
   * Modernizr.on('flash', function( result ) {
   *   if (result) {
   *    // the browser has flash
   *   } else {
   *     // the browser does not have flash
   *   }
   * });
   * ```
   */

  ModernizrProto.on = function (feature, cb) {
    // Create the list of listeners if it doesn't exist
    if (!this._l[feature]) {
      this._l[feature] = [];
    } // Push this test on to the listener list


    this._l[feature].push(cb); // If it's already been resolved, trigger it on next tick


    if (Modernizr.hasOwnProperty(feature)) {
      // Next Tick
      setTimeout(function () {
        Modernizr._trigger(feature, Modernizr[feature]);
      }, 0);
    }
  };
  /**
   * _trigger is the private function used to signal test completion and run any
   * callbacks registered through [Modernizr.on](#modernizr-on)
   *
   * @memberof Modernizr
   * @name Modernizr._trigger
   * @access private
   * @function _trigger
   * @param {string} feature - string name of the feature detect
   * @param {function|boolean} [res] - A feature detection function, or the boolean =
   * result of a feature detection function
   */


  ModernizrProto._trigger = function (feature, res) {
    if (!this._l[feature]) {
      return;
    }

    var cbs = this._l[feature]; // Force async

    setTimeout(function () {
      var i, cb;

      for (i = 0; i < cbs.length; i++) {
        cb = cbs[i];
        cb(res);
      }
    }, 0); // Don't trigger these again

    delete this._l[feature];
  };
  /**
   * addTest allows you to define your own feature detects that are not currently
   * included in Modernizr (under the covers it's the exact same code Modernizr
   * uses for its own [feature detections](https://github.com/Modernizr/Modernizr/tree/master/feature-detects)). Just like the offical detects, the result
   * will be added onto the Modernizr object, as well as an appropriate className set on
   * the html element when configured to do so
   *
   * @memberof Modernizr
   * @name Modernizr.addTest
   * @optionName Modernizr.addTest()
   * @optionProp addTest
   * @access public
   * @function addTest
   * @param {string|object} feature - The string name of the feature detect, or an
   * object of feature detect names and test
   * @param {function|boolean} test - Function returning true if feature is supported,
   * false if not. Otherwise a boolean representing the results of a feature detection
   * @example
   *
   * The most common way of creating your own feature detects is by calling
   * `Modernizr.addTest` with a string (preferably just lowercase, without any
   * punctuation), and a function you want executed that will return a boolean result
   *
   * ```js
   * Modernizr.addTest('itsTuesday', function() {
   *  var d = new Date();
   *  return d.getDay() === 2;
   * });
   * ```
   *
   * When the above is run, it will set Modernizr.itstuesday to `true` when it is tuesday,
   * and to `false` every other day of the week. One thing to notice is that the names of
   * feature detect functions are always lowercased when added to the Modernizr object. That
   * means that `Modernizr.itsTuesday` will not exist, but `Modernizr.itstuesday` will.
   *
   *
   *  Since we only look at the returned value from any feature detection function,
   *  you do not need to actually use a function. For simple detections, just passing
   *  in a statement that will return a boolean value works just fine.
   *
   * ```js
   * Modernizr.addTest('hasJquery', 'jQuery' in window);
   * ```
   *
   * Just like before, when the above runs `Modernizr.hasjquery` will be true if
   * jQuery has been included on the page. Not using a function saves a small amount
   * of overhead for the browser, as well as making your code much more readable.
   *
   * Finally, you also have the ability to pass in an object of feature names and
   * their tests. This is handy if you want to add multiple detections in one go.
   * The keys should always be a string, and the value can be either a boolean or
   * function that returns a boolean.
   *
   * ```js
   * var detects = {
   *  'hasjquery': 'jQuery' in window,
   *  'itstuesday': function() {
   *    var d = new Date();
   *    return d.getDay() === 2;
   *  }
   * }
   *
   * Modernizr.addTest(detects);
   * ```
   *
   * There is really no difference between the first methods and this one, it is
   * just a convenience to let you write more readable code.
   */


  function addTest(feature, test) {
    if (_typeof(feature) == 'object') {
      for (var key in feature) {
        if (hasOwnProp(feature, key)) {
          addTest(key, feature[key]);
        }
      }
    } else {
      feature = feature.toLowerCase();
      var featureNameSplit = feature.split('.');
      var last = Modernizr[featureNameSplit[0]]; // Again, we don't check for parent test existence. Get that right, though.

      if (featureNameSplit.length == 2) {
        last = last[featureNameSplit[1]];
      }

      if (typeof last != 'undefined') {
        // we're going to quit if you're trying to overwrite an existing test
        // if we were to allow it, we'd do this:
        //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
        //   docElement.className = docElement.className.replace( re, '' );
        // but, no rly, stuff 'em.
        return Modernizr;
      }

      test = typeof test == 'function' ? test() : test; // Set the value (this is the magic, right here).

      if (featureNameSplit.length == 1) {
        Modernizr[featureNameSplit[0]] = test;
      } else {
        // cast to a Boolean, if not one already
        if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
          Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
        }

        Modernizr[featureNameSplit[0]][featureNameSplit[1]] = test;
      } // Set a single class (either `feature` or `no-feature`)


      setClasses([(!!test && test != false ? '' : 'no-') + featureNameSplit.join('-')]); // Trigger the event

      Modernizr._trigger(feature, test);
    }

    return Modernizr; // allow chaining.
  } // After all the tests are run, add self to the Modernizr prototype


  Modernizr._q.push(function () {
    ModernizrProto.addTest = addTest;
  });
  /**
   * createElement is a convenience wrapper around document.createElement. Since we
   * use createElement all over the place, this allows for (slightly) smaller code
   * as well as abstracting away issues with creating elements in contexts other than
   * HTML documents (e.g. SVG documents).
   *
   * @access private
   * @function createElement
   * @returns {HTMLElement|SVGElement} An HTML or SVG element
   */


  function createElement() {
    if (typeof document.createElement !== 'function') {
      // This is the case in IE7, where the type of createElement is "object".
      // For this reason, we cannot call apply() as Object is not a Function.
      return document.createElement(arguments[0]);
    } else if (isSVG) {
      return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
    } else {
      return document.createElement.apply(document, arguments);
    }
  }
  /*!
  {
    "name": "CSS Transform Style preserve-3d",
    "property": "preserve3d",
    "authors": ["denyskoch", "aFarkas"],
    "tags": ["css"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style"
    },{
      "name": "Related Github Issue",
      "href": "https://github.com/Modernizr/Modernizr/issues/1748"
    }]
  }
  !*/

  /* DOC
  Detects support for `transform-style: preserve-3d`, for getting a proper 3D perspective on elements.
  */

  Modernizr.addTest('preserve3d', function () {
    var outerAnchor, innerAnchor;
    var CSS = window.CSS;
    var result = false;

    if (CSS && CSS.supports && CSS.supports('(transform-style: preserve-3d)')) {
      return true;
    }

    outerAnchor = createElement('a');
    innerAnchor = createElement('a');
    outerAnchor.style.cssText = 'display: block; transform-style: preserve-3d; transform-origin: right; transform: rotateY(40deg);';
    innerAnchor.style.cssText = 'display: block; width: 9px; height: 1px; background: #000; transform-origin: right; transform: rotateY(40deg);';
    outerAnchor.appendChild(innerAnchor);
    docElement.appendChild(outerAnchor);
    result = innerAnchor.getBoundingClientRect();
    docElement.removeChild(outerAnchor);
    result = result.width && result.width < 4;
    return result;
  });
  /**
   * getBody returns the body of a document, or an element that can stand in for
   * the body if a real body does not exist
   *
   * @access private
   * @function getBody
   * @returns {HTMLElement|SVGElement} Returns the real body of a document, or an
   * artificially created element that stands in for the body
   */

  function getBody() {
    // After page load injecting a fake body doesn't work so check if body exists
    var body = document.body;

    if (!body) {
      // Can't use the real body create a fake one.
      body = createElement(isSVG ? 'svg' : 'body');
      body.fake = true;
    }

    return body;
  }
  /**
   * injectElementWithStyles injects an element with style element and some CSS rules
   *
   * @access private
   * @function injectElementWithStyles
   * @param {string} rule - String representing a css rule
   * @param {function} callback - A function that is used to test the injected element
   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
   * @returns {boolean}
   */

  function injectElementWithStyles(rule, callback, nodes, testnames) {
    var mod = 'modernizr';
    var style;
    var ret;
    var node;
    var docOverflow;
    var div = createElement('div');
    var body = getBody();

    if (parseInt(nodes, 10)) {
      // In order not to give false positives we create a node for each test
      // This also allows the method to scale for unspecified uses
      while (nodes--) {
        node = createElement('div');
        node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
        div.appendChild(node);
      }
    }

    style = createElement('style');
    style.type = 'text/css';
    style.id = 's' + mod; // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
    // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270

    (!body.fake ? div : body).appendChild(style);
    body.appendChild(div);

    if (style.styleSheet) {
      style.styleSheet.cssText = rule;
    } else {
      style.appendChild(document.createTextNode(rule));
    }

    div.id = mod;

    if (body.fake) {
      //avoid crashing IE8, if background image is used
      body.style.background = ''; //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible

      body.style.overflow = 'hidden';
      docOverflow = docElement.style.overflow;
      docElement.style.overflow = 'hidden';
      docElement.appendChild(body);
    }

    ret = callback(div, rule); // If this is done after page load we don't want to remove the body so check if body exists

    if (body.fake) {
      body.parentNode.removeChild(body);
      docElement.style.overflow = docOverflow; // Trigger layout so kinetic scrolling isn't disabled in iOS6+
      // eslint-disable-next-line

      docElement.offsetHeight;
    } else {
      div.parentNode.removeChild(div);
    }

    return !!ret;
  }
  /**
   * testStyles injects an element with style element and some CSS rules
   *
   * @memberof Modernizr
   * @name Modernizr.testStyles
   * @optionName Modernizr.testStyles()
   * @optionProp testStyles
   * @access public
   * @function testStyles
   * @param {string} rule - String representing a css rule
   * @param {function} callback - A function that is used to test the injected element
   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
   * @returns {boolean}
   * @example
   *
   * `Modernizr.testStyles` takes a CSS rule and injects it onto the current page
   * along with (possibly multiple) DOM elements. This lets you check for features
   * that can not be detected by simply checking the [IDL](https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Interface_development_guide/IDL_interface_rules).
   *
   * ```js
   * Modernizr.testStyles('#modernizr { width: 9px; color: papayawhip; }', function(elem, rule) {
   *   // elem is the first DOM node in the page (by default #modernizr)
   *   // rule is the first argument you supplied - the CSS rule in string form
   *
   *   addTest('widthworks', elem.style.width === '9px')
   * });
   * ```
   *
   * If your test requires multiple nodes, you can include a third argument
   * indicating how many additional div elements to include on the page. The
   * additional nodes are injected as children of the `elem` that is returned as
   * the first argument to the callback.
   *
   * ```js
   * Modernizr.testStyles('#modernizr {width: 1px}; #modernizr2 {width: 2px}', function(elem) {
   *   document.getElementById('modernizr').style.width === '1px'; // true
   *   document.getElementById('modernizr2').style.width === '2px'; // true
   *   elem.firstChild === document.getElementById('modernizr2'); // true
   * }, 1);
   * ```
   *
   * By default, all of the additional elements have an ID of `modernizr[n]`, where
   * `n` is its index (e.g. the first additional, second overall is `#modernizr2`,
   * the second additional is `#modernizr3`, etc.).
   * If you want to have more meaningful IDs for your function, you can provide
   * them as the fourth argument, as an array of strings
   *
   * ```js
   * Modernizr.testStyles('#foo {width: 10px}; #bar {height: 20px}', function(elem) {
   *   elem.firstChild === document.getElementById('foo'); // true
   *   elem.lastChild === document.getElementById('bar'); // true
   * }, 2, ['foo', 'bar']);
   * ```
   *
   */

  var testStyles = ModernizrProto.testStyles = injectElementWithStyles;
  /**
   * If the browsers follow the spec, then they would expose vendor-specific styles as:
   *   elem.style.WebkitBorderRadius
   * instead of something like the following (which is technically incorrect):
   *   elem.style.webkitBorderRadius
    * WebKit ghosts their properties in lowercase but Opera & Moz do not.
   * Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
   *   erik.eae.net/archives/2008/03/10/21.48.10/
    * More here: github.com/Modernizr/Modernizr/issues/issue/21
   *
   * @access private
   * @returns {string} The string representing the vendor-specific style properties
   */

  var omPrefixes = 'Moz O ms Webkit';
  var cssomPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.split(' ') : [];
  ModernizrProto._cssomPrefixes = cssomPrefixes;
  /**
   * atRule returns a given CSS property at-rule (eg @keyframes), possibly in
   * some prefixed form, or false, in the case of an unsupported rule
   *
   * @memberof Modernizr
   * @name Modernizr.atRule
   * @optionName Modernizr.atRule()
   * @optionProp atRule
   * @access public
   * @function atRule
   * @param {string} prop - String name of the @-rule to test for
   * @returns {string|boolean} The string representing the (possibly prefixed)
   * valid version of the @-rule, or `false` when it is unsupported.
   * @example
   * ```js
   *  var keyframes = Modernizr.atRule('@keyframes');
   *
   *  if (keyframes) {
   *    // keyframes are supported
   *    // could be `@-webkit-keyframes` or `@keyframes`
   *  } else {
   *    // keyframes === `false`
   *  }
   * ```
   *
   */

  var atRule = function atRule(prop) {
    var length = prefixes.length;
    var cssrule = window.CSSRule;
    var rule;

    if (typeof cssrule === 'undefined') {
      return undefined$1;
    }

    if (!prop) {
      return false;
    } // remove literal @ from beginning of provided property


    prop = prop.replace(/^@/, ''); // CSSRules use underscores instead of dashes

    rule = prop.replace(/-/g, '_').toUpperCase() + '_RULE';

    if (rule in cssrule) {
      return '@' + prop;
    }

    for (var i = 0; i < length; i++) {
      // prefixes gives us something like -o-, and we want O_
      var prefix = prefixes[i];
      var thisRule = prefix.toUpperCase() + '_' + rule;

      if (thisRule in cssrule) {
        return '@-' + prefix.toLowerCase() + '-' + prop;
      }
    }

    return false;
  };

  ModernizrProto.atRule = atRule;
  /**
   * List of JavaScript DOM values used for tests
   *
   * @memberof Modernizr
   * @name Modernizr._domPrefixes
   * @optionName Modernizr._domPrefixes
   * @optionProp domPrefixes
   * @access public
   * @example
   *
   * Modernizr._domPrefixes is exactly the same as [_prefixes](#modernizr-_prefixes), but rather
   * than kebab-case properties, all properties are their Capitalized variant
   *
   * ```js
   * Modernizr._domPrefixes === [ "Moz", "O", "ms", "Webkit" ];
   * ```
   */

  var domPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(' ') : [];
  ModernizrProto._domPrefixes = domPrefixes;
  /**
   * contains checks to see if a string contains another string
   *
   * @access private
   * @function contains
   * @param {string} str - The string we want to check for substrings
   * @param {string} substr - The substring we want to search the first string for
   * @returns {boolean}
   */

  function contains(str, substr) {
    return !!~('' + str).indexOf(substr);
  }
  /**
   * fnBind is a super small [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) polyfill.
   *
   * @access private
   * @function fnBind
   * @param {function} fn - a function you want to change `this` reference to
   * @param {object} that - the `this` you want to call the function with
   * @returns {function} The wrapped version of the supplied function
   */

  function fnBind(fn, that) {
    return function () {
      return fn.apply(that, arguments);
    };
  }
  /**
   * testDOMProps is a generic DOM property test; if a browser supports
   *   a certain property, it won't return undefined for it.
   *
   * @access private
   * @function testDOMProps
   * @param {array.<string>} props - An array of properties to test for
   * @param {object} obj - An object or Element you want to use to test the parameters again
   * @param {boolean|object} elem - An Element to bind the property lookup again. Use `false` to prevent the check
   * @returns {false|*} returns false if the prop is unsupported, otherwise the value that is supported
   */

  function testDOMProps(props, obj, elem) {
    var item;

    for (var i in props) {
      if (props[i] in obj) {
        // return the property name as a string
        if (elem === false) {
          return props[i];
        }

        item = obj[props[i]]; // let's bind a function

        if (is(item, 'function')) {
          // bind to obj unless overriden
          return fnBind(item, elem || obj);
        } // return the unbound function or obj or value


        return item;
      }
    }

    return false;
  }
  /**
   * Create our "modernizr" element that we do most feature tests on.
   *
   * @access private
   */

  var modElem = {
    elem: createElement('modernizr')
  }; // Clean up this element

  Modernizr._q.push(function () {
    delete modElem.elem;
  });

  var mStyle = {
    style: modElem.elem.style
  }; // kill ref for gc, must happen before mod.elem is removed, so we unshift on to
  // the front of the queue.

  Modernizr._q.unshift(function () {
    delete mStyle.style;
  });
  /**
   * domToCSS takes a camelCase string and converts it to kebab-case
   * e.g. boxSizing -> box-sizing
   *
   * @access private
   * @function domToCSS
   * @param {string} name - String name of camelCase prop we want to convert
   * @returns {string} The kebab-case version of the supplied name
   */


  function domToCSS(name) {
    return name.replace(/([A-Z])/g, function (str, m1) {
      return '-' + m1.toLowerCase();
    }).replace(/^ms-/, '-ms-');
  }
  /**
   * wrapper around getComputedStyle, to fix issues with Firefox returning null when
   * called inside of a hidden iframe
   *
   * @access private
   * @function computedStyle
   * @param {HTMLElement|SVGElement} - The element we want to find the computed styles of
   * @param {string|null} [pseudoSelector]- An optional pseudo element selector (e.g. :before), of null if none
   * @returns {CSSStyleDeclaration}
   */

  function computedStyle(elem, pseudo, prop) {
    var result;

    if ('getComputedStyle' in window) {
      result = getComputedStyle.call(window, elem, pseudo);
      var console = window.console;

      if (result !== null) {
        if (prop) {
          result = result.getPropertyValue(prop);
        }
      } else {
        if (console) {
          var method = console.error ? 'error' : 'log';
          console[method].call(console, 'getComputedStyle returning null, its possible modernizr test results are inaccurate');
        }
      }
    } else {
      result = !pseudo && elem.currentStyle && elem.currentStyle[prop];
    }

    return result;
  }
  /**
   * nativeTestProps allows for us to use native feature detection functionality if available.
   * some prefixed form, or false, in the case of an unsupported rule
   *
   * @access private
   * @function nativeTestProps
   * @param {array} props - An array of property names
   * @param {string} value - A string representing the value we want to check via @supports
   * @returns {boolean|undefined} A boolean when @supports exists, undefined otherwise
   */
  // Accepts a list of property names and a single value
  // Returns `undefined` if native detection not available

  function nativeTestProps(props, value) {
    var i = props.length; // Start with the JS API: http://www.w3.org/TR/css3-conditional/#the-css-interface

    if ('CSS' in window && 'supports' in window.CSS) {
      // Try every prefixed variant of the property
      while (i--) {
        if (window.CSS.supports(domToCSS(props[i]), value)) {
          return true;
        }
      }

      return false;
    } // Otherwise fall back to at-rule (for Opera 12.x)
    else if ('CSSSupportsRule' in window) {
        // Build a condition string for every prefixed variant
        var conditionText = [];

        while (i--) {
          conditionText.push('(' + domToCSS(props[i]) + ':' + value + ')');
        }

        conditionText = conditionText.join(' or ');
        return injectElementWithStyles('@supports (' + conditionText + ') { #modernizr { position: absolute; } }', function (node) {
          return computedStyle(node, null, 'position') == 'absolute';
        });
      }

    return undefined$1;
  }
  // In testing support for a given CSS property, it's legit to test:
  //    `elem.style[styleName] !== undefined`
  // If the property is supported it will return an empty string,
  // if unsupported it will return undefined.
  // We'll take advantage of this quick test and skip setting a style
  // on our modernizr element, but instead just testing undefined vs
  // empty string.
  // Property names can be provided in either camelCase or kebab-case.

  function testProps(props, prefixed, value, skipValueTest) {
    skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest; // Try native detect first

    if (!is(value, 'undefined')) {
      var result = nativeTestProps(props, value);

      if (!is(result, 'undefined')) {
        return result;
      }
    } // Otherwise do it properly


    var afterInit, i, propsLength, prop, before; // If we don't have a style element, that means we're running async or after
    // the core tests, so we'll need to create our own elements to use
    // inside of an SVG element, in certain browsers, the `style` element is only
    // defined for valid tags. Therefore, if `modernizr` does not have one, we
    // fall back to a less used element and hope for the best.
    // for strict XHTML browsers the hardly used samp element is used

    var elems = ['modernizr', 'tspan', 'samp'];

    while (!mStyle.style && elems.length) {
      afterInit = true;
      mStyle.modElem = createElement(elems.shift());
      mStyle.style = mStyle.modElem.style;
    } // Delete the objects if we created them.


    function cleanElems() {
      if (afterInit) {
        delete mStyle.style;
        delete mStyle.modElem;
      }
    }

    propsLength = props.length;

    for (i = 0; i < propsLength; i++) {
      prop = props[i];
      before = mStyle.style[prop];

      if (contains(prop, '-')) {
        prop = cssToDOM(prop);
      }

      if (mStyle.style[prop] !== undefined$1) {
        // If value to test has been passed in, do a set-and-check test.
        // 0 (integer) is a valid property value, so check that `value` isn't
        // undefined, rather than just checking it's truthy.
        if (!skipValueTest && !is(value, 'undefined')) {
          // Needs a try catch block because of old IE. This is slow, but will
          // be avoided in most cases because `skipValueTest` will be used.
          try {
            mStyle.style[prop] = value;
          } catch (e) {} // If the property value has changed, we assume the value used is
          // supported. If `value` is empty string, it'll fail here (because
          // it hasn't changed), which matches how browsers have implemented
          // CSS.supports()


          if (mStyle.style[prop] != before) {
            cleanElems();
            return prefixed == 'pfx' ? prop : true;
          }
        } // Otherwise just return true, or the property name if this is a
        // `prefixed()` call
        else {
            cleanElems();
            return prefixed == 'pfx' ? prop : true;
          }
      }
    }

    cleanElems();
    return false;
  }
  /**
   * testPropsAll tests a list of DOM properties we want to check against.
   * We specify literally ALL possible (known and/or likely) properties on
   * the element including the non-vendor prefixed one, for forward-
   * compatibility.
   *
   * @access private
   * @function testPropsAll
   * @param {string} prop - A string of the property to test for
   * @param {string|object} [prefixed] - An object to check the prefixed properties on. Use a string to skip
   * @param {HTMLElement|SVGElement} [elem] - An element used to test the property and value against
   * @param {string} [value] - A string of a css value
   * @param {boolean} [skipValueTest] - An boolean representing if you want to test if value sticks when set
   * @returns {false|string} returns the string version of the property, or false if it is unsupported
   */

  function testPropsAll(prop, prefixed, elem, value, skipValueTest) {
    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
        props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' '); // did they call .prefixed('boxSizing') or are we just testing a prop?

    if (is(prefixed, 'string') || is(prefixed, 'undefined')) {
      return testProps(props, prefixed, value, skipValueTest); // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
    } else {
      props = (prop + ' ' + domPrefixes.join(ucProp + ' ') + ucProp).split(' ');
      return testDOMProps(props, prefixed, elem);
    }
  } // Modernizr.testAllProps() investigates whether a given style property,
  // or any of its vendor-prefixed variants, is recognized
  //
  // Note that the property names must be provided in the camelCase variant.
  // Modernizr.testAllProps('boxSizing')


  ModernizrProto.testAllProps = testPropsAll;
  /**
   * prefixed returns the prefixed or nonprefixed property name variant of your input
   *
   * @memberof Modernizr
   * @name Modernizr.prefixed
   * @optionName Modernizr.prefixed()
   * @optionProp prefixed
   * @access public
   * @function prefixed
   * @param {string} prop - String name of the property to test for
   * @param {object} [obj] - An object to test for the prefixed properties on
   * @param {HTMLElement} [elem] - An element used to test specific properties against
   * @returns {string|false} The string representing the (possibly prefixed) valid
   * version of the property, or `false` when it is unsupported.
   * @example
   *
   * Modernizr.prefixed takes a string css value in the DOM style camelCase (as
   * opposed to the css style kebab-case) form and returns the (possibly prefixed)
   * version of that property that the browser actually supports.
   *
   * For example, in older Firefox...
   * ```js
   * prefixed('boxSizing')
   * ```
   * returns 'MozBoxSizing'
   *
   * In newer Firefox, as well as any other browser that support the unprefixed
   * version would simply return `boxSizing`. Any browser that does not support
   * the property at all, it will return `false`.
   *
   * By default, prefixed is checked against a DOM element. If you want to check
   * for a property on another object, just pass it as a second argument
   *
   * ```js
   * var rAF = prefixed('requestAnimationFrame', window);
   *
   * raf(function() {
   *  renderFunction();
   * })
   * ```
   *
   * Note that this will return _the actual function_ - not the name of the function.
   * If you need the actual name of the property, pass in `false` as a third argument
   *
   * ```js
   * var rAFProp = prefixed('requestAnimationFrame', window, false);
   *
   * rafProp === 'WebkitRequestAnimationFrame' // in older webkit
   * ```
   *
   * One common use case for prefixed is if you're trying to determine which transition
   * end event to bind to, you might do something like...
   * ```js
   * var transEndEventNames = {
   *     'WebkitTransition' : 'webkitTransitionEnd', * Saf 6, Android Browser
   *     'MozTransition'    : 'transitionend',       * only for FF < 15
   *     'transition'       : 'transitionend'        * IE10, Opera, Chrome, FF 15+, Saf 7+
   * };
   *
   * var transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];
   * ```
   *
   * If you want a similar lookup, but in kebab-case, you can use [prefixedCSS](#modernizr-prefixedcss).
   */

  var prefixed = ModernizrProto.prefixed = function (prop, obj, elem) {
    if (prop.indexOf('@') === 0) {
      return atRule(prop);
    }

    if (prop.indexOf('-') != -1) {
      // Convert kebab-case to camelCase
      prop = cssToDOM(prop);
    }

    if (!obj) {
      return testPropsAll(prop, 'pfx');
    } else {
      // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
      return testPropsAll(prop, obj, elem);
    }
  };
  /**
   * testAllProps determines whether a given CSS property is supported in the browser
   *
   * @memberof Modernizr
   * @name Modernizr.testAllProps
   * @optionName Modernizr.testAllProps()
   * @optionProp testAllProps
   * @access public
   * @function testAllProps
   * @param {string} prop - String naming the property to test (either camelCase or kebab-case)
   * @param {string} [value] - String of the value to test
   * @param {boolean} [skipValueTest=false] - Whether to skip testing that the value is supported when using non-native detection
   * @example
   *
   * testAllProps determines whether a given CSS property, in some prefixed form,
   * is supported by the browser.
   *
   * ```js
   * testAllProps('boxSizing')  // true
   * ```
   *
   * It can optionally be given a CSS value in string form to test if a property
   * value is valid
   *
   * ```js
   * testAllProps('display', 'block') // true
   * testAllProps('display', 'penguin') // false
   * ```
   *
   * A boolean can be passed as a third parameter to skip the value check when
   * native detection (@supports) isn't available.
   *
   * ```js
   * testAllProps('shapeOutside', 'content-box', true);
   * ```
   */


  function testAllProps(prop, value, skipValueTest) {
    return testPropsAll(prop, undefined$1, undefined$1, value, skipValueTest);
  }

  ModernizrProto.testAllProps = testAllProps;
  /*!
  {
    "name": "CSS Transforms 3D",
    "property": "csstransforms3d",
    "caniuse": "transforms3d",
    "tags": ["css"],
    "warnings": [
      "Chrome may occassionally fail this test on some systems; more info: https://code.google.com/p/chromium/issues/detail?id=129004"
    ]
  }
  !*/

  Modernizr.addTest('csstransforms3d', function () {
    return !!testAllProps('perspective', '1px', true);
  });
  /*!
  {
    "name": "CSS Transitions",
    "property": "csstransitions",
    "caniuse": "css-transitions",
    "tags": ["css"]
  }
  !*/

  Modernizr.addTest('csstransitions', testAllProps('transition', 'all', true)); // Run each test

  testRunner();
  delete ModernizrProto.addTest;
  delete ModernizrProto.addAsyncTest; // Run the things that are supposed to run after the tests

  for (var i = 0; i < Modernizr._q.length; i++) {
    Modernizr._q[i]();
  } // Leak Modernizr namespace


  window.Modernizr = Modernizr;
})(window, document);(function () {
  var event = $.event,
      //helper that finds handlers by type and calls back a function, this is basically handle
  // events - the events object
  // types - an array of event types to look for
  // callback(type, handlerFunc, selector) - a callback
  // selector - an optional selector to filter with, if there, matches by selector
  //     if null, matches anything, otherwise, matches with no selector
  findHelper = function findHelper(events, types, callback, selector) {
    var t, type, typeHandlers, all, h, handle, namespaces, namespace, match;

    for (t = 0; t < types.length; t++) {
      type = types[t];
      all = type.indexOf(".") < 0;

      if (!all) {
        namespaces = type.split(".");
        type = namespaces.shift();
        namespace = new RegExp("(^|\\.)" + namespaces.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)");
      }

      typeHandlers = (events[type] || []).slice(0);

      for (h = 0; h < typeHandlers.length; h++) {
        handle = typeHandlers[h];
        match = all || namespace.test(handle.namespace);

        if (match) {
          if (selector) {
            if (handle.selector === selector) {
              callback(type, handle.origHandler || handle.handler);
            }
          } else if (selector === null) {
            callback(type, handle.origHandler || handle.handler, handle.selector);
          } else if (!handle.selector) {
            callback(type, handle.origHandler || handle.handler);
          }
        }
      }
    }
  };
  /**
   * Finds event handlers of a given type on an element.
   * @param {HTMLElement} el
   * @param {Array} types an array of event names
   * @param {String} [selector] optional selector
   * @return {Array} an array of event handlers
   */


  event.find = function (el, types, selector) {
    var events = ($._data(el) || {}).events,
        handlers = [];

    if (!events) {
      return handlers;
    }

    findHelper(events, types, function (type, handler) {
      handlers.push(handler);
    }, selector);
    return handlers;
  };
  /**
   * Finds all events.  Group by selector.
   * @param {HTMLElement} el the element
   * @param {Array} types event types
   */


  event.findBySelector = function (el, types) {
    var events = $._data(el).events,
        selectors = {},
        //adds a handler for a given selector and event
    add = function add(selector, event, handler) {
      var select = selectors[selector] || (selectors[selector] = {}),
          events = select[event] || (select[event] = []);
      events.push(handler);
    };

    if (!events) {
      return selectors;
    } //first check live:

    /*$.each(events.live || [], function( i, live ) {
    	if ( $.inArray(live.origType, types) !== -1 ) {
    		add(live.selector, live.origType, live.origHandler || live.handler);
    	}
    });*/
    //then check straight binds


    findHelper(events, types, function (type, handler, selector) {
      add(selector || "", type, handler);
    }, null);
    return selectors;
  };

  event.supportTouch = "ontouchend" in document;

  $.fn.respondsTo = function (events) {
    if (!this.length) {
      return false;
    } else {
      //add default ?
      return event.find(this[0], $.isArray(events) ? events : [events]).length > 0;
    }
  };

  $.fn.triggerHandled = function (event, data) {
    event = typeof event == "string" ? $.Event(event) : event;
    this.trigger(event, data);
    return event.handled;
  };
  /**
   * Only attaches one event handler for all types ...
   * @param {Array} types llist of types that will delegate here
   * @param {Object} startingEvent the first event to start listening to
   * @param {Object} onFirst a function to call 
   */


  event.setupHelper = function (types, startingEvent, onFirst) {
    if (!onFirst) {
      onFirst = startingEvent;
      startingEvent = null;
    }

    var add = function add(handleObj) {
      var bySelector,
          selector = handleObj.selector || "";

      if (selector) {
        bySelector = event.find(this, types, selector);

        if (!bySelector.length) {
          $(this).delegate(selector, startingEvent, onFirst);
        }
      } else {
        //var bySelector = event.find(this, types, selector);
        if (!event.find(this, types, selector).length) {
          event.add(this, startingEvent, onFirst, {
            selector: selector,
            delegate: this
          });
        }
      }
    },
        remove = function remove(handleObj) {
      var bySelector,
          selector = handleObj.selector || "";

      if (selector) {
        bySelector = event.find(this, types, selector);

        if (!bySelector.length) {
          $(this).undelegate(selector, startingEvent, onFirst);
        }
      } else {
        if (!event.find(this, types, selector).length) {
          event.remove(this, startingEvent, onFirst, {
            selector: selector,
            delegate: this
          });
        }
      }
    };

    $.each(types, function () {
      event.special[this] = {
        add: add,
        remove: remove,
        setup: function setup() {},
        teardown: function teardown() {}
      };
    });
  };
})();

(function ($) {
  var isPhantom = /Phantom/.test(navigator.userAgent),
      supportTouch = !isPhantom && "ontouchend" in document,
      // Use touch events or map it to mouse events
  touchStartEvent = supportTouch ? "touchstart" : "mousedown",
      touchStopEvent = supportTouch ? "touchend" : "mouseup",
      touchMoveEvent = supportTouch ? "touchmove" : "mousemove",
      data = function data(event) {
    var d = event.originalEvent.touches ? event.originalEvent.touches[0] : event;
    return {
      time: new Date().getTime(),
      coords: [d.pageX, d.pageY],
      origin: $(event.target)
    };
  };
  /**
   * @add jQuery.event.swipe
   */


  var swipe = $.event.swipe = {
    /**
     * @attribute delay
     * Delay is the upper limit of time the swipe motion can take in milliseconds.  This defaults to 500.
     * 
     * A user must perform the swipe motion in this much time.
     */
    delay: 500,

    /**
     * @attribute max
     * The maximum distance the pointer must travel in pixels.  The default is 75 pixels.
     */
    max: 75,

    /**
     * @attribute min
     * The minimum distance the pointer must travel in pixels.  The default is 30 pixels.
     */
    min: 30
  };
  $.event.setupHelper([
  /**
   * @hide
   * @attribute swipe
   */
  "swipe",
  /**
   * @hide
   * @attribute swipeleft
   */
  'swipeleft',
  /**
   * @hide
   * @attribute swiperight
   */
  'swiperight',
  /**
   * @hide
   * @attribute swipeup
   */
  'swipeup',
  /**
   * @hide
   * @attribute swipedown
   */
  'swipedown'], touchStartEvent, function (ev) {
    var // update with data when the event was started
    start = data(ev),
        stop,
        delegate = ev.delegateTarget || ev.currentTarget,
        selector = ev.handleObj.selector,
        entered = this;

    function moveHandler(event) {
      if (!start) {
        return;
      } // update stop with the data from the current event


      stop = data(event); // prevent scrolling

      if (Math.abs(start.coords[0] - stop.coords[0]) > 10) {
        event.preventDefault();
      }
    }

    $(document.documentElement).bind(touchMoveEvent, moveHandler).one(touchStopEvent, function (event) {
      $(this).unbind(touchMoveEvent, moveHandler); // if start and stop contain data figure out if we have a swipe event

      if (start && stop) {
        // calculate the distance between start and stop data
        var deltaX = Math.abs(start.coords[0] - stop.coords[0]),
            deltaY = Math.abs(start.coords[1] - stop.coords[1]),
            distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY); // check if the delay and distance are matched

        if (stop.time - start.time < swipe.delay && distance >= swipe.min) {
          var events = ['swipe']; // check if we moved horizontally

          if (deltaX >= swipe.min && deltaY < swipe.min) {
            // based on the x coordinate check if we moved left or right
            events.push(start.coords[0] > stop.coords[0] ? "swipeleft" : "swiperight");
          } else // check if we moved vertically
            if (deltaY >= swipe.min && deltaX < swipe.min) {
              // based on the y coordinate check if we moved up or down
              events.push(start.coords[1] < stop.coords[1] ? "swipedown" : "swipeup");
            } // trigger swipe events on this guy


          $.each($.event.find(delegate, events, selector), function () {
            this.call(entered, ev, {
              start: start,
              end: stop
            });
          });
        }
      } // reset start and stop


      start = stop = undefined;
    });
  });
})($);/**
 * jquery.bookblock.min.js v2.0.1
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */

(function (f, g, d) {
  var c = f(g),
      e = g.Modernizr;
  e.addTest("csstransformspreserve3d", function () {
    var l = e.prefixed("transformStyle");
    var k = "preserve-3d";
    var j;

    if (!l) {
      return false;
    }

    l = l.replace(/([A-Z])/g, function (n, m) {
      return "-" + m.toLowerCase();
    }).replace(/^ms-/, "-ms-");
    e.testStyles("#modernizr{" + l + ":" + k + ";}", function (m, n) {
      j = g.getComputedStyle ? getComputedStyle(m, null).getPropertyValue(l) : "";
    });
    return j === k;
  });
  var a = f.event,
      b,
      i;
  b = a.special.debouncedresize = {
    setup: function setup() {
      f(this).on("resize", b.handler);
    },
    teardown: function teardown() {
      f(this).off("resize", b.handler);
    },
    handler: function handler(n, j) {
      var m = this,
          l = arguments,
          k = function k() {
        n.type = "debouncedresize";
        a.dispatch.apply(m, l);
      };

      if (i) {
        clearTimeout(i);
      }

      j ? k() : i = setTimeout(k, b.threshold);
    },
    threshold: 150
  };

  f.BookBlock = function (j, k) {
    this.$el = f(k);

    this._init(j);
  };

  f.BookBlock.defaults = {
    orientation: "vertical",
    direction: "ltr",
    speed: 1000,
    easing: "ease-in-out",
    shadows: true,
    shadowSides: 0.2,
    shadowFlip: 0.1,
    circular: false,
    nextEl: "",
    prevEl: "",
    autoplay: false,
    interval: 3000,
    onEndFlip: function onEndFlip(j, l, k) {
      return false;
    },
    onBeforeFlip: function onBeforeFlip(j) {
      return false;
    }
  };
  f.BookBlock.prototype = {
    _init: function _init(j) {
      this.options = f.extend(true, {}, f.BookBlock.defaults, j);
      this.$el.addClass("bb-" + this.options.orientation);
      this.$items = this.$el.children(".bb-item").hide();
      this.itemsCount = this.$items.length;
      this.current = 0;
      this.previous = -1;
      this.$current = this.$items.eq(this.current).show();
      this.elWidth = this.$el.width();
      var k = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd",
        msTransition: "MSTransitionEnd",
        transition: "transitionend"
      };
      this.transEndEventName = k[e.prefixed("transition")] + ".bookblock";
      this.support = e.csstransitions && e.csstransforms3d && e.csstransformspreserve3d;

      this._initEvents();

      if (this.options.autoplay) {
        this.options.circular = true;

        this._startSlideshow();
      }
    },
    _initEvents: function _initEvents() {
      var j = this;

      if (this.options.nextEl !== "") {
        f(this.options.nextEl).on("click.bookblock touchstart.bookblock", function () {
          j._action("next");

          return false;
        });
      }

      if (this.options.prevEl !== "") {
        f(this.options.prevEl).on("click.bookblock touchstart.bookblock", function () {
          j._action("prev");

          return false;
        });
      }

      c.on("debouncedresize", function () {
        j.elWidth = j.$el.width();
      });
    },
    _action: function _action(j, k) {
      this._stopSlideshow();

      this._navigate(j, k);
    },
    _navigate: function _navigate(j, k) {
      if (this.isAnimating) {
        return false;
      }

      this.options.onBeforeFlip(this.current);
      this.isAnimating = true;
      this.$current = this.$items.eq(this.current);

      if (k !== d) {
        this.current = k;
      } else {
        if (j === "next" && this.options.direction === "ltr" || j === "prev" && this.options.direction === "rtl") {
          if (!this.options.circular && this.current === this.itemsCount - 1) {
            this.end = true;
          } else {
            this.previous = this.current;
            this.current = this.current < this.itemsCount - 1 ? this.current + 1 : 0;
          }
        } else {
          if (j === "prev" && this.options.direction === "ltr" || j === "next" && this.options.direction === "rtl") {
            if (!this.options.circular && this.current === 0) {
              this.end = true;
            } else {
              this.previous = this.current;
              this.current = this.current > 0 ? this.current - 1 : this.itemsCount - 1;
            }
          }
        }
      }

      this.$nextItem = !this.options.circular && this.end ? this.$current : this.$items.eq(this.current);

      if (!this.support) {
        this._layoutNoSupport(j);
      } else {
        this._layout(j);
      }
    },
    _layoutNoSupport: function _layoutNoSupport(k) {
      this.$items.hide();
      this.$nextItem.show();
      this.end = false;
      this.isAnimating = false;
      var j = k === "next" && this.current === this.itemsCount - 1 || k === "prev" && this.current === 0;
      this.options.onEndFlip(this.previous, this.current, j);
    },
    _layout: function _layout(l) {
      var v = this,
          u = this._addSide("left", l),
          o = this._addSide("middle", l),
          j = this._addSide("right", l),
          r = u.find("div.bb-overlay"),
          t = o.find("div.bb-flipoverlay:first"),
          w = o.find("div.bb-flipoverlay:last"),
          s = j.find("div.bb-overlay"),
          k = this.end ? 400 : this.options.speed;

      this.$items.hide();
      this.$el.prepend(u, o, j);
      o.css({
        transitionDuration: k + "ms",
        transitionTimingFunction: this.options.easing
      }).on(this.transEndEventName, function (y) {
        if (f(y.target).hasClass("bb-page")) {
          v.$el.children(".bb-page").remove();
          v.$nextItem.show();
          v.end = false;
          v.isAnimating = false;
          var x = l === "next" && v.current === v.itemsCount - 1 || l === "prev" && v.current === 0;
          v.options.onEndFlip(v.previous, v.current, x);
        }
      });

      if (l === "prev") {
        o.addClass("bb-flip-initial");
      }

      if (this.options.shadows && !this.end) {
        var n = l === "next" ? {
          transition: "opacity " + this.options.speed / 2 + "ms linear " + this.options.speed / 2 + "ms"
        } : {
          transition: "opacity " + this.options.speed / 2 + "ms linear",
          opacity: this.options.shadowSides
        },
            q = l === "next" ? {
          transition: "opacity " + this.options.speed / 2 + "ms linear"
        } : {
          transition: "opacity " + this.options.speed / 2 + "ms linear " + this.options.speed / 2 + "ms",
          opacity: this.options.shadowFlip
        },
            m = l === "next" ? {
          transition: "opacity " + this.options.speed / 2 + "ms linear " + this.options.speed / 2 + "ms",
          opacity: this.options.shadowFlip
        } : {
          transition: "opacity " + this.options.speed / 2 + "ms linear"
        },
            p = l === "next" ? {
          transition: "opacity " + this.options.speed / 2 + "ms linear",
          opacity: this.options.shadowSides
        } : {
          transition: "opacity " + this.options.speed / 2 + "ms linear " + this.options.speed / 2 + "ms"
        };
        t.css(q);
        w.css(m);
        r.css(n);
        s.css(p);
      }

      setTimeout(function () {
        o.addClass(v.end ? "bb-flip-" + l + "-end" : "bb-flip-" + l);

        if (v.options.shadows && !v.end) {
          t.css({
            opacity: l === "next" ? v.options.shadowFlip : 0
          });
          w.css({
            opacity: l === "next" ? 0 : v.options.shadowFlip
          });
          r.css({
            opacity: l === "next" ? v.options.shadowSides : 0
          });
          s.css({
            opacity: l === "next" ? 0 : v.options.shadowSides
          });
        }
      }, 25);
    },
    _addSide: function _addSide(l, k) {
      var j;

      switch (l) {
        case "left":
          j = f('<div class="bb-page"><div class="bb-back"><div class="bb-outer"><div class="bb-content"><div class="bb-inner">' + (k === "next" ? this.$current.html() : this.$nextItem.html()) + '</div></div><div class="bb-overlay"></div></div></div></div>').css("z-index", 102);
          break;

        case "middle":
          j = f('<div class="bb-page"><div class="bb-front"><div class="bb-outer"><div class="bb-content"><div class="bb-inner">' + (k === "next" ? this.$current.html() : this.$nextItem.html()) + '</div></div><div class="bb-flipoverlay"></div></div></div><div class="bb-back"><div class="bb-outer"><div class="bb-content" style="width:' + this.elWidth + 'px"><div class="bb-inner">' + (k === "next" ? this.$nextItem.html() : this.$current.html()) + '</div></div><div class="bb-flipoverlay"></div></div></div></div>').css("z-index", 103);
          break;

        case "right":
          j = f('<div class="bb-page"><div class="bb-front"><div class="bb-outer"><div class="bb-content"><div class="bb-inner">' + (k === "next" ? this.$nextItem.html() : this.$current.html()) + '</div></div><div class="bb-overlay"></div></div></div></div>').css("z-index", 101);
          break;
      }

      return j;
    },
    _startSlideshow: function _startSlideshow() {
      var j = this;
      this.slideshow = setTimeout(function () {
        j._navigate("next");

        if (j.options.autoplay) {
          j._startSlideshow();
        }
      }, this.options.interval);
    },
    _stopSlideshow: function _stopSlideshow() {
      if (this.options.autoplay) {
        clearTimeout(this.slideshow);
        this.options.autoplay = false;
      }
    },
    next: function next() {
      this._action(this.options.direction === "ltr" ? "next" : "prev");
    },
    prev: function prev() {
      this._action(this.options.direction === "ltr" ? "prev" : "next");
    },
    jump: function jump(k) {
      k -= 1;

      if (k === this.current || k >= this.itemsCount || k < 0) {
        return false;
      }

      var j;

      if (this.options.direction === "ltr") {
        j = k > this.current ? "next" : "prev";
      } else {
        j = k > this.current ? "prev" : "next";
      }

      this._action(j, k);
    },
    last: function last() {
      this.jump(this.itemsCount);
    },
    first: function first() {
      this.jump(1);
    },
    isActive: function isActive() {
      return this.isAnimating;
    },
    update: function update() {
      var j = this.$items.eq(this.current);
      this.$items = this.$el.children(".bb-item");
      this.itemsCount = this.$items.length;
      this.current = j.index();
    },
    destroy: function destroy() {
      if (this.options.autoplay) {
        this._stopSlideshow();
      }

      this.$el.removeClass("bb-" + this.options.orientation);
      this.$items.show();

      if (this.options.nextEl !== "") {
        f(this.options.nextEl).off(".bookblock");
      }

      if (this.options.prevEl !== "") {
        f(this.options.prevEl).off(".bookblock");
      }

      c.off("debouncedresize");
    }
  };

  var h = function h(j) {
    if (g.console) {
      g.console.error(j);
    }
  };

  f.fn.bookblock = function (k) {
    if (typeof k === "string") {
      var j = Array.prototype.slice.call(arguments, 1);
      this.each(function () {
        var l = f.data(this, "bookblock");

        if (!l) {
          h("cannot call methods on bookblock prior to initialization; attempted to call method '" + k + "'");
          return;
        }

        if (!f.isFunction(l[k]) || k.charAt(0) === "_") {
          h("no such method '" + k + "' for bookblock instance");
          return;
        }

        l[k].apply(l, j);
      });
    } else {
      this.each(function () {
        var l = f.data(this, "bookblock");

        if (l) {
          l._init();
        } else {
          l = f.data(this, "bookblock", new f.BookBlock(k, this));
        }
      });
    }

    return this;
  };
})($, window);var script$1 = {
  name: "Bookblock",
  // vue component name
  data: function data() {
    return {
      nanoid: nanoid.nanoid()
    };
  },
  props: {
    id: {
      type: String
    },
    options: {
      type: Object,
      default: function _default() {}
    }
  },
  watch: {
    defaultOptions: function defaultOptions(val) {
      $("#".concat(this.uid)).bookblock(val);
    }
  },
  computed: {
    uid: function uid() {
      return !this.id ? this.nanoid : "".concat(this.id, "-").concat(this.nanoid);
    },
    defaultOptions: function defaultOptions() {
      return _objectSpread2({
        // vertical or horizontal flip
        orientation: "vertical",
        // ltr (left to right) or rtl (right to left)
        direction: "ltr",
        // speed for the flip transition in ms.
        speed: 1000,
        // easing for the flip transition.
        easing: "ease-in-out",
        // if set to true, both the flipping page and the sides will have an overlay to simulate shadows
        shadows: true,
        // opacity value for the "shadow" on both sides (when the flipping page is over it).
        // value : 0.1 - 1
        shadowSides: 0.2,
        // opacity value for the "shadow" on the flipping page (while it is flipping).
        // value : 0.1 - 1
        shadowFlip: 0.1,
        // if we should show the first item after reaching the end.
        circular: false,
        // if we want to specify a selector that triggers the next() function. example: '#bb-nav-next'.
        nextEl: "",
        // if we want to specify a selector that triggers the prev() function.
        prevEl: "",
        // If true it overwrites the circular option to true!
        autoplay: false,
        // time (ms) between page switch, if autoplay is true.
        interval: 3000,
        // callback after the flip transition.
        // page is the current item's index.
        // isLimit is true if the current page is the last one (or the first one).
        onEndFlip: function onEndFlip(page, isLimit) {
          return false;
        },
        // callback before the flip transition.
        // page is the current item's index.
        onBeforeFlip: function onBeforeFlip(page) {
          return false;
        }
      }, this.options);
    }
  },
  mounted: function mounted() {
    $("#".concat(this.uid)).bookblock(this.defaultOptions);
  },
  methods: {
    next: function next() {
      $("#".concat(this.uid)).bookblock("next");
    },
    prev: function prev() {
      $("#".concat(this.uid)).bookblock("prev");
    },
    jump: function jump(position) {
      $("#".concat(this.uid)).bookblock("jump", position);
    },
    first: function first() {
      $("#".concat(this.uid)).bookblock("first");
    },
    last: function last() {
      $("#".concat(this.uid)).bookblock("last");
    }
  }
};/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    attrs: {
      "id": this.uid
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-70622d1d_0", {
    source: ".bb-bookblock{width:400px;height:300px;margin:0 auto;position:relative;z-index:100;-webkit-perspective:1300px;perspective:1300px;-webkit-backface-visibility:hidden;backface-visibility:hidden}.bb-page{position:absolute;-webkit-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-transition-property:-webkit-transform;transition-property:transform}.bb-vertical .bb-page{width:50%;height:100%;left:50%;-webkit-transform-origin:left center;transform-origin:left center}.bb-horizontal .bb-page{width:100%;height:50%;top:50%;-webkit-transform-origin:center top;transform-origin:center top}.bb-content,.bb-inner,.bb-outer,.bb-page>div{position:absolute;height:100%;width:100%;top:0;left:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}.bb-vertical .bb-content{width:200%}.bb-horizontal .bb-content{height:200%}.bb-page>div{width:100%;-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.bb-vertical .bb-back{-webkit-transform:rotateY(-180deg);transform:rotateY(-180deg)}.bb-horizontal .bb-back{-webkit-transform:rotateX(-180deg);transform:rotateX(-180deg)}.bb-outer{width:100%;overflow:hidden;z-index:999}.bb-flipoverlay,.bb-overlay{background-color:rgba(0,0,0,.7);position:absolute;top:0;left:0;width:100%;height:100%;opacity:0}.bb-flipoverlay{background-color:rgba(0,0,0,.2)}.bb-bookblock.bb-vertical>div.bb-page:first-child,.bb-bookblock.bb-vertical>div.bb-page:first-child .bb-back{-webkit-transform:rotateY(180deg);transform:rotateY(180deg)}.bb-bookblock.bb-horizontal>div.bb-page:first-child,.bb-bookblock.bb-horizontal>div.bb-page:first-child .bb-back{-webkit-transform:rotateX(180deg);transform:rotateX(180deg)}.bb-content{background:#fff}.bb-vertical .bb-front .bb-content{left:-100%}.bb-horizontal .bb-front .bb-content{top:-100%}.bb-vertical .bb-flip-initial,.bb-vertical .bb-flip-next{-webkit-transform:rotateY(-180deg);transform:rotateY(-180deg)}.bb-vertical .bb-flip-prev{-webkit-transform:rotateY(0);transform:rotateY(0)}.bb-horizontal .bb-flip-initial,.bb-horizontal .bb-flip-next{-webkit-transform:rotateX(180deg);transform:rotateX(180deg)}.bb-horizontal .bb-flip-prev{-webkit-transform:rotateX(0);transform:rotateX(0)}.bb-vertical .bb-flip-next-end{-webkit-transform:rotateY(-15deg);transform:rotateY(-15deg)}.bb-vertical .bb-flip-prev-end{-webkit-transform:rotateY(-165deg);transform:rotateY(-165deg)}.bb-horizontal .bb-flip-next-end{-webkit-transform:rotateX(15deg);transform:rotateX(15deg)}.bb-horizontal .bb-flip-prev-end{-webkit-transform:rotateX(165deg);transform:rotateX(165deg)}.bb-item{width:100%;height:100%;position:absolute;top:0;left:0;display:none;background:#fff}.no-js .bb-bookblock,.no-js ul.bb-custom-grid li{width:auto;height:auto}.no-js .bb-item{display:block;position:relative}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = "data-v-70622d1d";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject shadow dom */

var __vue_component__$1 = normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, createInjectorSSR, undefined);/* eslint-disable import/prefer-default-export */var components=/*#__PURE__*/Object.freeze({__proto__:null,Turn: __vue_component__,Bookblock: __vue_component__$1});var install = function installVueTurnjs(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

var GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
} // Default export is library as a whole, registered via Vue.use()
exports.Bookblock=__vue_component__$1;exports.Turn=__vue_component__;exports.default=plugin;