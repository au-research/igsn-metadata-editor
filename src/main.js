import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/tw.css'
import i18n from './i18n'
import router from './router'
import store from './store'
import Keycloak from 'keycloak-js'

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
