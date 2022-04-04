<template>
  <div>
    <h2 class="text-xl font-extrabold mb-4 text-center">Mes dernières Todos</h2>
      <div v-for="(todo, index) of getLastTodos" :key="index">
        <div :class="[index % 2 === 0 ? '-rotate-1' : 'rotate-1', 'bg-white', 'm-6', 'p-6', 'shadow', 'w-1/2', 'mx-auto']">
          {{ todo.description }}
        </div>
      </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  name: "LastTodos",
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
  computed:{
    ...mapGetters([
      'getLastTodos',
    ])
  }
}
</script>

<style scoped>

</style>