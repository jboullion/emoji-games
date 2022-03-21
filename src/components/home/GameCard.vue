<script setup lang="ts">
import { PropType } from 'vue';

import { Game } from '../../types/Games';

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
  flex: 1;
  cursor: grab;
  position: relative;
  user-select: none;
  border: 2px solid var(--dark);
  border-radius: 15px;
  border-width: 2px 3px 5px 3px;
  text-decoration: none;
  color: black;
}

.card:active {
  cursor: grabbing;
  margin-top: 1px;
  border-width: 2px 3px 4px 3px;
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
