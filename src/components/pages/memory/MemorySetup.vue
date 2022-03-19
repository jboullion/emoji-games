<script setup lang="ts">
import { PropType, reactive, ref } from 'vue';
import { MemoryGameType, MemoryEmojis } from '../../../types/Memory';

const randomEmojis = ref<string[]>([]);

const props = defineProps({
  memoryGame: {
    type: Object as PropType<MemoryGameType>,
    required: true,
  },
});

const reactiveProps = reactive(props);

const emit = defineEmits(['start', 'updateSets', 'updateEmojiPerSet']);

// Build the sets of emojis the user will be memorizing
function generateRandomEmojis() {
  randomEmojis.value = [];
  const randomIndexes = [];
  while (randomIndexes.length < props.memoryGame.sets) {
    var r = Math.floor(Math.random() * MemoryEmojis.length) + 1;
    if (randomIndexes.indexOf(r) === -1) randomIndexes.push(r);
  }

  randomIndexes.forEach((index) => {
    randomEmojis.value.push(MemoryEmojis[index]);
  });
}
</script>

<template>
  <div class="row my-4">
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
              :disabled="reactiveProps.memoryGame.sets === 2"
              @click="emit('updateSets', reactiveProps.memoryGame.sets - 1)"
            >
              ➖
            </button>
            <h2 class="flex-fill text-center">
              {{ reactiveProps.memoryGame.sets }}
            </h2>

            <button
              type="button"
              class="btn btn-outline-secondary increment"
              :disabled="
                reactiveProps.memoryGame.sets ===
                reactiveProps.memoryGame.maxSets
              "
              @click="emit('updateSets', reactiveProps.memoryGame.sets + 1)"
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
              :disabled="reactiveProps.memoryGame.emojiPerSet === 2"
              @click="
                emit(
                  'updateEmojiPerSet',
                  reactiveProps.memoryGame.emojiPerSet - 1,
                )
              "
            >
              ➖
            </button>
            <h2 class="flex-fill text-center">
              {{ reactiveProps.memoryGame.emojiPerSet }}
            </h2>
            <button
              type="button"
              class="btn btn-outline-secondary increment"
              :disabled="
                reactiveProps.memoryGame.emojiPerSet ===
                reactiveProps.memoryGame.maxEmojiPerSet
              "
              @click="
                emit(
                  'updateEmojiPerSet',
                  reactiveProps.memoryGame.emojiPerSet + 1,
                )
              "
            >
              ➕
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 mb-3">
      <button
        type="button"
        class="btn btn-outline-secondary w-100"
        style="font-size: 50px"
        @click="generateRandomEmojis"
      >
        ♻️
      </button>
    </div>

    <div id="emoji-list" class="col-12 text-center d-flex flex-wrap mb-3">
      <div class="emoji" v-for="(emoji, i) in randomEmojis" :key="i">
        {{ emoji }}
      </div>
    </div>

    <div class="col-12 mb-3" v-if="randomEmojis && randomEmojis.length">
      <button
        type="button"
        class="btn btn-outline-secondary w-100"
        style="font-size: 50px"
        @click="emit('start', randomEmojis)"
      >
        ✔️
      </button>
    </div>
  </div>
</template>

<style scoped>
.card-body h2 {
  font-size: 64px;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.5);
  user-select: none;
}

.btn.disabled,
.btn:disabled {
  opacity: 0.3;
  /* background-color: #222; */
}

#emoji-list .emoji {
  font-size: 64px;
  margin: 10px;
  padding: 0 10px;
  flex: 1;
  position: relative;
  user-select: none;
  border: 4px solid var(--dark);
  border-radius: 15px;
}

#app-wrapper.bg-dark .emoji {
  background-color: var(--light-gray);
}

@media (max-width: 576px) {
  .card-body {
    padding: 10px;
  }
}
</style>
