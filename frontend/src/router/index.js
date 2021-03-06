import Vue from "vue";
import store from "../store";
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
    component: Home,
    beforeEnter: (to, from, next) => {
      if (store.state.user) {
        next();
      } else {
        next("/signin");
      }
      // ...
    },
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
