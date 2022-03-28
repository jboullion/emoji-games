<script setup lang="ts">
// TODOS:

// ! Bugs:

// ? Improvements
// 1. Add Audio: Flip Card, Wrong Guess, Matched Set, Victory
// 2. Save tickets to database
// 3. Analytics: Track games played
// 4.

import { computed, PropType, reactive, ref } from 'vue';
import { MemoryGameType } from '../../../types/Memory';

import { shuffle } from '../../../utilities/common';
import MemoryFlipCard from './MemoryFlipCard.vue';

type Guess = {
  index: number;
  emoji: string;
};

const start = ref(false);
const wrong = ref(false);
const won = ref(false);
const found = ref(0);
const foundGuesses = ref<Guess[]>([]);
const currentGuesses = ref<Guess[]>([]);

let numGuesses: number = 0; // ? Currently not used

const emit = defineEmits(['win', 'playAgain']);

const props = defineProps({
  memoryGame: {
    type: Object as PropType<MemoryGameType>,
    required: true,
  },
});

const remaining = computed(() => props.memoryGame.emojis.length - found.value);

// Randomize our emoji array on create

// Build our set of emojis based on the number of emojis per set
let emojiDeck: string[] = [];
for (let i = 0; i < props.memoryGame.emojiPerSet; i++) {
  emojiDeck = emojiDeck.concat(props.memoryGame.emojis);
}

const emojiSets = shuffle(emojiDeck);

function guess(guessIndex: number) {
  // Guess Steps
  // 1. Click on guess reveal
  // 2. If first guess in set, continue
  // 3. If 2+ guess compare to previous guess
  // 4. if guesses match
  // 4a. If number of equal guesses === emojisPerSet set found
  // 4b. else continue;
  // 5. else no match
  // 5a. clear all guesses from current guess

  if (!start.value || wrong.value) return;

  // Don't guess the same card twice
  if (
    (currentGuesses.value.length &&
      currentGuesses.value.find((guess) => guess.index === guessIndex)) ||
    (foundGuesses.value.length &&
      foundGuesses.value.find((guess) => guess.index === guessIndex))
  )
    return;

  if (!currentGuesses.value.length) {
    // initial guess
    currentGuesses.value.push({
      index: guessIndex,
      emoji: emojiSets[guessIndex],
    });
  } else if (
    currentGuesses.value[currentGuesses.value.length - 1].index !==
      guessIndex &&
    currentGuesses.value[currentGuesses.value.length - 1].emoji ===
      emojiSets[guessIndex]
  ) {
    currentGuesses.value.push({
      index: guessIndex,
      emoji: emojiSets[guessIndex],
    });

    // Full Set Matched!
    if (currentGuesses.value.length % props.memoryGame.emojiPerSet === 0) {
      found.value++;
      numGuesses++;

      // Remove all our guesses from currentGuesses and move them into foundGuesses
      foundGuesses.value = foundGuesses.value.concat(
        currentGuesses.value.splice(0, props.memoryGame.emojiPerSet),
      );

      if (remaining.value <= 0) {
        won.value = true;
        emit('win');
      }
    }
  } else {
    currentGuesses.value.push({
      index: guessIndex,
      emoji: emojiSets[guessIndex],
    });
    wrong.value = true;
    numGuesses++;

    setTimeout(() => {
      wrong.value = false;
      currentGuesses.value = [];
    }, 1000);
  }
}

function showCard(cardIndex: number): boolean {
  return (
    !start.value ||
    currentGuesses.value.find((guess) => guess.index === cardIndex) !=
      undefined ||
    foundGuesses.value.find((guess) => guess.index === cardIndex) != undefined
  );
}

function showWrong(cardIndex: number): boolean {
  return (
    wrong.value &&
    currentGuesses.value[currentGuesses.value.length - 1].index === cardIndex
    //currentGuesses.value.find((guess) => guess.index === cardIndex)
  );
}
</script>

<template>
  <div class="my-5 text-center">
    <div id="card-list" class="col-12">
      <div class="row justify-content-center">
        <MemoryFlipCard
          class="mb-3"
          :class="{ flip: showCard(i), wrong: showWrong(i), won: won }"
          :showing="showCard(i)"
          @click="guess(i)"
          v-for="(emoji, i) in emojiSets"
          :emoji="emoji"
          :key="i"
        />
      </div>
    </div>

    <div class="col-12 mt-4" v-if="!start">
      <button
        type="button"
        class="btn btn-primary w-100 action-btn"
        @click="start = true"
      >
        <span>▶️</span> Start
      </button>
    </div>
    <div class="col-12 mt-4" v-else-if="won">
      <button
        type="button"
        class="btn btn-primary w-100 action-btn"
        @click="emit('playAgain')"
      >
        <span>🔄</span> Play Again!
      </button>
    </div>
    <div class="row mt-4" v-else>
      <div class="col-6 mb-3">
        <div class="card">
          <div class="card-body text-center">
            <h2 class="flex-fill text-center">
              {{ remaining }}
            </h2>
            <h3 class="card-title mb-0">Remaining</h3>
          </div>
        </div>
      </div>
      <div class="col-6 mb-3">
        <div class="card">
          <div class="card-body text-center">
            <h2 class="flex-fill text-center">
              {{ found }}
            </h2>
            <h3 class="card-title mb-0">Found</h3>
          </div>
        </div>
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
