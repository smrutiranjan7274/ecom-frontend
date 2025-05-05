import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const location = useLocation();

    const menuItems = [
        { text: 'Home', path: '/' },
        { text: 'Products', path: '/products' },
        { text: 'Cart', path: '/cart' }
    ];

    const isActive = (path: string) => {
        return location.pathname === path;
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
        </List>
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
                        <Box sx={{ display: 'flex', gap: 2 }}>
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
                        </Box>
                    )}
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
