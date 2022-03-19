<script setup lang="ts">
import { PropType, ref } from 'vue';
import FlipCard from './FlipCard.vue';

const found = ref(0);

defineProps({
  emojis: {
    type: Array as PropType<string[]>,
    required: true,
  },
});
</script>

<template>
  <div class="my-4 text-center">
    <div class="row">
      <!-- <h2 class="score">
        Remaining <span>{{ emojis.length - found }}</span>
      </h2>
      <h2 class="score">
        Found <span>{{ found }}</span>
      </h2> -->
      <div class="col-sm-6 mb-3">
        <div class="card">
          <div class="card-body text-center">
            <h3 class="card-title mb-0">Remaining</h3>
            <h2 class="flex-fill text-center">
              {{ emojis.length - found }}
            </h2>
          </div>
        </div>
      </div>
      <div class="col-sm-6 mb-3">
        <div class="card">
          <div class="card-body text-center">
            <h3 class="card-title mb-0">Found</h3>
            <h2 class="flex-fill text-center">
              {{ found }}
            </h2>
          </div>
        </div>
      </div>
    </div>

    <div id="card-list" class="col-12 row mb-3">
      <FlipCard
        class="col-lg-4 col-sm-6 mb-3"
        v-for="(emoji, i) in emojis"
        :emoji="emoji"
        :key="i"
      />
    </div>
  </div>
</template>

<style>
.card h2 {
  font-size: 64px;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.5);
}
</style>
