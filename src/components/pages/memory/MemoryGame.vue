<script setup lang="ts">
import { computed, PropType, reactive, ref } from 'vue';

import { shuffle } from '../../../utilities/common';
import FlipCard from './FlipCard.vue';

type Guess = {
  index: number;
  emoji: string;
};

const start = ref(false);
const found = ref(0);
const guesses = ref<Guess[]>([]);
const showingCard = ref(false);
const emojisPerSet = 2; // TODO: This should be a prop. It is coming from setup.

let lastGuess: number = 0;
let numGuesses: number = 0; // ? Currently not used

const props = defineProps({
  emojis: {
    type: Array as PropType<string[]>,
    required: true,
  },
});

const remaining = computed(() => props.emojis.length - found.value);
const complete = computed(() => remaining.value <= 0);

// Randomize our emoji array on create
const emojiSets = shuffle(props.emojis.concat(props.emojis));

function guess(guessIndex: number) {
  if (showingCard.value) return;
  // guessed the same card

  // TODO: Need to check N times based on the number of emojis in a set. Pass from setup

  if (!guesses.value[lastGuess]) {
    guesses.value.push({ index: guessIndex, emoji: emojiSets[guessIndex] });
  } else if (
    guesses.value[lastGuess].index !== guessIndex &&
    guesses.value[lastGuess].emoji === emojiSets[guessIndex]
  ) {
    // Mathing Set!

    guesses.value.push({ index: guessIndex, emoji: emojiSets[guessIndex] });
    lastGuess = guesses.value.length;
    found.value++;
    numGuesses++;
  } else {
    guesses.value.push({ index: guessIndex, emoji: emojiSets[guessIndex] });
    showingCard.value = true;
    numGuesses++;
    setTimeout(() => {
      showingCard.value = false;
      guesses.value.splice(-emojisPerSet, emojisPerSet);
    }, 1000);
  }
}

function showCard(cardIndex: number) {
  return (
    !start.value || guesses.value.find((guess) => guess.index === cardIndex)
  );
}
</script>

<template>
  <div class="my-4 text-center">
    <div class="row">
      <div class="col-sm-6 mb-3">
        <div class="card">
          <div class="card-body text-center">
            <h3 class="card-title mb-0">Remaining</h3>
            <h2 class="flex-fill text-center">
              {{ remaining }}
            </h2>
          </div>
        </div>
      </div>
      <div class="col-sm-6 mb-3">
        <div class="card">
          <div class="card-body text-center">
            <h3 class="card-title mb-0">Found</h3>
            <h2 class="flex-fill text-center">
              {{ found }}
            </h2>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12" v-if="complete">
      <div class="alert alert-success">✨🎆 🎫 🎊🎉</div>
    </div>

    <div class="col-12 mb-3" v-if="!start">
      <button
        type="button"
        class="btn btn-outline-secondary w-100"
        style="font-size: 50px"
        @click="start = true"
      >
        Start
      </button>
    </div>

    <div id="card-list" class="col-12">
      <div class="row justify-content-center">
        <FlipCard
          class="mb-3"
          :class="{ flip: showCard(i) }"
          @click="guess(i)"
          v-for="(emoji, i) in emojiSets"
          :emoji="emoji"
          :key="i"
        />
      </div>
    </div>
  </div>
</template>

<style>
.card h2 {
  font-size: 64px;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.5);
}
</style>
