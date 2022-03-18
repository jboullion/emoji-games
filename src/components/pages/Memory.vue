<script setup lang="ts">
// TODO: Make the setup page a prettier version?
import { reactive, ref } from 'vue';
import { MemoryGame, MemoryEmojis } from '../../types/Memory';
import { Emoji } from '../../types/Emoji';
import { getRandomInt } from '../../utilities/common';

const maxSets = 100;
const maxEmojiPerSet = 10;
const randomEmojis = ref<Emoji[]>([]);

const memoryGame = reactive<MemoryGame>({
  sets: 10,
  emojiPerSet: 2,
  emojis: [],
  foundSets: [],
});

// Build the sets of emojis the user will be memorizing
function generateRandomEmojis() {
  randomEmojis.value = [];
  const randomIndexes = [];
  while (randomIndexes.length < memoryGame.sets) {
    var r = Math.floor(Math.random() * MemoryEmojis.length) + 1;
    if (randomIndexes.indexOf(r) === -1) randomIndexes.push(r);
  }

  randomIndexes.forEach((index) => {
    randomEmojis.value.push(MemoryEmojis[index]);
  });
}
</script>

<template>
  <div id="search" class="page">
    <div class="row">
      <div class="col-12 text-center">
        <h1>🧠 Memory</h1>
      </div>
    </div>

    <div class="row my-5">
      <!-- TODO: Should the numbers here be directly editable? -->
      <!-- TODO: @mousedown event on + and - with a throttle of 5/sec? Or setup interval on click, clear interval on release? -->
      <div class="col-sm-6 mb-3">
        <div class="card">
          <div class="card-body text-center">
            <h3 class="card-title mb-0"># Sets</h3>
            <div class="d-flex justify-content-between align-items-center">
              <button
                type="button"
                class="btn btn-outline-secondary decrement"
                @click="memoryGame.sets > 2 ? memoryGame.sets-- : false"
              >
                ➖
              </button>
              <h2 class="flex-fill text-center">{{ memoryGame.sets }}</h2>

              <button
                type="button"
                class="btn btn-outline-secondary increment"
                @click="memoryGame.sets < maxSets ? memoryGame.sets++ : false"
              >
                ➕
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 mb-3">
        <div class="card">
          <div class="card-body text-center">
            <h3 class="card-title mb-0"># Emojis per Set</h3>
            <div class="d-flex justify-content-between align-items-center">
              <button
                type="button"
                class="btn btn-outline-secondary decrement"
                @click="
                  memoryGame.emojiPerSet > 2 ? memoryGame.emojiPerSet-- : false
                "
              >
                ➖
              </button>
              <h2 class="flex-fill text-center">
                {{ memoryGame.emojiPerSet }}
              </h2>
              <button
                type="button"
                class="btn btn-outline-secondary increment"
                @click="
                  memoryGame.emojiPerSet < maxEmojiPerSet
                    ? memoryGame.emojiPerSet++
                    : false
                "
              >
                ➕
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 d-grid">
        <button
          type="button"
          class="btn btn-outline-secondary"
          style="font-size: 50px"
          @click="generateRandomEmojis"
        >
          ✔️
        </button>
      </div>
    </div>

    <div id="emoji-list" class="text-center">
      <div
        class="emoji"
        :title="emoji.short_name"
        v-for="(emoji, i) in randomEmojis"
        :key="i"
      >
        {{ emoji.icon }}
        <span class="visually-hidden">{{ emoji.short_name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-body h2 {
  font-size: 64px;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.5);
}

.decrement {
  position: relative;
  z-index: 10;
  margin-left: 10px;
}
</style>
