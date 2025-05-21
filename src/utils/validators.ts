/**
 * Utility validators for common use cases.
 */

// Checks if a value is a non-empty string
export function isNonEmptyString(value: unknown): value is string {
    return typeof value === 'string' && value.trim().length > 0;
}

// Checks if a value is a valid email address
export function isValidEmail(value: unknown): value is string {
    if (typeof value !== 'string') return false;
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Checks if a value is a valid number (not NaN)
export function isValidNumber(value: unknown): value is number {
    return typeof value === 'number' && !isNaN(value);
}

// Checks if a value is a positive integer
export function isPositiveInteger(value: unknown): value is number {
    return typeof value === 'number' && Number.isInteger(value) && value > 0;
}

// Checks if a value is a valid password (min 8 chars, at least 1 letter and 1 number)
export function isStrongPassword(value: unknown): value is string {
    if (typeof value !== 'string') return false;
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(value);
}