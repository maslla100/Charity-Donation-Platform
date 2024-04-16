import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';

const Navbar = () => {
    const history = useNavigate();

    const handleNavigate = (path) => {
        history.push(path);
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
                    <Button color="inherit" onClick={() => handleNavigate('/signuptodonate')}>Donate</Button>
                    <Button color="inherit" onClick={() => handleNavigate('/contact')}>Contact Us</Button>
                    <Button color="inherit" onClick={() => handleNavigate('/joinus')}>Join Us</Button>
                    <Button color="inherit" onClick={() => handleNavigate('/signin')}>Sign In</Button>
                    <Button color="inherit" onClick={() => handleNavigate('/donation-history')}>Donation History</Button>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;
