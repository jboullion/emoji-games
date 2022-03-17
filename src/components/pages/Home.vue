<script setup lang="ts">
import { Games } from '../../types/Games';

import GameCard from './home/GameCard.vue';
import Title from './common/Title.vue';

function playGame(game: String) {
  console.log(game);
}
</script>

<template>
  <div id="home" class="">
    <Title />
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
