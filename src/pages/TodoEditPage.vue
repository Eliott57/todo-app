<template>
  <div>
    <NavBar></NavBar>
    <div class="flex items-center justify-center min-h-screen bg-teal-50">
      <div class="w-full flex items-center justify-evenly font-sans">
        <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg overflow-y-auto">
          <div class="my-4">
            <h1 class="text-3xl text-gray-900">Modification</h1>
          </div>
        </div>
        <div class="bg-white rounded shadow p-4 m-4 w-full lg:w-3/4 lg:max-w-lg overflow-y-auto flex">
          <input class="shadow-sm appearance-none border-2 focus:outline-teal-800 rounded-lg text-sm w-full py-2 px-3 mr-4 text-teal-800"
                 @keyup.enter="editTodo" v-model="description" :placeholder="getTodo(this.$route.params.id).description">
          <button class="text-teal-800 border-2 border-teal-800 bg-white hover:bg-teal-800 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center w-64"
                  @click="editTodo">
            Modifier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import NavBar from "@/layouts/NavBar";
import axios from "axios";
import {mapGetters} from "vuex";

export default {
  name: "TodoEditPage",
  components: {NavBar},
  data(){
    return {
      description: ''
    }
  },
  methods:{
    editTodo(){
      const todosURI =`http://localhost:3000/api/v1/todos/${this.$route.params.id}`;

      const modifiedTodo = {
        _id: this.$route.params.id,
        description: this.description,
        done: false
      };

      axios.patch(todosURI, {
        modifiedTodo
      })
          .then(() => {
            this.$router.push('/todos');
          })
          .catch(error => console.log('Error when editing todo: ', error));
    },
  },
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
      'getTodo'
    ])
  }
}
</script>

<style scoped>

</style>