import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Assuming you have an AuthContext for user authentication
import { useQuery } from '@apollo/client';
import { GET_USER_DONATIONS } from '../graphql/queries'; // Assume you have a GraphQL query setup
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const DonationHistoryPage = () => {
    const { user } = useContext(AuthContext); // Assuming AuthContext holds user info if logged in
    const { loading, error, data } = useQuery(GET_USER_DONATIONS, {
        variables: { userId: user?.id },
        skip: !user?.id,
    });

    if (!user) {
        return <p>Please log in to view your donation history.</p>;
    }

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">Error loading your donation history.</Alert>;

    return (
        <div>
            <h1>Donation History</h1>
            <ul>
                {data.donations.map((donation) => (
                    <li key={donation.id}>
                        <strong>{donation.charity.name}</strong> - ${donation.amount} donated on {new Date(donation.createdAt).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DonationHistoryPage;
