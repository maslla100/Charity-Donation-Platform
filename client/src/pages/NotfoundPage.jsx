import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Container } from '@mui/material';

const NotFoundPage = () => {
    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: '20vh', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                404 - Page Not Found
            </Typography>
            <Typography variant="subtitle1">
                Oops! The page you are looking for does not exist.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
                component={Link}
                to="/"
            >
                Go Home
            </Button>
        </Container>
    );
};

export default NotFoundPage;
