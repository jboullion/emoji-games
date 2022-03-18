<script setup lang="ts"></script>

<template>
  <div class="d-flex justify-content-between py-2">
    <button
      id="home"
      type="button"
      @click="$router.push('/')"
      class="menus-btn"
    >
      🏠 <span class="visually-hidden">Home</span>
    </button>
    <div>
      <button
        id="search-toggle"
        type="button"
        class="menus-btn"
        data-bs-toggle="modal"
        data-bs-target="#search-modal"
      >
        🔍 <span class="visually-hidden">Search</span>
      </button>

      <button
        id="settings-toggle"
        type="button"
        class="menus-btn"
        data-bs-toggle="modal"
        data-bs-target="#settings-modal"
      >
        ⚙️ <span class="visually-hidden">Settings</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.menus-btn {
  position: relative;
  font-size: 34px;
  transition: transform 0.1s linear;
}

.menus-btn:active {
  top: 1px;
}

#home:hover {
  transform: scale(1.2);
}

#search:hover {
  transform: rotate(45deg);
}

#menu-toggle:hover {
  transform: rotate(-360deg);
  /* animation-name: spin;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out; */
}
</style>
