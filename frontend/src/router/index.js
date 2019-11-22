import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/Signup.vue")
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import("../views/Signin.vue")
  },
  {
    path: "/",
    name: "home",
    component: Home,
    children: [
      {
        path: "",
        name: "shops",
        component: () => import("../views/Shops.vue")
      },
      {
        path: "preferences",
        name: "preferences",
        component: () => import("../views/PreferredShops.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
