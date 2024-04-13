import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SEND_FEEDBACK } from '../graphql/mutations';
import { TextField, Button, Box, Typography } from '@mui/material';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [sendFeedback, { data, loading, error }] = useMutation(SEND_FEEDBACK);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await sendFeedback({
                variables: {
                    name: formData.name,
                    email: formData.email,
                    message: formData.message
                }
            });
            alert('Your message has been sent successfully!');
            setFormData({
                name: '',
                email: '',
                message: ''
            });
        } catch (err) {
            console.error('Error sending message:', err);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
            >
                Send Message
            </Button>
            {error && <Typography color="error">Error: {error.message}</Typography>}
            {data && <Typography color="primary">Message sent successfully!</Typography>}
        </Box>
    );
};

export default ContactForm;
