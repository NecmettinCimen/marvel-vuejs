// src/stores/comicStore.ts
import { defineStore } from 'pinia'
import type { Comic } from '@/types/Comic'
import axios from './axiosInstance'

interface ComicState {
  comics: Comic[]
  selectedComic: Comic | null
  loading: boolean
  error: string | null
  currentPage: number
  itemsPerPage: number
  total: number
  searchQuery: string
}

export const useComicStore = defineStore('comics', {
  state: (): ComicState => ({
    comics: [],
    selectedComic: null,
    loading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 20,
    total: 0,
    searchQuery: '',
  }),

  getters: {
    totalPages: (state) => Math.ceil(state.total / state.itemsPerPage),
  },

  actions: {
    async fetchComics(page: number = 1, query: string = '') {
      this.loading = true
      this.searchQuery = query
      try {
        const offset = (page - 1) * this.itemsPerPage
        const response = await axios.get(
          `/marvel-api-net-core/v1/public/comics?offset=${offset}&titleStartsWith=${query}`,
        )
        this.comics = response.data.data.results
        this.total = response.data.data.total
        this.currentPage = page
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.error = error.message
        } else {
          this.error = String(error)
        }
        console.error('Failed to fetch comics:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchComicById(id: string) {
      this.loading = true
      try {
        const response = await axios.get(`/marvel-api-net-core/v1/public/comics/${id}`)
        this.selectedComic = response.data.data.results[0]
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.error = error.message
        } else {
          this.error = String(error)
        }
        console.error('Failed to fetch comics:', error)
      } finally {
        this.loading = false
      }
    },
  },
})
