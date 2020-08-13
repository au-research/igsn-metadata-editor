import Vue from 'vue'
import VueRouter from 'vue-router'
import Editor from '../views/Editor.vue'
import Dashboard from '../views/Dashboard.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/login*', name: 'Login', component: Login},
  { path: '/editor*/:schema?/:docID?', name: 'Editor', component: Editor },
  { path: '/about*', name: 'About', component: About },
  { path: '/logout*', name: 'Logout', component: Logout}
]

const router = new VueRouter({
  routes
})

// router.replace({ path: '*', redirect: '/' })

export default router
