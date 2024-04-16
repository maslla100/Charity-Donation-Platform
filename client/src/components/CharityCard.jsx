import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, CardActionArea, CardMedia, Link } from '@mui/material';
import '../styles/CharityCard.css';

const CharityCard = ({ charity }) => {
    let navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/charity/${charity._id}`);
    };

    // Helper function to format address
    const formatAddress = (address) => {
        return `${address.number} ${address.street}, ${address.city}, ${address.state} ${address.zipCode}`;
    };

    return (
        <Card className="charity-card" variant="outlined" onClick={handleCardClick}>
            <CardActionArea>
                {charity.logo && <CardMedia
                    component="img"
                    height="140"
                    image={charity.logo}
                    alt={`Logo of ${charity.name}`}
                />}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {charity.name}
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
                        Visit Website
                    </Link>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CharityCard;
