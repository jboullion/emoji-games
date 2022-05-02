<script setup lang="ts">
import { PropType } from 'vue';
import { capitalizeFirstLetter } from '../../utilities/common';

defineProps({
  errors: {
    type: Array as PropType<String[]>,
    required: true,
  },
});
</script>
<template>
  <div v-for="error in errors" class="alert alert-danger mb-4">
    ⚠️ {{ capitalizeFirstLetter(error.toString()) }}
  </div>
</template>
