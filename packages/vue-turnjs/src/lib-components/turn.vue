<script>
import $ from "jquery";
import "../lib/turn.min.js";
import { nanoid } from "nanoid";

export default {
  name: "Turn", // vue component name
  data() {
    return {
      nanoid: nanoid(),
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
      default: () => {}
    }
  },
  watch: {
    currentPage: {
      handler(val) {
        this.$emit("changePage", val);
        this.goTo(val);
      },
      immediately: true
    },
    defaultOptions(val) {
      $(`#${this.uid}`).turn(val);
    }
  },
  computed: {
    uid() {
      return !this.id ? this.nanoid : `${this.id}-${this.nanoid}`;
    },
    defaultOptions() {
      return {
        width: 800,
        height: 600,
        display: "double",
        duration: 1800,
        autoFlip: false,
        autoFlipDelay: 2000,
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
    $(`#${this.uid}`).turn(this.defaultOptions);
    if (this.defaultOptions.autoFlip) {
      this.setIntervalId = setInterval(() => {
        this.currentPage++;
      }, this.defaultOptions.autoFlipDelay);
    }
  },
  methods: {
    goTo(page) {
      $(`#${this.uid}`).turn("page", page);
    },
    first() {},
    last() {
      if (this.defaultOptions.autoFlip) {
        this.currentPage = 1;
      }
    }
  }
};
</script>

<template>
  <div class="flip-book" :id="this.uid">
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
