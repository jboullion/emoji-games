<script setup lang="ts">
// TODO: Need to create images for these games instead of simple emoji's eventually...right?

import { ref, onMounted, PropType } from 'vue';

import { Game } from '../../../types/Games';

defineProps({
  game: {
    type: Object as PropType<Game>,
    required: true,
  },
});
</script>

<template>
  <router-link :to="game.link" class="card text-center h-100">
    <span class="game-image">{{ game.emoji }}</span>
    <div class="card-body">
      <h4 class="card-title">{{ game.name }}</h4>
      <p class="card-text flex-fill">
        {{ game.description }}
      </p>
    </div>
  </router-link>
</template>

<style scoped>
.card {
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  color: black;
  transition: box-shadow 0.15s linear;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
}

.card:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.35);
}

.card-body {
  display: flex;
  flex-direction: column;
}

.game-image {
  font-size: 80px;
  padding-top: 10px;
  transition: transform 2s ease-in-out;
}

.card:hover .game-image {
  animation-name: bob;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}
</style>
