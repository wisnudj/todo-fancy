import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/MainView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import("@/views/AuthView.vue")
    }
  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem("token")

  if (to.meta.requiresAuth && !token) {
    return {
      name: 'auth',
      query: { redirect: to.fullPath }
    }
  }

  if (to.name === "auth" && token) {
    return { name: "main" }
  }
})

export default router
