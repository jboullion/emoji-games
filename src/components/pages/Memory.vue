<script setup lang="ts">
import { reactive, ref } from 'vue';
import MemorySetup from './memory/MemorySetup.vue';
import MemoryGame from './memory/MemoryGame.vue';
import { MemoryGameType } from '../../types/Memory';

const setup = ref(true);

const memoryGame = reactive<MemoryGameType>({
  sets: 10,
  maxSets: 100,
  emojiPerSet: 2,
  maxEmojiPerSet: 10,
  emojis: [],
});

function start(emojis: string[]) {
  setup.value = false;
  memoryGame.emojis = emojis;
}

function updateSets(newSet: number) {
  if (newSet > 1 && newSet <= memoryGame.maxSets) {
    memoryGame.sets = newSet;
  }
}

function updateEmojiPerSet(newSetCount: number) {
  if (newSetCount > 1 && newSetCount <= memoryGame.maxEmojiPerSet) {
    memoryGame.emojiPerSet = newSetCount;
  }
}
</script>

<template>
  <div id="search" class="page">
    <div class="row">
      <div class="col-12 text-center">
        <h1>🧠 Memory</h1>
      </div>
    </div>

    <MemorySetup
      v-if="setup"
      :memoryGame="memoryGame"
      @updateSets="updateSets"
      @updateEmojiPerSet="updateEmojiPerSet"
      @start="start"
    />
    <MemoryGame v-else :memoryGame="memoryGame" />
  </div>
</template>

<style scoped></style>
