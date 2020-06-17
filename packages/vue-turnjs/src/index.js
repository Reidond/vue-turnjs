import { componentsPlugin } from "./components";
const { installFactory } = require("./utils/plugin");

const install = installFactory({
  plugins: {
    componentsPlugin
  }
});

const NAME = "FlippingWidgets";

const FlippingWidgets = {
  install,
  NAME
};

// Installer exported in case the consumer does not import `default`
// as the plugin in CommonJS build (or does not have interop enabled for CommonJS)
// Both the following will work:
//   FlippingWidgets = require('vue-turnjs')
//   FlippingWidgets = require('vue-turnjs').default
//   Vue.use(FlippingWidgets)
export { install, NAME, FlippingWidgets };

// export * from './components/bookblock'
export { BookblockPlugin } from "./components/bookblock";
export { default as FwBookblock } from "./components/bookblock/bookblock.vue";
// backwards compat
export { default as Bookblock } from "./components/bookblock/bookblock.vue";

// export * from './components/bookblock2'
export { Bookblock2Plugin } from "./components/bookblock2";
export { default as FwBookblock2 } from "./components/bookblock2/bookblock2.vue";
// backwards compat
export { default as Bookblock2 } from "./components/bookblock2/bookblock2.vue";

// export * from './components/turn'
export { TurnPlugin } from "./components/turn";
export { default as FwTurn } from "./components/turn/turn.vue";
// backwards compat
export { default as Turn } from "./components/turn/turn.vue";

// export * from './components/book'
export { BookPlugin } from "./components/book";
export { default as FwBook } from "./components/book/book.vue";

export default FlippingWidgets;
