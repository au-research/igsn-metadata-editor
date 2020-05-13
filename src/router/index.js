import Vue from 'vue'
import VueRouter from 'vue-router'
import Editor from '../views/Editor.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', name: 'Editor',component: Editor
  },
  {
    path: '/login', name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['auth/isLoggedIn']) {
      next()
      return
    }
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    }) 
  } else {
    next() 
  }
})

export default router
