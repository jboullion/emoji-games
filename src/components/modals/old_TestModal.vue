<script setup lang="ts">
import { reactive, ref } from 'vue';
import BaseModal from './BaseModal.vue';

const emit = defineEmits(['close']);

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
});

const reactiveProps = reactive(props);

const email = ref('');
const password = ref('');
const showPassword = ref(false);

function submit() {
  console.log('submit!');
}
</script>

<template>
  <BaseModal v-model="reactiveProps.showModal" @close="emit('close')">
    <template #title><h3 class="fs-1">Login</h3></template>
    <template #default>
      <form @submit.prevent="submit" class="">
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
          <button class="btn btn-primary w-100">Register 📋</button>
        </div>
      </form>
    </template>
  </BaseModal>
</template>

<style></style>
