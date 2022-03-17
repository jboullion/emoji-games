<script setup lang="ts">
import { ref } from 'vue';
import Title from '../pages/common/Title.vue';
import { capitalize } from '../../utilities/filters';
import { Emoji, Emojis, SearchFilter } from '../../types/Search';

const search = ref('');
const emojiResults = ref<Emoji[]>([]);
const filters: SearchFilter[] = [];
const parentFilter = ref();

// setup filters
Emojis.forEach((emoji) => {
  const parentID = filters.findIndex(
    (filter) => filter.name === emoji.parent_cat,
  );

  if (parentID === -1) {
    filters.push({
      name: emoji.parent_cat,
      children: [emoji],
    });
  } else {
    filters[parentID].children.push(emoji);
  }
});

function searchEmojis() {
  emojiResults.value = Emojis.filter((emoji) => {
    let valid = true;

    if (search.value) {
      valid = emoji.short_name.includes(search.value);
    }

    if (valid && parentFilter.value) {
      valid = emoji.parent_cat === parentFilter.value.name;
    }

    return valid;
  });
}

function copy(emoji: string) {
  navigator.clipboard.writeText(emoji);
}
</script>

<template>
  <div id="home" class="">
    <Title />

    <p class="text-center">
      <strong>Note:</strong> Not all emojis will appear for all users.
      Difference devices use different emoji sets.
    </p>
    <div class="container text-center">
      <form @submit.prevent="searchEmojis">
        <div class="input-group mb-3">
          <input
            type="search"
            class="form-control"
            placeholder="Search"
            v-model="search"
          />
          <button class="btn btn-outline-secondary" id="button-addon2">
            🔎
          </button>
        </div>

        <select
          class="form-select"
          aria-label="Select Category"
          v-model="parentFilter"
          @change="searchEmojis"
        >
          <option selected>- Select Category -</option>
          <option v-for="(filter, i) in filters" :key="i" :value="filter">
            {{ capitalize(filter.name) }}
          </option>
        </select>

        <!-- <div
          class="btn-group"
          role="group"
          aria-label="Basic checkbox toggle button group"
        >
          <FilterBtn
            v-for="(filter, i) in filters"
            :key="i"
            :filter="filter"
            :id="'parent-' + i"
          />
        </div> -->
      </form>

      <div id="emoji-list">
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
#emoji-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
#emoji-list .emoji {
  font-size: 64px;
  margin: 10px;
  flex: 1;
  cursor: grab;
  position: relative;
  user-select: none;
  border: 2px solid #111;
  border-radius: 15px;
  box-shadow: 0 2px 0 2px rgba(0, 0, 0, 0.5);
}

#emoji-list .emoji:active {
  cursor: grabbing;
  top: 1px;
}

#emoji-list .emoji:active:after {
  content: attr(title);
  font-size: 16px;
  background: #fff;
  padding: 5px;
  border: 2px solid #222;
  border-radius: 15px;
  position: absolute;
  top: 100%;
  left: -25%;
  width: 150%;
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
