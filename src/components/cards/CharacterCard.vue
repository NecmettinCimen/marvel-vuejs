<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Character } from '@/types/Character'
import { computed } from 'vue'
interface Props {
  character: Character
  showDescription?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  showDescription: true,
})
const imageUrl = computed(
  () =>
    props.character.thumbnail.path + '.' + props.character.thumbnail.extension ||
    '/path/to/default-image.png',
)
const router = useRouter()

const navigationToDetail = () => {
  router.push({ name: 'CharacterDetail', params: { id: props.character.id } })
}
</script>
<template>
  <div class="character-card" @click="navigationToDetail">
    <img :src="imageUrl" :alt="character.name" class="character-image" />
    <div class="character-info">
      <h3 class="character-name">{{ character.name }}</h3>
      <div class="character-counts">
        <button class="count-button">Comics: {{ character.comics.available }}</button>
        <button class="count-button">Series: {{ character.series.available }}</button>
        <button class="count-button">Stories: {{ character.stories.available }}</button>
        <button class="count-button">Events: {{ character.events.available }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.character-card {
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition:
    transform 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
}

.character-card:hover {
  transform: translateY(-5px); /* Slight lift effect */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.7); /* Stronger shadow */
}

.character-image {
  width: 100%;
  height: 100%; /* Make the image take up the full height of the card */
  object-fit: cover; /* Ensure the image covers the area without stretching */
  display: block;
}

.character-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0); /* Initially transparent */
  color: #fff;
  padding: 10px;
  text-align: left;
  opacity: 0; /* Initially hidden */
  transition:
    background 0.3s ease,
    opacity 0.3s ease;
}

.character-card:hover .character-info {
  background: rgba(0, 0, 0, 0.7); /* Semi-transparent on hover */
  opacity: 1; /* Visible on hover */
}

.character-name {
  font-size: 1.2em;
  margin: 0 0 5px;
}

.character-counts {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px;
}

.count-button {
  margin: 3px 0;
  font-size: 0.8em;
  background-color: rgba(0, 0, 0, 0.5);
  color: #eee;
  border: none;
  padding: 5px 8px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.count-button:hover {
  background-color: rgba(0, 0, 0, 0.7); /* Darker on hover */
}
</style>
