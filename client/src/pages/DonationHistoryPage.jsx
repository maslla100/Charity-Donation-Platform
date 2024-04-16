import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_DONATIONS } from '../graphql/queries';
import { CircularProgress, Alert, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DonationHistoryPage = () => {
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(GET_USER_DONATIONS, {
        variables: { userId: userId },
        skip: !userId,
    });

    if (!userId) {
        return <p>Please log in to view your donation history.</p>;
    }

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">Error loading your donation history.</Alert>;

    if (data?.getUserDonations && data.getUserDonations.length === 0) {
        return (
            <div>
                <h1>Donation History</h1>
                <p>You have not made any donations yet.</p>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/donation')}
                >
                    Make a Donation
                </Button>
            </div>
        );
    }

    return (
        <div>
            <h1>Donation History</h1>
            {data?.getUserDonations ? (
                <ul>
                    {data.getUserDonations.map((donation) => (
                        <li key={donation.id}>
                            <strong>{donation.charity.name}</strong> - ${donation.amount} donated on {new Date(donation.createdAt).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No donations found.</p>
            )}
        </div>
    );
};

export default DonationHistoryPage;
