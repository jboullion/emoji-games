<script setup lang="ts">
import store from '../../store';
</script>

<template>
  <header class="d-flex justify-content-between py-2">
    <button
      id="home"
      type="button"
      @click="$router.push('/')"
      class="menus-btn ms-0"
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

      <router-link
        v-if="!store.getters.isAuthenticated"
        to="/login"
        id="login"
        class="menus-btn user-btn"
        >👤<span class="visually-hidden">Login</span>
      </router-link>
      <router-link v-else to="/profile" id="profile" class="menus-btn user-btn"
        >{{
          store.getters.userInfo.avatar ? store.getters.userInfo.avatar : '😶'
        }}<span class="visually-hidden">Profile</span>
      </router-link>
      <!-- <router-link to="/profile" id="profile" class="menus-btn"
        >👤<span class="visually-hidden">Profile</span>
      </router-link> -->
    </div>

    <!-- <Login v-show="showModal" @close="showModal = false" /> -->
  </header>
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

.user-btn {
  display: inline-block;
}

.user-btn:hover {
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
  animation-duration: 0.6s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
</style>
