<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Emoji Games',
  },
  subtitle: {
    type: String,
    default: 'Simple games for simple people',
  },
});
</script>

<template>
  <div class="row mb-5">
    <div class="col-12 text-center">
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
    </div>
  </div>
</template>

<style scoped>
a {
  color: black;
  text-decoration: none;
}
</style>
