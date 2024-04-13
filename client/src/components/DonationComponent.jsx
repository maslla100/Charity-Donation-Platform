import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_DONATION } from '../graphql/mutations';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const DonationComponent = ({ charityId }) => {
    const [amount, setAmount] = useState('');
    const [addDonation, { loading, error }] = useMutation(ADD_DONATION);
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    const handleInputChange = (event) => {
        const { value } = event.target;
        if (!isNaN(value) && parseFloat(value) >= 0) {
            setAmount(value);
        }
    };

    const handleDonate = async () => {
        if (parseFloat(amount) > 0) {
            try {
                await addDonation({ variables: { charityId, amount: parseFloat(amount) } });
                setOpen(true);
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
            <input type="number" value={amount} onChange={handleInputChange} placeholder="Enter donation amount" />
            <button onClick={handleDonate} disabled={loading || amount <= 0}>Donate</button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>Donation successful!</Alert>
            </Snackbar>
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default DonationComponent;
