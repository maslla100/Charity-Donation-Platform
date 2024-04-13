import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/Api';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Paper, Typography, CircularProgress } from '@mui/material';
import Alert from '@mui/material/Alert';

const SignInPage = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [loginUser, { loading, error }] = useMutation(LOGIN_USER);
    const navigate = useNavigate();

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await loginUser({ variables: { ...formState } });
            // Assuming the token is part of the response data, save it
            localStorage.setItem('token', data.loginUser.token); // Uncomment if using token authentication
            navigate('/'); // Redirect to homepage
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
            <Paper elevation={6} style={{ padding: '20px', marginTop: '50px' }}>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <form onSubmit={handleFormSubmit} style={{ marginTop: '20px' }}>
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
                        style={{ marginTop: '24px', marginBottom: '16px' }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Sign In'}
                    </Button>
                    {error && <Alert severity="error">Login failed. Please check your credentials.</Alert>}
                </form>
            </Paper>
        </Container>
    );
};

export default SignInPage;
