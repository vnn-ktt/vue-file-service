import type {RouteRecordRaw} from "vue-router";

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/pages/HomePage.vue')
    },
    // {
    //     path: '/dashboard',
    //     name: 'Dashboard',
    //     component: () => import('@/layouts/DashboardLayout.vue'),
    //     meta: { requiresAuth: true },
    //     children: [
    //         {
    //             path: '',
    //             name: 'Dashboard',
    //             component: () => import('@/pages/DashboardPage.vue')
    //         },
    //         {
    //             path: 'profile',
    //             name: 'Profile',
    //             component: () => import('@/pages/DashboardProfilePage.vue')
    //         },
    //         {
    //             path: 'files',
    //             name: 'Files',
    //             component: () => import('@/pages/DashboardFilesPage.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/register',
    //     name: 'Register',
    //     component: () => import('@/pages/RegisterPage.vue'),
    //     meta: { requiresGuest: true },
    // },
    // {
    //     path: '/login',
    //     name: 'Login',
    //     component: () => import('@/pages/LoginPage.vue'),
    //     meta: { requiresGuest: true }
    // },
    // {
    //     path: '/logout',
    //     name: 'Logout',
    //     component: () => import('@/pages/LogoutPage.vue'),
    //     meta: { requiresAuth: true }
    // },
    {
         path: '/:pathMatch(.*)*',
         name: 'NotFound',
         component: () => import('@/pages/NotFoundPage.vue')
    }
]