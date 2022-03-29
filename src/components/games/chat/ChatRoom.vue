<script setup lang="ts">
// TODOS:

// ! Bugs:

// ? Improvements

import { inject, ref } from 'vue';
import { ChatMessage } from '../../../types/Chat';
import { Socket } from 'socket.io-client';
import ChatWindow from './ChatWindow.vue';

const _socket: Socket = inject('socket') as Socket;

const chatMessages = ref<ChatMessage[]>([]);

_socket.on('broadcastMessage', (message) => {
  console.log('receivedMessage', message);
  receivedMessage(message);
});

function receivedMessage(message: ChatMessage) {
  chatMessages.value.push(message);
}

function sendMessage(message: ChatMessage) {
  _socket.emit('sendMessage', message);
}
</script>

<template>
  <!-- <ChatInfo /> -->
  <ChatWindow :messages="chatMessages" @sendMessage="sendMessage" />
</template>

<style></style>
