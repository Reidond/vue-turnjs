# TurnJS

## API

[Official docs](http://turnjs.com/docs/Main_Page)

## Usage

```html
<template>
  <div class="turn-grid">
    <div>
      <h1>Double display</h1>
      <fw-turn>
        <div class="flip_page_double hard">Turn.js</div>
        <div class="flip_page_double hard"></div>
        <div class="flip_page_double hard">Page 1</div>
        <div class="flip_page_double hard">Page 2</div>
        <div class="flip_page_double hard">Page 3</div>
        <div class="flip_page_double hard">Page 4</div>
        <div class="flip_page_double hard"></div>
        <div class="flip_page_double hard"></div>
      </fw-turn>
    </div>
    <div>
      <h1>Single display</h1>
      <fw-turn :options="{ display: display }">
        <div class="flip_page_single">Turn.js</div>
        <div class="flip_page_single"></div>
        <div class="flip_page_single">Page 1</div>
        <div class="flip_page_single">Page 2</div>
        <div class="flip_page_single">Page 3</div>
        <div class="flip_page_single">Page 4</div>
        <div class="flip_page_single"></div>
        <div class="flip_page_single"></div>
      </fw-turn>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        display: "single"
      };
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
```
