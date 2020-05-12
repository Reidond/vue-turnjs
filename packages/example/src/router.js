import VueRouter from "vue-router";
import BookblockPage from "./BookblockPage.vue";
import BookblockPage2 from "./BookblockPage2.vue";
import TurnJsPage from "./TurnJsPage.vue";

const routes = [
  { path: "/", component: BookblockPage },
  { path: "/bookblock2", component: BookblockPage2 },
  { path: "/turnjs", component: TurnJsPage }
];

export const router = new VueRouter({
  routes
});
