import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import axios from 'axios';
import AuthService from './services/AuthService';
import UserService from './services/UserService';
//import vfmPlugin from 'vue-final-modal';

// import EmojiService from './services/EmojiService';

// import Bugsnag from '@bugsnag/js';
// import BugsnagPluginVue from '@bugsnag/plugin-vue';

// import { registerSW } from 'virtual:pwa-register';

// const swIntervalMS = 60 * 60 * 1000;

const $axios = axios.create({
  baseURL: import.meta.env.PROD
    ? 'https://emoji.herokuapp.com'
    : 'http://localhost:3001',
  headers: {
    'Content-type': 'application/json',
  },
});

const authService = new AuthService($axios);
const userService = new UserService($axios);
// const emojiService = new EmojiService($axios);

// Bugsnag.start({
//   apiKey: import.meta.env.VITE_BUGSNAG_APIKEY as string,
//   plugins: [new BugsnagPluginVue()],
// });

//const bugsnagVue = Bugsnag.getPlugin('vue');

const app = createApp(App);

// @ts-ignore
app.use(router).use(store).mount('#app'); // .use(bugsnagVue)
// .use(vfmPlugin)

app.provide('axios', $axios);
app.provide('authService', authService);
app.provide('userService', userService);
//app.provide('emojiService', emojiService);

// const updateSW = registerSW({
//   onRegistered(r) {
//     r &&
//       setInterval(() => {
//         r.update();
//       }, swIntervalMS);
//   },
//   onNeedRefresh() {},
//   onOfflineReady() {},
//   //onRegisterError(error) {}
// });
