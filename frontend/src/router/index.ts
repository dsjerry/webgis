import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/example/:id',
      name: 'example',
      component: () => import('@/views/ExampleView.vue')
    }
  ]
})

export default router
