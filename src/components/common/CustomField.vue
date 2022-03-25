<script setup lang="ts">
import { computed, ref } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  label: {
    type: String,
  },
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
  error: {
    type: String,
  },
});

const value = ref(props.modelValue);

const describedBy = computed(() => props.id + '-help');
const describedByError = computed(() => props.id + '-error');
// TODO: This wasn't working, try to fix
//
</script>

<template>
  <div>
    <label class="col-form-label" :for="id"
      ><span v-if="required"> ❗</span> {{ label }}</label
    >
    <div class="input-group" :class="{ 'has-validation': $slots.button }">
      <input
        :id="id"
        :type="type"
        class="form-control"
        :class="{ 'is-invalid': error }"
        v-model="value"
        maxlength="32"
        :disabled="disabled"
        :required="required"
        @input="emit('update:modelValue', value)"
        :aria-describedby="
          (description ? describedBy : '') +
          ' ' +
          (error ? describedByError : '')
        "
      />
      <slot name="button"></slot>
      <div class="invalid-feedback" :id="describedByError" v-if="error">
        {{ error }}
      </div>
    </div>
    <div v-if="description" :id="describedBy" class="form-text">
      {{ description }}
    </div>
  </div>
</template>

<style></style>
