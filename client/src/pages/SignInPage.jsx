import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Paper, Typography, CircularProgress, Alert } from '@mui/material';

const SignInPage = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [emailError, setEmailError] = useState('');
    const [loginUser, { loading, error }] = useMutation(LOGIN_USER);
    const navigate = useNavigate();


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!validateEmail(formState.email)) {
            setEmailError('Invalid email format');
            return;
        }
        try {
            const response = await loginUser({
                variables: {
                    email: formState.email,
                    password: formState.password
                }
            });

            if (response.data.signIn.token && response.data.signIn.user._id) {
                localStorage.setItem('token', response.data.signIn.token);
                localStorage.setItem('userId', response.data.signIn.user._id);
                navigate('/');
            } else {
                console.error('Login succeeded but no token or user ID received.');
            }
        } catch (error) {
            console.error('Sign in error:', error);
        }
    };


    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    };

    const handleChange = ({ target: { name, value } }) => {
        if (name === 'email') {
            const isValidEmail = validateEmail(value);
            setEmailError(isValidEmail ? '' : 'Invalid email format');
        }
        setFormState(prev => ({ ...prev, [name]: value }));
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
                        error={!!emailError}
                        helperText={emailError}
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
                        disabled={loading || !!emailError}
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
