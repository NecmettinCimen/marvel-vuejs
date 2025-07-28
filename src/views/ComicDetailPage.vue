<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useComicStore } from '@/stores/comicStore'
import { useCharacterStore } from '@/stores/characterStore'
import CharacterCard from '@/components/cards/CharacterCard.vue'
import BaseLayout from '@/components/layout/BaseLayout.vue'
import type { Comic } from '@/types/Comic'
import type { Character } from '@/types/Character'

const route = useRoute()
const comicStore = useComicStore()
const characterStore = useCharacterStore()

const comic = ref<Comic | null>(null)
const comicCharacters = ref<Character[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  const comicId = route.params.id as string
  if (!comicId) {
    error.value = 'Comic ID is missing.'
    loading.value = false
    return
  }

  try {
    loading.value = true
    error.value = null

    // Simulate fetching a single comic by ID (replace with actual store action)
    const dummyComics: Comic[] = [
      {
        id: 'amazing-spider-man-1',
        title: 'Amazing Spider-Man #1',
        issueNumber: 1,
        publishedDate: '2023-01-01',
        description:
          "Peter Parker's life takes a dramatic turn as he faces new challenges and old foes.",
        thumbnail: '/images/amazing-spider-man-1.jpg',
        characters: ['spider-man', 'mary-jane-watson', 'green-goblin', 'doctor-octopus'],
      },
      {
        id: 'invincible-iron-man-1',
        title: 'The Invincible Iron Man #1',
        issueNumber: 1,
        publishedDate: '2023-02-01',
        description: 'Tony Stark faces new threats as Iron Man.',
        thumbnail: '/images/iron-man-1.jpg',
        characters: ['iron-man'],
      },
      // ... more dummy comics
    ]
    const foundComic = dummyComics.find((c) => c.id === comicId)
    if (foundComic) {
      comic.value = foundComic
    } else {
      error.value = 'Comic not found (simulated).'
      loading.value = false
      return
    }

    // Simulate fetching characters appearing in this comic
    // In a real scenario, your characterStore would fetch characters based on comicId
    const dummyCharacters: Character[] = [
      {
        id: 'spider-man',
        name: 'Spider-Man',
        description: 'Peter Parker.',
        thumbnail: '/images/spiderman.jpg',
      },
      {
        id: 'mary-jane-watson',
        name: 'Mary Jane Watson',
        description: 'Mary Jane Watson.',
        thumbnail: '/images/mary-jane.jpg',
      },
      {
        id: 'green-goblin',
        name: 'Green Goblin',
        description: 'Norman Osborn.',
        thumbnail: '/images/green-goblin.jpg',
      },
      {
        id: 'doctor-octopus',
        name: 'Doctor Octopus',
        description: 'Otto Octavius.',
        thumbnail: '/images/doctor-octopus.jpg',
      },
      {
        id: 'iron-man',
        name: 'Iron Man',
        description: 'Tony Stark.',
        thumbnail: '/images/iron-man.jpg',
      },
      // ... more dummy characters
    ]
    if (comic.value && comic.value.characters) {
      comicCharacters.value = dummyCharacters.filter((char) =>
        comic.value?.characters?.includes(char.id),
      )
    }
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <BaseLayout>
    <div v-if="loading" class="loading-message">Loading comic details...</div>
    <div v-else-if="error" class="error-message">Error: {{ error }}</div>
    <div v-else-if="!comic" class="no-results-message">Comic not found.</div>
    <div v-else class="comic-detail-container">
      <div class="comic-header">
        <img
          :src="comic.thumbnail || '/images/default-comic.jpg'"
          :alt="comic.title"
          class="comic-cover"
        />
        <div class="comic-info">
          <h2 class="comic-title-detail">{{ comic.title }}</h2>
          <p class="comic-published">Published: {{ comic.publishedDate }}</p>
          <p class="comic-description-detail">
            {{ comic.description || 'No description available.' }}
          </p>
        </div>
      </div>

      <hr class="divider" />

      <h3 class="characters-section-title">Characters</h3>
      <div v-if="characterStore.loading" class="loading-message">Loading characters...</div>
      <div v-else-if="characterStore.error" class="error-message">
        Error loading characters: {{ characterStore.error }}
      </div>
      <div v-else-if="comicCharacters.length === 0" class="no-results-message">
        No characters listed for this comic.
      </div>
      <div v-else class="character-grid-comic-detail">
        <CharacterCard
          v-for="character in comicCharacters"
          :key="character.id"
          :character="character"
          :show-description="false"
        />
      </div>
    </div>
  </BaseLayout>
</template>

<style scoped>
.comic-detail-container {
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
}

.comic-header {
  display: flex;
  flex-direction: column; /* default to column */
  align-items: center;
  gap: 1.5rem;
}

.comic-cover {
  width: 15rem; /* custom size based on image */
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}

.comic-info {
  text-align: center; /* default to center */
}

.comic-title-detail {
  font-size: 2rem; /* text-3xl */
  font-weight: bold;
  color: var(--text-light);
  margin-bottom: 0.5rem;
}

.comic-published {
  font-size: 1rem;
  color: var(--text-medium);
  margin-bottom: 1rem;
}

.comic-description-detail {
  color: var(--text-light);
  line-height: 1.6;
}

.divider {
  border: none;
  border-top: 1px solid var(--input-bg);
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.characters-section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: 1rem;
}

.character-grid-comic-detail {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* grid-cols-2 */
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

/* Responsive Styles */
@media (min-width: 768px) {
  /* md breakpoint */
  .comic-header {
    flex-direction: row; /* md:flex-row */
    align-items: flex-start;
    gap: 2rem;
  }
  .comic-info {
    text-align: left; /* md:text-left */
  }
  .character-grid-comic-detail {
    grid-template-columns: repeat(4, 1fr); /* md:grid-cols-4 */
  }
}

@media (min-width: 1024px) {
  /* lg breakpoint */
  .character-grid-comic-detail {
    grid-template-columns: repeat(5, 1fr); /* lg:grid-cols-5 */
  }
}
</style>
