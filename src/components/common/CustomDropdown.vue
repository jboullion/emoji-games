<script setup lang="ts">
import { computed, ref } from 'vue';

import { fieldProps } from '../../types/Forms';
import CustomFieldWrapper from './CustomFieldWrapper.vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  ...fieldProps,
  modelValue: {
    type: String,
  },
});

const value = ref(props.modelValue);

const describedBy = computed(() => props.id + '-help');
const describedByError = computed(() => props.id + '-error');
// autocomplete="off"
</script>

<template>
  <CustomFieldWrapper
    v-bind="props"
    :class="{ 'has-validation': $slots.button }"
  >
    <select
      v-bind="$attrs"
      class="form-select"
      aria-label="Select Category"
      placeholder="Category"
      v-model="value"
      @change="emit('update:modelValue', value)"
      :aria-describedby="
        (description ? describedBy : '') + ' ' + (error ? describedByError : '')
      "
    >
      <slot name="options"></slot>
    </select>
  </CustomFieldWrapper>
</template>

<style></style>
