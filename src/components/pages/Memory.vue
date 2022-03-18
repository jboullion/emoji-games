<script setup lang="ts">
// TODO: Make the setup page a prettier version?
import { reactive, ref } from 'vue';
import { Emojis } from '../../types/Search';
import { Emoji } from '../../utilities/search-emojis';

const maxSets = 100;
const maxEmojiPerSet = 10;

type MemoryGame = {
  sets: number;
  emojiPerSet: number;
  emojis: Emoji[];
  foundSets: Emoji[];
};

const memoryGame = reactive<MemoryGame>({
  sets: 10,
  emojiPerSet: 2,
  emojis: [],
  foundSets: [],
});

// Emojis.forEach((emoji) => {
//   const parentID = filters.findIndex(
//     (filter) => filter.name === emoji.parent_cat,
//   );

//   if (parentID === -1) {
//     filters.push({
//       name: emoji.parent_cat,
//       children: [emoji.child_cat],
//     });
//   } else {
//     if (!filters[parentID].children.includes(emoji.child_cat)) {
//       filters[parentID].children.push(emoji.child_cat);
//     }
//   }
// });
</script>

<template>
  <div id="search" class="page">
    <div class="row">
      <div class="col-12 text-center">
        <h1>Emoji Memory</h1>
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
              <h2 class="flex-fill text-center">{{ memoryGame.sets }}</h2>
              <div class="btn-group-vertical my-3">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="memoryGame.sets < maxSets ? memoryGame.sets++ : false"
                >
                  +
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="memoryGame.sets > 1 ? memoryGame.sets-- : false"
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 mb-3">
        <div class="card">
          <div class="card-body text-center">
            <h3 class="card-title mb-0"># Emojis per Set</h3>
            <div class="d-flex justify-content-between align-items-center">
              <h2 class="flex-fill text-center">
                {{ memoryGame.emojiPerSet }}
              </h2>
              <div class="btn-group-vertical my-3">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="
                    memoryGame.emojiPerSet < maxEmojiPerSet
                      ? memoryGame.emojiPerSet++
                      : false
                  "
                >
                  +
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="
                    memoryGame.emojiPerSet > 2
                      ? memoryGame.emojiPerSet--
                      : false
                  "
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-body h2 {
  font-size: 64px;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.5);
}
</style>
