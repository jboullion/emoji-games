<script setup lang="ts">
// TODO: Do we want to store all of the user info in the store? If so should we be saving tickets and such in the localstorage / access token?
import Title from './common/Title.vue';
import { inject, onMounted, reactive, ref } from 'vue';
import AuthService from '../services/AuthService';
import store from '../store';
import CustomField from './common/CustomField.vue';
import ChangeAvatar from './modals/ChangeAvatar.vue';
import UserService from '../services/UserService';
import { IUserUpdate, IUser } from '../types/User';
import { AxiosError } from 'axios';
import {
  validateUsername,
  validateEmail,
  validatePassword,
} from '../utilities/validation';

const _authService: AuthService = inject('authService') as AuthService;
const _userService: UserService = inject('userService') as UserService;

let avatarModal: { show: () => void; hide: () => void } | null = null;

const user = ref();

const showPasswordOld = ref(false);
const showPasswordNew = ref(false);
const success = ref('');

const loading = ref(false);
const errors = ref<String[]>([]);
const form = reactive({
  email: store.getters.userInfo.email,
  username: store.getters.userInfo.username,
  password: '',
  passwordNew: '',
});

const fieldErrors = reactive({
  username: '',
  email: '',
  password: '',
  passwordNew: '',
});

async function updateAvatar(emoji: string) {
  // TODO: Return a more structured result?
  const newEmoji = await _userService.updateAvatar(emoji);

  if (newEmoji) {
    await _authService.refresh();
    if (avatarModal) {
      // @ts-ignore
      avatarModal.hide();
    }
  }
}

async function updateUser() {
  let valid = true;
  success.value = '';
  errors.value = [];
  fieldErrors.username = '';
  fieldErrors.email = '';
  fieldErrors.password = '';

  if (form.username) {
    fieldErrors.username = validateUsername(form.username);
    if (fieldErrors.username) {
      valid = false;
    }
  }

  if (form.email) {
    fieldErrors.email = validateEmail(form.email);
    if (fieldErrors.email) {
      valid = false;
    }
  }

  fieldErrors.password = validatePassword(form.password);
  if (fieldErrors.password) {
    valid = false;
  }

  if (form.passwordNew) {
    fieldErrors.passwordNew = validatePassword(form.passwordNew);
    if (fieldErrors.passwordNew) {
      valid = false;
    }
  }

  // ? NOTE: Currently more specific validation is handled by the server, at the client level we are just confirming we have something to submit

  if (!valid) return;

  try {
    loading.value = true;

    const userUpdate: IUserUpdate = {
      username: form.username,
      email: form.email,
      password: form.password,
      passwordNew: form.passwordNew ? form.passwordNew : null,
    };

    const res: IUser = await _userService.updateUser(userUpdate);

    if (res.id) {
      // success
      success.value = '✔️ Information Updated!';
    } else {
      //Bugsnag.notify(new Error('No access token returned'));
    }
  } catch (error: AxiosError | any) {
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

function logout() {
  _authService.signout();
}

async function setupUser() {
  user.value = await _userService.getUser();
}

onMounted(() => {
  // @ts-ignore
  avatarModal = new bootstrap.Modal(document.getElementById('avatar-modal'));

  setupUser();
});
</script>

<template>
  <div id="profile" class="page" v-if="store.getters.userInfo">
    <Title
      title="Profile"
      :subtitle="`Welcome ${store.getters.userInfo.username}!`"
    />

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
      <div id="change-avatar" class="col-md-6 mb-5 text-center">
        <button
          type="button"
          class="btn btn-outline-secondary fs-3 w-100 mb-3"
          data-bs-toggle="modal"
          data-bs-target="#avatar-modal"
        >
          <span
            :class="{
              'avatar-wide': store.getters.userInfo.avatar.length > 3,
            }"
          >
            {{
              store.getters.userInfo.avatar
                ? store.getters.userInfo.avatar
                : '😶'
            }}
          </span>
          <br />
          Change Avatar
        </button>
        <router-link
          to="/shop"
          class="btn btn-outline-secondary fs-3 w-100 mb-3"
          ><span>🎫</span> Tickets: {{ user ? user.tickets : '' }}</router-link
        >
        <router-link to="/shop" class="btn btn-outline-secondary fs-3 w-100"
          ><span>🎟️</span> Premium Tickets:
          {{ user ? user.premium_tickets : '' }}</router-link
        >
      </div>
      <div class="col-md-6 mb-5">
        <div class="alert alert-light" v-if="success">{{ success }}</div>
        <form @submit.prevent="updateUser" class="" novalidate>
          <template v-if="errors.length">
            <div v-for="error in errors" class="alert alert-danger mb-4">
              ⚠️ {{ error }}
            </div>
          </template>

          <CustomField
            class="mb-4"
            label="Username"
            id="username"
            type="text"
            v-model="form.username"
            :error="fieldErrors.username"
            :disabled="loading"
          />

          <CustomField
            class="mb-4"
            label="Email"
            id="email"
            type="email"
            v-model="form.email"
            :error="fieldErrors.email"
            :disabled="loading"
          />

          <CustomField
            class="mb-4"
            label="New Password"
            id="password-new"
            :type="showPasswordNew ? 'text' : 'password'"
            v-model="form.passwordNew"
            :error="fieldErrors.passwordNew"
            :disabled="loading"
            description="Leave blank to only update email"
          >
            <template #button>
              <button
                type="button"
                class="btn btn-primary"
                @click="showPasswordNew = !showPasswordNew"
                aria-label="Toggle Show New Password"
              >
                <span>{{ showPasswordNew ? '🕶️' : '👓' }}</span>
              </button>
            </template>
          </CustomField>

          <CustomField
            class="mb-4"
            label="Current Password"
            id="password-old"
            :type="showPasswordOld ? 'text' : 'password'"
            v-model="form.password"
            :error="fieldErrors.password"
            :disabled="loading"
            required
          >
            <template #button>
              <button
                type="button"
                class="btn btn-primary"
                @click="showPasswordOld = !showPasswordOld"
                aria-label="Toggle Show Old Password"
              >
                <span>{{ showPasswordOld ? '🕶️' : '👓' }}</span>
              </button>
            </template>
          </CustomField>

          <div class="form-btns">
            <button
              type="submit"
              class="btn btn-primary w-100 mb-3 fs-5"
              :disabled="loading"
            >
              <span>📲</span> {{ loading ? 'Loading' : 'Update' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <ChangeAvatar @updateAvatar="updateAvatar" />
  </div>
</template>

<style>
#change-avatar button span {
  font-size: 200px;
}

#change-avatar button span.avatar-wide {
  font-size: 110px;
}

@media (max-width: 768px) {
  #change-avatar button span {
    font-size: 150px;
  }

  #change-avatar button span.avatar-wide {
    font-size: 100px;
  }
}
</style>
