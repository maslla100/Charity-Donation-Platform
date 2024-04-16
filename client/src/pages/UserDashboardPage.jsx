
import React from 'react';
import { useQuery } from '@apollo/client';
import { FETCH_USER_DASHBOARD } from '../graphql/queries';

const UserDashboardPage = () => {
    const { data, loading, error } = useQuery(FETCH_USER_DASHBOARD, {

    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>User Dashboard</h1>
            <h2>Welcome, {data.user.firstName} {data.user.lastName}</h2>
            <div>
                <h3>Charities You Follow</h3>
                {data.user.charities.map((charity) => (
                    <p key={charity.id}>{charity.name}</p>
                ))}
            </div>
            <div>
                <h3>Your Donation History</h3>
                {data.user.donations.map((donation) => (
                    <p key={donation.id}>{donation.charity.name} - ${donation.amount}</p>
                ))}
            </div>
        </div>
    );
};

export default UserDashboardPage;
