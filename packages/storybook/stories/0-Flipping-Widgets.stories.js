import FwBookStory from "./fw-book-story.vue";
import FwBookblockStory from "./fw-bookblock-story.vue";
import FwBookblock2Story from "./fw-bookblock2-story.vue";
import FwTurnStory from "./fw-turn-story.vue";
import "vue-turnjs/dist/vue-turnjs.esm.css";
import "./styles/default.scss";

export default { title: "Flipping Widgets" };

export const Book = () => ({
  render(h) {
    return h(FwBookStory);
  }
});

export const Bookblock = () => ({
  render(h) {
    return h(FwBookblockStory);
  }
});

export const Bookblock2 = () => ({
  render(h) {
    return h(FwBookblock2Story);
  }
});

export const Turn = () => ({
  render(h) {
    return h(FwTurnStory);
  }
});
