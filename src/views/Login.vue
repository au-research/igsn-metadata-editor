<template>
  <div>
    <form>
      <div class="input-group">
        <label for="username">Username</label>
        <input id="username" type="text" v-model="username" required autofocus />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" required />
      </div>
      <div class="my-2">
        <button class="btn btn-blue" type="submit" @click="handleSubmit">Login</button>
      </div>
      <hr />
      <button class="my-2 btn btn-blue" @click.prevent="aaf">Authenticate via AAF</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    aaf() {
      this.$store
        .dispatch("auth/aaf", {
          username: this.username,
          password: this.password
        })
        .then(() => this.redirect());
    },
    redirect() {
      let target = this.$route?.query?.redirect
        ? this.$route?.query?.redirect
        : "/";
      this.$router.push(target);
    },
    handleSubmit(e) {
      e.preventDefault();
      if (this.password.length > 0) {
        this.$store
          .dispatch("auth/login", {
            username: this.username,
            password: this.password
          })
          .then(() => this.redirect())
          .catch(err => console.error(err));
      }
    }
  }
};
</script>