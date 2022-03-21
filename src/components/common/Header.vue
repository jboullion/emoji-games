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

      <!-- <span class="menus-btn position-relative"
        >🎫
        <span
          class="fs-6 position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        >
          99+
          <span class="visually-hidden">unread messages</span>
        </span></span
      > -->

      <router-link to="/profile" id="profile" class="menus-btn"
        >👤<span class="visually-hidden">Profile</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.menus-btn {
  position: relative;
  font-size: 34px;
  transition: transform 0.15s linear;
  text-decoration: none;
  text-align: center;
  margin-left: 15px;
}

#settings-toggle {
  position: relative;
  transform-origin: 48% 50%;
}

.menus-btn:active {
  top: 1px;
}

/* #home:hover {
  transform: scale(1.2);
} */

#search-toggle:hover {
  transform: rotate(45deg);
}

#profile {
  display: inline-block;
}

#profile:hover {
  transform: scale(1.15);
  /* transition: transform 0.1s linear;

  animation-name: expand;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-timing-function: linear; */
}

#settings-toggle:hover {
  transform: rotate(90deg);
}

#home:hover {
  transform-origin: bottom;
  animation-name: bounce;
  animation-duration: 0.45s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
</style>
