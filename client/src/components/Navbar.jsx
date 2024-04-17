import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = Boolean(localStorage.getItem('token'));

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLogoff = () => {
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
    };

    return (
        <>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Charity Donation Platform
                    </Typography>
                    <Button color="inherit" onClick={() => handleNavigate('/')}>Home</Button>
                    <Button color="inherit" onClick={() => handleNavigate('/about-us')}>About Us</Button>
                    <Button color="inherit" onClick={() => handleNavigate('/donation')}>Donate</Button>
                    <Button color="inherit" onClick={() => handleNavigate('/contact')}>Contact Us</Button>
                    <Button color="inherit" onClick={() => handleNavigate('/joinus')}>Join Us</Button>
                    {isLoggedIn ? (
                        <>
                            <Button color="inherit" onClick={() => handleNavigate('/donation-history')}>Donation History</Button>
                            <Button color="inherit" onClick={handleLogoff}>Log Off</Button>
                        </>
                    ) : (
                        <Button color="inherit" onClick={() => handleNavigate('/signin')}>Sign In</Button>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;
