import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_DONATION } from '../graphql/mutations';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const DonationComponent = ({ charityId }) => {
    const [amount, setAmount] = useState('');
    const [addDonation, { loading, error }] = useMutation(ADD_DONATION);
    const [snackbarInfo, setSnackbarInfo] = useState({ open: false, severity: 'info', message: '' });

    const handleSnackbarClose = () => setSnackbarInfo({ ...snackbarInfo, open: false });

    const handleInputChange = (event) => {
        const { value } = event.target;
        setAmount(value);
    };

    const handleDonate = async () => {
        const donationAmount = parseFloat(amount);
        if (donationAmount > 0) {
            try {
                await addDonation({ variables: { charityId, amount: donationAmount } });
                setSnackbarInfo({ open: true, severity: 'success', message: 'Donation successful!' });
                setAmount('');
            } catch (err) {
                console.error('Donation error:', err);
                setSnackbarInfo({ open: true, severity: 'error', message: 'Failed to process donation. Please try again.' });
            }
        } else {
            setSnackbarInfo({ open: true, severity: 'warning', message: 'Please enter a valid donation amount.' });
        }
    };

    return (
        <div>
            <TextField
                type="number"
                value={amount}
                onChange={handleInputChange}
                placeholder="Enter donation amount"
                fullWidth
                label="Donation Amount"
                variant="outlined"
                InputProps={{ inputProps: { min: 1 } }}
            />
            <Button onClick={handleDonate} disabled={loading || amount <= 0} variant="contained" color="primary" sx={{ mt: 2 }}>
                Donate
            </Button>
            <Snackbar open={snackbarInfo.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarInfo.severity} sx={{ width: '100%' }}>
                    {snackbarInfo.message}
                </Alert>
            </Snackbar>
            {error && (
                <Snackbar open={!!error} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                        Error: {error.message}
                    </Alert>
                </Snackbar>
            )}
        </div>
    );
};

export default DonationComponent;
