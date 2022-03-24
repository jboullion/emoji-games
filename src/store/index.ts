import { createStore } from 'vuex';
import { parseJwt } from '../utilities/common';

export default createStore({
  state: {
    accessToken: localStorage.getItem('accessToken') as string,
    refreshToken: localStorage.getItem('refreshToken') as string,
    accessExpires: localStorage.getItem('accessExpires') as string,
  },
  getters: {
    isAuthenticated(state) {
      const now = new Date();
      const accessExpires = new Date(state.accessExpires);

      return now.getTime() < accessExpires.getTime() && !!state.accessToken;
    },
    jwt(state) {
      return state.accessToken;
    },
    userInfo(state) {
      return parseJwt(state.accessToken);
    },
  },
  actions: {},
  mutations: {
    setAccessToken(state, payload) {
      state.accessToken = payload;
    },
    setRefreshToken(state, payload) {
      state.refreshToken = payload;
    },
    setAccessExpires(state, payload) {
      state.accessExpires = payload;
    },
  },
});
