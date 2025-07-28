<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useReCaptcha } from 'vue-recaptcha-v3'

import BaseLayout from '@/components/layout/BaseLayout.vue' // Layout'u kullanmak için

const router = useRouter()
const { executeRecaptcha } = useReCaptcha()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref<string | null>(null)
const successMessage = ref<string | null>(null)
const isLoading = ref(false)

const onCaptchaVerified = (token: string) => {
  // token'ı backend'e gönderin veya doğrulama için saklayın
}

const handleRegister = async () => {
  errorMessage.value = null
  successMessage.value = null
  isLoading.value = true
  const token = await executeRecaptcha('register')

  // Basic client-side validation
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    isLoading.value = false
    return
  }

  // Password strength (example: at least 6 characters)
  if (password.value.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters long.'
    isLoading.value = false
    return
  }

  // Simulate API call for registration
  // In a real application, you would send these details to your backend
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay

    // Simulate successful registration
    // In a real scenario, you'd check backend response
    if (username.value && email.value && password.value) {
      successMessage.value = 'Registration successful! You can now log in.'
      console.log('Registration successful for:', username.value)
      // Optionally clear form or redirect after a short delay
      setTimeout(() => {
        router.push('/login') // Redirect to login page after successful registration
      }, 2000)
    } else {
      errorMessage.value = 'Please fill in all required fields.'
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'An unexpected error occurred during registration.'
    console.error('Registration error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <BaseLayout>
    <div class="register-page-container">
      <div class="register-card">
        <h2 class="register-title">Create Your ComicVerse Account</h2>
        <p class="register-subtitle">Join us to explore the Marvel Universe.</p>

        <form @submit.prevent="handleRegister" class="register-form">
          <div class="form-group">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              id="username"
              v-model="username"
              placeholder="Choose a username"
              class="form-input"
              required
            />
          </div>

          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Enter your email address"
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
              placeholder="Create a password"
              class="form-input"
              required
            />
          </div>

          <div class="form-group">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              placeholder="Re-enter your password"
              class="form-input"
              required
            />
          </div>
          <vue-recaptcha @verify="onCaptchaVerified" />

          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

          <button type="submit" :disabled="isLoading" class="register-button">
            <span v-if="isLoading" class="spinner"></span>
            <span v-else>Register Account</span>
          </button>

          <p class="login-link">
            Already have an account?
            <router-link to="/login" class="link-text">Log In</router-link>
          </p>
        </form>
      </div>
    </div>
  </BaseLayout>
</template>

<style scoped>
.register-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  padding: 2rem 1rem;
}

.register-card {
  background-color: var(--card-bg); /* #262626 */
  border-radius: 12px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 450px; /* Slightly wider than login for more fields */
  text-align: center;
}

.register-title {
  font-size: 2rem; /* text-3xl */
  font-weight: bold;
  color: var(--primary-red);
  margin-bottom: 0.75rem;
}

.register-subtitle {
  font-size: 1rem;
  color: var(--text-medium);
  margin-bottom: 2rem;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  text-align: left;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-light);
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--input-bg);
  border-radius: 8px;
  background-color: var(--input-bg);
  color: var(--text-light);
  font-size: 1rem;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.form-input::placeholder {
  color: var(--text-dark);
}

.form-input:focus {
  border-color: var(--primary-red);
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.5);
}

.error-message {
  color: var(--primary-red);
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: center;
}

.success-message {
  color: #22c55e; /* green-500 */
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: center;
}

.register-button {
  width: 100%;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-red);
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
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

.register-button:hover:not(:disabled) {
  background-color: #dc2626; /* red-700 */
  transform: translateY(-2px);
}

.register-button:disabled {
  background-color: #b91c1c; /* red-800, darker disabled */
  cursor: not-allowed;
  opacity: 0.7;
}

/* Spinner for loading state */
.spinner {
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #fff;
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
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

.login-link {
  font-size: 0.875rem;
  color: var(--text-medium);
  margin-top: 1rem;
}

.link-text {
  color: var(--primary-red);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
}

.link-text:hover {
  color: #ef4444;
  text-decoration: underline;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .register-card {
    padding: 2rem 1.5rem;
  }
  .register-title {
    font-size: 1.75rem;
  }
}
</style>
