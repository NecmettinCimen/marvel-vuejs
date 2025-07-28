<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  maxButtons?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxButtons: 5,
})

const emit = defineEmits(['pageChange'])

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))

const visiblePages = computed(() => {
  const pages = []
  const startPage = Math.max(1, props.currentPage - Math.floor(props.maxButtons / 2))
  const endPage = Math.min(totalPages.value, startPage + props.maxButtons - 1)

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  return pages
})

const goToPage = (page: number) => {
  if (page > 0 && page <= totalPages.value && page !== props.currentPage) {
    emit('pageChange', page)
  }
}
</script>

<template>
  <nav class="pagination-nav">
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="pagination-button"
      :class="{ disabled: currentPage === 1 }"
    >
      Previous
    </button>

    <template v-if="visiblePages[0] > 1">
      <button @click="goToPage(1)" class="pagination-button">1</button>
      <span v-if="visiblePages[0] > 2" class="ellipsis">...</span>
    </template>

    <button
      v-for="page in visiblePages"
      :key="page"
      @click="goToPage(page)"
      class="pagination-button"
      :class="{ active: page === currentPage }"
    >
      {{ page }}
    </button>

    <template v-if="visiblePages[visiblePages.length - 1] < totalPages">
      <span v-if="visiblePages[visiblePages.length - 1] < totalPages - 1" class="ellipsis"
        >...</span
      >
      <button @click="goToPage(totalPages)" class="pagination-button">
        {{ totalPages }}
      </button>
    </template>

    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="pagination-button"
      :class="{ disabled: currentPage === totalPages }"
    >
      Next
    </button>
  </nav>
</template>

<style scoped>
.pagination-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem; /* space-x-2 */
}

.pagination-button {
  padding: 0.5rem 1rem; /* px-4 py-2 */
  border-radius: 8px; /* rounded-lg */
  background-color: var(--input-bg); /* gray-700 */
  color: var(--text-light); /* gray-300 */
  border: none;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.pagination-button:hover:not(.active):not(.disabled) {
  background-color: var(--primary-red); /* red-600 */
}

.pagination-button.active {
  background-color: var(--primary-red); /* red-600 */
  color: white;
  cursor: default;
}

.pagination-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ellipsis {
  color: var(--text-medium);
  padding: 0 0.5rem;
}
</style>
