import FwBookblock from "./bookblock.vue";
import { pluginFactory } from "../../utils/plugin";

const BookblockPlugin = pluginFactory({ components: { FwBookblock } });

export { BookblockPlugin, FwBookblock };
