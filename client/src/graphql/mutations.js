import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

export const SEND_FEEDBACK = gql`
  mutation SendFeedback($name: String!, $email: String!, $message: String!) {
    sendFeedback(name: $name, email: $email, message: $message) {
      id
      name
      email
      message
      createdAt
    }
  }
`;


const ADD_DONATION = gql`
  mutation AddDonation($charityId: ID!, $amount: Float!) {
    addDonation(charityId: $charityId, amount: $amount) {
      id
      charity {
        name
      }
      amount
    }
  }
`;

function DonationComponent({ charityId }) {
  const [amount, setAmount] = useState('');
  const [addDonation, { loading, error }] = useMutation(ADD_DONATION);

  const handleDonate = async () => {
    if (amount > 0) {
      try {
        await addDonation({
          variables: {
            charityId: charityId,
            amount: parseFloat(amount)
          }
        });
        alert('Donation successful!');
        setAmount('');
      } catch (err) {
        console.error('Donation error:', err);
      }
    } else {
      alert('Please enter a valid donation amount.');
    }
  };

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter donation amount"
      />
      <button onClick={handleDonate} disabled={loading}>
        Donate
      </button>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
