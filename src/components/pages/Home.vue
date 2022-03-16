<script setup lang="ts">
import { Games } from '../../types/Games';

import GameCard from './home/GameCard.vue';

function playGame(game: String) {
  console.log(game);
}
</script>

<template>
  <div id="home" class="">
    <div class="row my-5">
      <div class="col-12 text-center">
        <h1>Emoji Games</h1>
        <p>Simple games for simple people</p>
      </div>
    </div>
    <div class="row justify-content-center">
      <div
        class="col-xl-3 col-lg-4 col-md-6 mb-4"
        v-for="game in Games"
        :key="game.name"
      >
        <GameCard
          :emoji="game.emoji"
          :title="game.name"
          :description="game.description"
          @play="playGame(game.name)"
        />
      </div>
    </div>
  </div>
</template>

<style></style>
