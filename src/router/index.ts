/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'home',
    components: { default: () => import('../views/HomeView.vue') },
  },
  {
    path: '/categories',
    name: 'categories',
    components: { default: () => import('../views/CategoryView.vue') },
  },
  {
    path: '/search',
    name: 'search',
    components: { default: () => import('../views/SearchVue.vue') },
  },
  {
    path: "/:catchAll(.*)",
    redirect: { name: 'home' },
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
