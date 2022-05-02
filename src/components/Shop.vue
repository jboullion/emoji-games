<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import { IShopItem } from '../types/Shop';
import CommonTitle from './common/CommonTitle.vue';
import ShopItem from './ShopItem.vue';
import ShopModal from './modals/BuyShopItem.vue';
import ShopService from '../services/ShopService';
import { AxiosError } from 'axios';
import { getAxiosError } from '../utilities/axios';
import ErrorAlert from './common/ErrorAlert.vue';

const _shopService: ShopService = inject('shopService') as ShopService;

const loading = ref(false);
const errors = ref<String[]>([]);

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

  if (shopModal) {
    // @ts-ignore
    shopModal.show();
  }
}

function closeBuyModal() {
  if (shopModal) {
    // @ts-ignore
    shopModal.hide();
  }
}

onMounted(async () => {
  // @ts-ignore
  shopModal = new bootstrap.Modal(document.getElementById('shop-modal'));

  try {
    loading.value = true;

    shopItems.value = await _shopService.getItems();
  } catch (error: AxiosError | any) {
    // TODO: Show error to user
    const axiosError = getAxiosError(error);
    if (axiosError) {
      errors.value.push(axiosError);
    }
    //Bugsnag.notify(new Error(error));
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div id="shop" class="page">
    <CommonTitle title="Shop" subtitle="Spend Tickets! Have Fun!" />

    <ErrorAlert v-if="errors.length" :errors="errors" />

    <div class="row text-center">
      <div v-for="item in shopItems" class="col-lg-3 col-md-4 col-sm-6 mb-4">
        <ShopItem :item="item" @buy-item="buyItem" />
      </div>
    </div>

    <ShopModal :item="selectedItem" @close="closeBuyModal" />
  </div>
</template>

<style></style>
