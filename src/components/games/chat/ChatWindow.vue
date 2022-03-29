<script setup lang="ts">
import { Socket } from 'socket.io-client';
import { inject, PropType, ref } from 'vue';
import store from '../../../store';
import { ChatMessage } from '../../../types/Chat';

import { copy } from '../../../utilities/document';
import CustomField from '../../common/CustomField.vue';

const _socket: Socket = inject('socket') as Socket;

const emit = defineEmits(['sendMessage']);
defineProps({
  messages: {
    type: Array as PropType<ChatMessage[]>,
    required: true,
  },
});

const lobbyID = 'LOBBY123';

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

const message = ref<ChatMessage>({
  avatar: defaultAvatar,
  text: '',
  userID: _socket.id,
});

const maxTextLength = 255;

function sendMessage() {
  if (validateMessage(message.value)) {
    emit('sendMessage', message.value);
    message.value.text = '';
  }
}

function validateMessage(message: ChatMessage) {
  return message.avatar.length > 0 && message.text.length > 0;
}

function messageClasses(message: ChatMessage) {
  return message.userID === _socket.id ? 'local' : 'server';
}
</script>

<template>
  <div class="row">
    <div class="col-lg-8 offset-lg-2">
      <div id="chat">
        <CustomField
          class="mb-3"
          label=""
          id="lobby"
          type="text"
          v-model="lobbyID"
          disabled
        >
          <template #button>
            <button
              type="button"
              class="btn btn-primary copy"
              @click="copy(lobbyID)"
              aria-label="Copy Lobby ID"
            >
              <span>📋</span>
            </button>
          </template>
        </CustomField>
        <div class="card mb-3">
          <div id="messages" class="card-block">
            <ul>
              <li v-for="message of messages" :class="messageClasses(message)">
                <template v-if="message.userID === _socket.id">
                  {{ message.avatar }}: {{ message.text }}
                </template>
                <template v-else>
                  {{ message.text }} :{{ message.avatar }}
                </template>
              </li>
            </ul>
          </div>
        </div>
        <div class="d-flex mb-3">
          <div class="text-center text-nowrap">
            <div id="chat-avatar" class="fs-1">{{ message.avatar }}</div>
            <div>{{ message.text.length }} / {{ maxTextLength }}</div>
          </div>

          <textarea
            id="textarea"
            class="form-control mx-3"
            v-model="message.text"
            placeholder="Enter message..."
          ></textarea>

          <button
            id="send"
            class="btn btn-primary fs-3 text-center"
            @click.prevent="sendMessage"
            :disabled="!message.text.length"
          >
            <span>✉️</span>
          </button>
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
#messages {
  padding: 15px;
  min-height: 200px;
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
