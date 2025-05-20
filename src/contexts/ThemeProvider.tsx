/**
 * Theme Context Provider
 * Manages application-wide theme state and preferences
 * Provides theme switching functionality and persistence
 */

import {  useState, useCallback, useMemo, type ReactNode, useEffect } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../theme';
import { ThemeContext } from './ThemeContext';


/**
 * ThemeProvider Component
 * Handles theme state management and persistence
 * Automatically detects and applies system theme preferences
 * 
 * @param children - Child components that will receive theme context
 */
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('theme-mode');
        return savedMode ? savedMode === 'dark' : prefersDarkMode;
    });

    useEffect(() => {
        localStorage.setItem('theme-mode', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = useCallback(() => {
        setIsDarkMode(prev => !prev);
    }, []);

    const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);
    const value = useMemo(() => ({ isDarkMode, toggleTheme }), [isDarkMode, toggleTheme]);

    return (
        <ThemeContext.Provider value={value}>
            <MUIThemeProvider theme={theme}>
                {children}
            </MUIThemeProvider>
        </ThemeContext.Provider>
    );
};