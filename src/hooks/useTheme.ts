import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';


/**
 * Custom hook to access theme context
 * @returns ThemeContextType object containing isDarkMode state and toggleTheme function
 * @throws Error when used outside of ThemeProvider
 */
export const useTheme = () => useContext(ThemeContext);