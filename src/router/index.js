import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: 'Login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login/Index.vue'),
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import(/* webpackChunkName: "index" */ '../views/Index/Index.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home/Index.vue'),
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */ '../views/User/Index.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
