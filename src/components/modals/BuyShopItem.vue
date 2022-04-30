<script setup lang="ts">
import { PropType } from 'vue';
import { IShopItem } from '../../types/Shop';

defineProps({
  item: {
    type: Object as PropType<IShopItem>,
    required: true,
  },
});

function buyShopItem() {}
</script>

<template>
  <div id="shop-modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body d-flex flex-column justify-content-between">
          <h3 class="mb-4 text-center">{{ item.emoji }}</h3>

          <button class="btn btn-primary fs-4 mb-3" @click="buyShopItem">
            Buy!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
