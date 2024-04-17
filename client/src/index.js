import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@mui/material/styles';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CssBaseline from '@mui/material/CssBaseline';
import App from './components/App.jsx';
import client from './utils/apolloClient';
import theme from './theme';
import 'semantic-ui-css/semantic.min.css';


// Load your stripe public key from the environment variables or directly
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Elements stripe={stripePromise}>
          <CssBaseline />
          <App />
        </Elements>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
