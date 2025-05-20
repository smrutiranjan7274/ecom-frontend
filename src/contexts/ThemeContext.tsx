/**
 * Theme Context Provider
 * Manages application-wide theme state and preferences
 * Provides theme switching functionality and persistence
 */

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode, useEffect } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../theme';

/**
 * Theme context type definition
 * @property isDarkMode - Current theme mode state
 * @property toggleTheme - Function to switch between light and dark modes
 */
type ThemeContextType = {
    isDarkMode: boolean;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
    isDarkMode: false,
    toggleTheme: () => {},
});

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

/**
 * Custom hook to access theme context
 * @returns ThemeContextType object containing isDarkMode state and toggleTheme function
 * @throws Error when used outside of ThemeProvider
 */
export const useTheme = () => useContext(ThemeContext);
