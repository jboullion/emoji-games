<script setup lang="ts">
// TODO: Need to create images for these games instead of simple emoji's eventually...right?

import { ref, onMounted } from 'vue';
import { toggleFullscreen } from '../../../utilities/document';

// const count = ref(0)
const emit = defineEmits(['play']);

defineProps({
  title: {
    type: String,
    required: true,
  },
  emoji: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

onMounted(() => {
  const element = document.getElementById('play');

  if (element) {
    element.onclick = function (event) {
      toggleFullscreen();
    };
  }
});
</script>

<template>
  <div class="card text-center h-100">
    <span class="game-image">{{ emoji }}</span>
    <div class="card-body">
      <h4 class="card-title">{{ title }}</h4>
      <p class="card-text flex-fill">
        {{ description }}
      </p>
      <button
        type="button"
        class="btn d-block btn-primary"
        @click="emit('play')"
      >
        Play <span class="visually-hidden">{{ title }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.card-body {
  display: flex;
  flex-direction: column;
}

.game-image {
  font-size: 80px;
}
</style>
