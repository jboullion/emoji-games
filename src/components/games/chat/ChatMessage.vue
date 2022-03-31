<script setup lang="ts">
import { PropType } from 'vue';
import { IChatMessage } from '../../../types/Chat';

const props = defineProps({
  message: {
    type: Object as PropType<IChatMessage>,
    required: true,
  },
  clientID: {
    type: String,
    required: true,
  },
});

function messageClasses(message: IChatMessage) {
  switch (message.clientID) {
    case props.clientID:
      return 'local';
    case 'join':
      return 'join';
    default:
      return 'server';
  }
}
</script>

<template>
  <div class="chat-message" :class="messageClasses(message)">
    <span class="fs-4">{{ message.avatar }}</span>
    <div>
      <div class="arrow-left"></div>
      {{ message.text }}
    </div>
  </div>
</template>

<style scoped>
.chat-message {
  display: flex;
  white-space: normal;
  word-break: break-word;
  margin-bottom: 10px;
}

.chat-message.server {
  flex-direction: row-reverse;
}

.chat-message span {
  margin-right: 5px;
}

.chat-message.server span {
  margin-right: 0;
  margin-left: 5px;
}

.chat-message > div {
  border: 1px solid black;
  padding: 5px;
  border-radius: 5px;
  line-height: 1.4;
  font-size: 16px;
}

body.darkmode .chat-message > div {
  border-color: var(--light-gray);
}
</style>
