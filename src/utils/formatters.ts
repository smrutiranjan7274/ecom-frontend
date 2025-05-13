/**
 * Utility formatters for currency, date, and percentage.
 */

// Format a number as currency (e.g., $1,234.56)
export function formatCurrency(amount: number, currency: string = 'USD', locale: string = 'en-US'): string {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}

// Format a date as a readable string (e.g., Jan 1, 2024)
export function formatDate(date: Date | string, locale: string = 'en-US', options?: Intl.DateTimeFormatOptions): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString(locale, options || { year: 'numeric', month: 'short', day: 'numeric' });
}

// Format a number as a percentage (e.g., 25%)
export function formatPercentage(value: number, fractionDigits: number = 0): string {
    return `${(value * 100).toFixed(fractionDigits)}%`;
}

/*
Usage examples:
console.log(formatCurrency(1234.56)); // "$1,234.56"
console.log(formatDate('2024-06-01')); // "Jun 1, 2024"
console.log(formatPercentage(0.25)); // "25%"
*/