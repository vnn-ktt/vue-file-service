// API response wrapper
export interface ApiResponse<T = any> {
    success: boolean
    data?: T
    error?: string
    message?: string
}

// Pagination types
export interface PaginationParams {
    page: number
    pageSize: number
}

export interface PaginationMeta {
    page: number
    pageSize: number
    totalCount: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
}

// File types
export interface UploadedFile {
    id: string
    name: string
    size: number
    type: string
    url?: string
    uploadedAt: string
}

// Form validation
export interface ValidationError {
    field: string
    message: string
}

export interface ValidationResult {
    isValid: boolean
    errors: ValidationError[]
}