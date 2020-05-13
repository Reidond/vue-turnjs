# vue-turnjs

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

![npm](https://img.shields.io/npm/dw/vue-turnjs)
![npm](https://img.shields.io/npm/v/vue-turnjs)

## Overview

A vue wrapper for turn.js and bookblock libraries.

Contains this components:

- **Bookblock** - somewhat old version made for compatibility
- **Bookblock2** - new version with standard API, like in other Vue components out there
- **Turn** - turn.js wrapper

Original code is in packages/vue-turnjs/lib/ alongside with modified bookblock by us.

See README.md in vue-turnjs package to more info.

Most of this packages have API designed specialy for our purposes.

We use modified version of bookblock jquery because original has some serious issues, in particular:

- When element is initialized (means it has bookblock instance) original code assigns default options even if element has it`s own options

```js
this.each(function () {
  var instance = $.data(this, "bookblock");
  if (instance) {
    instance._init();
  } else {
    instance = $.data(this, "bookblock", new $.BookBlock(options, this));
  }
});
```

- In original code two bookblock elements on the same page have same instances even if selector used by jquery is random. We fixed this by adding random id of selector to intance key

_Original:_

```js
var instance = $.data(this, "bookblock");
```

_Modified:_

```js
var instance = $.data(this, `bookblock-${this.dataset.uid}`);
```

## Install & basic usage

```bash
npm install vue-turnjs
```

### Bookblock

```vue
<template>
  <div>
    <bookblock :options="{ autoflip: true }">
      <div class="bb-item">
        <div class="page">
          <h1>Page 1</h1>
        </div>
        <div class="page">
          <h1>Page 2</h1>
        </div>
      </div>
      <div class="bb-item">
        <div class="page">
          <h1>Page 3</h1>
        </div>
        <div class="page">
          <h1>Page 4</h1>
        </div>
      </div>
    </bookblock>
  </div>
</template>

<script>
import { Bookblock } from "vue-turnjs";
export default {
  components: { Bookblock },
};
</script>

// Optional
<style src="vue-turnjs/dist/vue-turnjs.esm.css"></style>
```

### Bookblock 2

```vue
<template>
  <div>
    <bookblock2
      class="bb-bookblock"
      :options="{ autoflip: true }"
      :pages="pages"
    >
      <template v-slot:page="{ item, index }">
        <div class="page">
          <h1>{{ item[0] }}</h1>
        </div>
        <div class="page">
          <h1>{{ item[1] }}</h1>
        </div>
      </template>
      </div>
    </bookblock2>
  </div>
</template>

<script>
import { Bookblock2 } from "vue-turnjs";
export default {
  components: { Bookblock2 },
  data() {
    return {
      pages: [["Page 1", "Page 2"], ["Page 3", "Page 4"]]
    };
  }
};
</script>

// Optional
<style src="vue-turnjs/dist/vue-turnjs.esm.css"></style>
```

### TurnJS

```vue
<template>
  <div class="turn-grid">
    <div>
      <h1>Double display</h1>
      <turn>
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
      <h1>Single display</h1>
      <turn :options="{ display: display }">
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
  components: {
    Turn,
  },
  data() {
    return {
      display: "single",
    };
  },
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

## API

### Bookblock

| Option       | Default                                     | Description                                                                                                                                   |
| ------------ | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| orientation  | "horizontal"                                | vertical or horizontal flip                                                                                                                   |
| direction    | "ltr"                                       | left to right or right to left                                                                                                                |
| speed        | 1000                                        | speed for the flip transition in ms                                                                                                           |
| easing       | "ease-in-out"                               | easing for the flip transition                                                                                                                |
| shadow       | true                                        | if set to true, both the flipping page and the sides will have an overlay to simulate shadows                                                 |
| shadowSides  | 0.2                                         | opacity value for the "shadow" on both sides (when the flipping page is over it). value: 0.1 - 1                                              |
| shadowFlip   | 0.1                                         | opacity value for the "shadow" on the flipping page (while it is flipping). value: 0.1 - 1                                                    |
| circular     | false                                       | if we should show the first item after reaching the end                                                                                       |
| nextEl       | ""                                          | if we want to specify a selector that triggers the next() function. example: '#bb-nav-next'.                                                  |
| prevEl       | ""                                          | if we want to specify a selector that triggers the prev() function.                                                                           |
| autoplay     | false                                       | if true it overwrites the circular option to true!                                                                                            |
| interval     | 3000                                        | time (ms) between page switch, if autoplay is true.                                                                                           |
| onEndFlip    | `function(page, isLimit) { return false; }` | callback after the flip transition. page is the current item's index. isLimit is true if the current page is the last one (or the first one). |
| onBeforeFlip | `function(page) { return false; }`          | callback before the flip transition page is the current item's index.                                                                         |

### Turn.JS

[Official docs](http://turnjs.com/docs/Main_Page)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/Reidond"><img src="https://avatars0.githubusercontent.com/u/20406775?v=4" width="100px;" alt=""/><br /><sub><b>Andrii Shafar</b></sub></a><br /><a href="https://github.com/Reidond/vue-turnjs/commits?author=Reidond" title="Code">💻</a> <a href="https://github.com/Reidond/vue-turnjs/commits?author=Reidond" title="Documentation">📖</a> <a href="#maintenance-Reidond" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/Orest-2"><img src="https://avatars3.githubusercontent.com/u/20842843?v=4" width="100px;" alt=""/><br /><sub><b>Pidfihurnyi Orest</b></sub></a><br /><a href="https://github.com/Reidond/vue-turnjs/commits?author=Orest-2" title="Code">💻</a> <a href="https://github.com/Reidond/vue-turnjs/pulls?q=is%3Apr+reviewed-by%3AOrest-2" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/Reidond/vue-turnjs/commits?author=Orest-2" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
