import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import './CharityCard.css';

const CharityCard = ({ charity }) => {
    let navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/charity/${charity.id}`);
    };

    return (
        <Card className="charity-card" variant="outlined" onClick={handleCardClick}>
            <CardActionArea>
                <CardContent>
                    <Typography variant="h5">{charity.name}</Typography>
                    <Typography variant="body2">{charity.description}</Typography>
                    {/* Add more details as needed */}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CharityCard;
