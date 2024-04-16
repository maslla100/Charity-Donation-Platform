import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button, Box, Typography, Snackbar, Alert, MenuItem, CircularProgress } from '@mui/material';
import { SIGNUP_AND_DONATE } from '../graphql/mutations';

const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
const SignUptoDonate = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        number: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        amount: '',
        charityId: ''
    });
    const [errors, setErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [signupAndDonate, { loading, error }] = useMutation(SIGNUP_AND_DONATE);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        validateField(name, value);
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}$/;
        return regex.test(password);
    };

    const validateField = (name, value) => {
        let errorMsg = '';
        if (!value) {
            errorMsg = 'This field is required.';
        } else if (name === 'email' && !validateEmail(value)) {
            errorMsg = 'Please enter a valid email address.';
        } else if (name === 'password' && !validatePassword(value)) {
            errorMsg = 'Password must include at least one number, one uppercase, one lowercase letter, and one special character.';
        } else if (name === 'confirmPassword' && value !== formData.password) {
            errorMsg = 'Passwords do not match.';
        } else if (name === 'amount' && (isNaN(value) || parseFloat(value) <= 0)) {
            errorMsg = 'Please enter a valid donation amount.';
        }
        setErrors(prev => ({ ...prev, [name]: errorMsg }));
    };


    const validateForm = () => {
        let isValid = true;
        Object.keys(formData).forEach(field => {
            if (!formData[field] || errors[field]) {
                isValid = false;
            }
        });
        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            setOpenSnackbar(true);
            setSnackbarMessage('Please correct the highlighted errors.');
            return;
        }

        try {
            await signupAndDonate({
                variables: { ...formData, amount: parseFloat(formData.amount) },
            });
            setSnackbarMessage('Account created and donation successful! Thank you for your support.');
            setOpenSnackbar(true);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                number: '',
                street: '',
                city: '',
                state: '',
                zipCode: '',
                amount: '',
                charityId: ''
            });
            setErrors({});
        } catch (err) {
            console.error('Error during signup and donation:', err);
            setSnackbarMessage('Failed to process your donation.');
            setOpenSnackbar(true);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, mb: 2 }}>
            <Typography variant="h6">Sign Up to Donate</Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>Personal Information</Typography>
            {['firstName', 'lastName', 'email', 'password', 'confirmPassword'].map(field => (
                <TextField
                    key={field}
                    margin="normal"
                    required
                    fullWidth
                    id={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                    name={field}
                    type={field.includes('password') ? 'password' : 'text'}
                    value={formData[field]}
                    onChange={handleChange}
                    error={!!errors[field]}
                    helperText={errors[field]}
                />
            ))}
            <Typography variant="subtitle1" sx={{ mt: 2 }}>Address</Typography>
            {['number', 'street', 'city', 'zipCode'].map(field => (
                <TextField
                    key={field}
                    margin="normal"
                    required
                    fullWidth
                    id={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                    name={field}
                    type='text'
                    value={formData[field]}
                    onChange={handleChange}
                />
            ))}
            <TextField
                select
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                fullWidth
                required
            >
                {states.map(option => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
            </TextField>
            <TextField
                key="amount"
                margin="normal"
                required
                fullWidth
                id="amount"
                label="Donation Amount ($)"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                error={!!errors.amount}
                helperText={errors.amount || "Enter the amount you wish to donate"}
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
                <Alert onClose={() => setOpenSnackbar(false)} severity={error || Object.keys(errors).some(k => errors[k]) ? "error" : "success"} sx={{ width: '100%' }}>
                    {snackbarMessage || 'An error occurred'}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default SignUptoDonate;
