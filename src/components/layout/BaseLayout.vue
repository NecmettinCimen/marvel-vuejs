<script setup lang="ts">
import TheHeader from './TheHeader.vue'
import TheFooter from './TheFooter.vue'
</script>

<template>
  <div class="base-layout">
    <TheHeader />
    <main class="main-content">
      <div class="container">
        <slot></slot>
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<style scoped>
.base-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--dark-bg);
  color: var(--text-light);
}

.main-content {
  flex-grow: 1;
  padding-top: 2rem; /* py-8 */
  padding-bottom: 2rem; /* py-8 */
}

.container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
