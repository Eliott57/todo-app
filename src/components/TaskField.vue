<template>
  <div>
    <p>{{ todo.description }}</p>
    <div class="flex">
      <button class="flex p-1 ml-4 mr-2 rounded hover:text-white text-white bg-green-500 hover:bg-green-700" @click="toggleTodoState(todo._id)">{{ todo.done ? 'Pas fait' : 'Fait'}}</button>
      <router-link :to="{name: 'todo', params: {id: todo._id}}" class="p-1 ml-2 rounded text-white bg-blue-500 hover:text-white hover:bg-blue-700">Modifier</router-link>
      <button class="p-1 ml-2 rounded text-white bg-red-500 hover:text-white hover:bg-red-700" @click="deleteTodo(todo._id)">
        <span>Supprimer</span>
      </button>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "TaskField",
  props: {
    todo: Object,
  },
  data(){
    return {

    }
  },
  methods:{
    deleteTodo(id){
      const todosURI =`http://localhost:3000/api/v1/todos/${id}`;

      axios.delete(todosURI)
          .then(() => {
            this.$store.dispatch('deleteTodo', {
              id
            });
          })
          .catch(error => console.log('Error when deleting todo: ', error));
    },
    toggleTodoState(id){
      const todosURI =`http://localhost:3000/api/v1/todos/${id}`;
      const modifiedTodo = {
        _id: this.$props.todo._id,
        description: this.$props.todo.description,
        done: !this.$props.todo.done
      };

      axios.patch(todosURI, {
              modifiedTodo
          })
          .then(({data:todo}) => {
            this.$store.dispatch('editTodo', {
                todo
            });
          })
          .catch(error => console.log('Error when toggle todo state: ', error));
    }
  }
}
</script>

<style scoped>

</style>