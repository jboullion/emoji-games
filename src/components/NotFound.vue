<script setup lang="ts">
import { Games } from '../types/Games';
import GameCard from './home/GameCard.vue';
import CommonTitle from './common/CommonTitle.vue';
</script>

<template>
  <div id="error" class="page">
    <CommonTitle title="Not Found" />
    <div class="row justify-content-center">
      <div
        class="col-xl-3 col-lg-4 col-md-6 mb-4"
        v-for="game in Games"
        :key="game.name"
      >
        <GameCard :game="game" />
      </div>
    </div>
  </div>
</template>

<style></style>
