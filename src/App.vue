<script setup lang="ts">
import { ref } from 'vue';

import ModalMenu from './components/modals/Menu.vue';
import Footer from './components/Footer.vue';
import ModalSettings from './components/modals/Settings.vue';
import Header from './components/Header.vue';

const darkMode = ref(false);
const audioEnabled = ref(false);
</script>

<template>
  <div id="app-wrapper" :class="{ 'bg-dark': darkMode }">
    <div class="container">
      <Header />

      <router-view></router-view>

      <Footer />
    </div>

    <ModalMenu
      :darkMode="darkMode"
      :audioEnabled="audioEnabled"
      @toggleDark="darkMode = !darkMode"
      @toggleAudio="audioEnabled = !audioEnabled"
    />
  </div>
</template>

<style>
/* TODO: Should we be setting up modules or some other CSS bundle for import? */
/* @import './assets/css/bootswatch/sketchy/bootstrap.min.css'; */
@import './assets/css/bootswatch/lumen/bootstrap.min.css';

@import './assets/css/utilities.css';
@import './assets/css/bs-overrides.css';
@import './assets/css/darkmode.css';
@import './assets/css/typography.css';

.menus-btn {
  background-color: transparent;
  border: none;
  margin-left: 10px;
  font-size: 34px;
}
</style>
