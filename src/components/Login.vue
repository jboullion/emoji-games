<script setup lang="ts">
import Title from './common/Title.vue';

import { ref } from 'vue';
import BaseModal from '../modals/BaseModal.vue';

const email = ref('');
const password = ref('');
const showPassword = ref(false);

function login() {
  console.log('login!');
}

// import AuthService from '../../services/AuthService';
// import { AxiosError } from 'axios';
// import { inject, ref } from 'vue';
// import { IAuthCredentials, IAuthForm, ISignInResponse } from '../../types/Auth';
// import AuthError from '../../components/auth/AuthError.vue';

// import { useRouter } from 'vue-router';
// import AuthForm from '../../components/auth/AuthForm.vue';
// import AuthSocialLogin from '../../components/auth/AuthSocialLogin.vue';

// const $router = useRouter();

// const _authService: AuthService = inject('authService') as AuthService;

// const loading = ref(false);
// const errorHeading = ref('');
// const errors = ref<String[]>([]);

// async function onSubmit(form: IAuthForm) {
//   try {
//     loading.value = true;

//     const credentials: IAuthCredentials = {
//       email: form.email,
//       password: form.password,
//     };

//     const res: ISignInResponse = await _authService.signin(credentials);

//     if (res.accessToken) {
//       $router.push({ path: '/dashboard' });
//     } else {
//       //Bugsnag.notify(new Error('No access token returned'));
//     }
//   } catch (error: AxiosError | any) {
//     errorHeading.value = 'Unable to login';
//     if (error.response) {
//       if (error.response.data?.statusCode === 400) {
//         errors.value = error.response.data.message;
//       } else if (error.response.data?.statusCode === 401) {
//         errorHeading.value = error.response.data.message;
//         errors.value = [];
//       }
//     } else {
//       //Bugsnag.notify(new Error(error));
//     }
//   } finally {
//     loading.value = false;
//   }
// }
</script>

<template>
  <div id="login" class="page">
    <Title title="Login" />

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
        <button class="btn btn-primary w-100 mb-3">🎲 Login</button>
        <button class="btn btn-primary w-100">📋 Register</button>
        <!-- <router-link to="/register" class="btn btn-primary w-100"
          >📋 Create Account</router-link
        > -->
      </div>
    </form>
  </div>
</template>

<style></style>
