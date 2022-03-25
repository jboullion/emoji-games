<script setup lang="ts">
import { PropType } from 'vue';
import { Emoji } from '../../types/Emoji';

const emit = defineEmits(['update']);

defineProps({
  emojis: {
    type: Array as PropType<Emoji[]>,
    required: true,
  },
});
</script>

<template>
  <div id="emoji-list" class="text-center">
    <div
      class="emoji"
      :title="emoji.short_name"
      @mousedown="emit('update', emoji.icon)"
      v-for="(emoji, i) in emojis"
      :key="i"
    >
      {{ emoji.icon }}
      <!-- <span class="visually-hidden">{{ emoji.short_name }}</span> -->
    </div>
  </div>
</template>

<style>
#emoji-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
#emoji-list .emoji {
  font-size: 64px;
  margin: 10px;
  padding: 0 10px;
  flex: 1;
  cursor: grab;
  position: relative;
  user-select: none;
  border: 2px solid var(--dark);
  border-radius: 15px;
  border-width: 1px 2px 4px 2px;
}

#emoji-list .emoji:active {
  cursor: grabbing; /* 'copy' is an option as well, but grabbing looks nicer imo  */
  top: 1px;
  border-width: 1px 2px 3px 2px;
}

#emoji-list .emoji:active:after {
  content: 'Copied: ' attr(title);
  font-size: 16px;
  background: #fff;
  color: black;
  padding: 5px;
  border: 2px solid var(--gray);
  border-radius: 15px;
  position: absolute;
  bottom: 95%;
  left: 50%;
  width: 150%;
  max-width: 320px;
  transform: translate(-50%, 0);
  z-index: 10;
}

@media (max-width: 768px) {
  #emoji-list .emoji {
    font-size: 50px;
  }

  #emoji-list .emoji:active:after {
    width: 200%;
  }
}
</style>
