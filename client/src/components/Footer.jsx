import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#333', color: 'white', padding: '48px', textAlign: 'center' }}>
            <Grid container direction="column" alignItems="center" spacing={2}>
                <Grid item>
                    <Typography variant="h6" gutterBottom>
                        Charity Donation Platform
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" component="p">
                        Making a difference with every donation.
                    </Typography>
                </Grid>
                <Grid item>
                    <RouterLink to="/" style={{ color: 'white', marginRight: '15px' }}>Home</RouterLink>
                    <RouterLink to="/about-us" style={{ color: 'white', marginRight: '15px' }}>About Us</RouterLink>
                    <RouterLink to="/signuptodonate" style={{ color: 'white', marginRight: '15px' }}>Donate</RouterLink>
                    <RouterLink to="/contact" style={{ color: 'white', marginRight: '15px' }}>Contact Us</RouterLink>
                    <RouterLink to="/joinus" style={{ color: 'white', marginRight: '15px' }}>Join Us</RouterLink>
                    <RouterLink to="/donation-history" style={{ color: 'white' }}>Donation History</RouterLink>
                </Grid>
                <Grid item sx={{
                    marginTop: 2,
                    marginBottom: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 2
                }}>
                    <IconButton aria-label="facebook" color="inherit" href="https://facebook.com/yourpage">
                        <FacebookIcon />
                    </IconButton>
                    <IconButton aria-label="Twitter" color="inherit" href="https://twitter.com/yourpage">
                        <TwitterIcon />
                    </IconButton>
                    <IconButton aria-label="LinkedIn" color="inherit" href="https://www.linkedin.com/in/luisellamas/">
                        <LinkedInIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography variant="body2" color="textSecondary" align="center">
                        {'© '}
                        <Link color="inherit" href="https://github.com/maslla100">
                            Designed By:
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Grid>
            </Grid>
        </footer>
    );
};

export default Footer;
