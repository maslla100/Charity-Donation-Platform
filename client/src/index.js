import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@mui/material/styles'; // Updated import for ThemeProvider
import CssBaseline from '@mui/material/CssBaseline'; // Updated import for CssBaseline
import App from './components/App.jsx';
import client from './utils/apolloClient';
import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {' '}
        {/* Normalizes CSS across browsers */}
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
