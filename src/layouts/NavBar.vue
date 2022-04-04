<template>
  <nav class="fixed w-full bg-teal-800 text-white px-2 sm:px-4 py-2.5">
    <div class="container flex flex-wrap justify-around items-center mx-auto">
      <router-link to="/" class="flex items-center">
        <span class="self-center text-xl font-extrabold whitespace-nowrap">ToutDoux</span>
      </router-link>
      <div class="block w-auto" id="mobile-menu">
        <ul class="flex flex-row space-x-8 text-sm font-normal">
          <router-link to="/">
            Accueil
          </router-link>
          <router-link to="/todos">
            Mes Todos
          </router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>

</style>