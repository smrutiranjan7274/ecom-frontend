/**
 * Material-UI theme configuration
 * Defines both light and dark theme variants with consistent styling
 */

import { createTheme, type ThemeOptions } from '@mui/material/styles';

/**
 * Common theme options shared between light and dark modes
 * Includes typography, component style overrides, and common styling
 */
const commonOptions: ThemeOptions = {
    typography: {
        fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 600,
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
    },
};

/**
 * Light theme configuration
 * Uses a blue-based color scheme with light backgrounds
 * Optimal for daytime viewing and standard usage
 */
export const lightTheme = createTheme({
    ...commonOptions,
    palette: {
        mode: 'light',
        primary: {
            main: '#2563eb',
            light: '#60a5fa',
            dark: '#1d4ed8',
        },
        background: {
            default: '#f8fafc',
            paper: '#ffffff',
        },
        text: {
            primary: '#1e293b',
            secondary: '#64748b',
        },
    },
});

/**
 * Dark theme configuration
 * Uses darker backgrounds with adjusted color contrast
 * Optimized for low-light environments and reduced eye strain
 */
export const darkTheme = createTheme({
    ...commonOptions,
    palette: {
        mode: 'dark',
        primary: {
            main: '#60a5fa',
            light: '#93c5fd',
            dark: '#2563eb',
        },
        background: {
            default: '#0f172a',
            paper: '#1e293b',
        },
        text: {
            primary: '#f8fafc',
            secondary: '#cbd5e1',
        },
    },
});
