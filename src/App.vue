<script setup lang="ts">
import ModalSettings from './components/modals/Settings.vue';
import Footer from './components/common/Footer.vue';
import Header from './components/common/Header.vue';
import ModalSearch from './components/modals/Search.vue';
</script>

<template>
  <div id="app-wrapper">
    <div class="container d-flex flex-fill flex-column justify-content-between">
      <Header />

      <router-view></router-view>

      <!-- <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view> -->

      <Footer />
    </div>

    <ModalSettings />
    <ModalSearch />
  </div>
</template>

<style>
/* TODO: Should we be setting up modules or some other CSS bundle for import? */
/* TODO: Or perhaps we should at least move into SCSS?
/* @import './assets/css/bootswatch/sketchy/bootstrap.min.css'; */
@import './assets/css/bootswatch/lumen/bootstrap.css';

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

/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
} */

/* TODO: Do we want to animate our routes? */
/* @keyframes rotate {
  0% {
    opacity: 0;
    transform: scale(0) rotate(-180deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

.rotate-enter-active {
  animation: rotate 0.2s;
}

.rotate-leave-active {
  animation: rotate 0.2s reverse;
} */
</style>
