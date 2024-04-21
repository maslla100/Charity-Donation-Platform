import React from 'react';
import { useQuery } from '@apollo/client';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import { Skeleton } from '@mui/material';
import { GET_CHARITIES } from '../graphql/queries';
import CharityCard from './CharityCard';

function CharityList() {
    const { data, loading, error } = useQuery(GET_CHARITIES);

    if (loading) return (
        <Grid container spacing={2}>
            {Array.from({ length: 3 }, (_, idx) => idx).map(index => (
                <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}-${Date.now()}`}> 
                    <Skeleton variant="rectangular" width="100%" height={200} />
                    <Skeleton variant="text" height={60} />
                    <Skeleton variant="text" height={60} />
                </Grid>
            ))}
        </Grid>
    );

    if (error) return <Alert severity="error">Error loading charities: {error.message}</Alert>;

    if (!data || !data.charities || data.charities.length === 0) return (
        <Alert severity="info">No charities found. Please check if the database is populated or refresh the page.</Alert>
    );

    return (
        <Grid container spacing={2}>
            {data.charities.map(charity => (
                <Grid item key={charity._id} xs={12} sm={6} md={4}>
                    <CharityCard charity={charity} />
                </Grid>
            ))}
        </Grid>
    );
}

export default CharityList;
