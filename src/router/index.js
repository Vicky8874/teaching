import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index.vue'),
    },
    {
      path: '/select',
      name: 'select',
      component: () => import('@/views/select/index.vue'),
    },
    {
      path: '/data',
      name: 'data',
      component: () => import('@/views/data/index.vue'),
    },
    {
      path: '/backstage',
      name: 'backstage',
      component: () => import('@/views/backstage/index.vue'),
    },
    {
      path: '/wheel',
      name: 'wheel',
      component: () => import('@/views/wheel/index.vue'),
    },
    {
      path: "/:ptthMatch(.*)",
      redirect: '/',
    },
  ]
})

export default router
