// ./Charity-Donation-Platform/client/src/pages/CharityPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

// Example charity data - you would fetch this from your backend
const charityExample = {
    id: 'charity1',
    name: 'Charity One',
    mission: 'Helping everyone everywhere.',
    telephone: '123-456-7890',
    address: '1234 Charity St.',
    website: 'https://charityone.example.com',
};

const CharityPage = () => {
    // Use `useParams` to access `id` parameter from the route
    let { id } = useParams();

    // Fetch charity details based on `id` (here we're using a static example)
    // In a real app, you'd fetch this data from your server
    const charity = charityExample; // Replace with fetch logic

    return (
        <div>
            <h2>{charity.name}</h2>
            <p>{charity.mission}</p>
            <p>Telephone: {charity.telephone}</p>
            <p>Address: {charity.address}</p>
            <p>Website: <a href={charity.website} target="_blank" rel="noopener noreferrer">{charity.website}</a></p>
            {/* Add a link or button to navigate to the DonationForm for this charity */}
        </div>
    );
};

export default CharityPage;
