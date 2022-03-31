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
import CommonTitle from '../../common/CommonTitle.vue';

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

function leaveRoom() {
  _socket.emit('changeRoom', {
    leave: roomID.value,
    avatar: message.value.avatar,
  });
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

type JoinRoomDTO = { user: RoomUser; roomUsers: RoomUser[] };

_socket.on('roomJoin', async (joinRoom: JoinRoomDTO) => {
  chatMessages.value.push({
    avatar: joinRoom.user.username,
    text: `Joined room: ${currentRoom.value}`,
    clientID: joinRoom.user.clientID,
    roomID: roomID.value,
  });

  usersInRoom.value = joinRoom.roomUsers;

  await nextTick();

  scrollToBottom('messages');
});

_socket.on('roomLeave', (user: RoomUser) => {
  chatMessages.value.push({
    avatar: user.username,
    text: 'Left the room',
    clientID: user.clientID,
    roomID: roomID.value,
  });

  usersInRoom.value = usersInRoom.value.filter((chatUser) => {
    return chatUser.clientID != user.clientID;
  });
});

// Messages
const message = ref<IChatMessage>({
  avatar: defaultAvatar,
  text: '',
  clientID: _socket.id,
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
    message.value.clientID = _socket.id;
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

// Avatar Updates
let avatarModal: { show: () => void; hide: () => void } | null = null;

function updateAvatar(emoji: string) {
  const previousAvatar = message.value.avatar;
  message.value.avatar = emoji;

  _socket.emit('sendMessage', {
    avatar: emoji,
    text: `${previousAvatar} Change to ${emoji}`,
    clientID: _socket.id,
    roomID: roomID.value,
  });

  if (avatarModal) {
    // @ts-ignore
    avatarModal.hide();
  }
}

// Lifecycle
onMounted(() => {
  // @ts-ignore
  avatarModal = new bootstrap.Modal(document.getElementById('avatar-modal'));
});

onUnmounted(() => {
  // If we unmount this component we are leaving the room
  leaveRoom();
});

// watch(roomID, (newRoom, oldRoom) => {
//   if (newRoom) {
//     joinRoom(newRoom, oldRoom);
//   }
// });
</script>

<template>
  <CommonTitle
    title="🗨️ Chat"
    :subtitle="currentRoom ? 'Be Nice!' : 'Enter a Room ID to join a room!'"
  />

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
            <span>{{ message.avatar }}</span>
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
              :clientID="_socket.id"
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
    <div class="ms-4" v-if="usersInRoom.length">
      <div class="participants card p-3">
        <div class="fs-1" v-for="user in usersInRoom">{{ user.username }}</div>
      </div>
    </div>
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
