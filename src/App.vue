<script setup lang="ts">
import Menu from './components/Menu.vue'
</script>

<template>
  <Menu />
  <div class="page-wrapper">
    <router-view></router-view>
  </div>
</template>

<style>
  /* @import './assets/css/bootswatch/sketchy/bootstrap.min.css'; */
  @import './assets/css/bootswatch/lumen/bootstrap.min.css';

  #app {
    height: 100vh;
    display: flex;
  }

  .page-wrapper {
    padding: 30px;
  }
</style>