<script>
import $ from "jquery";
import "../../lib/turn.min.js";
import { nanoid } from "nanoid";

export default {
  name: "Turn", // vue component name
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
      deep: true
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
        width: 800,
        height: 600,
        display: "double",
        duration: 1800,
        page: 1,
        when: {
          turning: (event, page, pageObj) => {
            this.currentPage = page;
          },
          // triggered before turned
          first: () => {
            this.first();
          },
          // triggered before turned
          last: () => {
            this.last();
          }
        },
        ...this.options
      };
    }
  },
  mounted() {
    $(this.selector).turn(this.defaultOptions);
  },
  methods: {
    goTo(page) {
      $(this.selector).turn("page", page);
    },
    first() {},
    last() {},
    forceRerender(val) {
      this.nanoid = nanoid();
      this.componentKey += 1;
      this.$nextTick(() => $(this.selector).turn(val));
    }
  }
};
</script>

<template>
  <div class="flip-book" :key="componentKey" :data-uid="this.uid">
    <slot> </slot>
  </div>
</template>

<style scoped>
.flip-book {
  width: 800px;
  height: 600px;
  position: relative;
  margin: 10px;
}
</style>
