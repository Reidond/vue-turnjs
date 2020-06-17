<template>
  <div class="bookblock-grid">
    <fw-bookblock2
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
    </fw-bookblock2>
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
    <fw-bookblock2
      class="bb-bookblock"
      ref="bookBlock2"
      :options="bookblockOptions2"
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
    </fw-bookblock2>
    <nav>
      <a id="bb-nav-first" href="javascript:" @click="bookblockRef.first()"
        >First page</a
      >
      <a id="bb-nav-prev1" href="javascript:">Previous</a>
      <a id="bb-nav-next1" href="javascript:">Next</a>
      <a id="bb-nav-last" href="javascript:" @click="bookblockRef.last()"
        >Last page</a
      >
      <input type="file" />
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pages: [],
      bookblockOptions: {
        speed: 500,
        autoplay: true
      },
      bookblockOptions2: {
        speed: 500,
        autoplay: true,
        nextEl: "#bb-nav-next1",
        prevEl: "#bb-nav-prev1"
      }
    };
  },
  mounted() {
    setTimeout(() => {
      this.pages.push(0);
      this.pages.push(0);
      this.pages.push(0);
    }, 10000);
  },
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

<style scoped>
.bookblock-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  justify-content: center;
}
</style>
