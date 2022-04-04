<template>

  <div>
      <NavBar></NavBar>
      <div class="min-h-screen bg-teal-50 text-teal-800 grid md:gris-rows-2 lg:grid-cols-2 justify-evenly items-center">
        <div class="text-center">
          <h1 class="text-7xl font-extrabold mb-4">ToutDoux</h1>
          <router-link to="/todos" class="text-white bg-teal-800 hover:bg-teal-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
            Ajouter ma Todo
            <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </router-link>
        </div>
        <LastTodos></LastTodos>
      </div>
  </div>
</template>

<script>
import NavBar from "@/layouts/NavBar";
import LastTodos from "@/components/LastTodos";
export default {
  name: "HomePage",
  components: {NavBar, LastTodos}
}
</script>

<style scoped>

</style>