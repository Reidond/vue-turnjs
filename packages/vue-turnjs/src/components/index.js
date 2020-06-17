import { BookblockPlugin } from "./bookblock";
import { Bookblock2Plugin } from "./bookblock2";
import { TurnPlugin } from "./turn";
import { BookPlugin } from "./book";
import { pluginFactory } from "../utils/plugin";

export const componentsPlugin = /*#__PURE__*/ pluginFactory({
  plugins: { BookblockPlugin, Bookblock2Plugin, TurnPlugin, BookPlugin }
});
