<script setup lang="ts">
import { PropType } from 'vue';

const emit = defineEmits(['close']);

defineProps({
  animation: {
    type: String, // as PropType<'fade' | 'bounce'>,
    default: 'fade', // ${animation}
  },
});
</script>

<template>
  <transition name="modal-bounce">
    <div
      class="e-modal"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-describedby="modalDescription"
      @click.stop
    >
      <header class="e-modal-header" id="modalTitle">
        <slot name="header"><h3>This is the default tile!</h3></slot>
        <button
          type="button"
          class="e-modal-close btn"
          @click="emit('close')"
          aria-label="Close modal"
        >
          ✖️
        </button>
      </header>

      <section class="e-modal-body" id="modalDescription">
        <slot> Modal Error! </slot>
      </section>
    </div>
  </transition>
</template>

<style>
.e-modal {
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translate(-50%, 0);

  background: #ffffff;
  border: 4px solid var(--dark);
  border-radius: 15px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  z-index: 1001;
  margin: 15px;
  width: calc(100% - 30px);
  max-width: 600px;
}

.e-modal-header {
  padding: 20px 20px 0px;
  display: flex;
}

.e-modal-header {
  position: relative;
  justify-content: space-between;
  align-items: center;
}

.e-modal-header h3 {
  font-size: 40px;
}

.e-modal-footer {
  flex-direction: column;
}

.e-modal-body {
  position: relative;
  padding: 20px;
}

@media (max-width: 630px) {
  .e-modal {
    left: 0;
    transform: translate(0, 0);
  }
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-leave-from,
.modal-fade-enter-to {
  opacity: 1;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.modal-bounce-enter-from,
.modal-bounce-leave-to {
  top: 400px;
}

.modal-bounce-leave-from,
.modal-bounce-enter-to {
  top: 0px;
}

.modal-bounce-enter-active,
.modal-bounce-leave-active {
  transition: position 0.15s ease-in-out;
}
</style>
