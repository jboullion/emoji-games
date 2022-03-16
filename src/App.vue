<script setup lang="ts">
import { ref } from 'vue';

import Menu from './components/Menu.vue';
import Footer from './components/Footer.vue';

const darkMode = ref(false);
</script>

<template>
  <div id="app-wrapper" :class="{ 'bg-dark': darkMode }">
    <div class="container">
      <div class="d-flex justify-content-between py-2">
        <button class="menus-btn dark-mode" @click="darkMode = !darkMode">
          <span v-show="darkMode">☀️</span>
          <span v-show="!darkMode">🌑</span>
        </button>

        <button
          id="menu-toggle"
          class="menus-btn"
          data-bs-toggle="modal"
          data-bs-target="#menuModal"
        >
          ➕
        </button>
      </div>

      <router-view></router-view>

      <Footer />
    </div>

    <Menu />
  </div>
</template>

<style>
/* @import './assets/css/bootswatch/sketchy/bootstrap.min.css'; */
@import './assets/css/bootswatch/lumen/bootstrap.min.css';

@import './assets/css/utilities.css';
@import './assets/css/bs-overrides.css';
@import './assets/css/darkmode.css';

#app-wrapper {
}

.menus-btn {
  background-color: transparent;
  border: none;
  margin-left: 10px;
}

#menu-toggle {
  font-size: 34px;
}

.dark-mode {
  font-size: 34px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
