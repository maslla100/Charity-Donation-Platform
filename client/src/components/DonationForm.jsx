import React, { useState, useContext } from 'react'; // Ensure useContext is imported
import { useQuery, useMutation } from '@apollo/client';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { Dropdown, Loader } from 'semantic-ui-react';
import { ADD_DONATION } from '../graphql/mutations';
import { GET_CHARITIES } from '../graphql/queries';
import { StripeContext } from '../utils/StripeContext'; // Ensure correct path
import '../styles/DonationForm.css';

function DonationForm() {
    const stripePromise = useContext(StripeContext); // Correct usage of useContext to access Stripe
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
        if (Number.isNaN(amount) || amount <= 0) {
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
                {loadingCharities ? <Loader active inline='centered' /> : (
                    <Dropdown
                        placeholder='Select Charity'
                        fluid
                        selection
                        className="charity-dropdown"
                        options={charitiesData?.charities.map(charity => ({
                            key: `charity-${charity._id}`,
                            text: capitalizeText(charity.name),
                            value: charity._id
                        }))}
                        onChange={(_, { value }) => setSelectedCharity(value)}
                    />
                )}
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
}

export default DonationForm;
