import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button, Box, Typography, Snackbar, Alert } from '@mui/material';
import { SEND_FEEDBACK } from '../graphql/mutations'; // Corrected import order

// Converted to a function declaration
function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [snackbarInfo, setSnackbarInfo] = useState({ open: false, message: '', severity: 'info' });

    const [sendFeedback, { loading }] = useMutation(SEND_FEEDBACK, {
        onCompleted: (data) => {
            const severity = data.sendFeedback.success ? 'success' : 'error';
            setSnackbarInfo({
                open: true,
                message: data.sendFeedback.message,
                severity // Using shorthand here
            });
            
            if (data.sendFeedback.success) {
                setFormData({ name: '', email: '', message: '' }); // Clear form only on success
            }
        },
        onError: (error) => {
            setSnackbarInfo({
                open: true,
                message: error.message || 'Error sending message. Please try again.',
                severity: 'error'
            });
        }
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value })); // Object shorthand maintained
    };

    const validateEmail = (email) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email); // Arrow function with implicit return

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateEmail(formData.email)) {
            setSnackbarInfo({ open: true, message: 'Please enter a valid email address.', severity: 'error' });
            return;
        }
        sendFeedback({ variables: { input: formData } });
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarInfo(prevInfo => ({ ...prevInfo, open: false })); // Properly use object spread with implicit return
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: -15, padding: 16, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6">Contact Us</Typography>
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
                name="message"
                label="Message"
                type="text"
                id="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
            >
                Send Message
            </Button>
            <Snackbar open={snackbarInfo.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarInfo.severity} sx={{ width: '100%' }}>
                    {snackbarInfo.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default ContactForm;
