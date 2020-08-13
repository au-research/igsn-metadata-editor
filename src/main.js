import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/tw.css'
import i18n from './i18n'
import router from './router'
import store from './store'
import Keycloak from 'keycloak-js'

Vue.config.productionTip = false

let keycloakOptions = {
  url: process.env.VUE_APP_KEYCLOAK_URL,
  realm: process.env.VUE_APP_KEYCLOAK_REALM,
  clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID,
  onLoad: 'login-required'
}

let keycloak = Keycloak(keycloakOptions);

keycloak
  .init({ onLoad: keycloakOptions.onLoad })
  .success((auth) =>{

    if(!auth) {
      window.location.reload();
    } else {
      console.log("Authenticated");
    }

    Vue.prototype.$keycloak = keycloak

    new Vue({
      i18n,
      router,
      store,
      render: h => h(App)
    }).$mount('#app')

  })
  .error((ex) => {
    console.error("Error")
  })


