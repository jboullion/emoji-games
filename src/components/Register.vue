<script setup lang="ts">
// TODO: Setup loader
// TODO: Break down form into reusable components? At least errors
import AuthService from '../services/AuthService';
import { AxiosError } from 'axios';
import { inject, reactive, ref } from 'vue';
import { IAuthCredentials } from '../types/Auth';
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from '../utilities/validation';

import { useRouter } from 'vue-router';
import CustomField from './common/CustomField.vue';

import CommonTitle from './common/CommonTitle.vue';
import { IUser } from '../types/User';
import { getAxiosError } from '../utilities/axios';

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
    const axiosError = getAxiosError(error);
    if (axiosError) {
      errors.value.push(axiosError);
    }
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div id="register" class="page">
    <CommonTitle title="Register" />

    <form @submit.prevent="validateRegister" class="" novalidate>
      <template v-if="errors.length">
        <div v-for="error in errors" class="alert alert-danger mb-4">
          ⚠️ {{ error }}
        </div>
      </template>

      <CustomField
        wrapClass="mb-3"
        label="Username"
        id="username"
        type="text"
        v-model="form.username"
        :disabled="loading"
        required
        :error="fieldErrors.username"
        description="3-20 characters long"
      />

      <CustomField
        wrapClass="mb-3"
        label="Email"
        id="email"
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
        description="8-32 characters long"
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
          <span>📋</span> {{ loading ? 'Loading...' : 'Register' }}
        </button>

        <router-link
          to="/login"
          class="btn btn-outline-secondary w-100 mb-3 fs-5"
          ><span>🎲</span> Login</router-link
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
