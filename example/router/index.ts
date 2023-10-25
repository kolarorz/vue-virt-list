import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/performance',
    name: 'performance',
    component: () =>
      import(
        /* webpackChunkName: "performance" */ '../views/performance/Main.vue'
      ),
  },
  {
    path: '/tree',
    name: 'tree',
    component: () =>
      import(/* webpackChunkName: "tree" */ '../views/tree/Main.vue'),
  },
  {
    path: '/slot',
    name: 'Slot',
    component: () =>
      import(/* webpackChunkName: "slot" */ '../views/slot/Main.vue'),
  },
  {
    path: '/dynamic',
    name: 'dynamic',
    component: () =>
      import(/* webpackChunkName: "dynamic" */ '../views/dynamic/Main.vue'),
  },
  {
    path: '/fixed',
    name: 'fixed',
    component: () =>
      import(/* webpackChunkName: "fixed" */ '../views/fixed/Main.vue'),
  },
  {
    path: '/horizontal',
    name: 'horizontal',
    component: () =>
      import(
        /* webpackChunkName: "horizontal" */ '../views/horizontal/Main.vue'
      ),
  },
  {
    path: '/table',
    name: 'table',
    component: () =>
      import(/* webpackChunkName: "table" */ '../views/table/Main.vue'),
  },
  {
    path: '/infinity',
    name: 'infinity',
    component: () =>
      import(/* webpackChunkName: "infinity" */ '../views/infinity/Main.vue'),
  },
  {
    path: '/chat',
    name: 'chat',
    component: () =>
      import(/* webpackChunkName: "chat" */ '../views/chat/Main.vue'),
  },
  {
    path: '/pagination',
    name: 'pagination',
    component: () =>
      import(
        /* webpackChunkName: "pagination" */ '../views/pagination/Main.vue'
      ),
  },
  {
    path: '/pagination-pre',
    name: 'pagination-pre',
    component: () =>
      import(
        /* webpackChunkName: "pagination-pre" */ '../views/pagination-pre/Main.vue'
      ),
  },
  {
    path: '/change-items',
    name: 'change-items',
    component: () =>
      import(
        /* webpackChunkName: "change-items" */ '../views/change-items/Main.vue'
      ),
  },
  {
    path: '/editable',
    name: 'editable',
    component: () =>
      import(/* webpackChunkName: "editable" */ '../views/editable/Main.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
