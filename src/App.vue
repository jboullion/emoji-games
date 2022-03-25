<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted, ref } from 'vue';

import ModalSettings from './components/modals/Settings.vue';
import Footer from './components/common/Footer.vue';
import Header from './components/common/Header.vue';
import ModalSearch from './components/modals/Search.vue';
import { parseJwt, throttle } from './utilities/common';
import { useStore } from 'vuex';
import AuthService from './services/AuthService';
import { IAuthRefreshCredentials } from './types/Auth';

// TODO: These values need to be tracked locally or in a DB so the user doesn't have to redo each visit
const darkMode = ref(false);
const audioEnabled = ref(false);

function toggleDarkMode() {
  darkMode.value = !darkMode.value;

  if (darkMode.value) {
    document.body.classList.add('darkmode');
  } else {
    document.body.classList.remove('darkmode');
  }
}

/**
 * MANAGE SESSION
 *
 * TODO: Do we want to log the user out after X period of time?
 * TODO: Possibly just check on each app mount? So never kicks them out but might have to re login if browser closes
 */
// const $store = useStore();
// const sessionExpired = ref(false);

// const _authService: AuthService = inject('authService') as AuthService;

// // Only need to re auth once a minute, maybe less
// const tHandler = throttle(60 * 1000, reAuth);

// // returning from a tab we need to check if we are still authenticated
// const focusListener = (_e: Event) => {
//   if (document.visibilityState === 'visible' && !sessionExpired.value) {
//     checkAuth();
//   }
// };

// // Check if we are still authenticated. If not, signout
// function checkAuth() {
//   console.log('check auth');

//   const now = new Date();
//   const accessExpires = new Date($store.state.accessExpires);

//   console.log('now ', now);
//   console.log('accessExpires', accessExpires);

//   if (now.getTime() > accessExpires.getTime()) {
//     document.removeEventListener('click', tHandler);
//     document.removeEventListener('visibilitychange', focusListener);
//     // TODO: Do we want to show an alert to the user about this? Or just log them out?
//     sessionExpired.value = true;
//     _authService.signout();

//     // setInterval(() => {
//     //   _authService.signout();
//     // }, 10 * 1000);
//   }
// }

// // Refresh our accessToken. Run in our tHandler. tHandler will fire when a user takes action on the site
// function reAuth() {
//   console.log('reAuth');
//   const accessToken: string = localStorage.getItem('accessToken') as string;
//   const refreshToken: string = localStorage.getItem('refreshToken') as string;

//   const decodedToken = parseJwt(accessToken);

//   if (!decodedToken) return;

//   const credentials: IAuthRefreshCredentials = {
//     email: decodedToken?.email,
//     refreshToken: refreshToken,
//   };
//   _authService.refresh(credentials);
// }

// onMounted(() => {
//   document.addEventListener('click', tHandler);
//   document.addEventListener('visibilitychange', focusListener);
//   // Check we are still authenticated every 10 minutes
//   setInterval(checkAuth, 60 * 1000);
// });

// onBeforeUnmount(() => {
//   document.removeEventListener('click', tHandler);
//   document.removeEventListener('visibilitychange', focusListener);
// });
</script>

<template>
  <div id="app-wrapper">
    <div class="container d-flex flex-fill flex-column justify-content-between">
      <Header />

      <router-view></router-view>

      <!-- <router-view v-slot="{ Component }">
        <transition name="slide">
          <component :is="Component" />
        </transition>
      </router-view> -->

      <Footer />
    </div>

    <ModalSettings
      :darkMode="darkMode"
      :audioEnabled="audioEnabled"
      @toggleDark="toggleDarkMode"
      @toggleAudio="audioEnabled = !audioEnabled"
    />
    <ModalSearch />
  </div>
</template>

<style>
/* TODO: Should we be setting up modules or some other CSS bundle for import? */
/* TODO: Or perhaps we should at least move into SCSS?
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
