<script setup lang="ts">
// TODO: Add Accessibility? Keyboard controls for flipping cards?
import { computed, inject, onMounted, reactive, ref } from 'vue';
import MemorySetup from './games/memory/MemorySetup.vue';
import MemoryGame from './games/memory/MemoryGame.vue';
import { MemoryGameType } from '../types/Memory';
import ModalWinner from './modals/Winner.vue';
import { useRouter } from 'vue-router';
import UserService from '../services/UserService';

const _userService: UserService = inject('userService') as UserService;

const $router = useRouter();

const setup = ref(true);
const playerWins = ref(false);
let winnerModal: { show: () => void; hide: () => void } | null = null;

const memoryGame = reactive<MemoryGameType>({
  sets: 10,
  maxSets: 50,
  emojiPerSet: 2,
  maxEmojiPerSet: 10,
  emojis: [],
});

const tickets = computed(() => memoryGame.sets * memoryGame.emojiPerSet);

function start(emojis: string[]) {
  setup.value = false;
  memoryGame.emojis = emojis;
}

// TODO: Do we want to generate / randomize emojis whenever these values are updated or wait for player to hit randomize?
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

function winGame() {
  playerWins.value = true;

  if (winnerModal) {
    // @ts-ignore
    winnerModal.show();
  }

  _userService.updateTickets(tickets.value);
}

function playAgain() {
  playerWins.value = false;
  setup.value = true;

  if (winnerModal) {
    // @ts-ignore
    winnerModal.hide();
  }
}

function moreGames() {
  if (winnerModal) {
    // @ts-ignore
    winnerModal.hide();
    $router.push('/');
  }
}

onMounted(() => {
  // @ts-ignore
  winnerModal = new bootstrap.Modal(document.getElementById('winner-modal'));
});
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

    <MemoryGame
      v-else
      :memoryGame="memoryGame"
      @win="winGame"
      @playAgain="playAgain"
    />

    <ModalWinner
      :tickets="memoryGame.sets * memoryGame.emojiPerSet"
      @moreGames="moreGames"
      @playAgain="playAgain"
    />
  </div>
</template>

<style scoped></style>
