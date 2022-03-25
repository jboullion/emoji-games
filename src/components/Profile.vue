<script setup lang="ts">
import Title from './common/Title.vue';
import { inject, reactive, ref } from 'vue';
import AuthService from '../services/AuthService';
import store from '../store';

const _authService: AuthService = inject('authService') as AuthService;

const showPassword = ref(false);
const loading = ref(false);
const errors = ref<String[]>([]);
const form = reactive({
  email: store.getters.userInfo.email,
  password: '',
});

function logout() {
  _authService.signout();
}
</script>

<template>
  <div id="profile" class="page">
    <Title title="Profile" />

    <div class="text-center mb-5">
      <button
        type="button"
        class="btn btn-outline-secondary fs-3"
        @click="logout"
      >
        <span>🛑</span> logout
      </button>
    </div>

    <div class="row">
      <div id="change-avatar" class="col-sm-6 mb-5 text-center">
        <button type="button" class="btn btn-outline-secondary fs-3">
          <span>
            {{
              store.getters.userInfo.avatar
                ? store.getters.userInfo.avatar
                : '😶'
            }} </span
          ><br />

          <!-- <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            class="w-100"
          >
            <text y="72px" font-size="72">
              {{
                store.getters.userInfo.avatar
                  ? store.getters.userInfo.avatar
                  : '😶'
              }}
            </text>
          </svg> -->

          Change Avatar
        </button>
      </div>
      <div class="col-sm-6 mb-5">
        <form @submit.prevent="" class="" novalidate>
          <template v-if="errors.length">
            <div v-for="error in errors" class="alert alert-danger mb-4">
              ⚠️ {{ error }}
            </div>
          </template>
          <div class="mb-2">
            <label class="col-form-label" for="email">Email</label>
            <div class="input-group">
              <input
                id="email"
                type="email"
                class="form-control"
                v-model="form.email"
                maxlength="100"
                :disabled="loading"
              />
            </div>
          </div>
          <div class="mb-2">
            <label class="col-form-label" for="password-old"
              >Old Password</label
            >
            <div class="input-group">
              <input
                id="password-old"
                type="text"
                class="form-control"
                v-model="form.password"
                maxlength="32"
                :disabled="loading"
              />
            </div>
          </div>
          <div class="mb-4">
            <label class="col-form-label" for="password-new"
              >New Password</label
            >
            <div class="input-group">
              <input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                v-model="form.password"
                maxlength="32"
                :disabled="loading"
              />
              <button
                type="button"
                class="btn btn-primary"
                @click="showPassword = !showPassword"
                aria-label="Toggle Show Password"
              >
                {{ showPassword ? '🕶️' : '👓' }}
              </button>
            </div>
            <div id="emailHelp" class="form-text">
              Leave blank to only update email
            </div>
          </div>
          <div class="form-btns">
            <button
              type="submit"
              class="btn btn-primary w-100 mb-3 fs-5"
              :disabled="loading"
            >
              📲 {{ loading ? 'Loading' : 'Update' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
#change-avatar button span {
  font-size: 200px;
}

@media (max-width: 768px) {
  #change-avatar button span {
    font-size: 150px;
  }
}
</style>
