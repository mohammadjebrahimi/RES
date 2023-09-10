import { createRouter, createWebHistory } from 'vue-router'
import { useHeliumStore } from '@/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  routes: [
    {
      path: '/test',
      name: 'test',
      component: () => import('../components/notificationbar/default-notificationbar.vue')
    },
    {
      path: '/single/:id',
      name: 'single',
      component: () => import('../views/single/single.vue')
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
      path: '/login',
      name: 'login',
      component: () => import('../views/login/login.vue')
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
let tokenPage = ['profile', 'story-writing-add']
let withoutTokenPage = ['login', 'register1', 'register2', 'register3']
router.beforeEach(async (to, from) => {
  await checkToken()
  if (!localStorage.getItem("accessToken") && tokenPage.includes(to.name)) {
    router.push({ name: 'register' })
  } else if (localStorage.getItem("accessToken") && withoutTokenPage.includes(to.name)) {
    router.push({ name: 'profile' })
  }

})
router.afterEach((to, from) => {
  document.title = to.name;
});

// delete accessToken from localStorage if not valid
async function checkToken() {
  const store = useHeliumStore()
  let token = localStorage.getItem("accessToken")
  if (token) {
    let resp = await fetch('http://localhost:4000', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        query: `query{
          getUserByToken{
            username
            first_name
            last_name
            image_url
            email
            phone_number
          }
        }`
      }),

    })
    let respData = await resp.json()
    if (resp.status >= 400 && resp.status <= 500) {
      localStorage.removeItem("accessToken");
      store.setCurrentUser({})
    }
    if (resp.status <= 300) {
      if (respData.errors) {
        localStorage.removeItem("accessToken");
        store.setCurrentUser({})
      } else {
        store.setCurrentUser(respData.data.getUserByToken)
      }
    }
  }
}
export default router
