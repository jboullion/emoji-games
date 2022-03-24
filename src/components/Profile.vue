<script setup lang="ts">
import Title from './common/Title.vue';
import { inject } from 'vue';
import AuthService from '../services/AuthService';

const _authService: AuthService = inject('authService') as AuthService;

function logout() {
  _authService.signout();
}
</script>

<template>
  <div id="profile" class="page">
    <Title title="Profile" />

    <button @click="logout">🛑 logout</button>
  </div>
</template>

<style></style>
