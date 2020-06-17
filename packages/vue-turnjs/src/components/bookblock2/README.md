# Bookblock 2

## API

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

## Usage

```html
<template>
  <div>
    <fw-bookblock2
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
    </fw-bookblock2>
  </div>
</template>
```
