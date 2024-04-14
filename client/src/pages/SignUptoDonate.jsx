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
    const [errorField, setErrorField] = useState('');
    const [signupAndDonate, { loading, error }] = useMutation(SIGNUP_AND_DONATE);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errorField) setErrorField(''); // Clear error field when user corrects input
    };

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.amount || !formData.charityId) {
            setErrorField('All fields must be filled');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setErrorField('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            setOpenSnackbar(true);
            return;
        }

        try {
            await signupAndDonate({
                variables: {
                    ...formData,
                    amount: parseFloat(formData.amount)
                }
            });
            setSnackbarMessage('Account created and donation successful! Thank you for your support.');
            setOpenSnackbar(true);
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
            {Object.keys(formData).map(field => (
                <TextField
                    key={field}
                    margin="normal"
                    required
                    fullWidth
                    id={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                    name={field}
                    type={field.includes('password') ? 'password' : (field === 'amount' ? 'number' : 'text')}
                    value={formData[field]}
                    onChange={handleChange}
                />
            ))}
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
                <Alert onClose={() => setOpenSnackbar(false)} severity={error || errorField ? "error" : "success"} sx={{ width: '100%' }}>
                    {errorField || snackbarMessage}
                </Alert>
            </Snackbar>
            {error && <Typography color="error">Error: {error.message}</Typography>}
        </Box>
    );
};

export default SignUptoDonate;
