<script setup lang="ts">
import BaseLayout from '@/components/layout/BaseLayout.vue'
import { useAuthStore } from '@/stores/authStore'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

onBeforeMount(() => {
  if (!authStore.isLoggedIn) {
    router.push('/login')
  }
})
</script>

<template>
  <BaseLayout>
    <h1>My Profile</h1>
    <p>Welcome to your profile</p>
  </BaseLayout>
</template>
