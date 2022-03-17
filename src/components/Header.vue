<script setup lang="ts"></script>

<template>
  <div class="d-flex flex-row-reverse py-2">
    <button
      id="menu-toggle"
      class="menus-btn"
      data-bs-toggle="modal"
      data-bs-target="#menu-modal"
    >
      ⚙️
    </button>
  </div>
</template>

<style scoped>
#menu-toggle {
  transform-origin: 50% 50%;
  width: 59px;
  height: 59px;
}

#menu-toggle:hover {
  animation-name: spin;
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
}
</style>
