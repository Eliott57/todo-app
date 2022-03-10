<template>
  <div>
    <p :class="task.style">{{ task.name }}</p>
    <div class="flex">
      <button class="flex p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-500 hover:bg-green-500" @click="done">{{ task.done ? 'Pas fait' : 'Fait'}}</button>
      <button class="flex p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500" @click="deleteTask">Supprimer</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskField",
  props: {
    task: Object,
    index: Number
  },
  methods:{
    done(){
      this.$emit('done', this.index);
    },
    deleteTask(){
      this.$emit('delete', this.index);
    }
  }
}
</script>

<style scoped>

</style>