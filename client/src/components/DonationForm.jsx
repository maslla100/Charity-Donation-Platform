import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_DONATION } from '../graphql/mutations';

const DonationForm = ({ charityId }) => {
    const [donationAmount, setDonationAmount] = useState('');
    // Use the loading state provided by the useMutation hook to handle loading UI
    const [addDonation, { loading, error }] = useMutation(ADD_DONATION);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate the donation amount before proceeding
        const amount = parseFloat(donationAmount);
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid donation amount.');
            return; // Stop the form submission
        }

        try {
            const response = await addDonation({ variables: { charityId, amount } });
            if (response.data) {
                alert('Thank you for your donation!');
                setDonationAmount(''); // Reset the form after successful donation
            }
        } catch (error) {
            console.error('Error making a donation:', error.message);
            // Display a user-friendly error message
            alert('Failed to process donation. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Make a Donation</h3>
            <label htmlFor="donationAmount">Donation Amount:</label>
            <input
                id="donationAmount"
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>Donate</button>
            {error && <div style={{ color: 'red' }}>An error occurred. Please try again.</div>}
        </form>
    );
};

export default DonationForm;
