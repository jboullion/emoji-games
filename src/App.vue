<script setup lang="ts">
import { ref } from 'vue';

import ModalSettings from './components/modals/Settings.vue';
import Footer from './components/pages/common/Footer.vue';
import Header from './components/pages/common/Header.vue';

// TODO: These values need to be tracked locally or in a DB so the user doesn't have to redo each visit
const darkMode = ref(false);
const audioEnabled = ref(false);
</script>

<template>
  <div id="app-wrapper" :class="{ 'bg-dark': darkMode }">
    <div class="container d-flex flex-fill flex-column justify-content-between">
      <Header />

      <router-view v-slot="{ Component }">
        <transition name="slide">
          <component :is="Component" />
        </transition>
      </router-view>

      <Footer />
    </div>

    <ModalSettings
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

@import './assets/css/variables.css';
@import './assets/css/utilities.css';
@import './assets/css/bs-overrides.css';
@import './assets/css/darkmode.css';
@import './assets/css/typography.css';
@import './assets/css/animations.css';

body,
#app,
#app-wrapper {
  min-height: 100vh;
  overflow-x: hidden;
}

#app-wrapper {
  display: flex;
  flex-direction: column;
}

#app-wrapper .page {
  flex: 1;
}

.menus-btn {
  background-color: transparent;
  border: none;
}

/* TODO: Do we want to animate our routes? */
</style>
