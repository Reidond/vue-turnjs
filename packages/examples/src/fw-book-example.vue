<template>
  <div class="bb-custom-wrapper">
    <fw-book
      :data="pages"
      :startPageIndex="1"
      :endPageIndex="pages.length - 2"
      @next="pageChange"
      @prev="pageChange"
      @indexPageChange="indexPageChange"
      :autoNextPage="autoNextPage"
      :autoNextPageDelayTime="1000"
      :loop="loop"
    >
      <template v-slot:page="{ page, index }">
        <img :src="page.src" :alt="`image${index}`" />
      </template>
    </fw-book>
  </div>
</template>

<script>
export default {
  data() {
    return {
      autoNextPage: true,
      loop: false,
      pages: [
        {
          src:
            "https://raw.githubusercontent.com/Reidond/vue-turnjs/develop/static/bookblock/1.jpg"
        },
        {
          src:
            "https://raw.githubusercontent.com/Reidond/vue-turnjs/develop/static/bookblock/2.jpg"
        },
        {
          src:
            "https://raw.githubusercontent.com/Reidond/vue-turnjs/develop/static/bookblock/3.jpg"
        },
        {
          src:
            "https://raw.githubusercontent.com/Reidond/vue-turnjs/develop/static/bookblock/4.jpg"
        },
        {
          src:
            "https://raw.githubusercontent.com/Reidond/vue-turnjs/develop/static/bookblock/5.jpg"
        }
      ]
    };
  },
  methods: {
    pageChange(/* curPage, indexPages, pageDatas */) {},
    indexPageChange(/* num */) {}
  }
};
</script>

<style lang="scss">
@import "./styles/demo1.scss";
.fw-book {
  width: 420px;
  border-radius: 10px;
  position: relative;
  perspective: 1500px;
}
.fw-book .fw-bookitem {
  width: 50%;
  height: 100%;
  border-radius: 10px;
  background: #ffffff;
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
