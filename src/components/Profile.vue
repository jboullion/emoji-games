<script setup lang="ts">
import Title from './common/Title.vue';
import { inject, reactive, ref } from 'vue';
import AuthService from '../services/AuthService';
import store from '../store';
import CustomField from './common/CustomField.vue';

const _authService: AuthService = inject('authService') as AuthService;

const showPasswordOld = ref(false);
const showPasswordNew = ref(false);

const loading = ref(false);
const errors = ref<String[]>([]);
const form = reactive({
  email: store.getters.userInfo.email,
  passwordOld: '',
  passwordNew: '',
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
          Change Avatar
        </button>
      </div>
      <div class="col-sm-6 mb-5">
        <form @submit.prevent="" class="">
          <template v-if="errors.length">
            <div v-for="error in errors" class="alert alert-danger mb-4">
              ⚠️ {{ error }}
            </div>
          </template>

          <CustomField
            class="mb-4"
            label="Email"
            id="email"
            type="email"
            v-model="form.email"
            :disabled="loading"
            required
          />

          <CustomField
            class="mb-4"
            label="Old Password"
            id="password-old"
            type="password"
            v-model="form.passwordOld"
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
                {{ showPasswordOld ? '🕶️' : '👓' }}
              </button>
            </template>
          </CustomField>

          <CustomField
            class="mb-4"
            label="New Password"
            id="password-new"
            type="password"
            v-model="form.passwordNew"
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
                {{ showPasswordNew ? '🕶️' : '👓' }}
              </button>
            </template>
          </CustomField>

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
