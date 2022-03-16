<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { toggleFullscreen } from '../../utilities/document';

// defineProps<{ msg: string }>()

// const count = ref(0)

// $('#toggle_fullscreen').on('click', function(){
//   // if already full screen; exit
//   // else go fullscreen
//   if (
//     document.fullscreenElement
//   ) {
//     if (document.exitFullscreen) {
//       document.exitFullscreen();
//     }
//   } else {
//     element = $('#container').get(0);
//     if (element.requestFullscreen) {
//       element.requestFullscreen();
//     }
//   }
// });

// function toggleFullScreen() {
//   fullScreen.value = !fullScreen.value;
//   if (!fullScreen.value) {
//     document.exitFullscreen();
//   } else {
//     if (element) {
//       element.requestFullscreen();
//     }
//   }
// }

onMounted(() => {
  const element = document.getElementById('play');

  if (element) {
    element.onclick = function (event) {
      toggleFullscreen();
    };
  }
});
</script>

<template>
  <div id="home" class="">
    <div class="row">
      <div class="col-lg-4"></div>
      <div class="col-lg-8">
        <h3>Emoji Battle!</h3>
        <p>This is a description for the game!</p>
        <button type="button" id="play" class="btn btn-primary">Play</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
