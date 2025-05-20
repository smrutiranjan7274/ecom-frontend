/**
 * Navigation Bar Component
 * Provides main navigation interface with responsive design
 * Features:
 * - Responsive mobile/desktop layouts
 * - Theme toggle functionality
 * - Dynamic menu items based on authentication state
 * - Mobile drawer navigation
 */

import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, useTheme as useMuiTheme, useMediaQuery, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Navbar Component
 * Handles:
 * - Responsive layout switching
 * - Theme mode toggle
 * - Navigation state
 * - Authentication-based menu items
 * - Mobile drawer navigation
 */
const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const muiTheme = useMuiTheme();
    const { isDarkMode, toggleTheme } = useTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
    const location = useLocation();
    const navigate = useNavigate();
    const isAuthenticated = false; // TODO: Replace with actual auth state

    const baseMenuItems = [
        { text: 'Home', path: '/' },
        { text: 'Products', path: '/products' },
        { text: 'Cart', path: '/cart' },
    ];

    const menuItems = isAuthenticated
        ? [...baseMenuItems, { text: 'Profile', path: '/profile' }]
        : [...baseMenuItems, { text: 'Login', path: '/login' }, { text: 'Register', path: '/register' }];

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const handleLogout = () => {
        // TODO: Implement logout logic
        navigate('/login');
    };

    const drawer = (
        <List>
            {menuItems.map((item) => (
                <ListItem
                    component={Link}
                    to={item.path}
                    key={item.text}
                    onClick={() => setMobileOpen(false)}
                    sx={{
                        backgroundColor: isActive(item.path) ? 'primary.light' : 'transparent',
                        '&:hover': {
                            backgroundColor: 'primary.light',
                        }
                    }}
                >
                    <ListItemText primary={item.text} />
                </ListItem>
            ))}
            {isAuthenticated && (
                <ListItem
                    onClick={handleLogout}
                    sx={{
                        backgroundColor: 'transparent',
                        '&:hover': {
                            backgroundColor: 'primary.light',
                        }
                    }}
                >
                    <ListItemText primary="Logout" />
                </ListItem>
            )}
        </List>
    );

    const ThemeToggleButton = () => (
        <IconButton onClick={toggleTheme} color="primary" sx={{ ml: 1 }}>
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    );

    return (
        <>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    backgroundColor: 'background.paper'
                }}
            >
                <Toolbar>
                    {isMobile && (
                        <IconButton
                            color="primary"
                            edge="start"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{
                            flexGrow: 1,
                            color: 'primary.main',
                            textDecoration: 'none',
                            fontWeight: 700
                        }}
                    >
                        E-Commerce
                    </Typography>
                    {!isMobile && (
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            {menuItems.map((item) => (
                                <Button
                                    component={Link}
                                    to={item.path}
                                    key={item.text}
                                    sx={{
                                        color: 'text.primary',
                                        position: 'relative',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: '100%',
                                            height: 2,
                                            backgroundColor: 'primary.main',
                                            transform: isActive(item.path) ? 'scaleX(1)' : 'scaleX(0)',
                                            transition: 'transform 0.3s ease-in-out'
                                        },
                                        '&:hover::after': {
                                            transform: 'scaleX(1)'
                                        }
                                    }}
                                >
                                    {item.text}
                                </Button>
                            ))}
                            {isAuthenticated && (
                                <Button
                                    onClick={handleLogout}
                                    sx={{
                                        color: 'error.main',
                                        ml: 1
                                    }}
                                >
                                    Logout
                                </Button>
                            )}
                            <ThemeToggleButton />
                        </Box>
                    )}
                    {isMobile && <ThemeToggleButton />}
                </Toolbar>
            </AppBar>
            <Drawer
                variant="temporary"
                anchor="left"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box'
                    }
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
};

export default Navbar;
