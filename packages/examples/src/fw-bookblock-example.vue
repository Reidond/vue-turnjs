<template>
  <div class="bb-custom-wrapper">
    <h3>
      Illustrations by
      <a href="http://dribbble.com/kevinhowdeshell">Kevin Howdeshell</a>
    </h3>
    <fw-bookblock
      class="bb-bookblock"
      ref="bookBlock"
      :options="bookblockOptions"
    >
      <div
        class="bb-item"
        v-for="(page, index) in pages"
        :key="`${page.href}_${page.src}_${index}`"
      >
        <a :href="page.href">
          <img :src="page.src" :alt="`image${index}`" />
        </a>
      </div>
    </fw-bookblock>
    <nav>
      <a class="pointer" @click="bookblockRef.first()">
        <b-icon-arrow-left />
      </a>
      <a class="pointer" @click="bookblockRef.prev()">
        <b-icon-arrow-left-short />
      </a>
      <a class="pointer" @click="bookblockRef.next()">
        <b-icon-arrow-right-short />
      </a>
      <a class="pointer" @click="bookblockRef.last()">
        <b-icon-arrow-right />
      </a>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pages: [
        { href: "http://drbl.in/bKVq", src: "/images/bookblock/1.jpg" },
        { href: "http://drbl.in/ciTX", src: "/images/bookblock/2.jpg" },
        { href: "http://drbl.in/cLHx", src: "/images/bookblock/3.jpg" },
        { href: "http://drbl.in/bAfn", src: "/images/bookblock/4.jpg" },
        { href: "http://drbl.in/dcbE", src: "/images/bookblock/5.jpg" }
      ],
      bookblockOptions: {
        speed: 800,
        shadowSides: 0.8,
        shadowFlip: 0.7,
        autoplay: true,
        orientation: "vertical"
      }
    };
  },
  mounted() {},
  watch: {
    pages(val) {
      this.bookblockOptions.autoplay = val.length > 0;
    }
  },
  computed: {
    bookblockRef: function() {
      return this.$refs.bookBlock;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./styles/demo1.scss";
</style>
