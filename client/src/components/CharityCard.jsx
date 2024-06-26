import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, CardActionArea, CardMedia, Link, Button } from '@mui/material';
import '../styles/CharityCard.css';

// Using function declaration instead of arrow function for the component
function CharityCard({ charity }) {
    const navigate = useNavigate(); // Changed 'let' to 'const'

    const handleCardClick = () => {
        navigate('/donation');
    };

    const handleDonateClick = (e) => {
        e.stopPropagation();
        navigate('/donation');
    };

    const capitalizeWords = (str) => 
        str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const formatAddress = (address) => 
        `${address.number} ${address.street}, ${address.city}, ${address.state} ${address.zipCode}`;

    return (
        <Card className="charity-card" variant="outlined">
            <CardActionArea onClick={handleCardClick}>
                {charity.logo && (
                    <CardMedia
                        component="img"
                        height="140"
                        image={charity.logo}
                        alt={`Logo of ${capitalizeWords(charity.name)}`}
                    />
                )}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {capitalizeWords(charity.name)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        {charity.description}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Mission:</strong> {charity.missionStatement}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Contact:</strong> {charity.telephone}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Address:</strong> {formatAddress(charity.address)}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>EIN:</strong> {charity.ein}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Website:</strong> <Link href='/donation' target="_blank">{charity.website}</Link>
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Rating:</strong> {charity.rating}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleDonateClick}
                sx={{ mt: 1, color: 'white' }}
            >
                <Link
                    href='/donation'
                    target="_blank"
                    rel="noopener"
                    color="inherit"
                    underline="none"
                    sx={{ width: '100%', display: 'block', textAlign: 'center' }}
                >
                    Donate Now!
                </Link>
            </Button>
        </Card>
    );
}

export default CharityCard;
