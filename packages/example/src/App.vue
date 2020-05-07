<template>
  <div id="app">
    <div>
      <h1>Auto flip (Double display)</h1>
      <turn id="flip-book" :auto="true">
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
      <turn id="flip-book" :options="{ display: 'single' }" :auto="true">
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
      <turn id="flip-book" :options="{ display: 'single' }">
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
</template>

<script>
import { Turn } from "vue-turnjs";

export default {
  name: "App",
  components: {
    Turn
  }
};
</script>

<style scoped>
#app {
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
