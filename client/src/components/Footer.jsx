import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
    return (
        <footer style={{ backgroundColor: '#333', color: 'white', padding: '24px', textAlign: 'center' }}> {/* Adjusted inline style for compatibility */}
            <Grid container direction="column" alignItems="center" spacing={2}>
                <Grid item>
                    <Typography variant="h6" gutterBottom>
                        Charity Donation Platform
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Making a difference with every donation.
                    </Typography>
                </Grid>
                <Grid item>
                    {['/', '/about-us', '/donation', '/contact', '/joinus', '/donation-history'].map((path) => (
                        <Link component={RouterLink} to={path} key={path} style={{ color: 'inherit', marginRight: path !== '/donation-history' ? '8px' : '0' }}>
                            {path.slice(1) || 'Home'}
                        </Link>
                    ))}
                </Grid>
                <Grid item style={{ marginTop: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '8px' }}>
                    <IconButton aria-label="Facebook page" color="inherit" href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
                        <FacebookIcon />
                    </IconButton>
                    <IconButton aria-label="Twitter page" color="inherit" href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                        <TwitterIcon />
                    </IconButton>
                    <IconButton aria-label="LinkedIn profile" color="inherit" href="https://www.linkedin.com/in/luisellamas/" target="_blank" rel="noopener noreferrer">
                        <LinkedInIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography variant="body2" color="textSecondary" align="center">
                        © 
                        <Link color="inherit" href="https://github.com/maslla100" target="_blank" rel="noopener noreferrer">
                            Designed By:
                        </Link> 
                        {new Date().getFullYear()}
                        .
                    </Typography>
                </Grid>
            </Grid>
        </footer>
    );
}

export default Footer;
