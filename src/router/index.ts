import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/characters',
    name: 'Characters',
    component: () => import('@/views/CharactersPage.vue'),
  },
  {
    path: '/characters/:id',
    name: 'CharacterDetail',
    component: () => import('@/views/CharacterDetailPage.vue'),
    props: true, // Allows component to receive route params as props
  },
  {
    path: '/comics',
    name: 'Comics',
    component: () => import('@/views/ComicsPage.vue'),
  },
  {
    path: '/comics/:id',
    name: 'ComicDetail',
    component: () => import('@/views/ComicDetailPage.vue'),
    props: true,
  },
  {
    path: '/profile',
    name: 'MyProfile',
    component: () => import('@/views/MyProfilePage.vue'),
    meta: { requiresAuth: true }, // Example meta field for authentication
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterPage.vue'),
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    component: () => import('@/views/ForgotPasswordPage.vue'),
  },
  {
    path: '/reading-lists/:id',
    name: 'ReadingListDetail',
    component: () => import('@/views/ReadingListPage.vue'),
    props: true,
  },
  // Add routes for Creators, Series, Events if you implement them
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

// Example navigation guard (if you need authentication)
// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !userStore.isAuthenticated) {
//     next({ name: 'Login' }); // Redirect to login page
//   } else {
//     next();
//   }
// });

export default router
