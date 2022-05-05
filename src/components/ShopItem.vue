<script setup lang="ts">
import { PropType } from 'vue';
import { IShopItem } from '../types/Shop';

defineProps({
  item: {
    type: Object as PropType<IShopItem>,
    required: true,
  },
});

const emit = defineEmits(['buyItem']);
</script>

<template>
  <div class="card shop-item">
    <span class="shop-image">{{ item.emoji }}</span>
    <div class="card-body">
      <div class="mb-4">
        <h5 class="card-title">{{ item.name }}</h5>
        <p class="card-text">{{ item.description }}</p>
      </div>
      <button
        type="button"
        class="btn btn-primary col-12"
        @click="emit('buyItem', item)"
      >
        <span>🎫</span> {{ item.tickets }}
      </button>
    </div>
  </div>
</template>

<style>
.card.shop-item {
  height: 100%;
}

.shop-item .card-body {
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.shop-image {
  font-size: 64px;
  padding: 15px;
}
</style>
