import { createApp } from "vue";

import Popup from "./Popup.vue";
import router from "./router";
import store from "./store";

createApp(Popup).use(store).use(router).mount("#app");