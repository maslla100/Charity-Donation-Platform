// ./Charity-Donation-Platform/client/src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';

const Navbar = () => {
    return (
        <>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Charity Donation Platform
                    </Typography>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Button color="inherit">Home</Button>
                    </Link>
                    <Link to="/about-us" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Button color="inherit">About Us</Button>
                    </Link>
                    <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Button color="inherit">Contact Us</Button>
                    </Link>
                    <Link to="/joinus" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Button color="inherit">Join Us</Button>
                    </Link>
                    <Link to="/signin" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Button color="inherit">Sign In</Button>
                    </Link>
                    <Link to="/donation-history" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Button color="inherit">Donation History</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;
