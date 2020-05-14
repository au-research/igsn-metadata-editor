import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import Editor from '../views/Editor.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  {
    path: '/editor/:schema?/:docID?', name: 'Editor', component: Editor,
    meta: { requiresAuth: true }
  },
  { path: '/login', name: 'Login', component: Login },
  { path: '/about', name: 'About', component: About }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // TODO check roles and permissions?
  if (to.matched.some(record => record.meta.requiresAuth)) {
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
