import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import type { LoginCredentials, RegisterData } from '@/types/auth'

export function useAuth() {
    const authStore = useAuthStore()

    const {
        user,
        tokens,
        isLoading,
        error,
        isAuthenticated,
        currentUser,
        authError,
        authLoading
    } = storeToRefs(authStore)

    const login = async (credentials: LoginCredentials) => {
        return await authStore.login(credentials)
    }

    const register = async (userData: RegisterData) => {
        return await authStore.register(userData)
    }

    const logout = async () => {
        await authStore.logout()
    }

    const refreshTokens = async () => {
        return await authStore.refreshTokens()
    }

    const checkAuth = () => {
        authStore.checkAuth()
    }

    const clearError = () => {
        authStore.clearError()
    }

    return {
        user,
        tokens,
        isLoading,
        error,
        isAuthenticated,
        currentUser,
        authError,
        authLoading,

        login,
        register,
        logout,
        refreshTokens,
        checkAuth,
        clearError
    }
}