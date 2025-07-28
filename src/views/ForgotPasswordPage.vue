<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseLayout from '@/components/layout/BaseLayout.vue' // Layout'u kullanmak için

const router = useRouter()

const email = ref('')
const errorMessage = ref<string | null>(null)
const successMessage = ref<string | null>(null)
const isLoading = ref(false)

const handleForgotPassword = async () => {
  errorMessage.value = null
  successMessage.value = null
  isLoading.value = true

  // Basic client-side validation
  if (!email.value || !email.value.includes('@') || !email.value.includes('.')) {
    errorMessage.value = 'Please enter a valid email address.'
    isLoading.value = false
    return
  }

  // Simulate API call to send reset link
  // In a real application, you would send the email to your backend.
  // The backend would then verify the email, generate a token, and send an email
  // with a link containing that token.
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate network delay

    // Simulate success/failure based on a dummy condition or simply always success for demo
    if (email.value === 'test@example.com') {
      // Example of a known email for success
      successMessage.value =
        'If an account with that email exists, a password reset link has been sent to your inbox.'
      console.log('Password reset request successful for:', email.value)
      email.value = '' // Clear the input field
    } else {
      // Even if email doesn't exist, it's good practice not to reveal that.
      successMessage.value =
        'If an account with that email exists, a password reset link has been sent to your inbox.'
      console.log('Simulated password reset request for unknown email:', email.value)
      email.value = '' // Clear the input field
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'An unexpected error occurred. Please try again later.'
    console.error('Forgot password error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <BaseLayout>
    <div class="forgot-password-page-container">
      <div class="forgot-password-card">
        <h2 class="forgot-password-title">Forgot Your Password?</h2>
        <p class="forgot-password-subtitle">
          Enter your email address below and we'll send you a link to reset your password.
        </p>

        <form @submit.prevent="handleForgotPassword" class="forgot-password-form">
          <div class="form-group">
            <label for="email" class="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="your.email@example.com"
              class="form-input"
              required
            />
          </div>

          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

          <button type="submit" :disabled="isLoading" class="send-reset-button">
            <span v-if="isLoading" class="spinner"></span>
            <span v-else>Send Reset Link</span>
          </button>

          <p class="back-to-login-link">
            Remember your password?
            <router-link to="/login" class="link-text">Back to Login</router-link>
          </p>
        </form>
      </div>
    </div>
  </BaseLayout>
</template>

<style scoped>
.forgot-password-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  padding: 2rem 1rem;
}

.forgot-password-card {
  background-color: var(--card-bg); /* #262626 */
  border-radius: 12px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.forgot-password-title {
  font-size: 2rem;
  font-weight: bold;
  color: var(--primary-red);
  margin-bottom: 0.75rem;
}

.forgot-password-subtitle {
  font-size: 1rem;
  color: var(--text-medium);
  margin-bottom: 2rem;
}

.forgot-password-form {
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

.send-reset-button {
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

.send-reset-button:hover:not(:disabled) {
  background-color: #dc2626; /* red-700 */
  transform: translateY(-2px);
}

.send-reset-button:disabled {
  background-color: #b91c1c; /* red-800, darker disabled */
  cursor: not-allowed;
  opacity: 0.7;
}

/* Spinner for loading state (reused from login/register) */
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

.back-to-login-link {
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
  .forgot-password-card {
    padding: 2rem 1.5rem;
  }
  .forgot-password-title {
    font-size: 1.75rem;
  }
}
</style>
