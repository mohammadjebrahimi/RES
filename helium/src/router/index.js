import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/singel',
      name: 'singel',
      component: () => import('../views/singel/singel.vue')
    },
    {
      path: '/',
      name: 'register',
      component: () => import('../views/register/register.vue')
    },

    {
      path: '/story-writing-add',
      name: 'story-writing-add',
      component: () => import('../views/story-writing-add/story-writing-add.vue')
    },

    {
      path: '/register1',
      name: 'register1',
      component: () => import('../views/register1/register1.vue')
    },

    {
      path: '/register2',
      name: 'register2',
      component: () => import('../views/register2/register2.vue')
    },

    {
      path: '/register3',
      name: 'register3',
      component: () => import('../views/register3/register3.vue')
    },

    {
      path: '/register-done',
      name: 'register-done',
      component: () => import('../views/register-done/register-done.vue')
    },

    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/profile/profile.vue')
    }
  ]
})

export default router
