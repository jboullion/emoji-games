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
  font-size: 34px;
}

#menu-toggle:hover {
  font-size: 34px;
  animation-name: spin;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
}
</style>
