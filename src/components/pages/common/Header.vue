<script setup lang="ts"></script>

<template>
  <div class="d-flex justify-content-between py-2">
    <button
      id="home"
      type="button"
      @click="$router.push('/')"
      class="menus-btn"
      data-bs-dismiss="modal"
    >
      🏠 <span class="visually-hidden">Home</span>
    </button>
    <button
      id="menu-toggle"
      class="menus-btn"
      data-bs-toggle="modal"
      data-bs-target="#menu-modal"
    >
      ⚙️ <span class="visually-hidden">Settings</span>
    </button>
  </div>
</template>

<style scoped>
#home,
#menu-toggle {
  font-size: 34px;
}

#home:hover {
  transform: scale(1.2);
}

#menu-toggle:hover {
  /* transform: rotate(360deg); */
  animation-name: spin;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
}
</style>
