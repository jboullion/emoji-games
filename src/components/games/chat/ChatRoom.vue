<script setup lang="ts">
// TODOS:

// ! Bugs:

// ? Improvements
// 1. Break up this component

import { Socket } from 'socket.io-client';
import { inject, onMounted, onUnmounted, PropType, ref, watch } from 'vue';
import store from '../../../store';
import { IChatMessage, RoomPayload } from '../../../types/Chat';

import { copy } from '../../../utilities/document';
import CustomField from '../../common/CustomField.vue';
import { useDebounceFn } from '@vueuse/core';
import ChatMessage from './ChatMessage.vue';

const _socket: Socket = inject('socket') as Socket;

// Avatar
const exampleAvatars = [
  '😄',
  '🙃',
  '😋',
  '🤠',
  '🤓',
  '😎',
  '🧐',
  '😈',
  '👹',
  '🤡',
  '👺',
  '💩',
  '👾',
  '🤖',
  '👽',
  '💀',
  '😼',
  '🐵',
  '🐶',
  '🦄',
  '🐗',
  '🦉',
];

var randomAvatarIndex = Math.floor(Math.random() * exampleAvatars.length);
const defaultAvatar = store.getters.userInfo.avatar
  ? store.getters.userInfo.avatar
  : exampleAvatars[randomAvatarIndex];

// Room
const roomID = ref('');
const currentRoom = ref(roomID.value);

const joinRoom = useDebounceFn((newRoom: string, oldRoom: string | null) => {
  _socket.emit('changeRoom', {
    join: newRoom,
    leave: oldRoom,
    avatar: defaultAvatar,
  });

  chatMessages.value = [];
  currentRoom.value = newRoom;
}, 1000);

_socket.on('roomJoin', (user: RoomPayload) => {
  chatMessages.value.push({
    avatar: user.username,
    text: `Joined room: ${currentRoom.value}`,
    userID: 'join',
    roomID: roomID.value,
  });
});

_socket.on('roomLeave', (user: RoomPayload) => {
  chatMessages.value.push({
    avatar: user.username,
    text: 'Left the room',
    userID: 'join',
    roomID: roomID.value,
  });
});

// Message
const message = ref<IChatMessage>({
  avatar: defaultAvatar,
  text: '',
  userID: _socket.id,
  roomID: roomID.value,
});

const maxTextLength = 255;

const chatMessages = ref<IChatMessage[]>([]);

_socket.on('broadcastMessage', (message) => {
  chatMessages.value.push(message);
});

function sendMessage() {
  if (validateMessage(message.value)) {
    message.value.userID = _socket.id;
    message.value.roomID = roomID.value;
    _socket.emit('sendMessage', message.value);
    message.value.text = '';
  }
}

function validateMessage(message: IChatMessage) {
  return message.avatar.length > 0 && message.text.length > 0;
}

onMounted(() => {
  // Inform the room when we leave. Ideally done on server on "disconnecting"
  window.onbeforeunload = function () {
    _socket.emit('changeRoom', {
      leave: roomID.value,
      avatar: defaultAvatar,
    });
  };
});

onUnmounted(() => {
  // If we unmount this component we are leaving the room
  leaveRoom();
});

function leaveRoom() {
  _socket.emit('changeRoom', {
    leave: roomID.value,
    avatar: defaultAvatar,
  });
}

watch(roomID, (newRoom, oldRoom) => {
  if (newRoom) {
    joinRoom(newRoom, oldRoom);
  }
});
</script>

<template>
  <div class="row">
    <div class="col-lg-8 offset-lg-2">
      <div id="chat">
        <div class="d-flex align-items-center mb-3 justify-content-between">
          <!-- TODO: Can we use the same ChangeAvatar modal we use for profile? -->

          <CustomField
            label=""
            id="room"
            type="text"
            v-model="roomID"
            placeholder="Room ID"
          >
            <template #button>
              <button
                type="button"
                class="btn btn-primary copy"
                @click="copy(roomID)"
                aria-label="Copy Room ID"
              >
                <span>📋</span>
              </button>
            </template>
          </CustomField>

          <button
            type="button"
            id="chat-avatar"
            class="btn btn-primary fs-1 ms-3"
          >
            {{ message.avatar }}
          </button>
        </div>
        <div class="card mb-3">
          <div id="messages" class="card-block">
            <div v-if="currentRoom">
              <h3>Room: {{ currentRoom }}</h3>
            </div>
            <ChatMessage
              v-for="(message, index) of chatMessages"
              :message="message"
              :userID="_socket.id"
              :key="index"
            />
          </div>
        </div>
        <div class="d-flex mb-3">
          <textarea
            id="textarea"
            class="form-control me-3"
            v-model="message.text"
            placeholder="Enter message..."
          ></textarea>

          <div class="text-nowrap">
            <button
              id="send"
              class="btn btn-primary fs-3 text-center"
              @click.prevent="sendMessage"
              :disabled="!message.text.length"
            >
              <span>✉️</span>
            </button>
            <div>{{ message.text.length }} / {{ maxTextLength }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="col-lg-4">
      <div class="participants card p-3">
        <ul>
          <li class="fs-1">😍</li>
          <li class="fs-1">😍</li>
          <li class="fs-1">😍</li>
          <li class="fs-1">😍</li>
          <li class="fs-1">😍</li>
          <li class="fs-1">😍</li>
          <li class="fs-1">😍</li>
          <li class="fs-1">😍</li>
        </ul>
      </div>
    </div> -->
  </div>
</template>

<style scoped>
.card {
  overflow: hidden;
}

#messages {
  padding: 15px;
  min-height: 200px;
  max-height: 300px;
  overflow-y: auto;
}

#messages ul {
  list-style: none;
  padding: 0;
}

#messages li.server {
  text-align: right;
}

.btn.copy {
  cursor: grab;
  position: relative;
}

.btn.copy:active {
  cursor: grabbing;
}

.btn.copy:active:after {
  content: 'Copied!';
  font-size: 14px;
  background: #fff;
  color: black;
  padding: 5px;
  border: 2px solid var(--gray);
  border-radius: 15px;
  position: absolute;
  bottom: 95%;
  left: 50%;
  width: 100px;
  max-width: 320px;
  transform: translate(-50%, 0);
  z-index: 10;
}
</style>
