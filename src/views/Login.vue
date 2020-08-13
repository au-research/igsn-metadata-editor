<template>
  <div class="login">
    <h1>Logging you in... please wait...</h1>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    },
    redirectTo() {
      return this.$route.query.redirect
        ? this.$route.query.redirect
        : "/";
    },
  },
  mounted() {
    if (!this.isLoggedIn) {
      this.$store.dispatch("auth/initSSO").then(() => {
        this.$router.push(this.redirectTo);
      });
    } else {
      this.$router.push(this.redirectTo);
    }
  },
};
</script>