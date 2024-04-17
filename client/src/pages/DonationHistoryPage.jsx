import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_DONATIONS } from '../graphql/queries';
import { CircularProgress, Alert, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';  // Only import what is needed

function formatDate(timestamp) {
    console.log("Raw timestamp:", timestamp); // Log to inspect the raw timestamp values

    if (!timestamp) {
        return 'Date unavailable';  // Handles cases where timestamp might be null or undefined
    }

    try {
        const date = new Date(Number(timestamp));  // Convert the numeric timestamp to a Date object and ensure it's treated as a number
        console.log("Converted Date:", date); // Log to see what the Date object looks like
        if (isNaN(date.getTime())) {  // Validate the date object
            console.error('Invalid date constructed from timestamp:', timestamp);
            return 'Invalid date';
        }
        return format(date, 'MMMM dd, yyyy');  // Format the date using date-fns
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Error formatting date';  // Return this in case of any errors
    }
}

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
                        <li key={donation._id}>
                            <strong>{donation.charity.name}</strong> - ${donation.amount} donated on {formatDate(donation.createdAt)}
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
