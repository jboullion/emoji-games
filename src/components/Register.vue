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
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from '../utilities/validation';
//import AuthError from '../../components/auth/AuthError.vue';

import { useRouter } from 'vue-router';
import CustomField from './common/CustomField.vue';
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

  fieldErrors.username = validateUsername(form.username);
  if (fieldErrors.username) {
    valid = false;
  }

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
      $router.push({ path: '/login?email=' + form.email });
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

      <CustomField
        class="mb-3"
        label="Username"
        id="username"
        type="text"
        v-model="form.username"
        :disabled="loading"
        required
        :error="fieldErrors.username"
      />

      <CustomField
        class="mb-3"
        label="Email"
        id="email"
        type="email"
        v-model="form.email"
        :disabled="loading"
        required
        :error="fieldErrors.email"
      />

      <CustomField
        class="mb-4"
        label="Password"
        id="password"
        type="password"
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
            {{ showPassword ? '🕶️' : '👓' }}
          </button>
        </template>
      </CustomField>

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
</style>
