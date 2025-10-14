import type { ValidationResult, ValidationError } from '@/types/global'

export const validationRules = {
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
    },
    phone: {
        pattern: /^\d{10,15}$/,
        message: 'Please enter a valid phone number (10-15 digits)'
    },
    password: {
        minLength: 6,
        message: 'Password must be at least 6 characters'
    }
}

export function validateEmailOrPhone(value: string): string {
    if (!value) return 'Email or phone is required'

    const isEmail = validationRules.email.pattern.test(value)
    const isPhone = validationRules.phone.pattern.test(value)

    if (!isEmail && !isPhone) {
        return 'Please enter a valid email or phone number'
    }

    return ''
}

export function validatePassword(value: string): string {
    if (!value) return 'Password is required'
    if (value.length < validationRules.password.minLength) {
        return validationRules.password.message
    }
    return ''
}

export function validateConfirmPassword(password: string, confirmPassword: string): string {
    if (!confirmPassword) return 'Please confirm your password'
    if (password !== confirmPassword) return 'Passwords do not match'
    return ''
}

export interface FormValues {
    id: string
    password: string
    confirmPassword?: string
}

export function validateForm(values: FormValues, isLogin: boolean = false): ValidationResult {
    const errors: ValidationError[] = []

    // Email/phone validation
    const emailPhoneError = validateEmailOrPhone(values.id)
    if (emailPhoneError) {
        errors.push({ field: 'id', message: emailPhoneError })
    }

    // Password validation
    const passwordError = validatePassword(values.password)
    if (passwordError) {
        errors.push({ field: 'password', message: passwordError })
    }

    // Confirm password validation (only for registration)
    if (!isLogin && values.confirmPassword !== undefined) {
        const confirmPasswordError = validateConfirmPassword(values.password, values.confirmPassword)
        if (confirmPasswordError) {
            errors.push({ field: 'confirmPassword', message: confirmPasswordError })
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    }
}