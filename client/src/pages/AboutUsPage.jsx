import React from 'react';
import { Typography, Container, Paper } from '@mui/material';
import { HelmetProvider, Helmet } from 'react-helmet-async';

const AboutUsPage = () => {
    return (
        <HelmetProvider>
            <main style={{ padding: '20px 0' }}>  {/* Added padding for better spacing */}
                <Helmet>
                    <title>About Us - Charity Donation Platform</title>
                    <meta name="description" content="Learn about Charity Donation Platform and our mission to connect donors with charities using cutting-edge technology." />
                </Helmet>
                <Container>
                    <Typography component="h1" variant="h2" gutterBottom>
                        About Us
                    </Typography>
                    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}> {/* Each section is now a Paper for better visual separation */}
                        <Typography variant="body1" paragraph>
                            At Charity Donation Platform, we are dedicated to creating connections that matter. Our mission is to empower charitable organizations by providing them with a cutting-edge platform where they can showcase their causes, connect with donors, and receive vital funds to continue their impactful work.
                        </Typography>
                    </Paper>
                    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                        <Typography variant="body1" paragraph>
                            Founded in 2024, our platform was born from a desire to bridge the gap between charities in need and potential donors. Utilizing the latest technologies in the MERN stack—MongoDB, Express.js, React, and Node.js—we have crafted a seamless, single-page application that prioritizes user experience and responsiveness. Each charity on our platform is vetted and provided with a comprehensive profile that includes mission statements, impact scores, and direct donation capabilities.
                        </Typography>
                    </Paper>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="body1" paragraph>
                            Join us at Charity Donation Platform, where your generosity meets efficiency and integrity. Together, we can create a lasting impact and help those in need around the world.
                        </Typography>
                    </Paper>
                </Container>
            </main>
        </HelmetProvider>
    );
};

export default AboutUsPage;
