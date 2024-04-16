import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/Api';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Paper, Typography, CircularProgress, Alert } from '@mui/material';

const SignInPage = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [loginUser, { loading, data, error }] = useMutation(LOGIN_USER);
    const navigate = useNavigate();

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await loginUser({ variables: { ...formState } });
            if (response.data.loginUser.token) {
                localStorage.setItem('token', response.data.loginUser.token);
                navigate('/');
            } else {
                console.error('Login succeeded but no token received.');

            }
        } catch (e) {
            console.error('Sign in error:', e);

        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} sx={{ p: 3, mt: 7 }}>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <form onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formState.email}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Sign In'}
                    </Button>
                    {error && <Alert severity="error">{error.message || 'Login failed. Please check your credentials.'}</Alert>}
                </form>
            </Paper>
        </Container>
    );
};

export default SignInPage;
