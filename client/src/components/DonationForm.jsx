import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_DONATION } from '../graphql/mutations';
import { UserContext } from '../context/UserContext'; // Assume you have a context for user data

const DonationForm = ({ charityId }) => {
    const [donationAmount, setDonationAmount] = useState('');
    const { userId } = useContext(UserContext); // Assume there's a context providing user details
    const [addDonation, { loading, error }] = useMutation(ADD_DONATION);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const amount = parseFloat(donationAmount);
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid donation amount.');
            return;
        }

        try {
            const response = await addDonation({
                variables: { charityId, amount, userId } // Pass userId along with other variables
            });
            if (response.data) {
                alert('Thank you for your donation!');
                setDonationAmount('');
            }
        } catch (err) {
            console.error('Error making a donation:', err.message);
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
                min="1" // assuming the minimum donation amount is $1
                required
            />
            <button type="submit" disabled={loading}>Donate</button>
            {error && <div style={{ color: 'red' }}>An error occurred: {error.message}</div>}
        </form>
    );
};

export default DonationForm;
