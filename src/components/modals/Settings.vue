<script setup lang="ts">
import { ref } from 'vue';
import { toggleFullscreen, updateDarkMode } from '../../utilities/document';

// TODO: Do we want to tie darkmode and audio to a user? Or is it good enough to be browser specific
// TODO: We do not currently track fullscreen as a setting. Should we?
const darkMode = ref(localStorage.getItem('darkMode') ? true : false);
const audioEnabled = ref(localStorage.getItem('audio') ? true : false);

updateDarkMode(darkMode.value);

function toggleDarkMode() {
  darkMode.value = !darkMode.value;
  localStorage.setItem('darkMode', darkMode.value ? '1' : '');
  updateDarkMode(darkMode.value);
}

function toggleAudio() {
  audioEnabled.value = !audioEnabled.value;
  localStorage.setItem('audio', audioEnabled.value ? '1' : '');
}
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
        <div class="modal-body d-flex justify-content-between">
          <button class="menus-btn dark-mode" @click="toggleDarkMode">
            <span v-show="darkMode">☀️</span>
            <span v-show="!darkMode">🌑</span>
          </button>

          <button
            class="menus-btn audio-toggle"
            style="width: 82px; text-align: left"
            @click="toggleAudio"
          >
            <span v-show="audioEnabled">🔈</span>
            <span v-show="!audioEnabled">🔊</span>
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
