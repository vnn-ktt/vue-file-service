import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AuthState, User, AuthTokens, LoginCredentials, RegisterData, ApiResponse } from '@/types/auth'
import { authApiService } from '@/services/authApi'

export const useAuthStore = defineStore('auth', () => {
    // State - используем ref для реактивности
    const user = ref<User | null>(null)
    const tokens = ref<AuthTokens | null>(null)
    const isLoading = ref<boolean>(false)
    const error = ref<string | null>(null)

    // Getters - используем computed
    const isAuthenticated = computed<boolean>(() => !!user.value)
    const currentUser = computed<User | null>(() => user.value)
    const authError = computed<string | null>(() => error.value)
    const authLoading = computed<boolean>(() => isLoading.value)

    // Actions
    const setLoading = (loading: boolean): void => {
        isLoading.value = loading
    }

    const setError = (message: string | null): void => {
        error.value = message
    }

    const setAuthData = (authData: { user: User; tokens: AuthTokens }): void => {
        user.value = authData.user
        tokens.value = authData.tokens
        error.value = null
    }

    const clearAuthData = (): void => {
        user.value = null
        tokens.value = null
        error.value = null
    }

    // Логин
    const login = async (credentials: LoginCredentials): Promise<ApiResponse> => {
        setLoading(true)
        setError(null)

        try {
            const authData = await authApiService.login(credentials)
            setAuthData(authData)

            return {
                success: true,
                data: authData
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Login failed'
            setError(errorMessage)

            return {
                success: false,
                error: errorMessage
            }
        } finally {
            setLoading(false)
        }
    }

    // Регистрация
    const register = async (userData: RegisterData): Promise<ApiResponse> => {
        setLoading(true)
        setError(null)

        try {
            const authData = await authApiService.register(userData)
            setAuthData(authData)

            return {
                success: true,
                data: authData
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Registration failed'
            setError(errorMessage)

            return {
                success: false,
                error: errorMessage
            }
        } finally {
            setLoading(false)
        }
    }

    // Выход
    const logout = async (): Promise<void> => {
        try {
            await authApiService.logout()
        } catch (err) {
            console.error('Logout error:', err)
        } finally {
            clearAuthData()
        }
    }

    // Обновление токенов
    const refreshTokens = async (): Promise<ApiResponse> => {
        try {
            const authData = await authApiService.refreshTokens()
            setAuthData(authData)

            return {
                success: true,
                data: authData
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Token refresh failed'

            // При ошибке обновления токенов делаем логаут
            clearAuthData()

            return {
                success: false,
                error: errorMessage
            }
        }
    }

    // Проверка аутентификации при загрузке приложения
    const checkAuth = (): void => {
        const authData = authApiService.getAuthData()
        if (authData) {
            setAuthData(authData)
        }
    }

    // Очистка ошибки
    const clearError = (): void => {
        setError(null)
    }

    return {
        // State
        user,
        tokens,
        isLoading,
        error,

        // Getters
        isAuthenticated,
        currentUser,
        authError,
        authLoading,

        // Actions
        login,
        register,
        logout,
        refreshTokens,
        checkAuth,
        clearError
    }
})