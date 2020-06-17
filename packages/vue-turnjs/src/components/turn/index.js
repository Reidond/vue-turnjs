import FwTurn from "./turn.vue";
import { pluginFactory } from "../../utils/plugin";

const TurnPlugin = pluginFactory({ components: { FwTurn } });

export { TurnPlugin, FwTurn };
