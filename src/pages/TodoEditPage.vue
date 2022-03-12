<template>
  <div>
    <NavBar></NavBar>
    <div class="flex items-center justify-center min-h-screen bg-slate-50">
      <div class="w-full flex items-center justify-evenly font-sans">
        <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg overflow-y-auto">
          <div class="my-4">
            <h1 class="text-3xl text-gray-900">Modification</h1>
          </div>
        </div>
        <div class="bg-white rounded shadow p-4 m-4 w-full lg:w-3/4 lg:max-w-lg overflow-y-auto flex">
          <input class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-700"
                 @keyup.enter="editTask" v-model="todo" :placeholder="task.name">
          <button class="flex p-2 border-2 rounded text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500" @click="editTask">Modifier</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import NavBar from "@/layouts/NavBar";

export default {
  name: "TodoEditPage",
  components: {NavBar},
  data(){
    return {
      todo: ''
    }
  },
  methods:{
    editTask(){
      this.$store.commit('editTask', {index: this.$route.params.id, name: this.todo});
      this.$router.push({path: '/todos'});
    }
  },
  computed:{
    task(){
        return this.$store.state.tasks[this.$store.state.currentPage-1][this.$route.params.id];
    }
  }
}
</script>

<style scoped>

</style>