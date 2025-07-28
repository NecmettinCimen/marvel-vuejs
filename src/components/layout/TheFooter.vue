<script setup lang="ts"></script>

<template>
  <footer class="app-footer">
    <div class="container footer-content">
      <div class="footer-links">
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
      <div class="social-icons">
        <a href="#" class="social-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" class="icon">
            <path
              d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
            ></path>
          </svg>
        </a>
        <a href="#" class="social-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" class="icon">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
        <a href="#" class="social-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" class="icon">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        </a>
      </div>
      <p class="copyright">&copy; 2025 Marvel VueJs. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background-color: var(--header-footer-bg);
  padding: 1.5rem; /* p-6 */
  margin-top: 2rem; /* mt-8 */
  text-align: center;
  color: var(--text-medium);
  font-size: 0.875rem; /* text-sm */
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-links {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem; /* mb-4 */
}

.footer-links a {
  color: inherit;
  transition: color 0.2s ease;
  text-decoration: none;
}

.footer-links a:not(:first-child) {
  margin-left: 1.5rem; /* space-x-6 */
}

.footer-links a:hover {
  color: var(--primary-red);
  text-decoration: underline;
}

.social-icons {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem; /* mb-4 */
}

.social-icon {
  color: inherit;
  transition: color 0.2s ease;
  text-decoration: none;
}

.social-icon .icon {
  width: 1.5rem; /* Adjust size as needed */
  height: 1.5rem;
}

.social-icon:not(:first-child) {
  margin-left: 1.5rem; /* space-x-6 */
}

.social-icon:hover {
  color: var(--primary-red);
}

.copyright {
  color: var(--text-medium);
}
</style>
