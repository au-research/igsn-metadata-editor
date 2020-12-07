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
