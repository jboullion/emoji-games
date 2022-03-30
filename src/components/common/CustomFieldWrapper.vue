<script setup lang="ts">
import { computed } from 'vue';

import { fieldProps } from '../../types/Forms';

const props = defineProps(fieldProps);

// TODO: How to prevent using these on the field AND wrapper?
const describedBy = computed(() => props.id + '-help');
const describedByError = computed(() => props.id + '-error');
</script>

<template>
  <div :class="wrapClass">
    <label class="col-form-label" :for="id" v-if="label"
      ><span v-if="required"> ❗</span> {{ label }}</label
    >
    <div class="input-group" v-bind="$attrs">
      <slot></slot>
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
