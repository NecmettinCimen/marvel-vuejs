<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import BaseLayout from '@/components/layout/BaseLayout.vue' // Layout'u kullanmak için

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const errorMessage = ref<string | null>(null)
const isLoading = ref(false)

const handleLogin = async () => {
  errorMessage.value = null
  isLoading.value = true

  try {
    const success = await authStore.login(username.value, password.value)

    if (success) {
      console.log('Login successful!')
      router.push('/')
    } else {
      errorMessage.value = 'Invalid username or password.'
    }
  } catch (error: unknown) {
    errorMessage.value = 'An unexpected error occurred during login.'
    console.error('Login error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <BaseLayout>
    <div class="login-page-container">
      <div class="login-card">
        <h2 class="login-title">Login to ComicVerse</h2>
        <p class="login-subtitle">Enter your credentials to access your account.</p>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              id="username"
              v-model="username"
              placeholder="Enter your username"
              class="form-input"
              required
            />
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Enter your password"
              class="form-input"
              required
            />
          </div>

          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

          <button type="submit" :disabled="isLoading" class="login-button">
            <span v-if="isLoading" class="spinner"></span>
            <span v-else>Login</span>
          </button>

          <p class="signup-link">
            Don't have an account?
            <router-link to="/register" class="link-text">Sign Up</router-link>
          </p>
          <p class="forgot-password-link">
            <router-link to="/forgot-password" class="link-text">Forgot Password?</router-link>
          </p>
        </form>
      </div>
    </div>
  </BaseLayout>
</template>

<style scoped>
.login-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(
    100vh - var(--header-height) - var(--footer-height)
  ); /* Ekran yüksekliğine göre ortala */
  padding: 2rem 1rem;
}

.login-card {
  background-color: var(--card-bg); /* #262626 */
  border-radius: 12px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
  padding: 2.5rem 2rem; /* p-10 px-8 */
  width: 100%;
  max-width: 400px; /* max-w-md */
  text-align: center;
}

.login-title {
  font-size: 2rem; /* text-3xl */
  font-weight: bold;
  color: var(--primary-red);
  margin-bottom: 0.75rem; /* mb-3 */
}

.login-subtitle {
  font-size: 1rem; /* text-base */
  color: var(--text-medium); /* gray-400 */
  margin-bottom: 2rem; /* mb-8 */
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem; /* space-y-5 */
}

.form-group {
  text-align: left;
}

.form-label {
  display: block;
  font-size: 0.875rem; /* text-sm */
  font-weight: 500;
  color: var(--text-light); /* gray-200 */
  margin-bottom: 0.5rem; /* mb-2 */
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem; /* py-3 px-4 */
  border: 1px solid var(--input-bg); /* border-gray-700 */
  border-radius: 8px;
  background-color: var(--input-bg); /* gray-700 */
  color: var(--text-light);
  font-size: 1rem;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.form-input::placeholder {
  color: var(--text-dark); /* gray-500 */
}

.form-input:focus {
  border-color: var(--primary-red);
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.5); /* ring-2 ring-red-500/50 */
}

.error-message {
  color: var(--primary-red); /* red-500 */
  font-size: 0.875rem; /* text-sm */
  margin-top: 0.5rem; /* mt-2 */
  text-align: center;
}

.login-button {
  width: 100%;
  padding: 0.75rem 1.5rem; /* py-3 px-6 */
  background-color: var(--primary-red); /* red-600 */
  color: white;
  font-size: 1.125rem; /* text-lg */
  font-weight: 600; /* font-semibold */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.login-button:hover:not(:disabled) {
  background-color: #dc2626; /* red-700 */
  transform: translateY(-2px);
}

.login-button:disabled {
  background-color: #b91c1c; /* red-800, darker disabled */
  cursor: not-allowed;
  opacity: 0.7;
}

/* Spinner for loading state */
.spinner {
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #fff;
  border-radius: 50%;
  width: 1.25rem; /* w-5 */
  height: 1.25rem; /* h-5 */
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.signup-link,
.forgot-password-link {
  font-size: 0.875rem; /* text-sm */
  color: var(--text-medium); /* gray-400 */
  margin-top: 1rem; /* mt-4 */
}

.link-text {
  color: var(--primary-red);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
}

.link-text:hover {
  color: #ef4444; /* red-500 (slightly lighter on hover) */
  text-decoration: underline;
}

/* Responsive adjustments if needed */
@media (max-width: 640px) {
  .login-card {
    padding: 2rem 1.5rem;
  }
  .login-title {
    font-size: 1.75rem;
  }
}
</style>
