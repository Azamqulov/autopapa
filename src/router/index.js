import { createRouter, createWebHistory } from 'vue-router'

const home = () => import('@/views/home.vue')
const search = () => import('@/views/search.vue')
const CarDetails = () => import('@/views/CarDetails.vue')
const favorit = () => import('@/views/favorit.vue')
const Page404 = () => import('@/views/404.vue')
const login = () => import('@/views/auth/login.vue')
const user = () => import('@/views/user/index.vue')
// --- admin pages
const adminLayout = () => import('@/views/admin/adminLayout.vue')
const admin = () => import('@/views/admin/index.vue')
const adminSettings = () => import('@/views/admin/setting.vue')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'page404',
      component: Page404
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/CarDetails/:model',
      name: 'CarDetails',
      component: CarDetails
    },
    {
      path: '/favorit',
      name: 'favorit',
      component: favorit
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      children: [
        {
          path: 'settings',
          name: 'adminsettings',
          component: adminSettings
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path:'/user',
      name: 'user',
      component: user
    }
  ],
})

export default router
