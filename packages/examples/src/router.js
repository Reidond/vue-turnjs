import VueRouter from "vue-router";
import FwBookblockExample from "./fw-bookblock-example.vue";
import FwBookblock2Example from "./fw-bookblock2-example.vue";
import FwTurnExample from "./fw-turn-example.vue";
import FwBookExample from "./fw-book-example.vue";

const routes = [
  {
    name: "demo-1",
    path: "/fw-bookblock-example",
    component: FwBookblockExample
  },
  {
    name: "demo-2",
    path: "/fw-bookblock2-example",
    component: FwBookblock2Example
  },
  { name: "demo-3", path: "/fw-turn-example", component: FwTurnExample },
  { name: "demo-4", path: "/fw-book-example", component: FwBookExample }
];

export const router = new VueRouter({
  routes
});
