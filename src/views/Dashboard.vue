<template>
  <div>
    <div v-if="!isLoggedIn">
      <h1>You are not Logged In. Click here to login</h1>
    </div>
    
    <h1 class="text-bold">Your IGSN</h1>
    <div class="rounded-md border-2 p-6 mb-6">
      <a href class="text-blue">CSTSTDOCO1</a>
      <router-link to="/editor/igsn-csiro-v3/CSTSTDOCO1" class="btn btn-blue text-xs">Edit</router-link>
    </div>
    
    <pre>{{ user | pretty }}</pre>

  </div>
</template>

<script>
export default {
  name: "Dashboard",
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    },
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    },
  },
  filters: {
    pretty(value) {
      return JSON.stringify(value, null, 2);
    },
  }
};
</script>