import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'goi-dich-vu/list', component: () => import('pages/GoiDichVu/ListPage.vue') },
      { path: 'bds/list', component: () => import('pages/bds/ListPage.vue') },
      { path: 'bds/create', component: () => import('pages/bds/AddPage.vue') },
      { path: 'bds/update', component: () => import('pages/bds/UpdatePage.vue') },
      { path: 'blog/list', component: () => import('pages/blog/ListPage.vue') },
      { path: 'blog/create', component: () => import('pages/blog/AddPage.vue') },
      { path: 'blog/update', component: () => import('pages/blog/UpdatePage.vue') },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register', component: () => import('pages/RegisterPage.vue') }
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
