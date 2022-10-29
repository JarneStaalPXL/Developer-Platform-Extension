import { createRouter, createWebHistory } from "vue-router";
import Popup from "../Popup.vue";

const routes = [
  {
    path: "/popup.html",
    name: "Home",
    component: Popup,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;


