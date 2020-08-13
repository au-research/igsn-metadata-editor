<template>
  <div>
    <h1>You are now logged out</h1>
  </div>
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch("auth/logout")
    }
}
</script>