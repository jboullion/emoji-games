<script setup lang="ts">
import { PropType } from 'vue';
import { SearchFilter } from '../../../types/Search';

defineProps({
  filter: {
    type: Object as PropType<SearchFilter>,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <input type="checkbox" class="btn-check" :id="id" autocomplete="off" />
  <label class="btn btn-outline-primary" :for="id">{{ filter.name }}</label>
</template>

<style></style>
