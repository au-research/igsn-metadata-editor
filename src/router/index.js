import Vue from 'vue'
import VueRouter from 'vue-router'
import Editor from '../views/Editor.vue'
import Dashboard from '../views/Dashboard.vue'
import NotFound from '../views/NotFound'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/edit/:schema', name: 'CreateIGSN', component: Editor },
  { path: '/edit/:schema/:prefix/:igsn', name: 'EditByIGSN', component: Editor },
  { path: '*', name: '404', component: NotFound}
]

const router = new VueRouter({
  routes
})

// router.replace({ path: '*', redirect: '/' })

export default router
