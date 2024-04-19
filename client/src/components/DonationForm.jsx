import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_DONATION } from '../graphql/mutations';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Dropdown } from 'semantic-ui-react';
import { GET_CHARITIES } from '../graphql/queries';
import '../styles/DonationForm.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const DonationForm = () => {
    const [donationAmount, setDonationAmount] = useState('');
    const [selectedCharity, setSelectedCharity] = useState('');
    const { loading: loadingCharities, data: charitiesData } = useQuery(GET_CHARITIES);
    const [addDonation, { loading: loadingDonation, error: donationError }] = useMutation(ADD_DONATION);

    const stripe = useStripe();
    const elements = useElements();

    const capitalizeText = (text) => text.replace(/\b\w/g, char => char.toUpperCase());

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            console.error('Stripe has not loaded');
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (stripeError) {
            console.error('Stripe error:', stripeError);
            alert(stripeError.message);
            return;
        }

        const amount = parseFloat(donationAmount);
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid donation amount.');
            return;
        }

        try {
            const response = await addDonation({
                variables: { charityId: selectedCharity, amount, paymentMethodId: paymentMethod.id }
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
        <Elements stripe={stripePromise}>
            <form onSubmit={handleSubmit} className="donation-form">
                <h3>Make a Donation</h3>
                <Dropdown
                    placeholder='Select Charity'
                    fluid
                    selection
                    className="charity-dropdown"
                    loading={loadingCharities}
                    options={charitiesData?.charities.map(charity => ({
                        key: charity._id,
                        text: capitalizeText(charity.name),
                        value: charity._id
                    }))}
                    onChange={(_, { value }) => setSelectedCharity(value)}
                />
                <CardElement className="card-element" />
                <input
                    type="number"
                    value={donationAmount}
                    className="donation-input"
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="Donation Amount"
                    min="1"
                    required
                />
                <button type="submit" disabled={loadingDonation || !stripe}>Donate</button>
                {donationError && <div style={{ color: 'red' }}>An error occurred: {donationError.message}</div>}
            </form>
        </Elements>
    );
};

export default DonationForm;
