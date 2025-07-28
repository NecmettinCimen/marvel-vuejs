import { defineStore } from 'pinia'
import type { Character } from '@/types/Character' // Assuming Character interface
import axios from './axiosInstance'

interface CharacterState {
  characters: Character[]
  loading: boolean
  error: string | null
  // Add pagination, filters etc. here
  currentPage: number
  itemsPerPage: number
  totalCharacters: number
  searchTerm: string
  abortController: AbortController
}

export const useCharacterStore = defineStore('character', {
  state: (): CharacterState => ({
    characters: [],
    loading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 20, // Example
    totalCharacters: 0,
    searchTerm: '',
    abortController: new AbortController(),
  }),
  getters: {
    getCharacterById: (state) => (id: string) => {
      return state.characters.find((character) => character.id.toString() === id)
    },
    paginatedCharacters: (state) => {
      const start = (state.currentPage - 1) * state.itemsPerPage
      const end = start + state.itemsPerPage
      return state.characters.slice(start, end)
    },
  },
  actions: {
    async fetchCharacters(page: number = 1, searchTerm: string = '') {
      this.loading = true
      try {
        const offset = (page - 1) * this.itemsPerPage

        const response = await axios.get(
          `/marvel-api-net-core/v1/public/characters?offset=${offset}&nameStartsWith=${searchTerm}`,
          { signal: this.abortController.signal },
        )

        if (response.data.code === 200) {
          this.characters = response.data.data.results
          this.totalCharacters = response.data.data.total
          this.currentPage = page
          this.loading = false
          this.error = null
        } else {
          this.error = 'Failed to fetch characters'
          this.loading = false
        }
      } catch {
        this.error = 'An error occurred while fetching characters'
        this.loading = false
      }
    },
    // You can add more actions like:
    // async fetchCharacterDetail(id: string) { ... }
    // updateCharacterSearchTerm(term: string) { this.searchTerm = term; }
    // setCharacterPage(page: number) { this.currentPage = page; }
  },
})
