import {createRouter, createWebHistory} from 'vue-router';
import {useAuthStore} from '@/stores/auth'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/pages/HomePage.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/LoginPage.vue'),
        meta: { requiresGuest: true },
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/pages/RegisterPage.vue'),
        meta: { requiresGuest: true }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/layouts/DashboardLayout.vue'),
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'Dashboard',
                component: () => import('@/pages/DashboardPage.vue')
            },
            {
                path: 'files',
                name: 'Files',
                component: () => import('@/pages/FilesPage.vue')
            },
            {
                path: 'profile',
                name: 'Profile',
                component: () => import('@/pages/ProfilePage.vue')
            }
        ]
    },
    {
        path: '/logout',
        name: 'Logout',
        component: () => import('@/pages/LogoutPage.vue')
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if(to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login');
    } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
        next('/dashboard')
    } else {
        next()
    }
})

export default router;