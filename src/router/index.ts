import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { routes } from './routes';

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((
    to,
    _from,
    next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login');
    } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
        next('/dashboard');
    } else {
        next();
    }
})

export default router;