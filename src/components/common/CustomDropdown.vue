<script setup lang="ts">
import { computed, PropType, ref } from 'vue';
import { EmojiFilter } from '../../types/Emoji';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  label: {
    type: String,
  },
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Object as PropType<EmojiFilter>,
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
</script>

<template>
  <div>
    <label class="col-form-label" :for="id"
      ><span v-if="required"> ❗</span> {{ label }}</label
    >
    <select
      class="form-select"
      aria-label="Select Category"
      placeholder="Category"
      v-model="value"
      @change="emit('update:modelValue', value)"
    >
      <slot name="options"></slot>
    </select>

    <!-- <div class="invalid-feedback" :id="describedByError" v-if="error">
      {{ error }}
    </div> -->

    <div v-if="description" :id="describedBy" class="form-text">
      {{ description }}
    </div>
  </div>
</template>

<style></style>
