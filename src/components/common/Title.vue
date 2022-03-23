<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Emoji Games',
  },
});
</script>

<template>
  <div class="row mb-5">
    <div class="col-12 text-center">
      <h1>{{ title }}</h1>
      <p>Simple games for simple people</p>
    </div>
  </div>
</template>

<style scoped>
a {
  color: black;
  text-decoration: none;
}
</style>
