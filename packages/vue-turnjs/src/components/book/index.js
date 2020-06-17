import FwBook from "./book.vue";
import { pluginFactory } from "../../utils/plugin";

const BookPlugin = pluginFactory({ components: { FwBook } });

export { BookPlugin, FwBook };
