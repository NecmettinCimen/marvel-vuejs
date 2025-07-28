<script setup lang="ts">
import type { Comic } from '@/types/Comic'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

interface Props {
  comic: Comic
}

const props = defineProps<Props>()
const router = useRouter()

const imageUrl = computed(() => props.comic.thumbnail.path + '.' + props.comic.thumbnail.extension)

const navigateToDetail = () => {
  router.push({ name: 'ComicDetail', params: { id: props.comic.id } })
}
</script>

<template>
  <div class="comic-card" @click="navigateToDetail">
    <img :src="imageUrl" :alt="comic.title" class="comic-image" />
    <div class="comic-info">
      <h3 class="comic-title">{{ comic.title }}</h3>
      <div class="comic-details">
        <p v-if="comic.issueNumber" class="comic-detail">Issue #: {{ comic.issueNumber }}</p>
        <p v-if="comic.variantDescription" class="comic-detail">
          Variant: {{ comic.variantDescription }}
        </p>
        <p v-if="comic.prices && comic.prices.length > 0" class="comic-detail">
          Price: ${{ comic.prices[0].price }}
        </p>
        <p v-if="comic.pageCount" class="comic-detail">Pages: {{ comic.pageCount }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comic-card {
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition:
    transform 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
  background-color: #333;
  color: #fff;
}

.comic-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.6);
}

.comic-image {
  width: 100%;
  height: 250px; /* Increased height */
  object-fit: cover;
  display: block;
}

.comic-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  text-align: left;
  opacity: 0;
  transition:
    background 0.3s ease,
    opacity 0.3s ease;
}

.comic-card:hover .comic-info {
  opacity: 1;
}

.comic-title {
  font-size: 1.2em;
  margin: 0 0 5px;
}

.comic-details {
  display: flex;
  flex-direction: column;
}

.comic-detail {
  font-size: 0.9em;
  margin: 3px 0;
}
</style>
