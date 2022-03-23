<script setup lang="ts">
// import { toRefs, reactive } from 'vue';
// import { toggleFullscreen } from '../../utilities/document';

const emit = defineEmits(['close', 'playAgain']);

const props = defineProps({
  tickets: {
    type: Number,
    required: true,
  },
});

// const reactiveProps = reactive(props);
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
          <h3 class="mb-5 text-center">You Collected {{ tickets }} 🎫!</h3>

          <button class="btn btn-primary mb-3" @click="emit('playAgain')">
            🔄 Play Again!
          </button>

          <button class="btn btn-primary" @click="emit('close')">
            🏠 More Games!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn {
  font-size: 30px;
  font-weight: normal;
}
</style>
