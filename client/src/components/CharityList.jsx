import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARITIES } from '../graphql/queries';
import CharityCard from './CharityCard';
import Grid from '@mui/material/Grid';

const CharityList = () => {
    const { loading, error, data } = useQuery(GET_CHARITIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;
    if (!data || !data.charities) return <p>No charities found.</p>; // Check if data is null

    return (
        <Grid container spacing={2}>
            {data.charities.map((charity) => (
                <Grid item key={charity.id} xs={12} sm={6} md={4}>
                    <CharityCard charity={charity} />
                </Grid>
            ))}
        </Grid>
    );
};


export default CharityList;
