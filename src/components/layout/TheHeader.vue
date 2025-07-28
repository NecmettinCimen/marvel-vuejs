<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()

const router = useRouter()
const searchQuery = ref('')

const navigateTo = (path: string) => {
  router.push(path)
}

const performSearch = () => {
  console.log('Searching for:', searchQuery.value)
  // Implement actual search logic, e.g., navigate to a search results page
}

const userName = () => {
  const userStr = authStore.user
  const user = JSON.parse(userStr ?? '{}')
  return user.username
}

const logout = () => {
  authStore.clearToken()
  router.push('/')
}
</script>

<template>
  <header class="app-header">
    <div class="container header-content">
      <div class="header-left">
        <h1 class="app-logo" @click="navigateTo('/')">ComicVerse</h1>
        <nav class="main-nav">
          <a @click="navigateTo('/')">Characters</a>
          <a @click="navigateTo('/comics')">Comics</a>
        </nav>
      </div>

      <div class="header-right">
        <div class="search-bar">
          <input
            type="text"
            v-model="searchQuery"
            @keyup.enter="performSearch"
            placeholder="Search"
            class="search-input"
          />
          <button @click="performSearch" class="search-button">
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

        <div class="user-actions">
          <button class="icon-button">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon"
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              ></path>
            </svg>
          </button>
          <button class="icon-button">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
          <button @click="navigateTo('/profile')" class="icon-button">
            <label v-if="authStore.isLoggedIn">{{ userName() }}</label>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          <button v-if="authStore.isLoggedIn" @click="logout" class="icon-button logout-button">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background-color: var(--header-footer-bg);
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
}

.app-logo {
  font-size: 1.5rem; /* 2xl */
  font-weight: bold;
  color: var(--primary-red);
  cursor: pointer;
  margin-right: 1.5rem; /* space-x-4 */
}

.main-nav {
  display: none; /* hidden by default */
}

.main-nav a {
  color: var(--text-medium);
  font-size: 1.125rem; /* lg */
  margin-left: 1.5rem; /* space-x-6 */
  transition: color 0.2s ease;
  cursor: pointer;
}

.main-nav a:hover {
  color: var(--primary-red);
  text-decoration: none;
}

.header-right {
  display: flex;
  align-items: center;
}

.search-bar {
  position: relative;
  display: none; /* hidden by default */
  margin-right: 1rem; /* space-x-4 */
}

.search-input {
  background-color: var(--input-bg);
  color: var(--text-light);
  border: none;
  border-radius: 9999px; /* rounded-full */
  padding: 0.5rem 1rem; /* py-2 pl-4 */
  padding-right: 2.5rem; /* pr-10 for icon */
  width: 16rem; /* w-64 */
  outline: none;
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.search-input:focus {
  box-shadow: 0 0 0 2px var(--primary-red); /* focus:ring-2 focus:ring-red-500 */
}

.search-button {
  position: absolute;
  right: 0.75rem; /* right-3 */
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-medium);
  cursor: pointer;
  padding: 0;
  display: flex; /* To center SVG */
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.search-button:hover {
  color: var(--primary-red);
}

.user-actions {
  display: flex;
  align-items: center;
  color: var(--text-medium);
}

.icon-button {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.icon-button:not(:first-child) {
  margin-left: 1rem; /* space-x-4 */
}

.icon-button:hover {
  color: var(--primary-red);
}

.icon {
  width: 1.75rem; /* h-7 w-7 for heart/bookmark */
  height: 1.75rem;
  stroke-width: 2; /* Adjust stroke thickness for icons */
}

.icon-button:last-child .icon {
  width: 2rem; /* h-8 w-8 for user icon */
  height: 2rem;
}

.logout-button {
  color: var(--primary-red);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

/* Responsive Styles (Media Queries) */
@media (min-width: 768px) {
  /* md breakpoint */
  .main-nav {
    display: flex; /* md:flex */
  }
  .search-bar {
    display: block; /* md:block */
  }
}
</style>
