import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

import Captura from "../views/Captura.vue";
import Podas from "../views/PodasView.vue";
import Informe from "../views/PodasInformeView.vue";
import Login from "../views/LoginView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "captura",
    component: Captura,
  },
  {
    path: "/captura",
    name: "captura",
    component: Captura,
  },
  {
    path: "/podas",
    name: "podas",
    meta: {
      isRequieredAuth: true,
    },
    component: Podas,
  },
  {
    path: "/informe",
    name: "informe",
    meta: {
      isRequieredAuth: true,
    },
    component: Informe,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isRequiered = to.matched.some((record) => record.meta.isRequieredAuth);
  console.log("befort", isRequiered);
  if (isRequiered) {
    next("/login");
  }

  next();
});

export default router;
