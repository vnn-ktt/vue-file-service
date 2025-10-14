export interface User {
    id: string;
    email: string | null;
    phone: string | null;
    createdAt?: string
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface AuthData {
    user: User
    tokens: AuthTokens
}

export interface LoginCredentials {
    id: string
    password: string
}

export interface RegisterData {
    id: string
    password: string
    confirmPassword: string
}

export interface AuthState {
    user: User | null
    tokens: AuthTokens | null
    isLoading: boolean
    error: string | null
}

export interface ApiResponse<T = any> {
    success: boolean
    data?: T
    error?: string
}