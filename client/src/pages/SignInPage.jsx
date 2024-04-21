import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Paper, Typography, CircularProgress, Alert } from '@mui/material';
import { LOGIN_USER } from '../graphql/mutations';

function SignInPage() {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();
    const [loginUser, { loading, error: signInError }] = useMutation(LOGIN_USER);

    const validateEmail = email => String(email)
        .toLowerCase()
        .match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    const handleChange = ({ target: { name, value } }) => {
        if (name === 'email') {
            setEmailError(validateEmail(value) ? '' : 'Invalid email format');
        }
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async event => {
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
        } catch (error) {  // Change variable name to just 'error'
            console.error('Sign in error:', error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} sx={{ padding: 3, marginTop: 7 }}>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <form onSubmit={handleFormSubmit}>
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
                        sx={{ marginTop: 3, marginBottom: 2 }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Sign In'}
                    </Button>
                    {signInError && <Alert severity="error">{signInError.message || 'Login failed. Please check your credentials.'}</Alert>}
                </form>
            </Paper>
        </Container>
    );
}

export default SignInPage;
