import VueRouter from "vue-router";
import FwBookblockExample from "./fw-bookblock-example.vue";
import FwBookblock2Example from "./fw-bookblock2-example.vue";
import FwTurnExample from "./fw-turn-example.vue";

const routes = [
  { path: "/fw-bookblock-example", component: FwBookblockExample },
  { path: "/fw-bookblock2-example", component: FwBookblock2Example },
  { path: "/fw-turn-example", component: FwTurnExample }
];

export const router = new VueRouter({
  routes
});
