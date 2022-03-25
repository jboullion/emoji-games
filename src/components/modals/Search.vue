<script setup lang="ts">
// TODO: Move into a custom modal
import { onMounted, ref } from 'vue';
import { capitalize } from '../../utilities/filters';
import { copy } from '../../utilities/document';
// TODO: We might want to setup a loading event since this emoji import can be quite big. If not already async, should probably make async. OR load after the initial page load
import {
  Emoji,
  EmojiFilter,
  emojiFilters,
  searchEmojis,
} from '../../types/Emoji';
import CustomField from '../common/CustomField.vue';
import CustomDropdown from '../common/CustomDropdown.vue';
import EmojiList from '../common/EmojiList.vue';

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
}

// When updating our parent filter, we need to clear our childFilter so it doesn't affect the search
function updateParentFilter() {
  childFilter.value = null;
  findEmojis();
}

onMounted(() => {
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search');

  if (searchModal && searchInput) {
    searchModal.addEventListener('shown.bs.modal', function () {
      searchInput.focus();
    });
  }
});
</script>

<template>
  <div id="search-modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5>Emoji Search</h5>
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
              class="col-md-4 mb-3"
              label="Search"
              id="search"
              type="search"
              v-model="search"
            >
              <template #button>
                <button type="submit" class="btn btn-primary">🔎</button>
              </template>
            </CustomField>

            <CustomDropdown
              class="col-md-4 mb-3"
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
              class="col-md-4 mb-3"
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

          <EmojiList :emojis="emojiResults" @update="copy" />
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

#emoji-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
#emoji-list .emoji {
  font-size: 64px;
  margin: 10px;
  padding: 0 10px;
  flex: 1;
  cursor: grab;
  position: relative;
  user-select: none;
  border: 2px solid var(--dark);
  border-radius: 15px;
  border-width: 1px 2px 4px 2px;
}

#emoji-list .emoji:active {
  cursor: grabbing; /* 'copy' is an option as well, but grabbing looks nicer imo  */
  top: 1px;
  border-width: 1px 2px 3px 2px;
}

#emoji-list .emoji:active:after {
  content: 'Copied: ' attr(title);
  font-size: 16px;
  background: #fff;
  color: black;
  padding: 5px;
  border: 2px solid var(--gray);
  border-radius: 15px;
  position: absolute;
  bottom: 95%;
  left: 50%;
  width: 150%;
  max-width: 320px;
  transform: translate(-50%, 0);
  z-index: 10;
}

@media (max-width: 768px) {
  #emoji-list .emoji {
    font-size: 50px;
  }

  #emoji-list .emoji:active:after {
    width: 200%;
  }
}

@media (max-width: 576px) {
  .modal-dialog {
    padding: 0;
  }
}
</style>
