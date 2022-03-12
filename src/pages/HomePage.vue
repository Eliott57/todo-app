<template>

  <div>
      <NavBar></NavBar>
      <div class="min-h-screen bg-slate-200 text-slate-600 flex justify-center items-center">
        <h1 class="text-7xl font-thin">ToutDoux</h1>
      </div>
  </div>
</template>

<script>
import NavBar from "@/layouts/NavBar";
export default {
  name: "HomePage",
  components: {NavBar}
}
</script>

<style scoped>

</style>