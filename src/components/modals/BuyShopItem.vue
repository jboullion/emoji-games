<script setup lang="ts">
import { AxiosError } from 'axios';
import { inject, PropType, ref } from 'vue';

import ShopService from '../../services/ShopService';
import { IShopItem } from '../../types/Shop';
import { getAxiosError } from '../../utilities/axios';
import ErrorAlert from '../common/ErrorAlert.vue';

const _shopService: ShopService = inject('shopService') as ShopService;

const emit = defineEmits(['close']);
const loading = ref(false);
const errors = ref<String[]>([]);

const props = defineProps({
  item: {
    type: Object as PropType<IShopItem>,
    required: true,
  },
});

async function buyShopItem() {
  try {
    const result = await _shopService.buyItem(props.item.id);

    if (result) {
      emit('close');
    }
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
}
</script>

<template>
  <div id="shop-modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5>{{ item.name }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            ✖️
          </button>
        </div>
        <div
          class="modal-body d-flex flex-column justify-content-between text-center"
        >
          <h3 class="mb-4 text-center">{{ item.emoji }}</h3>
          <p class="mb-5">{{ item.description }}</p>

          <ErrorAlert v-if="errors.length" :errors="errors" />

          <button class="btn btn-primary fs-4 mb-3" @click="buyShopItem">
            <span v-if="loading" class="spinner loading"
              >⌛ <span class="visually-hidden">Loading...</span></span
            >
            <template v-else> <span>🎫</span> {{ item.tickets }} </template>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-body h3 {
  font-size: 64px;
}

.modal-body p {
  font-size: 26px;
}
</style>
