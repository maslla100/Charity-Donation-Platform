import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button, Box, Typography, Snackbar, Alert, CircularProgress } from '@mui/material';
import { SIGNUP_AND_DONATE } from '../graphql/mutations';

const SignUptoDonate = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        amount: '',
        charityId: ''
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [signupAndDonate, { loading, error }] = useMutation(SIGNUP_AND_DONATE);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.name || !formData.email || !formData.password || formData.password !== formData.confirmPassword || !formData.amount || !formData.charityId) {
            setSnackbarMessage('Please ensure all fields are filled correctly and passwords match.');
            setOpenSnackbar(true);
            return;
        }

        try {
            const { data } = await signupAndDonate({
                variables: {
                    ...formData,
                    amount: parseFloat(formData.amount) // Ensure amount is a float
                }
            });
            setSnackbarMessage('Account created and donation successful! Thank you for your support.');
            setOpenSnackbar(true);
            // Reset form
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                amount: '',
                charityId: ''
            });
        } catch (err) {
            console.error('Error during signup and donation:', err);
            setSnackbarMessage('Failed to process your donation.');
            setOpenSnackbar(true);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Typography variant="h6">Sign Up to Donate</Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
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
                value={formData.email}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="amount"
                label="Donation Amount"
                type="number"
                id="amount"
                value={formData.amount}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="charityId"
                label="Charity ID"
                type="text"
                id="charityId"
                value={formData.charityId}
                onChange={handleChange}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Donate Now'}
            </Button>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={error ? "error" : "success"} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            {error && <Typography color="error">Error: {error.message}</Typography>}
        </Box>
    );
};

export default SignUptoDonate;
