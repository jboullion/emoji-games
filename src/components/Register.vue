<script setup lang="ts">
// TODO: Setup loader
// TODO: Break down form into reusable components? At least errors
import AuthService from '../services/AuthService';
import { AxiosError } from 'axios';
import { inject, reactive, ref } from 'vue';
import {
  IAuthCredentials,
  IAuthForm,
  ISignInResponse,
  IUser,
} from '../types/Auth';
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
// TODO: Update form to use errors for each field.
const errors = ref<String[]>([]);
const form = reactive({
  username: '',
  email: '',
  password: '',
});

const fieldErrors = reactive({
  username: '',
  email: '',
  password: '',
});

function validateRegister() {
  let valid = true;
  errors.value = [];
  fieldErrors.username = '';
  fieldErrors.email = '';
  fieldErrors.password = '';

  if (!form.username) {
    fieldErrors.username = 'Username is Required';
    valid = false;
  } else if (form.username.length < 3) {
    fieldErrors.username = 'Username must be at least 3 characters long';
    valid = false;
  } else if (form.username.length > 20) {
    fieldErrors.username = 'Username must less than 20 characters long';
    valid = false;
  }

  if (!form.email) {
    fieldErrors.email = 'Email is Required';
    valid = false;
  } else if (!EMAIL_REGEX.test(form.email)) {
    fieldErrors.email = 'Email must be a valid email address';
    valid = false;
  }

  if (!form.password) {
    fieldErrors.password = 'Password is Required';
    valid = false;
  } else if (form.password.length < 8) {
    fieldErrors.password = 'Password must be at least 8 characters long';
    valid = false;
  } else if (form.password.length > 32) {
    fieldErrors.password = 'Password must be less than 32 characters long';
    valid = false;
  }

  // ? NOTE: Currently more specific validation is handled by the server, at the client level we are just confirming we have something to submit

  if (!valid) return;

  signup();
}

async function signup() {
  try {
    loading.value = true;

    const credentials: IAuthCredentials = {
      username: form.username,
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
    // TODO: Do we want to parse out field errors?
    if (error.response) {
      if (error.response.data?.statusCode === 400) {
        errors.value = error.response.data.message;
      } else if (error.response.data?.statusCode === 401) {
        errors.value.push(error.response.data.message);
      } else if (error.response.data?.statusCode === 409) {
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
  <div id="register" class="page">
    <Title title="Register" />

    <form @submit.prevent="validateRegister" class="" novalidate>
      <template v-if="errors.length">
        <div v-for="error in errors" class="alert alert-danger mb-4">
          ⚠️ {{ error }}
        </div>
      </template>
      <div class="mb-3">
        <label class="col-form-label" for="username">Username</label>
        <div class="input-group has-validation">
          <input
            id="username"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': fieldErrors.username }"
            v-model="form.username"
            maxlength="20"
            :disabled="loading"
          />
          <div class="invalid-feedback" v-if="fieldErrors.username">
            {{ fieldErrors.username }}
          </div>
        </div>
      </div>
      <div class="mb-3">
        <label class="col-form-label" for="email">Email</label>
        <div class="input-group has-validation">
          <input
            id="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': fieldErrors.email }"
            v-model="form.email"
            maxlength="100"
            :disabled="loading"
          />
          <div class="invalid-feedback" v-if="fieldErrors.email">
            {{ fieldErrors.email }}
          </div>
        </div>
      </div>
      <div class="mb-5">
        <label class="col-form-label" for="password">Password</label>
        <div class="input-group has-validation">
          <input
            id="password"
            :type="showPassword ? 'text' : 'password'"
            class="form-control"
            :class="{ 'is-invalid': fieldErrors.password }"
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
          <div class="invalid-feedback" v-if="fieldErrors.password">
            {{ fieldErrors.password }}
          </div>
        </div>
      </div>
      <div class="form-btns">
        <button
          type="submit"
          class="btn btn-primary w-100 mb-3 fs-5"
          :disabled="loading"
        >
          📋 {{ loading ? 'Loading' : 'Register' }}
        </button>

        <router-link
          to="/login"
          class="btn btn-outline-secondary w-100 mb-3 fs-5"
          >🎲 Login</router-link
        >
      </div>
    </form>
  </div>
</template>

<style scoped>
form {
  max-width: 500px;
  margin: 0 auto;
}

.form-control.is-invalid,
.was-validated .form-control:invalid {
  background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚠️</text></svg>');
  background-size: 20px 16px;
}
</style>
