<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useCharacterStore } from '@/stores/characterStore'
import CharacterCard from '@/components/cards/CharacterCard.vue'
import Pagination from '@/components/base/Pagination.vue'
import BaseLayout from '@/components/layout/BaseLayout.vue'
import { debounce } from 'lodash'

const characterStore = useCharacterStore()

const sortOption = ref('name')
const filterOption = ref('all')
const searchQuery = ref('')

const filteredAndSortedCharacters = computed(() => {
  let characters = characterStore.characters
  if (sortOption.value === 'name') {
    characters = characters.sort((a, b) => a.name.localeCompare(b.name))
  }
  if (sortOption.value === 'id') {
    characters = characters.sort((a, b) => a.id.toString().localeCompare(b.id.toString()))
  }
  // Add more filtering/sorting logic here if characterStore doesn't handle it
  return characters
})

const handlePageChange = (newPage: number) => {
  characterStore.fetchCharacters(newPage, searchQuery.value)
}

const debouncedSearch = debounce(() => {
  characterStore.fetchCharacters(1, searchQuery.value)
}, 500)
onMounted(() => {
  characterStore.fetchCharacters(1, '')
})
</script>

<template>
  <BaseLayout>
    <section class="home-page-section">
      <h2 class="section-title">Marvel Universe</h2>

      <div class="filter-sort-bar">
        <div class="search-input-wrapper">
          <input
            type="text"
            v-model="searchQuery"
            @input="debouncedSearch"
            placeholder="Search for characters"
            class="filter-sort-input"
          />
        </div>

        <div class="filter-sort-group">
          <div class="dropdown-wrapper">
            <select v-model="sortOption" class="filter-sort-select">
              <option value="name">Sort by Name</option>
              <option value="id">Sort by ID</option>
            </select>
            <div class="select-arrow">
              <svg viewBox="0 0 20 20" fill="currentColor" class="arrow-icon">
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"
                />
              </svg>
            </div>
          </div>
          <div class="dropdown-wrapper">
            <select v-model="filterOption" class="filter-sort-select">
              <option value="all">Filter by All</option>
              <option value="hero">Hero</option>
              <option value="villain">Villain</option>
            </select>
            <div class="select-arrow">
              <svg viewBox="0 0 20 20" fill="currentColor" class="arrow-icon">
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div v-if="characterStore.loading" class="loading-message">Loading characters...</div>
      <div v-else-if="characterStore.error" class="error-message">
        Error: {{ characterStore.error }}
      </div>
      <div v-else-if="filteredAndSortedCharacters.length === 0" class="no-results-message">
        No characters found.
      </div>
      <div v-else class="character-grid">
        <CharacterCard
          v-for="character in characterStore.characters"
          :key="character.id"
          :character="character"
          :show-description="true"
        />
      </div>

      <div
        v-if="characterStore.totalCharacters > characterStore.itemsPerPage"
        class="pagination-wrapper"
      >
        <Pagination
          :current-page="characterStore.currentPage"
          :total-items="characterStore.totalCharacters"
          :items-per-page="characterStore.itemsPerPage"
          @page-change="handlePageChange"
        />
      </div>
    </section>
  </BaseLayout>
</template>

<style scoped>
.home-page-section {
  max-width: 1280px; /* max-w-6xl */
  margin-left: auto;
  margin-right: auto;
}

.section-title {
  font-size: 2rem; /* text-3xl */
  font-weight: bold;
  margin-bottom: 1.5rem; /* mb-6 */
  color: var(--text-light);
}

.filter-sort-bar {
  display: flex;
  flex-direction: column; /* default to column for small screens */
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem; /* mb-6 */
  gap: 1rem; /* space-y-4 for column, space-x-4 for row */
}

.search-input-wrapper {
  flex-grow: 1;
  width: 100%; /* Full width on small screens */
}

.filter-sort-input {
  background-color: var(--input-bg);
  color: var(--text-light);
  border: none;
  border-radius: 9999px; /* rounded-full */
  padding: 0.5rem 1rem; /* py-2 px-4 */
  width: 100%;
  outline: none;
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.filter-sort-input:focus {
  box-shadow: 0 0 0 2px var(--primary-red);
}

.filter-sort-group {
  display: flex;
  flex-wrap: wrap; /* Allow wrapping for small screens */
  gap: 1rem; /* space-x-4 */
  justify-content: center; /* Center items on small screens */
  width: 100%; /* Full width on small screens */
}

.dropdown-wrapper {
  position: relative;
  display: inline-block;
}

.filter-sort-select {
  background-color: var(--input-bg);
  color: var(--text-light);
  border: none;
  border-radius: 9999px; /* rounded-full */
  padding: 0.5rem 1rem; /* py-2 px-4 */
  padding-right: 2rem; /* pr-8 for arrow */
  appearance: none; /* Hide default arrow */
  outline: none;
  cursor: pointer;
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.filter-sort-select:focus {
  box-shadow: 0 0 0 2px var(--primary-red);
}

.select-arrow {
  position: absolute;
  right: 0.5rem; /* px-2 */
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--text-medium);
}

.select-arrow .arrow-icon {
  width: 1rem; /* h-4 w-4 */
  height: 1rem;
  fill: currentColor;
}

.character-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* grid-cols-2 */
  gap: 1.5rem; /* gap-6 */
}

.loading-message,
.error-message,
.no-results-message {
  text-align: center;
  font-size: 1.25rem; /* text-xl */
  padding: 2rem; /* py-8 */
  color: var(--primary-red); /* error */
}

.no-results-message {
  color: var(--text-medium); /* gray-400 */
}

.pagination-wrapper {
  margin-top: 2.5rem; /* mt-10 */
}

/* Responsive Styles */
@media (min-width: 640px) {
  /* sm breakpoint */
  .character-grid {
    grid-template-columns: repeat(3, 1fr); /* sm:grid-cols-3 */
  }
}

@media (min-width: 768px) {
  /* md breakpoint */
  .filter-sort-bar {
    flex-direction: row; /* md:flex-row */
    gap: 0; /* reset gap */
    justify-content: space-between;
  }
  .filter-sort-bar > *:not(:first-child) {
    margin-left: 1rem; /* md:space-x-4 */
  }
  .search-input-wrapper {
    width: auto; /* auto width */
  }
  .filter-sort-group {
    flex-wrap: nowrap; /* no wrapping */
    justify-content: flex-end; /* align to right */
    width: auto; /* auto width */
  }
  .character-grid {
    grid-template-columns: repeat(4, 1fr); /* md:grid-cols-4 */
  }
}

@media (min-width: 1024px) {
  /* lg breakpoint */
  .character-grid {
    grid-template-columns: repeat(5, 1fr); /* lg:grid-cols-5 */
  }
}

@media (min-width: 1280px) {
  /* xl breakpoint */
  .character-grid {
    grid-template-columns: repeat(6, 1fr); /* xl:grid-cols-6 */
  }
}
</style>
