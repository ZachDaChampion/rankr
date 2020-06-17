import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Selector from "../views/Selector.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Selector",
    component: Selector,
  },
  {
    path: "/compare",
    name: "Compare",
    component: () => import("../views/Compare.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
