<script setup lang="ts">
import store from '../../store';

const emit = defineEmits(['moreGames', 'playAgain']);

defineProps({
  tickets: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div id="winner-modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header justify-content-center">
          <h5>Winner!</h5>
        </div>
        <div class="modal-body d-flex flex-column justify-content-between">
          <h3 class="mb-4 text-center">🎉 Good Job! 🎉</h3>

          <h3 v-if="store.getters.isAuthenticated" class="mb-5 text-center">
            You Collected {{ tickets }} 🎫!
          </h3>

          <button class="btn btn-primary fs-4 mb-3" @click="emit('playAgain')">
            <span>🔄</span> Play Again!
          </button>

          <button class="btn btn-primary fs-4" @click="emit('moreGames')">
            <span>🏠</span> More Games!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
