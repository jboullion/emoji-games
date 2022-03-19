<script setup lang="ts">
import { reactive, ref } from 'vue';
import Setup from './memory/Setup.vue';
import MemoryGame from './memory/MemoryGame.vue';
import { MemoryGameType } from '../../types/Memory';

const emojiList = ref<string[]>([]);
const setup = ref(true);

const memoryGame = reactive<MemoryGameType>({
  sets: 10,
  emojiPerSet: 2,
  emojis: [],
  foundIndexes: [],
});

function start(emojis: string[]) {
  setup.value = false;
  emojiList.value = emojis;
}
</script>

<template>
  <div id="search" class="page">
    <div class="row">
      <div class="col-12 text-center">
        <h1>🧠 Memory</h1>
      </div>
    </div>

    <Setup v-if="setup" :memoryGame="memoryGame" @start="start" />
    <MemoryGame v-else :emojis="emojiList" />
  </div>
</template>

<style scoped></style>
