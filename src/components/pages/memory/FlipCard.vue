<script setup lang="ts">
import { ref } from 'vue';

//const flipped = ref(false);

//const emit = defineEmits(['flip']);

defineProps({
  emoji: {
    type: String,
    required: true,
  },
});

// function flip() {
//   flipped.value = true; // !flipped.value;
//   emit('flip');
// }
</script>

<template>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">🧠</div>
      <div class="flip-card-back">
        {{ emoji }}
      </div>
    </div>
  </div>
</template>

<style scoped>
#app-wrapper.bg-dark .flip-card-front {
  background-color: var(--dark);
  border: 4px solid var(--light-gray);
}

#app-wrapper.bg-dark .flip-card-inner:before {
  border-color: var(--light-gray);
}

/* The flip box container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.flip-card {
  background-color: transparent;
  cursor: pointer;
  width: 20%;
  height: 200px;
  font-size: 64px;
  perspective: 500px; /* Remove this if you don't want the 3D effect */
}

.flip-card.wrong .flip-card-back {
  background-color: rgb(219, 46, 46);
}

@media (max-width: 992px) {
  .flip-card {
    width: 25%;
  }
}

@media (max-width: 768px) {
  .flip-card {
    width: 33%;
  }
}

@media (max-width: 576px) {
  .flip-card {
    width: 50%;
  }
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card.flip .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;

  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  border: 4px solid var(--gray);
  transition: background-color 0.3s ease-in;
}

/* Style the front side */
.flip-card-front {
  background-color: var(--light-gray);
}

/* Style the back side */
.flip-card-back {
  background-color: white;
  transform: rotateY(180deg);
}

/* Mild "3D" effect https://stackoverflow.com/a/11646154/715879 */
.flip-card-inner:before {
  border: 4px solid var(--gray);
  border-radius: 15px;
  content: '';
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transform: translateZ(-5px);
  width: 100%;
}
</style>
