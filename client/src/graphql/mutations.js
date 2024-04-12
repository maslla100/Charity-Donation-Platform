import { useMutation, gql } from '@apollo/client';

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
  const [addDonation, { data, loading, error }] = useMutation(ADD_DONATION);

  const handleDonate = amount => {
    addDonation({
      variables: {
        charityId: charityId,
        amount: amount
      }
    });
  };

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <button onClick={() => handleDonate(50)}>Donate $50</button>
  );
}
