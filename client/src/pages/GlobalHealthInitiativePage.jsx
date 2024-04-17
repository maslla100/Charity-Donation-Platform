import React from 'react';
import { Typography, Container, Paper, Button, Link, Grid, Card, CardMedia, CardContent } from '@mui/material';

const CharityDetailPage = ({ charity }) => {
    const {
        name, description, email, telephone, logo, address, ein, missionStatement, website, rating
    } = charity;

    const capitalizeWords = (str) =>
        str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <Container maxWidth="lg">
            <Paper elevation={6} sx={{ my: 4, p: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="250"
                                image={logo}
                                alt={`Logo of ${name}`}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div">
                                    {capitalizeWords(name)}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    <strong>Mission:</strong> {missionStatement}
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    {description}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Contact:</strong> {telephone} | <strong>Email:</strong> <Link href={`mailto:${email}`}>{email}</Link>
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Address:</strong> {`${address.number} ${address.street}, ${address.city}, ${address.state} ${address.zipCode}`}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>EIN:</strong> {ein}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Rating:</strong> {rating}
                                </Typography>
                                <Link href={website} target="_blank" rel="noopener" sx={{ mt: 2, display: 'block' }}>
                                    Visit Website
                                </Link>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            About the Global Health Initiative
                        </Typography>
                        <Typography paragraph>
                            The Global Health Initiative is at the forefront of battling diseases and enhancing public health standards worldwide. With a focus on sustainable and innovative healthcare solutions, our goal is to improve the lives of communities globally.
                        </Typography>
                        <Typography paragraph>
                            Join us in our mission to save lives and reduce diseases as we strive towards a healthier future for all.
                        </Typography>
                        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                            Make a Donation
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default CharityDetailPage;
