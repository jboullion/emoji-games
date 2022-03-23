<script setup lang="ts">
import { ref } from 'vue';
import BaseModal from '../modals/BaseModal.vue';

const email = ref('');
const password = ref('');
const showPassword = ref(false);

function login() {
  console.log('login!');
}
</script>

<template>
  <BaseModal>
    <template #header><h3 class="mb-0">Login</h3></template>
    <template #default>
      <form @submit.prevent="login" class="">
        <div class="mb-3">
          <label class="col-form-label" for="email">Email</label>
          <div class="input-group">
            <input
              id="email"
              type="email"
              class="form-control"
              v-model="email"
              maxlength="100"
            />
          </div>
        </div>
        <div class="mb-5">
          <label class="col-form-label" for="password">Password</label>
          <div class="input-group">
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              class="form-control"
              v-model="password"
              maxlength="32"
            />
            <button
              type="button"
              class="btn btn-primary"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? '🕶️' : '👓' }}
            </button>
          </div>
        </div>
        <div class="">
          <button class="btn btn-primary w-100">Register 📋</button>
        </div>
      </form>
    </template>
    <template #footer></template>
  </BaseModal>
</template>

<style></style>
