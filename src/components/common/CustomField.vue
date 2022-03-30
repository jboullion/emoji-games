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
    <input
      v-bind="$attrs"
      class="form-control"
      :class="{ 'is-invalid': error }"
      v-model="value"
      maxlength="32"
      @input="emit('update:modelValue', value)"
      :aria-describedby="
        (description ? describedBy : '') + ' ' + (error ? describedByError : '')
      "
    />
    <slot name="button"></slot>
  </CustomFieldWrapper>
</template>

<style></style>
