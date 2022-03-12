<template>
  <div>
    <NavBar></NavBar>
    <div class="flex items-center justify-center min-h-screen bg-slate-50">
      <div class="w-full flex items-center justify-evenly font-sans">
        <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg overflow-y-auto">
          <div class="my-4">
            <h1 class="text-3xl text-gray-900">Ma Todo</h1>
          </div>
          <ProgressBar></ProgressBar>
        </div>
        <div class="bg-white rounded shadow p-4 m-4 w-full lg:w-3/4 lg:max-w-lg overflow-y-auto">
          <TodoInput class="mb-4"></TodoInput>
          <TaskField
              class="flex mb-4 items-center flex justify-between bg-slate-50 p-2 shadow"
              v-for="(todo, index) in this.$store.getters.getDisplayedTodos"
              :key="index"
              :todo="todo">
          </TaskField>

          <PaginationBar></PaginationBar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import TodoInput from "@/components/TodoInput";
import ProgressBar from "@/components/ProgressBar";
import TaskField from "@/components/TaskField";
import PaginationBar from "@/components/PaginationBar";
import NavBar from "@/layouts/NavBar";
import axios from 'axios';

export default {
  name: 'TodosPage',
  components: {NavBar, PaginationBar, ProgressBar, TodoInput, TaskField},
  created(){

    const todosURI = 'http://localhost:3000/api/v1/todos/';

    axios.get(todosURI, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(({data:todos}) => {
              this.$store.dispatch('populateTodos', {
                todos
              });
          })
          .catch(error => console.log('Error when fetching todos: ', error));
  },
}
</script>