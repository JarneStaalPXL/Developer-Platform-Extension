import { createRouter, createWebHistory } from "vue-router";
import Popup from "../Popup.vue";
import Login from "../views/Login.vue";
import MyProjects from "../views/MyProjects.vue";
import MyTools from "../views/MyTools.vue";
import Options from "../views/Options.vue";


const routes = [
  {
    path: "/popup.html",
    name: "Home",
    component: Popup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/options",
    name: "Options",
    component: Options,
  },
  {
    path: "/mytools",
    name: "MyTools",
    component: MyTools,
  },
  {
    path: "/myprojects",
    name: "MyProjects",
    component: MyProjects,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;


