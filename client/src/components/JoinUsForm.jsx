import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button, Box, Typography, Snackbar, Alert } from '@mui/material';
import { SIGNUP_USER } from '../graphql/mutations';

const JoinUsForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        number: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [signupUser, { loading, error }] = useMutation(SIGNUP_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.number || !formData.street || !formData.city || !formData.state || !formData.zipCode) {
            setSnackbarMessage('All fields are required.');
            setOpenSnackbar(true);
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await signupUser({
                variables: { ...formData },
            });
            setSnackbarMessage('Account created successfully! Please log in.');
            setOpenSnackbar(true);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                number: '',
                street: '',
                city: '',
                state: '',
                zipCode: '',
            });
        } catch (err) {
            console.error('Error during sign up:', err);
            setSnackbarMessage(err.message || 'Failed to create account.');
            setOpenSnackbar(true);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, mb: 2 }}>
            <Typography variant="h6">Join Us and Stay Informed</Typography>
            {['firstName', 'lastName', 'email', 'number', 'street', 'city', 'state', 'zipCode', 'password'].map(field => (
                <TextField
                    key={field}
                    margin="normal"
                    required
                    fullWidth
                    id={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                    name={field}
                    type={field === 'password' ? 'password' : 'text'}
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
                {loading ? 'Creating Account...' : 'Create Account'}
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
