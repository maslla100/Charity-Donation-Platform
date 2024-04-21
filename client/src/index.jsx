import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; 
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { StripeProvider } from './utils/StripeContext';
import App from './components/App';
import client from './utils/apolloClient';
import theme from './theme';
import 'semantic-ui-css/semantic.min.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Apply CssBaseline directly under ThemeProvider */}
        <StripeProvider stripePromise={stripePromise}>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </StripeProvider>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);
