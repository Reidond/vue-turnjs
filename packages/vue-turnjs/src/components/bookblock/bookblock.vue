<template>
  <div :key="componentKey" :data-uid="uid">
    <slot></slot>
  </div>
</template>

<script>
import $ from "jquery";
import "../../lib/modernizr-custom.js";
import "../../lib/jquerypp.custom.js";
import "../../lib/jquery.bookblock.modified.js";
import { nanoid } from "nanoid";

export default {
  name: "Bookblock", // vue component name
  data() {
    return {
      nanoid: nanoid(),
      componentKey: 0
    };
  },
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    defaultOptions: {
      handler(val) {
        this.forceRerender(val);
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    uid() {
      return `jopa-${this.nanoid}`;
    },
    selector() {
      return `div[data-uid=${this.uid}]`;
    },
    defaultOptions() {
      return {
        // vertical or horizontal flip
        orientation: "horizontal",

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
        onEndFlip: function(page, isLimit) {
          return false;
        },

        // callback before the flip transition.
        // page is the current item's index.
        onBeforeFlip: function(page) {
          return false;
        },
        ...this.options
      };
    }
  },
  mounted() {
    this.forceRerender(this.defaultOptions);
  },
  methods: {
    next() {
      $(this.selector).bookblock("next");
    },
    prev() {
      $(this.selector).bookblock("prev");
    },
    jump(position) {
      $(this.selector).bookblock("jump", position);
    },
    first() {
      $(this.selector).bookblock("first");
    },
    last() {
      $(this.selector).bookblock("last");
    },
    update() {
      console.log("updated");
      $(this.selector).bookblock("update");
    },
    destroy() {
      $(this.selector).bookblock("destroy");
    },
    forceRerender(val) {
      this.nanoid = nanoid();
      this.componentKey += 1;
      this.$nextTick(() => $(this.selector).bookblock(val));
    }
  }
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
