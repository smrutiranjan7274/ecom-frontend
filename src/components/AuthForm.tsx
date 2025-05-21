import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Link as MuiLink, Alert, CircularProgress, Snackbar } from '@mui/material';
import apiClient from '../api/client';
import type { AuthError, AuthResponse } from '../types/auth.type';
// Import validators and formatters
import { isValidEmail, isStrongPassword } from '../utils/validators';
import { useAuth } from '../hooks/useAuth'; // Add this import

// Constants
const FORM_INITIAL_STATE = {
    email: '',
    password: '',
    confirmPassword: ''
};

const SNACKBAR_INITIAL_STATE = {
    open: false,
    severity: 'success' as const,
    message: ''
};

// Types
type AuthMode = 'login' | 'register';

interface AuthFormProps {
    mode: AuthMode;
}

interface AuthFormState {
    email: string;
    password: string;
    confirmPassword: string;
}

type SnackbarState = {
    open: boolean;
    severity: 'success' | 'error';
    message: string;
};

const AuthForm = ({ mode }: AuthFormProps) => {
    // State
    const [form, setForm] = useState<AuthFormState>(FORM_INITIAL_STATE);
    const [isLoading, setIsLoading] = useState(false);
    const [snackbar, setSnackbar] = useState<SnackbarState>(SNACKBAR_INITIAL_STATE);
    const navigate = useNavigate();
    const { login } = useAuth(); // Get login from context

    const isRegister = mode === 'register';

    // Handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const showSnackbar = (severity: 'success' | 'error', message: string) => {
        setSnackbar({ open: true, severity, message });
    };

    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const validateForm = (): boolean => {
        if (!form.email || !form.password) {
            showSnackbar('error', 'Please fill all required fields');
            return false;
        }

        // Use isValidEmail
        if (!isValidEmail(form.email)) {
            showSnackbar('error', 'Please enter a valid email address');
            return false;
        }

        // Use isStrongPassword
        if (!isStrongPassword(form.password)) {
            showSnackbar('error', 'Password must be at least 8 characters, include at least 1 letter and 1 number');
            return false;
        }

        if (isRegister && !form.confirmPassword) {
            showSnackbar('error', 'Please confirm your password');
            return false;
        }

        if (isRegister && form.password !== form.confirmPassword) {
            showSnackbar('error', 'Passwords do not match');
            return false;
        }

        return true;
    };

    const handleAuthSuccess = (response: AuthResponse) => {
        // Set auth state using context
        if (response.token && response.email && response.name && response.role) {
            login({
                email: response.email,
                name: response.name,
                role: response.role,
                token: response.token,
            });
            showSnackbar('success', isRegister ? 'Registration successful!' : 'Login successful!');
            setTimeout(() => navigate('/'), 1000);
        }
        else {
            showSnackbar('error', 'Invalid response from server');
            console.error('Invalid response:', response);
        }
    };

    const handleAuthError = (error: AuthError) => {
        const message = 'Something went wrong. Please try again.';
        showSnackbar('error', error.response?.data as string || message);
        // console.error('Authentication error:', error);
    };

    const submitAuthRequest = async () => {
        const endpoint = isRegister ? '/auth/register' : '/auth/login';
        const response = await apiClient.post<AuthResponse>(endpoint, {
            email: form.email,
            password: form.password
        });
        return response;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const response = await submitAuthRequest();
            if (response.data.token && response.data.email && response.data.role) {
                handleAuthSuccess(response.data);
            } else {
                showSnackbar('error', 'Invalid response from server');
                console.error('Invalid response:', response.data);
            }
        } catch (error) {
            handleAuthError(error as AuthError);
        } finally {
            setIsLoading(false);
        }
    };

    // Render helpers
    const renderFormFields = () => (
        <>
            <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                margin="normal"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                disabled={isLoading}
                sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
            />

            <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                margin="normal"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete={isRegister ? "new-password" : "current-password"}
                disabled={isLoading}
                sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
            />

            {isRegister && (
                <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
                />
            )}
        </>
    );

    const renderAuthLink = () => (
        <Typography variant="body2" align="center">
            {isRegister ? (
                <>
                    Already have an account?{' '}
                    <MuiLink component={Link} to="/login" color="primary" fontWeight="600">
                        Login
                    </MuiLink>
                </>
            ) : (
                <>
                    Don't have an account?{' '}
                    <MuiLink component={Link} to="/register" color="primary" fontWeight="600">
                        Register
                    </MuiLink>
                </>
            )}
        </Typography>
    );

    const renderSubmitButton = () => (
        <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={isLoading}
            sx={{
                mt: 2,
                mb: 1,
                py: 1.5,
                fontWeight: 700,
                borderRadius: 2,
                fontSize: 18,
            }}
        >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : (isRegister ? 'Register' : 'Login')}
        </Button>
    );

    const renderSnackbar = () => (
        <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{
                position: 'fixed',
                top: '80px !important',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1400,
                width: 'auto',
                maxWidth: 'calc(100% - 40px)',
            }}
        >
            <Alert
                onClose={handleSnackbarClose}
                severity={snackbar.severity}
                variant="filled"
                sx={{ width: '100%', boxShadow: 3 }}
            >
                {snackbar.message}
            </Alert>
        </Snackbar>
    );

    return (
        <>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: { xs: 4, sm: 6 },
                    px: 2,
                }}
            >
                <Paper
                    elevation={4}
                    sx={{
                        p: { xs: 3, sm: 6 },
                        width: '100%',
                        maxWidth: 420,
                        borderRadius: 4,
                        boxShadow: '0 8px 32px rgba(60,72,88,0.08)',
                    }}
                >
                    <Typography variant="h4" fontWeight={700} mb={1.5} textAlign="center">
                        {isRegister ? 'Create Account' : 'Sign In'}
                    </Typography>

                    <Typography color="text.secondary" mb={3} textAlign="center">
                        {isRegister ? 'Join us and start shopping!' : 'Welcome back! Please login.'}
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
                        {renderFormFields()}
                        {renderSubmitButton()}
                    </Box>

                    <Box sx={{ width: '100%', mt: 2, mb: 1 }}>
                        <Box sx={{ borderBottom: '1px solid #e0e7ef', mb: 2 }} />
                        {renderAuthLink()}
                    </Box>
                </Paper>
            </Box>
            {renderSnackbar()}
        </>
    );
};

export default AuthForm;