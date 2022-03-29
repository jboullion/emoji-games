<script setup lang="ts">
import { PropType, ref } from 'vue';
import { ChatMessage } from '../../../types/Chat';

const emit = defineEmits(['sendMessage']);
defineProps({
  messages: {
    type: Array as PropType<ChatMessage[]>,
    required: true,
  },
});

const message = ref<ChatMessage>({
  avatar: '😍',
  text: '',
});

function sendMessage() {
  if (validateMessage(message.value)) {
    emit('sendMessage', message.value);
    message.value.text = '';
  }
}

function validateMessage(message: ChatMessage) {
  return message.avatar.length > 0 && message.text.length > 0;
}
</script>

<template>
  <div class="row">
    <div class="col-md-6 offset-md-3 col-sm-12">
      <div id="chat">
        <div class="card mb-3">
          <div id="messages" class="card-block">
            <ul>
              <li v-for="message of messages">
                {{ message.avatar }}: {{ message.text }}
              </li>
            </ul>
          </div>
        </div>
        <div class="d-flex mb-3">
          <div id="chat-avatar" class="fs-1">😍</div>
          <textarea
            id="textarea"
            class="form-control"
            v-model="message.text"
            placeholder="Enter message..."
          ></textarea>
        </div>

        <button id="send" class="btn" @click.prevent="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<style></style>
