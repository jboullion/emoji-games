<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IShopItem } from '../types/Shop';
import CommonTitle from './common/CommonTitle.vue';
import ShopItem from './ShopItem.vue';
import ShopModal from './modals/BuyShopItem.vue';

const shopItems: IShopItem[] = [
  {
    id: 1,
    emoji: '🎆',
    name: 'Firework',
    description: 'Clicking creates fireworks!',
    tickets: 100,
  },
  {
    id: 2,
    emoji: '🎆',
    name: 'Firework',
    description: 'Clicking creates fireworks!',
    tickets: 100,
  },
  {
    id: 3,
    emoji: '🎆',
    name: 'Firework',
    description: 'Clicking creates fireworks!',
    tickets: 100,
  },
  {
    id: 4,
    emoji: '🎆',
    name: 'Firework',
    description: 'Clicking creates fireworks!',
    tickets: 100,
  },
  {
    id: 5,
    emoji: '🎆',
    name: 'Firework',
    description: 'Clicking creates fireworks!',
    tickets: 100,
  },
  {
    id: 6,
    emoji: '🎆',
    name: 'Firework',
    description: 'Clicking creates fireworks!',
    tickets: 100,
  },
  {
    id: 7,
    emoji: '🎆',
    name: 'Firework',
    description: 'Clicking creates fireworks!',
    tickets: 100,
  },
];

let shopModal: { show: () => void; hide: () => void } | null = null;
const selectedItem = ref<IShopItem>({
  id: 1,
  emoji: '🎆',
  name: 'Firework',
  description: 'Clicking creates fireworks!',
  tickets: 100,
});

function buyItem(item: IShopItem) {
  selectedItem.value = item;

  console.log(selectedItem.value);

  if (shopModal) {
    console.log(shopModal);

    // @ts-ignore
    shopModal.show();
  }
}

onMounted(() => {
  // @ts-ignore
  shopModal = new bootstrap.Modal(document.getElementById('shop-modal'));
});
</script>

<template>
  <div id="shop" class="page">
    <CommonTitle title="Shop" subtitle="Spend Tickets! Have Fun!" />

    <div class="row text-center">
      <div v-for="item in shopItems" class="col-lg-3 col-md-4 col-sm-6 mb-4">
        <ShopItem :item="item" @buy-item="buyItem" />
      </div>
    </div>

    <ShopModal :item="selectedItem" />
  </div>
</template>

<style></style>
