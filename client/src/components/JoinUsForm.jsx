import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button, Box, Typography, Snackbar, Alert } from '@mui/material';
import { SIGNUP_USER } from '../graphql/mutations'; // Adjust this import according to your actual file

const JoinUsForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: ''
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [signupUser, { loading, error }] = useMutation(SIGNUP_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.name || !formData.email || !formData.address) {
            setSnackbarMessage('All fields are required.');
            setOpenSnackbar(true);
            return;
        }

        try {
            const { data } = await signupUser({
                variables: formData
            });
            setSnackbarMessage('Account created successfully! Please log in.');
            setOpenSnackbar(true);
            // Optionally reset form here
            setFormData({
                name: '',
                email: '',
                address: ''
            });
        } catch (err) {
            console.error('Error during sign up:', err);
            setSnackbarMessage('Failed to create account.');
            setOpenSnackbar(true);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, mb: 2 }}        >
            <Typography variant="h6">Join Us and Stay Informed</Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={formData.name}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                value={formData.address}
                onChange={handleChange}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
            >
                Create Account
            </Button>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={error ? "error" : "success"} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default JoinUsForm;
