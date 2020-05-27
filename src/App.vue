<template>
  <div id="app">
    <div class="w-full h-40 bg-black">
      <div class="w-full h-32 bg-black flex items-center">
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
        
        <div class="flex-1 text-right p-6 mr-6" id="nav">
          <router-link to="/" v-if="isLoggedIn">Dashboard</router-link>|
          <router-link to="/login" v-if="!isLoggedIn">Login</router-link>|
          <router-link to="/settings" v-if="isLoggedIn">Settings</router-link>|
          <a href @click.prevent="logout" v-if="isLoggedIn">Logout</a>|
          <router-link to="/about">About</router-link>|
        </div>
      </div>
    </div>

    <div
      class="container w-10/12 mx-auto p-2 py-4 shadow-lg rounded-lg border-solid border-1 -mt-8 bg-white"
    >
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("auth/logout").then(this.$router.push("/login"));
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    }
  },
  mounted() {
    this.$store.dispatch("auth/initSSO");
  }
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
