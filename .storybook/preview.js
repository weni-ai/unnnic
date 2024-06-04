import i18n from "../src/utils/plugins/i18n";
import { setup } from "@storybook/vue3";

setup((app) => {
  app.use(i18n);
});