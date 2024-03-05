import { defineComponent as L, ref as r, computed as X, watch as Y, onMounted as F, onUpdated as G, onBeforeUnmount as U, openBlock as p, createElementBlock as I, Fragment as E, createElementVNode as v, renderList as M, normalizeClass as N } from "vue";
const R = ["src", "alt"], T = ["src", "alt"], $ = { class: "image-thumbnails" }, q = ["onClick"], S = ["src", "alt"], V = /* @__PURE__ */ L({
  __name: "AwesomeImageGallery",
  props: {
    alt: {
      type: String,
      default: "An image."
    },
    disableZoom: {
      type: Boolean,
      default: !1
    },
    hideActiveImageOnZoom: {
      type: Boolean,
      default: !1
    },
    images: {
      type: Array,
      required: !0
    },
    scale: {
      type: Number,
      default: 1.5
    }
  },
  emits: ["changed", "loaded", "resized"],
  setup(o, { emit: g }) {
    const m = r(null), u = r(0), i = r(null), s = r(null), c = r(!1), d = r(1), h = r(void 0), y = g, a = o, f = X(() => a.images[u.value]);
    function z(e) {
      u.value = e, y("changed", {
        idx: e,
        image: f.value
      });
    }
    function O(e) {
      const l = e.getBoundingClientRect(), t = window.pageXOffset || document.documentElement.scrollLeft, n = window.pageYOffset || document.documentElement.scrollTop;
      return {
        y: l.top + n,
        x: l.left + t
      };
    }
    function _(e) {
      a.disableZoom || (c.value = e.type === "pointerover", b(e));
    }
    function Z() {
      a.disableZoom || (c.value = !0);
    }
    function k() {
      a.disableZoom || (c.value = !1);
    }
    function b(e) {
      let l = s.value, t = i.value;
      if (a.disableZoom || !c.value || !l || !t)
        return;
      let n = O(m.value), A = e.clientX - n.x + window.pageXOffset, P = e.clientY - n.y + window.pageYOffset, W = A / t.offsetWidth, C = P / t.offsetHeight, x = W * (l.offsetWidth * d.value - t.offsetWidth), B = C * (l.offsetHeight * d.value - t.offsetHeight);
      l.style.left = -x + "px", l.style.top = -B + "px";
    }
    function w() {
      let e = [s.value, i.value].map(function(l) {
        return new Promise(function(t, n) {
          l.addEventListener("load", t), l.addEventListener("error", n);
        });
      });
      Promise.all(e).then(function() {
        y("loaded");
      });
    }
    function H() {
      let e = i.value, l = e.offsetWidth, t = e.offsetHeight;
      h.value = setInterval(function() {
        (l != e.offsetWidth || t != e.offsetHeight) && (l = e.offsetWidth, t = e.offsetHeight, y("resized", {
          width: e.width,
          height: e.height,
          fullWidth: e.naturalWidth,
          fullHeight: e.naturalHeight
        }));
      }, 1e3);
    }
    return Y(c, async () => {
      c.value ? (s.value.style.visibility = "visible", a.hideActiveImageOnZoom && (i.value.style.visibility = "hidden")) : (s.value.style.visibility = "hidden", a.hideActiveImageOnZoom && (i.value.style.visibility = "visible"));
    }), F(() => {
      a.scale && s.value && (d.value = a.scale, s.value.style.transform = `scale(${d.value})`), w(), H();
    }), G(() => {
      w();
    }), U(() => {
      h.value && clearInterval(h.value);
    }), (e, l) => (p(), I(E, null, [
      v("div", {
        ref_key: "vueAwesomeImageContainer",
        ref: m,
        class: "active-image",
        onPointerover: _,
        onPointerout: _,
        onPointermove: b,
        onPointerenter: Z,
        onPointerleave: k
      }, [
        v("img", {
          ref_key: "normalImg",
          ref: i,
          class: "normal",
          src: f.value.url,
          alt: f.value.alt ?? o.alt
        }, null, 8, R),
        v("img", {
          ref_key: "zoomedImg",
          ref: s,
          class: "zoomed",
          src: f.value.url_zoom ?? f.value.url,
          alt: f.value.alt ?? o.alt
        }, null, 8, T)
      ], 544),
      v("div", $, [
        (p(!0), I(E, null, M(o.images, (t, n) => (p(), I("div", {
          class: N(["image-thumbnail", { "active-thumbnail": u.value === n, "inactive-thumbnail": u.value !== n }]),
          onClick: (A) => z(n)
        }, [
          v("img", {
            class: "thumbnail",
            src: t.url_thumbnail ?? t.url,
            alt: t.alt ?? o.alt
          }, null, 8, S)
        ], 10, q))), 256))
      ])
    ], 64));
  }
}), j = (o, g) => {
  const m = o.__vccOpts || o;
  for (const [u, i] of g)
    m[u] = i;
  return m;
}, D = /* @__PURE__ */ j(V, [["__scopeId", "data-v-582733d9"]]), K = {
  install: (o) => {
    o.component("AwesomeImageGallery", D);
  }
};
export {
  D as AwesomeImageGallery,
  K as default
};
