import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button, Box, Typography, Snackbar, Alert } from '@mui/material';
import { SIGNUP_AND_DONATE } from '../graphql/mutations';

const SignUptoDonate = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
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
        if (!formData.name || !formData.email || !formData.amount || !formData.charityId) {
            setSnackbarMessage('All fields are required.');
            setOpenSnackbar(true);
            return;
        }

        try {
            const { data } = await signupAndDonate({
                variables: {
                    name: formData.name,
                    email: formData.email,
                    amount: parseFloat(formData.amount),
                    charityId: formData.charityId
                }
            });
            setSnackbarMessage('Thank you for your donation!');
            setOpenSnackbar(true);
            setFormData({
                name: '',
                email: '',
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
                Donate Now
            </Button>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity="info" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            {error && <Typography color="error">Error: {error.message}</Typography>}
        </Box>
    );
};

export default SignUptoDonate;
