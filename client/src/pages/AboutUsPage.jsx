// AboutUsPage.jsx
import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const AboutUsPage = () => {
    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                About Us
            </Typography>
            <Typography variant="body1" paragraph>
                At Charity Donation Platform, we are dedicated to creating connections that matter. Our mission is to empower charitable organizations by providing them with a cutting-edge platform where they can showcase their causes, connect with donors, and receive vital funds to continue their impactful work.
            </Typography>
            <Typography variant="body1" paragraph>
                Founded in 2024, our platform was born from a desire to bridge the gap between charities in need and potential donors. Utilizing the latest technologies in the MERN stack—MongoDB, Express.js, React, and Node.js—we have crafted a seamless, single-page application that prioritizes user experience and responsiveness. Each charity on our platform is vetted and provided with a comprehensive profile that includes mission statements, impact scores, and direct donation capabilities.
            </Typography>
            <Typography variant="body1" paragraph>
                Our innovative platform supports real-time interactions and transactions, including one-time or recurring donations through Stripe. This ensures that every contribution directly supports your chosen cause in a secure and transparent manner. We also incorporate GraphQL to efficiently manage data transactions, making your experience as smooth and reliable as possible.
            </Typography>
            <Typography variant="body1" paragraph>
                We are committed to not just facilitating donations but also to ensuring data security and privacy, employing JWT for user authentication and protecting sensitive information on our servers. Our responsive design ensures that whether you are donating from a laptop at home or on your smartphone, your experience remains uninterrupted.
            </Typography>
            <Typography variant="body1" paragraph>
                Beyond technology, we value and strive for inclusivity and community building. Our platform is a testament to what can be achieved when people come together to support one another. We take pride in our robust community of users who are actively making a difference every day.
            </Typography>
            <Typography variant="body1" paragraph>
                Join us at Charity Donation Platform, where your generosity meets efficiency and integrity. Together, we can create a lasting impact and help those in need around the world.
            </Typography>
        </Container>
    );
};

export default AboutUsPage;
