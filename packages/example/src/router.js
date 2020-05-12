import VueRouter from "vue-router";
import BookblockPage from "./BookblockPage.vue";
import TurnJsPage from "./TurnJsPage.vue";

const routes = [
  { path: "/", component: BookblockPage },
  { path: "/turnjs", component: TurnJsPage }
];

export const router = new VueRouter({
  routes
});
