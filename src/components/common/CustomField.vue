<script setup lang="ts">
// TODO: Errors. Currently all errors are at the form level. Move into the field level?
// TODO: Try to use browser level validation?
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
});

const value = ref(props.modelValue);

const describedBy = computed(() => props.id + '-help');
// TODO: This wasn't working, try to fix
// :aria-describedby="description ? describedBy : ''"
</script>

<template>
  <div>
    <label class="col-form-label" :for="id"
      ><span v-if="required"> ❗</span> {{ label }}</label
    >
    <div class="input-group">
      <input
        :id="id"
        :type="type"
        class="form-control"
        v-model="value"
        maxlength="32"
        :disabled="disabled"
        :required="required"
        @input="emit('update:modelValue', value)"
      />
      <slot name="button"></slot>
    </div>
    <div v-if="description" :id="describedBy" class="form-text">
      {{ description }}
    </div>
  </div>
</template>

<style></style>
