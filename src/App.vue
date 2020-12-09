<template>
  <div id="app">
    <div class="w-full h-40 bg-black">
      <div class="w-full h-32 bg-black flex items-center justify-between">
        <div class="flex items-center">
          <router-link to="/">
            <img
                class="h-16 mx-6"
                src="https://ardc.edu.au/wp-content/themes/ardc/img/ardc_logo.svg"
                alt
            />
          </router-link>
          <router-link to="/">
            <h1 class="text-2xl text-white mx-4">ARDC Metadata Editor</h1>
          </router-link>
        </div>

        <div class="flex items-center mr-10 print:hidden">
          <div class="text-white flex items-center">
            <p class="mr-5 text-lg"> {{ user.name }}</p>
            <a class="px-6 py-3 rounded-lg border-2 border-white text-white hover:text-white hover:bg-blue hover:border-blue-dark uppercase hover:no-underline" href @click.prevent="logout()"
               >Log Out </a>
          </div>
        </div>

      </div>
    </div>

    <div
      class="container w-full mx-auto p-2 py-4 shadow-lg rounded-lg border-solid border-1 -mt-8 bg-white "
    >
      <router-view />
    </div>

    <div class="w-full bg-black mt-8 flex px-8 py-10 pb-16 justify-between print:hidden">

      <div class="flex flex-col space-x-6 space-y-6 md:flex-row md:space-y-0">
        <div class="print:hidden">
          <a href="https://ardc.edu.au/">
            <img src="./images/ardc_logo_white.png" class="h-16 mx-6" alt="ARDC Logo"/>
          </a>
        </div>
        <div id="footer-links">
          <ul class="space-y-2">
            <li>
              <a :href="portalUrl" target="_blank">IGSN Portal</a></li>
            <li>
              <a href="https://documentation.ardc.edu.au/display/DOC/IGSN+Service"
                 target="_blank">Documentation</a>
            </li>
            <li>
              <a href="https://ardc.edu.au/privacy-policy/" target="_blank">ARDC Privacy Policy</a>
            </li>
            <li>
              <a href="https://ardc.edu.au/" target="_blank">ARDC Website</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex flex-col md:space-x-6 space-y-6 md:flex-row md:space-y-0">
        <div style="width:140px;">
          <p class="text-white xl:text-xs">The Australian Research Data Commons (ARDC) is enabled by NCRIS.</p>
          <a href="https://education.gov.au/national-collaborative-research-infrastructure-strategy-ncris">
            <img src="https://researchdata.edu.au/assets/core/images/NCRIS_PROVIDER_rev.png" alt="">
          </a>
        </div>
        <div style="width:140px">
          <a href="https://www.igsn.org/">
            <img src="./images/igsn-original.jpg" alt="IGSN Logo">
          </a>
        </div>
      </div>
    </div>

    <div class="fixed flex bottom-0 right-0 mr-4 mb-2 print:hidden">
      <a href="https://documentation.ardc.edu.au/display/DOC/IGSN+Service" target="_blank"
         class="btn btn-yellow mr-2"><i class="fas fa-question-circle"></i> Help</a>
      <a id="feedbackTrigger" href="" class="btn btn-yellow">Feedback</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import RegistryService from './services/registry'

export default {
  computed: {
    user() {
      return this.$store.getters["auth/user"]
    },
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    },
    token() {
      return this.$store.getters['auth/token'];
    },
    portalUrl() {
      return this.$registryService.getPortalUrl()
    }
  },
  data() {
    return {
      refreshInterval: null,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/destroyToken");
      this.$keycloak.logout();
    },

    startRefreshTokenInterval() {
      this.refreshInterval = setInterval(() => {
        this.$keycloak
          .updateToken(70)
          .success((refreshed) => {
            if (refreshed) {
              this.$registryService.setToken(this.$keycloak.token)
              console.debug("Token refreshed" + refreshed);
            } else {
              console.warn(
                "Token not refreshed, valid for " +
                  Math.round(
                    this.$keycloak.tokenParsed.exp +
                      this.$keycloak.timeSkew -
                      new Date().getTime() / 1000
                  ) +
                  " seconds"
              );
            }
          })
          .error(() => {
            console.error("Failed to refresh token");
          });
      }, 60000);
    },

    obtainUserInfo() {
      this.$registryService.getUserInfo()
          .then((data) => {
          this.$store.dispatch('auth/setUser', data)
        })
      .catch((ex) => {
        this.$router.push('/403')
      })
    }

  },
  mounted() {
    this.$store.dispatch("auth/storeToken", {
      token: this.$keycloak.token,
      refreshToken: this.$keycloak.refreshToken,
    });
    this.startRefreshTokenInterval();
    this.obtainUserInfo()
  },
};
</script>


<style>
#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
