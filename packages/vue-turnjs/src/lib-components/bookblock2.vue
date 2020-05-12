<template>
  <div :key="componentKey" :data-uid="uid">
    <div
      :key="`${index}-${nanoid}`"
      v-for="(item, index) in pages"
      class="bb-item"
    >
      <slot name="page" v-bind="{ item, index }"></slot>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import "../../lib/modernizr-custom.js";
import "../../lib/jquerypp.custom.js";
import "../../lib/jquery.bookblock.min.js";
import { nanoid } from "nanoid";

export default {
  name: "Bookblock2", // vue component name
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
    },
    pages: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    defaultOptions: {
      handler(val) {
        this.forceRerender(val);
      },
      deep: true,
      immediate: true
    },
    pages() {
      console.log("here");
      this.forceRerender(this.defaultOptions);
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
      if (this.pages.length === 1) {
        val.autoplay = false;
      } else {
        val.autoplay = true;
      }
      this.nanoid = nanoid();
      this.componentKey += 1;
      this.$nextTick(() => $(this.selector).bookblock(val));
    }
  }
};
</script>

<style>
.bb-bookblock {
  width: 400px;
  height: 300px;
  margin: 0 auto;
  position: relative;
  z-index: 100;
  -webkit-perspective: 1300px;
  perspective: 1300px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.bb-page {
  position: absolute;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transition-property: -webkit-transform;
  transition-property: transform;
}

.bb-vertical .bb-page {
  width: 50%;
  height: 100%;
  left: 50%;
  -webkit-transform-origin: left center;
  transform-origin: left center;
}

.bb-horizontal .bb-page {
  width: 100%;
  height: 50%;
  top: 50%;
  -webkit-transform-origin: center top;
  transform-origin: center top;
}

.bb-page > div,
.bb-outer,
.bb-content,
.bb-inner {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.bb-vertical .bb-content {
  width: 200%;
}

.bb-horizontal .bb-content {
  height: 200%;
}

.bb-page > div {
  width: 100%;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.bb-vertical .bb-back {
  -webkit-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
}

.bb-horizontal .bb-back {
  -webkit-transform: rotateX(-180deg);
  transform: rotateX(-180deg);
}

.bb-outer {
  width: 100%;
  overflow: hidden;
  z-index: 999;
}

.bb-overlay,
.bb-flipoverlay {
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.bb-flipoverlay {
  background-color: rgba(0, 0, 0, 0.2);
}

.bb-bookblock.bb-vertical > div.bb-page:first-child,
.bb-bookblock.bb-vertical > div.bb-page:first-child .bb-back {
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
}

.bb-bookblock.bb-horizontal > div.bb-page:first-child,
.bb-bookblock.bb-horizontal > div.bb-page:first-child .bb-back {
  -webkit-transform: rotateX(180deg);
  transform: rotateX(180deg);
}

/* Content display */
.bb-content {
  background: #fff;
}

.bb-vertical .bb-front .bb-content {
  left: -100%;
}

.bb-horizontal .bb-front .bb-content {
  top: -100%;
}

/* Flipping classes */
.bb-vertical .bb-flip-next,
.bb-vertical .bb-flip-initial {
  -webkit-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
}

.bb-vertical .bb-flip-prev {
  -webkit-transform: rotateY(0deg);
  transform: rotateY(0deg);
}

.bb-horizontal .bb-flip-next,
.bb-horizontal .bb-flip-initial {
  -webkit-transform: rotateX(180deg);
  transform: rotateX(180deg);
}

.bb-horizontal .bb-flip-prev {
  -webkit-transform: rotateX(0deg);
  transform: rotateX(0deg);
}

.bb-vertical .bb-flip-next-end {
  -webkit-transform: rotateY(-15deg);
  transform: rotateY(-15deg);
}

.bb-vertical .bb-flip-prev-end {
  -webkit-transform: rotateY(-165deg);
  transform: rotateY(-165deg);
}

.bb-horizontal .bb-flip-next-end {
  -webkit-transform: rotateX(15deg);
  transform: rotateX(15deg);
}

.bb-horizontal .bb-flip-prev-end {
  -webkit-transform: rotateX(165deg);
  transform: rotateX(165deg);
}

.bb-item {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  background: #fff;
}

/* No JS */
.no-js .bb-bookblock,
.no-js ul.bb-custom-grid li {
  width: auto;
  height: auto;
}

.no-js .bb-item {
  display: block;
  position: relative;
}
</style>
