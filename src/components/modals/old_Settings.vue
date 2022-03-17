<script setup lang="ts">
// TODO: THIS HAS BEEN DEPRICATED
import { toRefs, reactive } from 'vue';

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
  <div id="settings-modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5>Settings</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            ✖️
          </button>
        </div>
        <div class="modal-body">
          <button class="menus-btn dark-mode" @click="emit('toggleDark')">
            <span v-show="reactiveProps.darkMode">☀️</span>
            <span v-show="!reactiveProps.darkMode">🌑</span>
          </button>

          <button class="menus-btn audio-toggle" @click="emit('toggleAudio')">
            <span v-show="reactiveProps.audioEnabled">🔈</span>
            <span v-show="!reactiveProps.audioEnabled">🔊</span>
          </button>

          <!-- <div class="d-flex justify-content-between mt-5">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
