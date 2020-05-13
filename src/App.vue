<template>
  <div id="app">
    <div class="w-full h-40 bg-black">
      <div class="w-full h-32 bg-black flex items-center">
        <img
          class="h-16 mx-6"
          src="https://ardc.edu.au/wp-content/themes/ardc/img/ardc_logo.svg"
          alt
        />
        <h1 class="text-2xl text-white mx-4">ARDC IGSN Editor</h1>
        <div class="flex-1 text-right p-6 mr-6" id="nav">
          <router-link to="/">Dashboard</router-link>|
          <router-link to="/about">About</router-link>|
          <router-link to="/about">User Settings</router-link>
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

<style>
#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
