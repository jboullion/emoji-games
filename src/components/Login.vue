<script setup lang="ts">
// TODO: Setup loader?
import AuthService from '../services/AuthService';
import { AxiosError } from 'axios';
import { inject, reactive, ref } from 'vue';
import { IAuthCredentials, ISignInResponse } from '../types/Auth';
import { validateEmail, validatePassword } from '../utilities/validation';

import { useRouter } from 'vue-router';
import CustomField from './common/CustomField.vue';

import CommonTitle from './common/CommonTitle.vue';
import { getQueryVar, capitalizeFirstLetter } from '../utilities/common';
import { getAxiosError } from '../utilities/axios';
import ErrorAlert from './common/ErrorAlert.vue';

const showPassword = ref(false);

const $router = useRouter();

const _authService: AuthService = inject('authService') as AuthService;

const loading = ref(false);
const errors = ref<String[]>([]);
const form = reactive({
  email: getQueryVar('email'),
  password: '',
});
const fieldErrors = reactive({
  email: '',
  password: '',
});

function validateLogin() {
  let valid = true;
  errors.value = [];
  fieldErrors.email = '';
  fieldErrors.password = '';

  fieldErrors.email = validateEmail(form.email);
  if (fieldErrors.email) {
    valid = false;
  }

  fieldErrors.password = validatePassword(form.password);
  if (fieldErrors.password) {
    valid = false;
  }

  // ? NOTE: Currently more specific validation is handled by the server, at the client level we are just confirming we have something to submit

  if (!valid) return;

  signin();
}

async function signin() {
  try {
    loading.value = true;

    const credentials: IAuthCredentials = {
      email: form.email,
      password: form.password,
    };

    const res: ISignInResponse = await _authService.signin(credentials);

    if (res.accessToken) {
      //$router.push({ path: '/' }); // '/profile'
    } else {
      //Bugsnag.notify(new Error('No access token returned'));
    }
  } catch (error: AxiosError | any) {
    const axiosError = getAxiosError(error);
    if (axiosError) {
      errors.value.push(axiosError);
    }

    //Bugsnag.notify(new Error(error));
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div id="login" class="page">
    <CommonTitle title="Login" />

    <form
      @submit.prevent="validateLogin"
      class=""
      novalidate
      autocomplete="off"
    >
      <ErrorAlert v-if="errors.length" :errors="errors" />

      <CustomField
        wrapClass="mb-3"
        label="Email"
        id="emoji-email"
        type="email"
        v-model="form.email"
        :disabled="loading"
        required
        :error="fieldErrors.email"
      />

      <CustomField
        wrapClass="mb-4"
        label="Password"
        id="password"
        :type="showPassword ? 'text' : 'password'"
        v-model="form.password"
        :disabled="loading"
        required
        :error="fieldErrors.password"
      >
        <template #button>
          <button
            type="button"
            class="btn btn-primary"
            @click="showPassword = !showPassword"
            aria-label="Toggle Show Old Password"
          >
            <span>{{ showPassword ? '🕶️' : '👓' }}</span>
          </button>
        </template>
      </CustomField>

      <div class="form-btns">
        <button
          type="submit"
          class="btn btn-primary w-100 mb-3 fs-5"
          :disabled="loading"
        >
          <span>🎲</span> {{ loading ? 'Loading...' : 'Login' }}
        </button>

        <router-link
          to="/register"
          class="btn btn-outline-secondary w-100 mb-3 fs-5"
          ><span>📋</span> Create Account</router-link
        >
        <router-link
          to="/forgot-password"
          class="w-100 mb-3 text-center d-block text-dark text-decoration-none"
          :disabled="loading"
        >
          ❔ Forgot Password
        </router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>
form {
  max-width: 500px;
  margin: 0 auto;
}
</style>
