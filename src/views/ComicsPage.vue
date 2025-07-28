<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useComicStore } from '@/stores/comicStore'
import ComicCard from '@/components/cards/ComicCard.vue'
import Pagination from '@/components/base/Pagination.vue'
import BaseLayout from '@/components/layout/BaseLayout.vue'

const comicStore = useComicStore()

const searchQuery = ref('')
const sortOption = ref('releaseDate')
const filterBySeries = ref('')
const filterByCreator = ref('')

const filteredAndSortedComics = computed(() => {
  let comics = comicStore.comics

  if (searchQuery.value) {
    comics = comics.filter(
      (comic) =>
        comic.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (comic.issueNumber && comic.issueNumber.toString().includes(searchQuery.value)),
    )
  }

  return comics
})

const handlePageChange = (newPage: number) => {
  comicStore.fetchComics(newPage, searchQuery.value)
}

const applyFiltersAndSort = () => {
  // Pass current filter/sort options to store action
  comicStore.fetchComics(1, searchQuery.value)
}

onMounted(() => {
  comicStore.fetchComics(1)
})
</script>

<template>
  <BaseLayout>
    <section class="comics-page-section">
      <h2 class="section-title">Comics</h2>
      <p class="section-description">
        Explore the vast universe of Marvel comics, search for your favorite titles or browse by
        issue number, creator, and more.
      </p>

      <div class="filter-sort-bar">
        <div class="search-input-wrapper">
          <input
            type="text"
            v-model="searchQuery"
            @keyup.enter="applyFiltersAndSort"
            placeholder="Search comics by title or issue number"
            class="filter-sort-input search-full-width"
          />
          <button @click="applyFiltersAndSort" class="search-button-on-input">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        <div class="filter-sort-group-full">
          <div class="dropdown-wrapper">
            <select v-model="sortOption" @change="applyFiltersAndSort" class="filter-sort-select">
              <option value="releaseDate">Sort by: Release Date</option>
              <option value="title">Sort by: Title</option>
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
            <select
              v-model="filterBySeries"
              @change="applyFiltersAndSort"
              class="filter-sort-select"
            >
              <option value="">Filter by: Series</option>
              <option value="Spider-Man">Spider-Man</option>
              <option value="Avengers">Avengers</option>
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
            <select
              v-model="filterByCreator"
              @change="applyFiltersAndSort"
              class="filter-sort-select"
            >
              <option value="">Filter by: Creator</option>
              <option value="Stan Lee">Stan Lee</option>
              <option value="Jack Kirby">Jack Kirby</option>
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

      <div v-if="comicStore.loading" class="loading-message">Loading comics...</div>
      <div v-else-if="comicStore.error" class="error-message">Error: {{ comicStore.error }}</div>
      <div v-else-if="filteredAndSortedComics.length === 0" class="no-results-message">
        No comics found.
      </div>
      <div v-else class="comic-grid-comics-page">
        <ComicCard v-for="comic in comicStore.comics" :key="comic.id" :comic="comic" />
      </div>

      <div v-if="comicStore.total > comicStore.itemsPerPage" class="pagination-wrapper">
        <Pagination
          :current-page="comicStore.currentPage"
          :total-items="comicStore.total"
          :items-per-page="comicStore.itemsPerPage"
          @page-change="handlePageChange"
        />
      </div>
    </section>
  </BaseLayout>
</template>

<style scoped>
.comics-page-section {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: var(--text-light);
}

.section-description {
  color: var(--text-medium);
  margin-bottom: 1.5rem;
}

.filter-sort-bar {
  display: flex;
  flex-direction: column; /* default to column */
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.search-input-wrapper {
  position: relative;
  flex-grow: 1;
  width: 100%;
}

.filter-sort-input {
  background-color: var(--input-bg);
  color: var(--text-light);
  border: none;
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  padding-right: 2.5rem; /* Space for search icon */
  width: 100%;
  outline: none;
  transition: box-shadow 0.2s ease;
}

.filter-sort-input:focus {
  box-shadow: 0 0 0 2px var(--primary-red);
}

.search-button-on-input {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-medium);
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.search-button-on-input:hover {
  color: var(--primary-red);
}

.search-button-on-input .icon {
  width: 1.5rem;
  height: 1.5rem;
}

.filter-sort-group-full {
  display: flex;
  flex-wrap: wrap; /* Allow wrapping */
  gap: 1rem;
  justify-content: center; /* Center on small screens */
  width: 100%;
}

.dropdown-wrapper {
  position: relative;
  display: inline-block;
}

.filter-sort-select {
  background-color: var(--input-bg);
  color: var(--text-light);
  border: none;
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  padding-right: 2rem;
  appearance: none;
  outline: none;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
}

.filter-sort-select:focus {
  box-shadow: 0 0 0 2px var(--primary-red);
}

.select-arrow {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--text-medium);
}

.select-arrow .arrow-icon {
  width: 1rem;
  height: 1rem;
  fill: currentColor;
}

.comic-grid-comics-page {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.loading-message,
.error-message,
.no-results-message {
  text-align: center;
  font-size: 1.25rem;
  padding: 2rem;
  color: var(--primary-red);
}

.no-results-message {
  color: var(--text-medium);
}

.pagination-wrapper {
  margin-top: 2.5rem;
}

/* Responsive Styles */
@media (min-width: 640px) {
  /* sm breakpoint */
  .comic-grid-comics-page {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 768px) {
  /* md breakpoint */
  .filter-sort-bar {
    flex-direction: row;
    gap: 0;
  }
  .filter-sort-bar > *:not(:first-child) {
    margin-left: 1rem;
  }
  .filter-sort-group-full {
    flex-wrap: nowrap;
    justify-content: flex-end;
  }
  .comic-grid-comics-page {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1024px) {
  /* lg breakpoint */
  .comic-grid-comics-page {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (min-width: 1280px) {
  /* xl breakpoint */
  .comic-grid-comics-page {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
