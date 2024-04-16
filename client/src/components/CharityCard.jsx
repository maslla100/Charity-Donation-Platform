import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, CardActionArea, CardMedia, Link, Button } from '@mui/material';
import '../styles/CharityCard.css';

const CharityCard = ({ charity }) => {
    let navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/charity/${charity._id}`);
    };

    const handleDonateClick = (e) => {
        e.stopPropagation();
        navigate(`/donate/${charity._id}`);
    };

    const capitalizeWords = (str) =>
        str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

    const formatAddress = (address) => {
        return `${address.number} ${address.street}, ${address.city}, ${address.state} ${address.zipCode}`;
    };

    return (
        <Card className="charity-card" variant="outlined">
            <CardActionArea onClick={handleCardClick}>
                {charity.logo && <CardMedia
                    component="img"
                    height="140"
                    image={charity.logo}
                    alt={`Logo of ${capitalizeWords(charity.name)}`}
                />}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {capitalizeWords(charity.name)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {charity.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Mission: {charity.missionStatement}
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        Contact: {charity.telephone}
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        Address: {formatAddress(charity.address)}
                    </Typography>
                    <Link href={charity.website} target="_blank" rel="noopener">
                        Visit Our Website
                    </Link>
                </CardContent>
            </CardActionArea>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleDonateClick}
                sx={{ mt: 2 }}
            >
                Donate Now
            </Button>
        </Card>
    );
};

export default CharityCard;
