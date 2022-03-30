<script setup lang="ts">
import CustomField from '../../common/CustomField.vue';
</script>

<template>
  <div class="row">
    <div class="col-md-8">
      <CustomField
        wrapClass="mb-3"
        label="Email"
        id="emoji-email"
        type="email"
        v-model="form.email"
        :disabled="loading"
        required
        :error="fieldErrors.email"
      />
    </div>
    <div class="col-md-4">
      <CustomField
        wrapClass="mb-3"
        label="Email"
        id="emoji-email"
        type="email"
        v-model="form.email"
        :disabled="loading"
        required
        :error="fieldErrors.email"
      />
    </div>
  </div>
</template>

<style></style>
