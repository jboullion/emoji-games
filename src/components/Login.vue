<script setup lang="ts">
// TODO: Setup loader
// TODO: Break down form into reusable components? At least errors
import AuthService from '../services/AuthService';
import { AxiosError } from 'axios';
import { inject, reactive, ref } from 'vue';
import { IAuthCredentials, IAuthForm, ISignInResponse } from '../types/Auth';
import { EMAIL_REGEX } from '../utilities/validation';
//import AuthError from '../../components/auth/AuthError.vue';

import { useRouter } from 'vue-router';
// import AuthForm from '../../components/auth/AuthForm.vue';
// import AuthSocialLogin from '../../components/auth/AuthSocialLogin.vue';

import Title from './common/Title.vue';

const showPassword = ref(false);

const $router = useRouter();

const _authService: AuthService = inject('authService') as AuthService;

const loading = ref(false);
const errors = ref<String[]>([]);
const form = reactive({
  email: '',
  password: '',
});

function onSubmit() {
  let valid = true;
  errors.value = [];

  if (!form.email) {
    errors.value.push('Email is Required');
    valid = false;
  } else if (!EMAIL_REGEX.test(form.email)) {
    errors.value.push('Email must be a valid email address');
    valid = false;
  }

  if (!form.password) {
    errors.value.push('Password is Required');
    valid = false;
  } else if (form.password.length < 8) {
    errors.value.push('Password must be at least 8 characters long');
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
      console.log('res', res);
      $router.push({ path: '/' });
    } else {
      //Bugsnag.notify(new Error('No access token returned'));
    }
  } catch (error: AxiosError | any) {
    if (error.response) {
      if (error.response.data?.statusCode === 400) {
        errors.value = error.response.data.message;
      } else if (error.response.data?.statusCode === 401) {
        // invalid credentials
        errors.value.push(error.response.data.message);
      }
    } else {
      //Bugsnag.notify(new Error(error));
    }
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div id="login" class="page">
    <Title title="Login" />

    <form @submit.prevent="onSubmit" class="" novalidate>
      <template v-if="errors.length">
        <div v-for="error in errors" class="alert alert-danger mb-4">
          ⚠️ {{ error }}
        </div>
      </template>
      <div class="mb-3">
        <label class="col-form-label" for="email">Email</label>
        <div class="input-group">
          <input
            id="email"
            type="email"
            class="form-control"
            v-model="form.email"
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
            v-model="form.password"
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
        <button class="btn btn-primary w-100 mb-3" :disabled="loading">
          🎲 {{ loading ? 'Loading' : 'Login' }}
        </button>
        <button class="btn btn-primary w-100" :disabled="loading">
          📋 Register
        </button>
        <!-- <router-link to="/register" class="btn btn-primary w-100"
          >📋 Create Account</router-link
        > -->
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
