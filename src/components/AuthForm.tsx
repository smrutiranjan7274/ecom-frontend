import { Box, Button, TextField, Typography, Paper, Link as MuiLink, Alert } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../api/client';

interface AuthFormProps {
    mode: 'login' | 'register';
}

const AuthForm = ({ mode }: AuthFormProps) => {
    const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const isRegister = mode === 'register';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isRegister && form.password !== form.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (!form.email || !form.password || (isRegister && !form.confirmPassword)) {
            setError('Please fill all fields');
            return;
        }

        if (isRegister) {
            try {
                const response = await apiClient.post('/auth/register', {
                    username: form.email,
                    password: form.password,
                });
                // Axios puts the status in response.status
                if (response.status !== 200 && response.status !== 201) {
                    let message = 'Registration failed';
                    if (response.data && response.data.message) {
                        message = response.data.message;
                    }
                    setError(message);
                    return;
                }
                navigate('/');
            } catch (err: any) {
                if (err.response && err.response.data && err.response.data.message) {
                    console.log(err.response.data.message);
                    setError(err.response.data.message);
                } else {
                    console.log('Network error. ', err);
                    setError('Network error. Please try again.');
                }
            }
        } else {
            try {
                const response = await apiClient.post('/auth/login', {
                    username: form.email,
                    password: form.password,
                });
                // Axios puts the status in response.status
                if (response.status !== 200 && response.status !== 201) {
                    let message = 'Login failed';
                    if (response.data && response.data.message) {
                        message = response.data.message;
                    }
                    setError(message);
                    return;
                }
                navigate('/');
            } catch (err: any) {
                if (err.response && err.response.data && err.response.data.message) {
                    console.log(err.response.data.message);
                    setError(err.response.data.message);
                } else {
                    console.log('Network error. ', err);
                    setError('Network error. Please try again.');
                }
            }
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
            }}
        >
            <Paper elevation={3} sx={{ p: { xs: 3, sm: 5 }, width: '100%', maxWidth: 400 }}>
                <Typography variant="h4" fontWeight={700} mb={2} textAlign="center">
                    {isRegister ? 'Create Account' : 'Sign In'}
                </Typography>
                <Typography color="text.secondary" mb={3} textAlign="center">
                    {isRegister ? 'Join us and start shopping!' : 'Welcome back! Please login.'}
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit} noValidate>
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
                            autoComplete="new-password"
                        />
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        sx={{ mt: 2, mb: 1, py: 1.5, fontWeight: 600, borderRadius: 2 }}
                    >
                        {isRegister ? 'Register' : 'Login'}
                    </Button>
                </Box>
                <Typography variant="body2" align="center" mt={2}>
                    {isRegister ? (
                        <>
                            Already have an account?{' '}
                            <MuiLink component={Link} to="/login" color="primary">
                                Login
                            </MuiLink>
                        </>
                    ) : (
                        <>
                            Don&apos;t have an account?{' '}
                            <MuiLink component={Link} to="/register" color="primary">
                                Register
                            </MuiLink>
                        </>
                    )}
                </Typography>
            </Paper>
        </Box>
    );
};

export default AuthForm;