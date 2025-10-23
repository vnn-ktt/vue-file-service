import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type {
    User,
    AuthData,
    AuthTokens,
    LoginCredentials,
    RegisterData,
    ApiResponse
} from '@/types/auth';
import { authApiService } from '@/api/auth.ts';

export const useAuthStore = defineStore('auth', () => {
    /* States */
    const user = ref<User | null>(null);
    const tokens = ref<AuthTokens | null>(null);
    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);

    /* Getters */
    const isAuthenticated = computed<boolean>(() => !!user.value);
    const currentUser = computed<User | null>(() => user.value);
    const authError = computed<string | null>(() => error.value);
    const authLoading = computed<boolean>(() => isLoading.value);

    /* Setters */
    const setLoading = (loading: boolean): void => {
        isLoading.value = loading
    }
    const setError = (message: string | null): void => {
        error.value = message
    }
    const setAuthData = (authData: AuthData): void => {
        user.value = authData.user
        tokens.value = authData.tokens
        error.value = null
    }
    const clearAuthData = (): void => {
        user.value = null
        tokens.value = null
        error.value = null
    }

    /* Actions */
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
            const errorMessage = err instanceof Error ? err.message : 'login failed'
            setError(errorMessage)

            return {
                success: false,
                error: errorMessage
            }
        } finally {
            setLoading(false)
        }
    }
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
    const logout = async (): Promise<void> => {
        try {
            await authApiService.logout()
        } catch (err) {
            console.error('Logout error:', err)
        } finally {
            clearAuthData()
        }
    }
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

            clearAuthData()

            return {
                success: false,
                error: errorMessage
            }
        }
    }
    const checkAuth = (): void => {
        const authData = authApiService.getAuthData()
        if (authData) {
            setAuthData(authData)
        }
    }
    const clearError = (): void => {
        setError(null)
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
})