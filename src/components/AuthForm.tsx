import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Link as MuiLink, MenuItem, CircularProgress } from '@mui/material';
import apiClient from '../api/client';
import type { AuthError, AuthResponse } from '../types/auth.type';
import { isValidEmail, isStrongPassword } from '../utils/validators';
import { useAuth } from '../hooks/useAuth';

const FORM_INITIAL_STATE = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'USER',
};

type AuthMode = 'login' | 'register';

interface AuthFormProps {
    mode: AuthMode;
}

interface AuthFormState {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    role: string;
}

const AuthForm = ({ mode }: AuthFormProps) => {
    const [form, setForm] = useState<AuthFormState>(FORM_INITIAL_STATE);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const isRegister = mode === 'register';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = (): boolean => {
        if (!form.email || !form.password) {
            return false;
        }
        if (!isValidEmail(form.email)) {
            return false;
        }
        if (!isStrongPassword(form.password)) {
            return false;
        }
        if (isRegister && !form.confirmPassword) {
            return false;
        }
        if (isRegister && form.password !== form.confirmPassword) {
            return false;
        }
        if (isRegister && !form.name) {
            return false;
        }
        if (isRegister && !form.role) {
            return false;
        }
        return true;
    };

    const handleAuthSuccess = (response: AuthResponse) => {
        if (response.token && response.email && response.name && response.role && response.id && response.message) {
            login({
                email: response.email,
                name: response.name,
                role: response.role,
                token: response.token,
                id: response.id
            });
            setTimeout(() => navigate('/'), 1000);
        } else {
            console.error('Invalid response:', response.message);
        }
    };

    const handleAuthError = (error: AuthError) => {
        const message = 'Something went wrong. Please try again.';
        console.error(error.response?.data || message);
    };

    const submitAuthRequest = async () => {
        const endpoint = isRegister ? '/auth/register' : '/auth/login';
        const payload = isRegister
            ? {
                email: form.email,
                password: form.password,
                name: form.name,
                role: form.role,
            }
            : {
                email: form.email,
                password: form.password,
            };
        const response = await apiClient.post<AuthResponse>(endpoint, payload);
        return response;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const response = await submitAuthRequest();
            if (
                (response.status === 200 || response.status === 201) &&
                response.data.token &&
                response.data.email &&
                response.data.role
            ) {
                handleAuthSuccess(response.data);
            } else {
                console.error('Invalid response:', response.data);
            }
        } catch (error) {
            handleAuthError(error as AuthError);
        } finally {
            setIsLoading(false);
        }
    };

    const renderFormFields = () => (
        <>
            {isRegister && (
                <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    margin="normal"
                    value={form.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    disabled={isLoading}
                    sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
                />
            )}

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

            {isRegister && (
                <TextField
                    select
                    label="Role"
                    name="role"
                    fullWidth
                    margin="normal"
                    value={form.role}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
                >
                    <MenuItem value="USER">User</MenuItem>
                    <MenuItem value="SELLER">Seller</MenuItem>
                </TextField>
            )}

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

    return (
        <>
            <Box
                sx={{
                    minHeight: 'fixed',
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
        </>
    );
};

export default AuthForm;