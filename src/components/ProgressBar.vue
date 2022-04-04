<template>
  <div class="mb-5">
    <div class="mb-2 text-teal-800">
      {{ this.$store.getters.getProgress }}% réalisé
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div class="bg-teal-800 h-2.5 rounded-full" :style="{width: this.$store.getters.getProgress + '%'}"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
}
</script>

<style scoped>

</style>