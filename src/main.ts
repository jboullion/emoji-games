import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import axios from 'axios';

import AuthService from './services/AuthService';
import UserService from './services/UserService';
import { io, Socket } from 'socket.io-client';

// import VueSocketIO from 'vue-3-socket.io';

// import socketio from 'socket.io';
// import VueSocketIO from 'vue-socket.io';

// export const SocketInstance = socketio('http://localhost:3001');

//import vfmPlugin from 'vue-final-modal';

// import EmojiService from './services/EmojiService';

// import Bugsnag from '@bugsnag/js';
// import BugsnagPluginVue from '@bugsnag/plugin-vue';

// import { registerSW } from 'virtual:pwa-register';

// const swIntervalMS = 60 * 60 * 1000;

const baseURL = import.meta.env.PROD
  ? 'https://emoji-games.herokuapp.com'
  : 'http://localhost:3001';

const $axios = axios.create({
  //baseURL: 'https://emoji-games.herokuapp.com',
  baseURL: baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});

const authService = new AuthService($axios);
const userService = new UserService($axios);
const socket = io(baseURL);

// Bugsnag.start({
//   apiKey: import.meta.env.VITE_BUGSNAG_APIKEY as string,
//   plugins: [new BugsnagPluginVue()],
// });

//const bugsnagVue = Bugsnag.getPlugin('vue');

const app = createApp(App);

// @ts-ignore
app
  .use(router)
  .use(store)
  // .use(
  //   new VueSocketIO({
  //     debug: true,
  //     connection: 'http://localhost:3001',
  //     vuex: {
  //       store,
  //       actionPrefix: 'SOCKET_',
  //       mutationPrefix: 'SOCKET_',
  //     },
  //     //options: { path: '/my-app/' }, //Optional options
  //   }),
  // )
  .mount('#app'); // .use(bugsnagVue) //.use(SocketInstance)
// .use(vfmPlugin)

app.provide('axios', $axios);
app.provide('authService', authService);
app.provide('userService', userService);
app.provide('socket', socket);
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
