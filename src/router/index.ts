import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '../views/Layout/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
  },
  {
      path: '/login',
      name: 'login',
      component: () => import("@/views/Login/Login.vue"),
  },
    {
        path: '/password',
        name: 'password',
        component: () => import("@/views/Login/Password.vue"),
    },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to: any, from: any, next: any) => {
   const isLogin = localStorage.tsToken ? true : false;
   if (to.path == '/login' || to.path == '/password') {
       next();
   } else {
       isLogin ? next() : next('/login');
   }
});

export default router;
