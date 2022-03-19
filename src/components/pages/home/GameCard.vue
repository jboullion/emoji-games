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
/* #emoji-list .emoji {
  font-size: 64px;
  margin: 10px;
  padding: 0 10px;
  flex: 1;
  cursor: grab;
  position: relative;
  user-select: none;
  border: 2px solid var(--dark);
  border-radius: 15px;
  box-shadow: 0 2px 0 2px rgba(0, 0, 0, 0.5);
}

#emoji-list .emoji:active {
  cursor: grabbing;
  top: 1px;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.5);
} */

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
