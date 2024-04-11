import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient';
import { ThemeProvider } from '@mui/material/styles'; // Updated import for ThemeProvider
import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline'; // Updated import for CssBaseline

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <CssBaseline /> {/* Normalizes CSS across browsers */}
                <App />
            </ThemeProvider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
