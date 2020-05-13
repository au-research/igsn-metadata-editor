<template>
  <div>
    <form>
      <label for="username">Username</label>
      <div>
        <input id="username" type="text" v-model="username" required autofocus />
      </div>
      <div>
        <label for="password">Password</label>
        <div>
          <input id="password" type="password" v-model="password" required />
        </div>
      </div>
      <div class="my-2">
        <button class="btn btn-blue" type="submit" @click="handleSubmit">Login</button>
      </div>
      <hr>
      <button class="my-2 btn btn-blue">Authenticate via AAF</button>
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
    handleSubmit(e) {
      e.preventDefault();
      if (this.password.length > 0) {
        // localStorage.setItem('jwt','isloggedin')
        // if(this.$route.params.redirect != null){
        //     this.$router.push(this.$route.params.redirect)
        // }
        console.log(this.$route)

        this.$store.dispatch("auth/login", {
          username: this.username,
          password: this.password
        })
        .then(() => {
            let target = this.$route?.query?.redirect 
                ? this.$route?.query?.redirect 
                : "/"
            console.log("going to: ",target)
            this.$router.push(target)
        })
        .catch(err => console.error(err))

        // this.$store
        //   .dispatch("auth/login", { email, password })
        //   .then(() => this.$router.push("/"))
        //   .catch(err => console.log(err));

        // this.$http.post('http://localhost:3000/login', {
        //     email: this.email,
        //     password: this.password
        // })
        // .then(response => {

        // })
        // .catch(function (error) {
        //     console.error(error.response);
        // });
      }
    }
  }
};
</script>