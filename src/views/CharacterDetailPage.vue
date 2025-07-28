<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCharacterStore } from '@/stores/characterStore'
import { useComicStore } from '@/stores/comicStore'
import ComicCard from '@/components/cards/ComicCard.vue'
import BaseLayout from '@/components/layout/BaseLayout.vue'
import type { Character } from '@/types/Character'
import type { Comic } from '@/types/Comic'

const route = useRoute()
const characterStore = useCharacterStore()
const comicStore = useComicStore()

const character = ref<Character | null>(null)
const characterComics = ref<Comic[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  const characterId = route.params.id as string
  if (!characterId) {
    error.value = 'Character ID is missing.'
    loading.value = false
    return
  }

  try {
    loading.value = true
    error.value = null

    const fetchedChar = characterStore.getCharacterById(characterId)
    if (fetchedChar) {
      character.value = fetchedChar
    } else {
      // In a real app, you'd fetch from API if not in store
      // For now, if not in dummy data, show error
      error.value = 'Character not found (simulated).'
      loading.value = false
      return
    }

    // Simulate fetching comics related to this character
    // You would integrate this with your actual API calls
    await comicStore.fetchComicsByCharacter(characterId) // Assumes this action filters comics
    characterComics.value = comicStore.comics // Or a specific getter for related comics
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <BaseLayout>
    <div v-if="loading" class="loading-message">Loading character details...</div>
    <div v-else-if="error" class="error-message">Error: {{ error }}</div>
    <div v-else-if="!character" class="no-results-message">Character not found.</div>
    <div v-else class="character-detail-container">
      <div class="character-header">
        <img
          :src="character.thumbnail || '/images/default-character.jpg'"
          :alt="character.name"
          class="character-avatar"
        />
        <div class="character-info">
          <h2 class="character-name-detail">{{ character.name }}</h2>
          <p class="character-meta">
            <span v-if="character.realName">Real Name: {{ character.realName }} | </span>
            <span v-if="character.firstAppearance"
              >First Appearance: {{ character.firstAppearance }}</span
            >
          </p>
          <h3 class="bio-title">Biography</h3>
          <p class="character-bio">{{ character.description || 'No biography available.' }}</p>
        </div>
      </div>

      <hr class="divider" />

      <h3 class="comics-section-title">Comics Featuring {{ character.name }}</h3>
      <div v-if="comicStore.loadingComics" class="loading-message">Loading comics...</div>
      <div v-else-if="comicStore.errorComics" class="error-message">
        Error loading comics: {{ comicStore.errorComics }}
      </div>
      <div v-else-if="characterComics.length === 0" class="no-results-message">
        No comics found for this character.
      </div>
      <div v-else class="comic-grid">
        <ComicCard v-for="comic in characterComics" :key="comic.id" :comic="comic" />
      </div>
    </div>
  </BaseLayout>
</template>

<style scoped>
.character-detail-container {
  max-width: 960px; /* max-w-4xl */
  margin-left: auto;
  margin-right: auto;
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  padding: 1.5rem; /* p-6 */
}

.character-header {
  display: flex;
  flex-direction: column; /* default to column */
  align-items: center;
  gap: 1.5rem; /* space-y-6 */
}

.character-avatar {
  width: 12rem; /* w-48 */
  height: 12rem; /* h-48 */
  border-radius: 50%; /* rounded-full */
  object-fit: cover;
  border: 4px solid var(--primary-red);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.character-info {
  text-align: center; /* default to center */
}

.character-name-detail {
  font-size: 2.25rem; /* text-4xl */
  font-weight: bold;
  color: var(--text-light);
  margin-bottom: 0.5rem; /* mb-2 */
}

.character-meta {
  font-size: 1rem; /* text-md */
  color: var(--text-medium);
  margin-bottom: 1rem; /* mb-4 */
}

.bio-title {
  font-size: 1.5rem; /* text-2xl */
  font-weight: 600; /* font-semibold */
  color: var(--text-light);
  margin-bottom: 0.5rem; /* mb-2 */
}

.character-bio {
  color: var(--text-light);
  line-height: 1.6;
}

.divider {
  border: none;
  border-top: 1px solid var(--input-bg); /* border-gray-700 */
  margin-top: 2rem; /* my-8 */
  margin-bottom: 2rem;
}

.comics-section-title {
  font-size: 1.5rem; /* text-2xl */
  font-weight: 600; /* font-semibold */
  color: var(--text-light);
  margin-bottom: 1rem; /* mb-4 */
}

.comic-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* grid-cols-2 */
  gap: 1.5rem; /* gap-6 */
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

/* Responsive Styles */
@media (min-width: 768px) {
  /* md breakpoint */
  .character-header {
    flex-direction: row; /* md:flex-row */
    align-items: flex-start; /* md:items-start */
    gap: 2rem; /* md:space-x-8 */
  }
  .character-info {
    text-align: left; /* md:text-left */
  }
  .comic-grid {
    grid-template-columns: repeat(3, 1fr); /* md:grid-cols-3 */
  }
}

@media (min-width: 1024px) {
  /* lg breakpoint */
  .comic-grid {
    grid-template-columns: repeat(4, 1fr); /* lg:grid-cols-4 */
  }
}
</style>
