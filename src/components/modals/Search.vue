<script setup lang="ts">
// TODO: Should this be turned into a modal instead? Can used to search emoji's from any page?
import { onMounted, ref } from 'vue';
import { capitalize } from '../../utilities/filters';
import { copy } from '../../utilities/document';
import { Emoji, Emojis } from '../../types/Emoji';

type SearchFilter = {
  name: string;
  children: string[];
};

const search = ref('');
const emojiResults = ref<Emoji[]>([]);
const filters: SearchFilter[] = [];
const parentFilter = ref();
const childFilter = ref();

// setup filters
Emojis.forEach((emoji) => {
  const parentID = filters.findIndex(
    (filter) => filter.name === emoji.parent_cat,
  );

  if (parentID === -1) {
    filters.push({
      name: emoji.parent_cat,
      children: [emoji.child_cat],
    });
  } else {
    if (!filters[parentID].children.includes(emoji.child_cat)) {
      filters[parentID].children.push(emoji.child_cat);
    }
  }
});

filters.sort((a, b) => (a.name > b.name ? 1 : -1));

function searchEmojis() {
  const searchTerms = search.value.split(' ');
  emojiResults.value = Emojis.filter((emoji) => {
    let valid = true;

    if (searchTerms) {
      // search by multiple terms
      searchTerms.forEach((term) => {
        if (!valid) return;
        valid = emoji.short_name.includes(term);
      });
    }

    if (valid && parentFilter.value) {
      valid = emoji.parent_cat === parentFilter.value.name;
    }

    if (valid && childFilter.value) {
      valid = emoji.child_cat === childFilter.value;
    }

    return valid;
  });
}

// When updating our parent filter, we need to clear our childFilter so it doesn't affect the search
function updateParentFilter() {
  childFilter.value = null;
  searchEmojis();
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
          <form
            @submit.prevent="searchEmojis"
            class="row justify-content-center"
          >
            <div class="col-md-4 mb-3">
              <label class="col-form-label" for="search">Search</label>
              <div class="input-group">
                <input
                  id="search"
                  type="search"
                  class="form-control"
                  placeholder="Search"
                  v-model="search"
                  maxlength="30"
                />
                <button type="submit" class="btn btn-outline-secondary">
                  🔎
                </button>
              </div>
            </div>

            <div class="col-md-4 mb-3">
              <label class="col-form-label" for="inputLarge">Category</label>
              <select
                class="form-select"
                aria-label="Select Category"
                placeholder="Category"
                v-model="parentFilter"
                @change="updateParentFilter"
              >
                <option selected :value="null">All</option>
                <option v-for="(filter, i) in filters" :key="i" :value="filter">
                  {{ capitalize(filter.name) }}
                </option>
              </select>
            </div>

            <div
              class="col-md-4 mb-3"
              v-if="parentFilter && parentFilter.children[0]"
            >
              <label class="col-form-label" for="inputLarge"
                >Sub Category</label
              >
              <select
                class="form-select"
                aria-label="Select Sub Category"
                placeholder="Sub Category"
                v-model="childFilter"
                @change="searchEmojis"
              >
                <option selected :value="null">All</option>
                <option
                  v-for="(filter, i) in parentFilter.children"
                  :key="i"
                  :value="filter"
                >
                  {{ capitalize(filter) }}
                </option>
              </select>
            </div>
          </form>
          <p class="text-center mb-5">
            <strong>Note:</strong> Not all emojis will appear for all users.
            Different devices use different emojis.
          </p>

          <div id="emoji-list" class="text-center">
            <div
              class="emoji"
              :title="emoji.short_name"
              @mousedown="copy(emoji.icon)"
              v-for="(emoji, i) in emojiResults"
              :key="i"
            >
              {{ emoji.icon }}
              <!-- <span class="visually-hidden">{{ emoji.short_name }}</span> -->
            </div>
          </div>
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

body.darkmode .emoji {
  background-color: var(--dark);
  box-shadow: 0 2px 0 2px rgba(255, 255, 255, 0.5);
  border: 2px solid var(--gray);
}

#search {
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
