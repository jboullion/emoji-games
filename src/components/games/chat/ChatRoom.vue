<script setup lang="ts">
// TODOS:

// ! Bugs:

// ? Improvements
// 1. Break up this component

import { Socket } from 'socket.io-client';
import { inject, onMounted, onUnmounted, nextTick, ref, watch } from 'vue';
import store from '../../../store';
import { IChatMessage, RoomUser } from '../../../types/Chat';

import { copy, scrollToBottom } from '../../../utilities/document';
import CustomField from '../../common/CustomField.vue';
import { useDebounceFn } from '@vueuse/core';
import ChatMessage from './ChatMessage.vue';
import ChangeAvatar from '../../modals/ChangeAvatar.vue';

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
const usersInRoom = ref<RoomUser[]>([]);
const roomID = ref('');
const currentRoom = ref(roomID.value);

function joinRoom() {
  if (currentRoom.value === roomID.value) return;

  _socket.emit('changeRoom', {
    join: roomID.value,
    leave: currentRoom.value,
    avatar: message.value.avatar,
  });

  chatMessages.value = [];
  currentRoom.value = roomID.value;
  usersInRoom.value = [];
}

// const joinRoom = useDebounceFn((newRoom: string, oldRoom: string | null) => {
//   _socket.emit('changeRoom', {
//     join: newRoom,
//     leave: oldRoom,
//     avatar: message.value.avatar,
//   });

//   chatMessages.value = [];
//   currentRoom.value = newRoom;
//   usersInRoom.value = [];
// }, 1000);

_socket.on('roomJoin', async (user: RoomUser) => {
  chatMessages.value.push({
    avatar: user.username,
    text: `Joined room: ${currentRoom.value}`,
    userID: user.userID,
    roomID: roomID.value,
  });

  await nextTick();
  scrollToBottom('messages');
  usersInRoom.value.push({
    userID: user.userID,
    username: user.username,
  });
});

_socket.on('roomLeave', (user: RoomUser) => {
  chatMessages.value.push({
    avatar: user.username,
    text: 'Left the room',
    userID: user.userID,
    roomID: roomID.value,
  });

  usersInRoom.value = usersInRoom.value.filter((chatUser) => {
    return chatUser.userID != user.userID;
  });
});

// Messages
const message = ref<IChatMessage>({
  avatar: defaultAvatar,
  text: '',
  userID: _socket.id,
  roomID: roomID.value,
});

const maxTextLength = 255;
const chatMessages = ref<IChatMessage[]>([]);

_socket.on('broadcastMessage', async (message) => {
  chatMessages.value.push(message);

  await nextTick();
  scrollToBottom('messages');
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
  return (
    message.avatar.length > 0 &&
    message.text.length > 0 &&
    message.text.length < maxTextLength
  );
}

onMounted(() => {
  // Inform the room when we leave. Ideally done on server on "disconnecting"
  window.onbeforeunload = function () {
    _socket.emit('changeRoom', {
      leave: roomID.value,
      avatar: message.value.avatar,
    });
  };

  // @ts-ignore
  avatarModal = new bootstrap.Modal(document.getElementById('avatar-modal'));
});

onUnmounted(() => {
  // If we unmount this component we are leaving the room
  leaveRoom();
});

function leaveRoom() {
  _socket.emit('changeRoom', {
    leave: roomID.value,
    avatar: message.value.avatar,
  });
}

// watch(roomID, (newRoom, oldRoom) => {
//   if (newRoom) {
//     joinRoom(newRoom, oldRoom);
//   }
// });

// Avatar Updates
let avatarModal: { show: () => void; hide: () => void } | null = null;

function updateAvatar(emoji: string) {
  const previousAvatar = message.value.avatar;
  message.value.avatar = emoji;

  _socket.emit('sendMessage', {
    avatar: emoji,
    text: `${previousAvatar} Change to ${emoji}`,
    userID: _socket.id,
    roomID: roomID.value,
  });

  if (avatarModal) {
    // @ts-ignore
    avatarModal.hide();
  }
}
</script>

<template>
  <div class="d-flex">
    <div class="flex-fill">
      <div id="chat">
        <div class="d-flex align-items-center mb-3 justify-content-between">
          <!-- TODO: Can we use the same ChangeAvatar modal we use for profile? -->
          <form @submit.prevent="joinRoom">
            <CustomField
              label=""
              id="room"
              type="text"
              v-model="roomID"
              placeholder="Room ID"
            >
              <template #button>
                <button
                  type="submit"
                  class="btn btn-primary no-border-radius"
                  aria-label="Join Room"
                >
                  <span>🚀</span>
                </button>
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
          </form>

          <button
            type="button"
            id="chat-avatar"
            class="btn btn-primary fs-1 ms-3"
            data-bs-toggle="modal"
            data-bs-target="#avatar-modal"
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
        <div class="d-flex mb-3" v-if="currentRoom">
          <textarea
            id="textarea"
            class="form-control me-3"
            :class="{ 'is-invalid': message.text.length > maxTextLength }"
            v-model="message.text"
            placeholder="Enter message..."
          ></textarea>

          <div class="text-nowrap text-center">
            <button
              id="send"
              class="btn btn-primary fs-3 text-center"
              @click.prevent="sendMessage"
              :disabled="
                !message.text.length || message.text.length > maxTextLength
              "
            >
              <span>✉️</span>
            </button>
            <div
              :class="{ 'text-danger': message.text.length > maxTextLength }"
            >
              {{ message.text.length }} / {{ maxTextLength }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="ms-4">
      <div class="participants card p-3">
        <div class="fs-1" v-for="user in usersInRoom">{{ user.username }}</div>
      </div>
    </div> -->
    <ChangeAvatar @updateAvatar="updateAvatar" />
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
