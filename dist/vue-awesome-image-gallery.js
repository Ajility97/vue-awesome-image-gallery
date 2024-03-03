import { defineComponent as L, ref as r, computed as X, watch as Y, onMounted as F, onUpdated as U, onBeforeUnmount as G, openBlock as y, createElementBlock as I, Fragment as z, createElementVNode as v, renderList as M, normalizeClass as N } from "vue";
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
  setup(a, { emit: h }) {
    const m = r(null), u = r(0), i = r(null), s = r(null), c = r(!1), d = r(1), g = r(void 0), p = h, n = a, f = X(() => n.images[u.value]);
    function A(e) {
      u.value = e, p("changed", {
        idx: e,
        image: f.value
      });
    }
    function O(e) {
      const l = e.getBoundingClientRect(), t = window.pageXOffset || document.documentElement.scrollLeft, o = window.pageYOffset || document.documentElement.scrollTop;
      return {
        y: l.top + o,
        x: l.left + t
      };
    }
    function b(e) {
      n.disableZoom || (c.value = e.type === "pointerover", _(e));
    }
    function Z() {
      n.disableZoom || (c.value = !0);
    }
    function k() {
      n.disableZoom || (c.value = !1);
    }
    function _(e) {
      let l = s.value, t = i.value;
      if (n.disableZoom || !c.value || !l || !t)
        return;
      let o = O(m.value), E = e.clientX - o.x + window.pageXOffset, W = e.clientY - o.y + window.pageYOffset, C = E / t.offsetWidth, P = W / t.offsetHeight, x = C * (l.offsetWidth * d.value - t.offsetWidth), B = P * (l.offsetHeight * d.value - t.offsetHeight);
      l.style.left = -x + "px", l.style.top = -B + "px";
    }
    function w() {
      let e = [s.value, i.value].map(function(l) {
        return new Promise(function(t, o) {
          l.addEventListener("load", t), l.addEventListener("error", o);
        });
      });
      Promise.all(e).then(function() {
        p("loaded");
      });
    }
    function H() {
      let e = i.value, l = e.offsetWidth, t = e.offsetHeight;
      g.value = setInterval(function() {
        (l != e.offsetWidth || t != e.offsetHeight) && (l = e.offsetWidth, t = e.offsetHeight, p("resized", {
          width: e.width,
          height: e.height,
          fullWidth: e.naturalWidth,
          fullHeight: e.naturalHeight
        }));
      }, 1e3);
    }
    return Y(c, async () => {
      c.value ? (s.value.style.visibility = "visible", n.hideActiveImageOnZoom && (i.value.style.visibility = "hidden")) : (s.value.style.visibility = "hidden", n.hideActiveImageOnZoom && (i.value.style.visibility = "visible"));
    }), F(() => {
      n.scale && s.value && (d.value = n.scale, s.value.style.transform = `scale(${d.value})`), w(), H();
    }), U(() => {
      w();
    }), G(() => {
      g.value && clearInterval(g.value);
    }), (e, l) => (y(), I(z, null, [
      v("div", {
        ref_key: "vueAwesomeImageContainer",
        ref: m,
        class: "active-image",
        onPointerover: b,
        onPointerout: b,
        onPointermove: _,
        onPointerenter: Z,
        onPointerleave: k
      }, [
        v("img", {
          ref_key: "normalImg",
          ref: i,
          class: "normal",
          src: f.value.url,
          alt: f.value.alt ?? a.alt
        }, null, 8, R),
        v("img", {
          ref_key: "zoomedImg",
          ref: s,
          class: "zoomed",
          src: f.value.url_zoom ?? f.value.url,
          alt: f.value.alt ?? a.alt
        }, null, 8, T)
      ], 544),
      v("div", $, [
        (y(!0), I(z, null, M(a.images, (t, o) => (y(), I("div", {
          class: N(["image-thumbnail", { "active-thumbnail": u.value === o, "inactive-thumbnail": u.value !== o }]),
          onClick: (E) => A(o)
        }, [
          v("img", {
            class: "thumbnail",
            src: t.url_thumbnail ?? t.url,
            alt: t.alt ?? a.alt
          }, null, 8, S)
        ], 10, q))), 256))
      ])
    ], 64));
  }
}), j = (a, h) => {
  const m = a.__vccOpts || a;
  for (const [u, i] of h)
    m[u] = i;
  return m;
}, J = /* @__PURE__ */ j(V, [["__scopeId", "data-v-afafb512"]]);
export {
  J as AwesomeImageGallery
};
