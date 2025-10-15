export interface ApiResponse<T = any> {
    success: boolean
    data?: T
    error?: string
    message?: string
}

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

export interface UploadedFile {
    id: string
    name: string
    size: number
    type: string
    url?: string
    uploadedAt: string
}

export interface ValidationError {
    field: string
    message: string
}

export interface ValidationResult {
    isValid: boolean
    errors: ValidationError[]
}