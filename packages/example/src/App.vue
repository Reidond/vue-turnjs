<template>
  <div id="app">
    <div class="turn-grid" v-if="turn">
      <div>
        <h1>Auto flip (Double display)</h1>
        <turn id="flip-book" :options="{ autoFlip: auto }">
          <div class="flip_page_double hard">Turn.js</div>
          <div class="flip_page_double hard"></div>
          <div class="flip_page_double hard">Page 1</div>
          <div class="flip_page_double hard">Page 2</div>
          <div class="flip_page_double hard">Page 3</div>
          <div class="flip_page_double hard">Page 4</div>
          <div class="flip_page_double hard"></div>
          <div class="flip_page_double hard"></div>
        </turn>
      </div>
      <div>
        <h1>No auto flip (Double display)</h1>
        <turn id="flip-book">
          <div class="flip_page_double">Turn.js</div>
          <div class="flip_page_double"></div>
          <div class="flip_page_double">Page 1</div>
          <div class="flip_page_double">Page 2</div>
          <div class="flip_page_double">Page 3</div>
          <div class="flip_page_double">Page 4</div>
          <div class="flip_page_double"></div>
          <div class="flip_page_double"></div>
        </turn>
      </div>
      <div>
        <h1>Auto flip. Single display</h1>
        <turn
          id="flip-book"
          :options="{ display: 'single', autoFlip: auto, autoFlipDelay: 4000 }"
        >
          <div class="flip_page_single">Turn.js</div>
          <div class="flip_page_single"></div>
          <div class="flip_page_single">Page 1</div>
          <div class="flip_page_single">Page 2</div>
          <div class="flip_page_single">Page 3</div>
          <div class="flip_page_single">Page 4</div>
          <div class="flip_page_single"></div>
          <div class="flip_page_single"></div>
        </turn>
      </div>
      <div>
        <h1>Single display</h1>
        <turn id="flip-book" :options="{ display: display }">
          <div class="flip_page_single">Turn.js</div>
          <div class="flip_page_single"></div>
          <div class="flip_page_single">Page 1</div>
          <div class="flip_page_single">Page 2</div>
          <div class="flip_page_single">Page 3</div>
          <div class="flip_page_single">Page 4</div>
          <div class="flip_page_single"></div>
          <div class="flip_page_single"></div>
        </turn>
      </div>
    </div>
    <div v-else-if="bookblock">
      <Bookblock
        class="bb-bookblock"
        ref="bookBlock"
        :options="bookblockOptions"
      >
        <div class="bb-item">
          <div class="page cover">
            <h1>Cover</h1>
            <p>lorem ipsum</p>
          </div>
        </div>
        <div class="bb-item">
          <div class="page">
            <h1>Page 1</h1>
            <p>
              Lorem ipsum dolor sit amet, utinam audiam forensibus vim no, mel
              solum graecis recusabo ei. Et viris placerat qui, ad quodsi
              eleifend constituam eam. Ex iusto partiendo gubergren per, quis
              assentior dissentias cum ad, te eruditi utroque dissentiunt qui.
              Ad vix debet mucius iriure. Cu soleat facilis vim, sit nullam
              delenit ne. Sea simul aliquam in, has augue soleat at.
            </p>
          </div>
          <div class="page">
            <h1>Page 2</h1>
            <p>
              Vis mollis consulatu et, has in facilisis posidonium. Minim choro
              ea quo, iisque feugait consectetuer at mei. Ne ius omnium
              maiestatis, et augue indoctum elaboraret cum. Ad his mutat munere,
              choro saperet no quo. Duo ne adolescens consequuntur, etiam essent
              patrioque te ius, legendos inimicus mea ex. Qui cu lorem
              comprehensam, cu nominati sententiae definitionem eos.
            </p>
          </div>
        </div>
        <div class="bb-item">
          <div class="page">
            <h1>Page 3</h1>
            <p>
              Lorem ipsum dolor sit amet, utinam audiam forensibus vim no, mel
              solum graecis recusabo ei. Et viris placerat qui, ad quodsi
              eleifend constituam eam. Ex iusto partiendo gubergren per, quis
              assentior dissentias cum ad, te eruditi utroque dissentiunt qui.
              Ad vix debet mucius iriure. Cu soleat facilis vim, sit nullam
              delenit ne. Sea simul aliquam in, has augue soleat at.
            </p>
          </div>
          <div class="page">
            <h1>Page 4</h1>
            <p>
              Vis mollis consulatu et, has in facilisis posidonium. Minim choro
              ea quo, iisque feugait consectetuer at mei. Ne ius omnium
              maiestatis, et augue indoctum elaboraret cum. Ad his mutat munere,
              choro saperet no quo. Duo ne adolescens consequuntur, etiam essent
              patrioque te ius, legendos inimicus mea ex. Qui cu lorem
              comprehensam, cu nominati sententiae definitionem eos.
            </p>
          </div>
        </div>
        <div class="bb-item">
          <div class="page">
            <h1>Page 5</h1>
            <p>
              Lorem ipsum dolor sit amet, utinam audiam forensibus vim no, mel
              solum graecis recusabo ei. Et viris placerat qui, ad quodsi
              eleifend constituam eam. Ex iusto partiendo gubergren per, quis
              assentior dissentias cum ad, te eruditi utroque dissentiunt qui.
              Ad vix debet mucius iriure. Cu soleat facilis vim, sit nullam
              delenit ne. Sea simul aliquam in, has augue soleat at.
            </p>
          </div>
          <div class="page">
            <h1>Page 6</h1>
            <p>
              Vis mollis consulatu et, has in facilisis posidonium. Minim choro
              ea quo, iisque feugait consectetuer at mei. Ne ius omnium
              maiestatis, et augue indoctum elaboraret cum. Ad his mutat munere,
              choro saperet no quo. Duo ne adolescens consequuntur, etiam essent
              patrioque te ius, legendos inimicus mea ex. Qui cu lorem
              comprehensam, cu nominati sententiae definitionem eos.
            </p>
          </div>
        </div>
      </Bookblock>
      <nav style="text-align: center;">
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
  </div>
</template>

<script>
import "vue-turnjs/dist/vue-turnjs.esm.css";
import { Turn, Bookblock } from "vue-turnjs";

export default {
  name: "App",
  components: {
    Turn,
    Bookblock
  },
  data() {
    return {
      auto: true,
      display: "single",
      turn: false,
      bookblock: true,
      bookblockOptions: {
        speed: 500
      }
    };
  },
  methods: {
    switch() {
      if (this.turn) {
        this.turn = false;
        this.bookblock = true;
      } else {
        this.turn = true;
        this.bookblock = false;
      }
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
.turn-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.flip_page_double {
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 300px;
  vertical-align: middle;
  background: url("https://miro.medium.com/max/10368/1*o8tTGo3vsocTKnCUyz0wHA.jpeg")
    no-repeat left center;
  background-size: 400px 600px;
}
.flip_page_single {
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 300px;
  vertical-align: middle;
  background: url("https://miro.medium.com/max/10368/1*o8tTGo3vsocTKnCUyz0wHA.jpeg")
    no-repeat left center;
  background-size: 800px 600px;
}
</style>
