import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import register from '@/components/register'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {requiresAuth: true}
    }
  ]
})

router.beforeEach((to, from, next) => {
  var token = localStorage.getItem('token')
  if (to.meta.requiresAuth) {
    if (token) {
      next()
    } else {
      next('/')
    }
  } else {
    if (token) {
      next('/home')
    } else {
      next()
    }
  }
})

export default router
