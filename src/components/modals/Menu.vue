<script setup lang="ts">
import { toRefs, reactive } from 'vue';
import { toggleFullscreen } from '../../utilities/document';

const emit = defineEmits(['toggleDark', 'toggleAudio']);

const props = defineProps({
  darkMode: {
    type: Boolean,
    required: true,
  },
  audioEnabled: {
    type: Boolean,
    required: true,
  },
});

const reactiveProps = reactive(props);
</script>

<template>
  <div id="menu-modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5>Menu</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            ✖️
          </button>
        </div>
        <div class="modal-body d-flex justify-content-between">
          <button
            type="button"
            @click="$router.push('/')"
            class="menus-btn"
            data-bs-dismiss="modal"
          >
            🏠
          </button>

          <button class="menus-btn dark-mode" @click="emit('toggleDark')">
            <span v-show="reactiveProps.darkMode">☀️</span>
            <span v-show="!reactiveProps.darkMode">🌑</span>
          </button>

          <button
            class="menus-btn audio-toggle"
            style="width: 82px; text-align: left"
            @click="emit('toggleAudio')"
          >
            <span v-show="reactiveProps.audioEnabled">🔈</span>
            <span v-show="!reactiveProps.audioEnabled">🔊</span>
          </button>

          <button class="menus-btn fullscreen" @click="toggleFullscreen">
            🖥️
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menus-btn {
  font-size: 50px;
}
</style>
