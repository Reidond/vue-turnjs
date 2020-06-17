<template>
  <div class="fw-book" :style="styleForPageMain">
    <div
      v-for="(page, index) in pages"
      :key="index"
      class="fw-bookitem"
      ref="bookItem"
      @click="turn(index)"
      :class="[
        { rotate180: page.rotate180 },
        page.left ? 'left' : 'right',
        page.animateClass
      ]"
      :style="{
        zIndex: set_zIndex(index),
        animationDuration: page.animationDuration + 's'
      }"
    >
      <slot name="page" v-bind="{ page, index }"></slot>
      <i
        v-if="showPageIndex && startPageIndex <= index && endPageIndex >= index"
        class="index"
        :class="index % 2 === 0 ? 'index-left' : 'index-right'"
        :style="styleForPageIndex"
        >{{ index + 1 - startPageIndex }}</i
      >
    </div>
    <template v-if="pages.length === 0">
      <div class="fw-bookitem left">
        <loading-svg class="loading"></loading-svg>
      </div>
      <div class="fw-bookitem right">
        <loading-svg class="loading"></loading-svg>
      </div>
    </template>
  </div>
</template>
<script>
import loadingSvg from "./loading.vue";
const TURNTOLEFT = "left";
const TURNTORIGHT = "right";
const HIDDEN = "hidden";
const VISIBLE = "visible";
export default {
  name: "fw-book",
  components: {
    loadingSvg
  },
  props: {
    styleForPageMain: {
      type: Object,
      default() {
        return {};
      }
    },
    styleForPageIndex: {
      type: Object,
      default() {
        return {};
      }
    },
    // Page data
    data: {
      type: Array,
      required: true
    },
    // Whether to allow manual page turning
    turnPageByHand: {
      type: Boolean,
      default: true
    },
    // Initial page
    initPage: {
      type: Number,
      default: 1
    },
    // Whether to turn pages automatically
    autoNextPage: {
      type: Boolean,
      default: false
    },
    // Residence time per page
    autoNextPageDelayTime: {
      type: Number,
      default: 3000
    },
    loop: {
      type: Boolean,
      default: false
    },
    // Page turning animation time
    duration: {
      type: Number,
      default: 1000
    },
    // Show page number
    showPageIndex: {
      type: Boolean,
      default: true
    },
    // Page number start index
    startPageIndex: {
      type: Number,
      default: 0
    },
    // End of page index
    endPageIndex: {
      type: Number,
      default: 9999
    }
  },
  data() {
    return {
      pages: [],
      curPage: this.initPage, // Current page number, each page is two and a half pages, counting from 1
      direction: TURNTOLEFT, // Page turning direction, not button direction
      curHalfPage: 0, // Each half page, each page is equal to two half pages, starting from 0
      animating: false, // Animation is in progress to prevent clicks to turn pages
      staying: false // Status of stay on each page
    };
  },
  computed: {
    // total pages
    pageCount() {
      return Math.ceil(this.pages.length / 2);
    }
  },
  methods: {
    assign(obj, target) {
      for (let k in target) {
        if (Object.prototype.hasOwnProperty.call(target, k)) {
          obj[k] = target[k];
        }
      }
      return obj;
    },
    $$emit(type) {
      let leftPage = this.curPage * 2 - 1 - 1;
      let rightPage = this.data[leftPage + 1] ? leftPage + 1 : undefined;
      this.$emit(
        type,
        this.curPage,
        [leftPage, rightPage],
        [this.data[leftPage], this.data[rightPage]]
      );
    },
    // Process all pages
    getPages() {
      // Initialization data
      const pages = [];
      this.data.forEach((item, index) => {
        let page = this.assign(
          {
            animateClass: "",
            rotate180: false,
            animationDuration: "0s",
            left: false,
            _left: false
          },
          item
        );
        // The page before the current page is on the left
        if (index <= this.curPage * 2 - 1 - 1) {
          page.left = true;
          page._left = true;
        }
        pages.push(page);
      });
      this.pages = pages;
      if (this.autoNextPage) {
        this.stay(this.curHalfPage);
      }
    },
    // Get current page number through index
    getPageNumByIndex(index) {
      return Math.ceil((index + 1) / 2);
    },
    // When turning the page to the right, add the flip class name [excluding the first page] to the even-numbered pages, and add the turning class name [not to the last page] to the odd page when turning the pages to the left.
    rotate180() {
      this.pages.forEach((page, index) => {
        if (this.direction === TURNTOLEFT) {
          page.rotate180 = index > 1 && index % 2 === 0;
        } else if (this.direction === TURNTORIGHT) {
          page.rotate180 = index < this.pages.length - 1 && index % 2 === 1;
        }
      });
    },
    // Add animation class name, animation will be performed immediately after adding
    animateClass() {
      // The end event will be executed twice on both sides of the book page, here the limit is only allowed to trigger once
      let emitTurnEnd = true;
      this.pages.forEach((page, index) => {
        page.animationDuration = this.duration / 1000;
        if (this.direction === TURNTOLEFT) {
          // The first page does not add
          if (this.curPage === 1) return;
          // Keep the position after the animation after the animation is completed
          let time = setTimeout(() => {
            page._left = true;
            this.animating = false;
            if (emitTurnEnd) {
              emitTurnEnd = false;
              this.$$emit("turnEnd");
            }
          }, this.duration + 50);
          // The previous page in the animation turns over and hides
          if (this.curPage * 2 - 3 === index) {
            page.animateClass = `${TURNTOLEFT}-${HIDDEN}`;
          } else if (this.curPage * 2 - 2 === index) {
            // Turn the next page in the animation to display
            page.animateClass = `${TURNTOLEFT}-${VISIBLE}`;
          } else {
            // No execution of animation, clear timer
            clearTimeout(time);
            // Do not add class name
            page.animateClass = "";
          }
        } else if (this.direction === TURNTORIGHT) {
          // The last page is not added
          if (this.curPage === this.pageCount) return;
          // Keep the position after the animation after the animation is completed
          let time = setTimeout(() => {
            page._left = false;
            this.animating = false;
            if (emitTurnEnd) {
              emitTurnEnd = false;
              this.$$emit("turnEnd");
            }
          }, this.duration + 50);
          // The previous page in the animation turns over and hides
          if (this.curPage * 2 - 1 === index) {
            page.animateClass = `${TURNTORIGHT}-${VISIBLE}`;
          } else if (this.curPage * 2 === index) {
            // Turn the next page in the animation to display
            page.animateClass = `${TURNTORIGHT}-${HIDDEN}`;
          } else {
            // No execution of animation, clear timer
            clearTimeout(time);
            // Do not add class name
            page.animateClass = "";
          }
        }
      });
    },
    // Reset animation class name to empty
    resetAnimateClass() {
      this.pages.forEach(page => {
        page.animateClass = "";
        page.left = page._left;
      });
    },
    // Set the book stack height to the highest current page, other pages decrease
    set_zIndex(index) {
      var pageNum = this.getPageNumByIndex(index);
      if (this.curPage === pageNum) {
        // The stacking height decreases sequentially on both sides of the current page
        return this.pageCount;
      } else {
        // The stacking height decreases sequentially on both sides of the current page
        return Math.abs(this.pageCount - Math.abs(this.curPage - pageNum));
      }
    },
    // Turn page
    turn(index) {
      if (!this.turnPageByHand) return;
      if (this.animating) return;
      this.resetAnimateClass();
      if (index % 2 === 0) {
        this.prev();
      } else {
        this.next();
      }
    },
    // Previous
    prev(num) {
      num = this.roundNum(num);
      if (isNaN(num) || num < 1) return;
      if (this.animating) return;
      if (this.curPage - num < 1) return;
      // change direction
      this.direction = TURNTORIGHT;
      this.$$emit("turnStart");
      this.curPage -= num;
      this.$$emit("prev");
    },
    // Next page
    next(num) {
      num = this.roundNum(num);
      if (isNaN(num) || num < 1) return;
      if (this.animating) return;
      if (this.curPage + num > this.pageCount) {
        if (this.loop) {
          this.resetToFirst();
        } else {
          return;
        }
      }
      // change direction
      this.direction = TURNTOLEFT;
      this.$$emit("turnStart");
      this.curPage += num;
      this.$$emit("next");
    },
    resetToFirst() {
      this.curPage = this.initPage;
      this.curHalfPage = 0;
      this.getPages();
    },
    // Rounding numbers
    roundNum(any) {
      return Math.round(any || 1);
    },
    // Stay on current page
    stay(index) {
      this.curHalfPage = index;
      this.staying = true;
      // Record the current page, if the current page is clicked to change the page before the timer ends, then the end operation in the following state is not performed
      const temp = this.curHalfPage;
      setTimeout(() => {
        if (temp === this.curHalfPage) {
          this.ended();
        }
      }, this.autoNextPageDelayTime);
    },
    // Single page preview finished
    ended() {
      this.staying = false;
      // right
      if (this.curHalfPage % 2 === 1) {
        if (this.autoNextPage) {
          this.resetAnimateClass();
          this.next();
        }
      } else {
        if (this.autoNextPage) {
          this.curHalfPage += 1;
          console.log(this.curHalfPage);
          this.stay(this.curHalfPage);
        }
      }
    },
    // Calculate after the page changes
    computedData(pageNum) {
      // Every time you turn the page, the index on the left side of the page is subtracted by one unit (because each half-page starts with index 0 and the page starts with 1)
      this.curHalfPage = pageNum * 2 - 1 - 1;
      // Turn pages to animate
      this.animating = true;
      // Calculate which pages need to be turned 180 degrees
      this.rotate180();
      // Calculate pages that need to be animated
      this.animateClass();
      // Stay on current page
      this.stay(this.curHalfPage);
    },
    // Change the status of automatic page turning
    changeAutoNextPage() {
      this.autoNextPage = !this.autoNextPage;
      // When setting automatic page turning, if it is not staying and is not in the process of turning pages, then turn the next page
      if (this.autoNextPage && !this.staying && !this.animating) {
        this.next();
      }
    }
  },
  mounted() {
    this.getPages();
  },
  watch: {
    loop() {
      this.getPages();
    },
    autoNextPage(val) {
      if (val) {
        this.stay(this.curHalfPage);
      }
    },
    // Listen for changes and re-render
    data() {
      this.getPages();
    },
    // Animation after page number change
    curPage(pageNum) {
      if (pageNum === 1) {
        this.$$emit("atFirstPage");
      } else if (pageNum === this.pageCount) {
        this.$$emit("atEndPage");
      }
      this.computedData(pageNum);
    },
    // Change every half page
    curHalfPage(num) {
      this.$emit("indexPageChange", num);
    }
  }
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
