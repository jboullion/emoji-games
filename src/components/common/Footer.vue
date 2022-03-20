<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <div id="footer" class="text-center py-5">
    <h6>
      &copy; {{ year }} James Boullion -
      <router-link to="/contact">Contact</router-link> -
      <router-link to="/privacy">Privacy</router-link>
    </h6>
  </div>
</template>

<style></style>
