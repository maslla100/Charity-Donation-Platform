import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#eee', padding: '48px' }}>
            <Grid container direction="column" alignItems="center" spacing={2}>
                <Grid item>
                    <Typography variant="h6" gutterBottom>
                        Charity Donation Platform
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1" color="textSecondary" component="p">
                        Making a difference with every donation.
                    </Typography>
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
                    <IconButton aria-label="LinkedIn" color="inherit" href="https://LinkedIn.com/yourpage">
                        <LinkedInIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography variant="body2" color="textSecondary" align="center">
                        {'© '}
                        <Link color="inherit" href="https://yourwebsite.com/">
                            Your Website
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
