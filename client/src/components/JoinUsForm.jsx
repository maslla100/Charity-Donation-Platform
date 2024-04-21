import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button, Box, Typography, Snackbar, Alert, MenuItem } from '@mui/material';
import { SIGNUP_USER } from '../graphql/mutations';

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida',
  'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
  'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

function JoinUsForm() {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', password: '', confirmPassword: '', number: '',
        street: '', city: '', state: '', zipCode: '', country: ''
    });
    const [errors, setErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [signupUser, { loading, error }] = useMutation(SIGNUP_USER);

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'password' || name === 'confirmPassword') {
            setErrors(prevErrors => ({
                ...prevErrors,
                confirmPassword: formData.password !== formData.confirmPassword ? 'Passwords do not match' : ''
            }));
        }
    };

    const validateEmail = email => String(email)
        .toLowerCase()
        .match(/^(\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+)$/);

    const validatePassword = password => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}$/.test(password);

    const validateForm = () => {
        const requiredFields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword', 'number', 'street', 'city', 'state', 'zipCode'];
    
        // Check for empty required fields
        const missingField = requiredFields.some(field => {
            if (!formData[field]) {
                setSnackbarMessage(`Please fill out the ${field.replace(/([A-Z])/g, ' $1')}`);
                setOpenSnackbar(true);
                return true;
            }
            return false;
        });
    
        if (missingField) return false;
    
        // Additional validations
        if (!validateEmail(formData.email)) {
            setSnackbarMessage('Please enter a valid email address.');
            setOpenSnackbar(true);
            return false;
        }
    
        if (!validatePassword(formData.password)) {
            setSnackbarMessage('Password does not meet complexity requirements.');
            setOpenSnackbar(true);
            return false;
        }
    
        if (formData.password !== formData.confirmPassword) {
            setSnackbarMessage('Passwords do not match.');
            setOpenSnackbar(true);
            return false;
        }
    
        return true;
    };
    

    const handleSubmit = async event => {
        event.preventDefault();
        if (!validateForm()) return;

        const address = { number: formData.number, street: formData.street, city: formData.city, state: formData.state, zipCode: formData.zipCode, country: formData.country || undefined };
        const signupData = { ...formData, address };

        try {
            await signupUser({ variables: signupData });
            setSnackbarMessage('Account created successfully! Please log in.');
            setOpenSnackbar(true);
            setFormData({
                firstName: '', lastName: '', email: '', password: '', confirmPassword: '', number: '',
                street: '', city: '', state: '', zipCode: '', country: ''
            });
        } catch (err) {
            setSnackbarMessage(err.graphQLErrors?.[0]?.message || 'Failed to create account.');
            setOpenSnackbar(true);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: -15, p: 16, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6">Personal Information</Typography>
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
                    error={field === 'confirmPassword' && errors.confirmPassword !== ''}
                    helperText={field === 'confirmPassword' ? errors.confirmPassword : ''}
                />
            ))}
            <Typography variant="h6" sx={{ mt: 2 }}>Address</Typography>
            {['number', 'street', 'city', 'zipCode', 'country'].map(field => (
                <TextField
                    key={field}
                    margin="normal"
                    required={field !== 'country'}
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
