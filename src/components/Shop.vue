<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import { IShopItem } from '../types/Shop';
import CommonTitle from './common/CommonTitle.vue';
import ShopItem from './ShopItem.vue';
import ShopModal from './modals/BuyShopItem.vue';
import ShopService from '../services/ShopService';

const _shopService: ShopService = inject('shopService') as ShopService;

let shopModal: { show: () => void; hide: () => void } | null = null;
const selectedItem = ref<IShopItem>({
  id: 0,
  emoji: '',
  name: '',
  description: '',
  tickets: 0,
});
const shopItems = ref<IShopItem[]>([]);

function buyItem(item: IShopItem) {
  selectedItem.value = item;

  console.log(selectedItem.value);

  if (shopModal) {
    console.log(shopModal);

    // @ts-ignore
    shopModal.show();
  }
}

onMounted(async () => {
  // @ts-ignore
  shopModal = new bootstrap.Modal(document.getElementById('shop-modal'));

  shopItems.value = await _shopService.getItems();
  console.log(shopItems);
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
