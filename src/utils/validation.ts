import type { ValidationResult, ValidationError } from '@/types/global';

export const validationRules = {
    email: {
        pattern: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
        message: 'enter a valid email address'
    },
    phone: {
        pattern: /^\+[1-9]{1,4}[\s\-]?\(?[0-9]{1,5}\)?[\s\-]?[0-9]{1,10}[\s\-]?[0-9]{1,10}$/,
        message: 'enter a valid phone number'
    },
    password: {
        minLength: 6,
        message: 'password must be at least 6 characters'
    }
}

export interface FormValues {
    id: string
    password: string
    confirmPassword?: string
}

export function validateEmailOrPhone(value: string): string {
    if (!value) return 'email or phone is required'

    const isEmail = validationRules.email.pattern.test(value)
    const isPhone = validationRules.phone.pattern.test(value)

    if (!isEmail && !isPhone) {
        return 'enter a valid email or phone number'
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
    if (!confirmPassword) return 'confirm your password'
    if (password !== confirmPassword) return 'passwords do not match'
    return ''
}

export function validateForm(values: FormValues, isLogin: boolean = false): ValidationResult {
    const errors: ValidationError[] = []

    const emailPhoneError = validateEmailOrPhone(values.id)
    if (emailPhoneError) {
        errors.push({ field: 'id', message: emailPhoneError })
    }

    const passwordError = validatePassword(values.password)
    if (passwordError) {
        errors.push({ field: 'password', message: passwordError })
    }

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