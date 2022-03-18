<script setup lang="ts">
// TODO: Should this be turned into a modal instead? Can used to search emoji's from any page?
import { ref } from 'vue';
import { capitalize } from '../../utilities/filters';
import { Emoji, Emojis, SearchFilter } from '../../types/Search';

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
      console.log('searching childfilter', childFilter.value);
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

function copy(emoji: string) {
  navigator.clipboard.writeText(emoji);
}
</script>

<template>
  <div id="search" class="page">
    <!-- <Title /> -->
    <div class="row">
      <div class="col-12 text-center">
        <h1>Emoji Search</h1>
      </div>
    </div>

    <div class="container">
      <form @submit.prevent="searchEmojis" class="row justify-content-center">
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
            <button type="submit" class="btn btn-secondary">🔎</button>
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

        <div class="col-md-4 mb-3" v-if="parentFilter && parentFilter.children">
          <label class="col-form-label" for="inputLarge">Sub Category</label>
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
          @click="copy(emoji.icon)"
          v-for="(emoji, i) in emojiResults"
          :key="i"
        >
          <!-- <svg viewBox="0 0 110 110">
            <text y=".9em" font-size="90">{{ emoji.icon }}</text>
          </svg> -->
          {{ emoji.icon }}
          <span class="visually-hidden">{{ emoji.short_name }}</span>
        </div>
      </div>
      <!-- <div class="emoji-list" v-for="emoji in Emojis">{{ emoji.icon }}</div> -->
    </div>
  </div>
</template>

<style scoped>
#app-wrapper.bg-dark .emoji {
  background-color: var(--dark);
  box-shadow: 0 2px 0 2px rgba(255, 255, 255, 0.5);
  border: 2px solid var(--gray);
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
  box-shadow: 0 2px 0 2px rgba(0, 0, 0, 0.5);
}

#emoji-list .emoji:active {
  cursor: grabbing;
  top: 1px;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.5);
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
</style>
