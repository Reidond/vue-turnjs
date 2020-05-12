<template>
  <div class="bookblock-grid">
    <Bookblock class="bb-bookblock" ref="bookBlock" :options="bookblockOptions">
      <div class="bb-item">
        <div class="page cover">
          <h1>Cover</h1>
          <p>lorem ipsum</p>
        </div>
      </div>
      <div class="bb-item" v-for="(page, index) in pages" :key="page + index">
        <div class="page">
          <h1>Page {{ page + index }}</h1>
          <p>
            Lorem ipsum dolor sit amet, utinam audiam forensibus vim no, mel
            solum graecis recusabo ei. Et viris placerat qui, ad quodsi eleifend
            constituam eam. Ex iusto partiendo gubergren per, quis assentior
            dissentias cum ad, te eruditi utroque dissentiunt qui. Ad vix debet
            mucius iriure. Cu soleat facilis vim, sit nullam delenit ne. Sea
            simul aliquam in, has augue soleat at.
          </p>
        </div>
        <div class="page">
          <h1>Page {{ page + index }}</h1>
          <p>
            Vis mollis consulatu et, has in facilisis posidonium. Minim choro ea
            quo, iisque feugait consectetuer at mei. Ne ius omnium maiestatis,
            et augue indoctum elaboraret cum. Ad his mutat munere, choro saperet
            no quo. Duo ne adolescens consequuntur, etiam essent patrioque te
            ius, legendos inimicus mea ex. Qui cu lorem comprehensam, cu
            nominati sententiae definitionem eos.
          </p>
        </div>
      </div>
    </Bookblock>
    <!-- different version -->
    <!-- <Bookblock
      class="bb-bookblock"
      ref="bookBlock"
      :options="bookblockOptions"
      :pages="pages"
    >
      <template v-slot:page="{ item, index }">
        <div class="page">
          <h1>Page {{ item + index }}</h1>
          <p>
            Lorem ipsum dolor sit amet, utinam audiam forensibus vim no, mel
            solum graecis recusabo ei. Et viris placerat qui, ad quodsi eleifend
            constituam eam. Ex iusto partiendo gubergren per, quis assentior
            dissentias cum ad, te eruditi utroque dissentiunt qui. Ad vix debet
            mucius iriure. Cu soleat facilis vim, sit nullam delenit ne. Sea
            simul aliquam in, has augue soleat at.
          </p>
        </div>
        <div class="page">
          <h1>Page {{ item + index }}</h1>
          <p>
            Vis mollis consulatu et, has in facilisis posidonium. Minim choro ea
            quo, iisque feugait consectetuer at mei. Ne ius omnium maiestatis,
            et augue indoctum elaboraret cum. Ad his mutat munere, choro saperet
            no quo. Duo ne adolescens consequuntur, etiam essent patrioque te
            ius, legendos inimicus mea ex. Qui cu lorem comprehensam, cu
            nominati sententiae definitionem eos.
          </p>
        </div>
      </template>
    </Bookblock> -->
    <nav>
      <a id="bb-nav-first" href="javascript:" @click="bookblockRef.first()"
        >First page</a
      >
      <a id="bb-nav-prev" href="javascript:" @click="bookblockRef.prev()"
        >Previous</a
      >
      <a id="bb-nav-next" href="javascript:" @click="bookblockRef.next()"
        >Next</a
      >
      <a id="bb-nav-last" href="javascript:" @click="bookblockRef.last()"
        >Last page</a
      >
    </nav>
  </div>
</template>

<script>
import { Bookblock } from "vue-turnjs";

export default {
  components: {
    Bookblock
  },
  data() {
    return {
      pages: new Array(10).fill(0),
      bookblockOptions: {
        speed: 500,
        autoplay: false
      }
    };
  },
  mounted() {
    setTimeout(() => {
      this.pages.push(0);
      this.bookblockOptions.autoplay = true;
    }, 10000);
  },
  computed: {
    bookblockRef: function() {
      return this.$refs.bookBlock;
    }
  }
};
</script>

<style scoped>
.bookblock-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  justify-content: center;
}
</style>
