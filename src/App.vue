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
 */
const $store = useStore();
const sessionExpired = ref(false);

const _authService: AuthService = inject('authService') as AuthService;

const tHandler = throttle(60 * 1000, reAuth);
const focusListener = (_e: Event) => {
  if (document.visibilityState === 'visible' && !sessionExpired.value) {
    checkAuth();
  }
};

function checkAuth() {
  const now = new Date();
  const accessExpires = new Date($store.state.accessExpires);

  if (now.getTime() > accessExpires.getTime()) {
    document.removeEventListener('click', tHandler);
    document.removeEventListener('visibilitychange', focusListener);
    sessionExpired.value = true;
    setInterval(() => {
      _authService.signout();
    }, 10 * 1000);
  }
}

function reAuth() {
  const accessToken: string = localStorage.getItem('accessToken') as string;
  const refreshToken: string = localStorage.getItem('refreshToken') as string;

  const decodedToken = parseJwt(accessToken);

  if (!decodedToken) return;

  const credentials: IAuthRefreshCredentials = {
    email: decodedToken?.email,
    refreshToken: refreshToken,
  };
  _authService.refresh(credentials);
}

onMounted(() => {
  document.addEventListener('click', tHandler);
  document.addEventListener('visibilitychange', focusListener);
  setInterval(checkAuth, 60 * 1000 * 10);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', tHandler);
  document.removeEventListener('visibilitychange', focusListener);
});
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
