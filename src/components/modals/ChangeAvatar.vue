<script setup lang="ts">
// TODO: Move into a custom modal
import { onMounted, ref } from 'vue';
import { capitalize } from '../../utilities/filters';
import {
  Emoji,
  EmojiFilter,
  emojiFilters,
  searchEmojis,
} from '../../types/Emoji';
import CustomField from '../common/CustomField.vue';
import CustomDropdown from '../common/CustomDropdown.vue';
import EmojiList from '../common/EmojiList.vue';
import { trapFocus } from '../../utilities/document';

const emit = defineEmits(['updateAvatar']);

const search = ref('');
const emojiResults = ref<Emoji[]>([]);
const parentFilter = ref();
const childFilter = ref();

// setup filters
const filters: EmojiFilter[] = emojiFilters();

function findEmojis() {
  emojiResults.value = searchEmojis(
    search.value,
    parentFilter.value,
    childFilter.value,
  );

  emojiResults.value = emojiResults.value.filter((emoji: Emoji) => {
    //console.log('emoji.icon.length', emoji.icon.length);
    return emoji.icon.length < 8;
  });
}

// When updating our parent filter, we need to clear our childFilter so it doesn't affect the avatar
function updateParentFilter() {
  childFilter.value = null;
  findEmojis();
}

function updateAvatar(emoji: string) {
  emit('updateAvatar', emoji);
}

onMounted(() => {
  trapFocus('avatar', 'avatar-modal');
});
</script>

<template>
  <div id="avatar-modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5>Change Avatar</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            ✖️
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="findEmojis" class="row justify-content-center">
            <CustomField
              wrapClass="col-md-4 mb-3"
              label="Search"
              id="avatar"
              type="search"
              v-model="search"
            >
              <template #button>
                <button type="submit" class="btn btn-primary">🔎</button>
              </template>
            </CustomField>

            <CustomDropdown
              wrapClass="col-md-4 mb-3"
              label="Category"
              id="category"
              v-model="parentFilter"
              @change="updateParentFilter"
            >
              <template #options>
                <option selected :value="null">All</option>
                <option v-for="(filter, i) in filters" :key="i" :value="filter">
                  {{ capitalize(filter.name) }}
                </option>
              </template>
            </CustomDropdown>

            <CustomDropdown
              v-if="parentFilter && parentFilter.children[0]"
              wrapClass="col-md-4 mb-3"
              label="Sub Category"
              id="sub-category"
              v-model="childFilter"
              @change="findEmojis"
            >
              <template #options>
                <option selected :value="null">All</option>
                <option
                  v-for="(filter, i) in parentFilter.children"
                  :key="i"
                  :value="filter"
                >
                  {{ capitalize(filter) }}
                </option>
              </template>
            </CustomDropdown>
          </form>
          <p class="text-center mb-5">
            <strong>Note:</strong> Not all emojis will appear for all users.
            Different devices use different emojis.
          </p>

          <EmojiList :emojis="emojiResults" @update="updateAvatar" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-dialog {
  max-width: 900px;
  padding: 0 15px;
}

body.darkmode #emoji-list .emoji {
  background-color: var(--soft-white);
  border-color: var(--light-gray);
}

#avatar {
}

@media (max-width: 576px) {
  .modal-dialog {
    padding: 0;
  }
}
</style>
