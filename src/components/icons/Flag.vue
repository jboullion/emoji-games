<script setup lang="ts">
// https://flagpedia.net/download/api
const flag = 'za';
const flagUrl = 'https://flagcdn.com/' + flag + '.svg';
const width = 30;
const name = 'South Africa';
</script>

<template>
  <img :src="flagUrl" :width="width" :alt="name" />
</template>

<style></style>
