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

## Install

```bash
npm install vue-turnjs
```

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
