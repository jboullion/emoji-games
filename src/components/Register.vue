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
</script>

<template>
  <div id="register" class="page">
    <Title title="Register" />

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
        <button class="btn btn-primary w-100 mb-3">📋 Create Account</button>
        <router-link to="/login" class="btn btn-primary w-100"
          >🎲 Login</router-link
        >
      </div>
    </form>
  </div>
</template>

<style></style>

<!-- <template>
  <div
    class="min-h-full flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="@/assets/logo.svg" alt="Workflow" />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create your account!
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <AuthError
          v-if="errorHeading"
          class="mb-4"
          :heading="errorHeading"
          :errors="errors"
        />
        <AuthForm @submitSuccess="onSubmit" :loading="loading" loading />

        <AuthSocialLogin />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthService from '../../services/AuthService';
import { AxiosError } from 'axios';
import { inject, ref } from 'vue';
import { IAuthCredentials, IAuthForm, IUser } from '../../types/Auth';
import AuthError from '../../components/auth/AuthError.vue';

import { useRouter } from 'vue-router';
import AuthForm from '../../components/auth/AuthForm.vue';
import AuthSocialLogin from '../../components/auth/AuthSocialLogin.vue';

const $router = useRouter();

const _authService: AuthService = inject('authService') as AuthService;

const loading = ref(false);
const errorHeading = ref('');
const errors = ref<String[]>([]);

async function onSubmit(form: IAuthForm) {
  try {
    loading.value = true;

    const credentials: IAuthCredentials = {
      email: form.email,
      password: form.password,
    };

    const res: IUser = await _authService.signup(credentials);

    if (res.id) {
      // TODO: Should we automatically login a user when they register?
      $router.push({ path: '/login' });
    } else {
      //Bugsnag.notify(new Error('No access token returned'));
    }
  } catch (error: AxiosError | any) {
    errorHeading.value = 'Unable to register';
    if (error.response) {
      if (error.response.data?.statusCode === 400) {
        errors.value = error.response.data.message;
      } else if (error.response.data?.statusCode === 401) {
        errorHeading.value = error.response.data.message;
        errors.value = [];
      }
    } else {
      //Bugsnag.notify(new Error(error));
    }
  } finally {
    loading.value = false;
  }
}
</script> -->
