import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated for React 18
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@mui/material/styles';
import { Elements } from '@stripe/react-stripe-js';
import CssBaseline from '@mui/material/CssBaseline';
import { loadStripe } from '@stripe/stripe-js'; // Moved before App component
import App from './components/App';
import client from './utils/apolloClient';
import theme from './theme';
import 'semantic-ui-css/semantic.min.css';

// Load Stripe with your secret key from the environment variables
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

const container = document.getElementById('root');
const root = createRoot(container); // Create a root.

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Elements stripe={stripePromise}>
          <CssBaseline />
          <App />
        </Elements>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);
