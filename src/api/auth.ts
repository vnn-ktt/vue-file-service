import type { LoginCredentials, RegisterData, AuthData, ApiResponse } from '@/types/auth'

class AuthApiService {
    private baseUrl = '/api'
    private storageKey = 'fileServiceAuth'

    private setAuthData(data: AuthData): void {
        localStorage.setItem(this.storageKey, JSON.stringify({
            ...data,
            timestamp: Date.now()
        }))
    }

    getAuthData(): AuthData | null {
        try {
            const data = localStorage.getItem(this.storageKey)
            return data ? JSON.parse(data) : null
        } catch {
            return null
        }
    }

    clearAuthData(): void {
        localStorage.removeItem(this.storageKey)
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    async login(credentials: LoginCredentials): Promise<AuthData> {
        await this.delay(1500) // Имитация сетевой задержки

        // Валидация
        if (!credentials.id || !credentials.password) {
            throw new Error('Email/phone and password are required')
        }

        // Валидация email/телефона
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex = /^\d{10,15}$/

        if (!emailRegex.test(credentials.id) && !phoneRegex.test(credentials.id)) {
            throw new Error('Please enter a valid email or phone number')
        }

        // Имитация успешного логина
        const user = {
            id: credentials.id,
            email: emailRegex.test(credentials.id) ? credentials.id : null,
            phone: phoneRegex.test(credentials.id) ? credentials.id : null,
            createdAt: new Date().toISOString()
        }

        const tokens = {
            accessToken: `fake-access-token-${Date.now()}`,
            refreshToken: `fake-refresh-token-${Date.now()}`
        }

        const authData: AuthData = { user, tokens }
        this.setAuthData(authData)

        return authData
    }

    async register(userData: RegisterData): Promise<AuthData> {
        await this.delay(1500)

        if (!userData.id || !userData.password) {
            throw new Error('email/phone and password are required')
        }

        if (userData.password !== userData.confirmPassword) {
            throw new Error('passwords do not match')
        }

        if (userData.password.length < 6) {
            throw new Error('password must be at least 6 characters')
        }

        const existingUsers = JSON.parse(localStorage.getItem('fileServiceUsers') || '[]')
        const userExists = existingUsers.some((user: any) => user.id === userData.id)

        if (userExists) {
            throw new Error('user with this email/phone already exists')
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex = /^\d{10,15}$/

        const newUser = {
            id: userData.id,
            email: emailRegex.test(userData.id) ? userData.id : null,
            phone: phoneRegex.test(userData.id) ? userData.id : null,
            createdAt: new Date().toISOString()
        }

        existingUsers.push(newUser)
        localStorage.setItem('fileServiceUsers', JSON.stringify(existingUsers))

        const tokens = {
            accessToken: `fake-access-token-${Date.now()}`,
            refreshToken: `fake-refresh-token-${Date.now()}`
        }

        const authData: AuthData = { user: newUser, tokens }
        this.setAuthData(authData)

        return authData
    }

    async logout(): Promise<void> {
        await this.delay(500)
        this.clearAuthData()
    }

    async refreshTokens(): Promise<AuthData> {
        await this.delay(1000)

        const currentData = this.getAuthData()

        if (!currentData) {
            throw new Error('no authentication data found')
        }

        const newTokens = {
            accessToken: `fake-access-token-${Date.now()}`,
            refreshToken: `fake-refresh-token-${Date.now()}`
        }

        const authData: AuthData = {
            user: currentData.user,
            tokens: newTokens
        }

        this.setAuthData(authData)
        return authData
    }
}

export const authApiService = new AuthApiService();