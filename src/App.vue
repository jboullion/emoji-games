<script setup lang="ts">
import ModalSettings from './components/modals/Settings.vue';
import Footer from './components/common/Footer.vue';
import Header from './components/common/Header.vue';
import ModalSearch from './components/modals/Search.vue';

import { io, Socket } from 'socket.io-client';
import { ref } from 'vue';

type MemoryMessage = {
  name: string;
  text: string;
};

type MemoryClient = {
  title: string;
  name: string;
  text: string;
  messages: MemoryMessage[];
  socket: Socket | null;
};

const clientData = ref<MemoryClient>({
  title: 'Nestjs Websockets Chat',
  name: '',
  text: '',
  messages: [],
  socket: null,
});

const socket = io('http://localhost:3001');
socket.on('msgToClient', (message) => {
  receivedMessage(message);
});

function sendMessage() {
  if (validateInput()) {
    const message = {
      name: clientData.value.name,
      text: clientData.value.text,
    };
    socket.emit('msgToServer', message);
    clientData.value.text = '';
  }
}
function receivedMessage(message: MemoryMessage) {
  clientData.value.messages.push(message);
}

function validateInput() {
  return clientData.value.name.length > 0 && clientData.value.text.length > 0;
}
console.log('socket', socket);
</script>

<template>
  <div id="app-wrapper">
    <div class="container d-flex flex-fill flex-column justify-content-between">
      <Header />

      <div class="row">
        <div class="col-md-6 offset-md-3 col-sm-12">
          <h1 class="text-center">{{ clientData.title }}</h1>
          <br />
          <div id="status"></div>
          <div id="chat">
            <input
              type="text"
              v-model="clientData.name"
              id="username"
              class="form-control"
              placeholder="Enter name..."
            />
            <br />
            <div class="card">
              <div id="messages" class="card-block">
                <ul>
                  <li v-for="message of clientData.messages">
                    {{ message.name }}: {{ message.text }}
                  </li>
                </ul>
              </div>
            </div>
            <br />
            <textarea
              id="textarea"
              class="form-control"
              v-model="clientData.text"
              placeholder="Enter message..."
            ></textarea>
            <br />
            <button id="send" class="btn" @click.prevent="sendMessage">
              Send
            </button>
          </div>
        </div>
      </div>

      <router-view></router-view>

      <!-- <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view> -->

      <Footer />
    </div>

    <ModalSettings />
    <ModalSearch />
  </div>
</template>

<style>
/* TODO: Should we be setting up modules or some other CSS bundle for import? */
/* TODO: Or perhaps we should at least move into SCSS?
/* @import './assets/css/bootswatch/sketchy/bootstrap.min.css'; */
@import './assets/css/bootswatch/lumen/bootstrap.css';

@import './assets/css/variables.css';
@import './assets/css/utilities.css';
@import './assets/css/bs-overrides.css';
@import './assets/css/darkmode.css';
@import './assets/css/typography.css';
@import './assets/css/animations.css';

body,
#app,
#app-wrapper {
  min-height: 100vh;
  overflow-x: hidden;
}

#app-wrapper {
  display: flex;
  flex-direction: column;
}

#app-wrapper .page {
  flex: 1;
}

.menus-btn {
  background-color: transparent;
  border: none;
}

/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
} */

/* TODO: Do we want to animate our routes? */
/* @keyframes rotate {
  0% {
    opacity: 0;
    transform: scale(0) rotate(-180deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

.rotate-enter-active {
  animation: rotate 0.2s;
}

.rotate-leave-active {
  animation: rotate 0.2s reverse;
} */
</style>
