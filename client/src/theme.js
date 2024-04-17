import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#0d47a1' },
    secondary: { main: '#ffc400' },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    body1: {
      lineHeight: 1.6,  // Sets global line height for body1 variant
    },
    h1: {
      fontWeight: 'bold',  // Optional: Ensures all h1 headers are bold
      marginBottom: '0.5em', // Adds a bottom margin to h1 for better spacing
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '20px',  // Default padding for all Paper components
          marginBottom: '20px',  // Adds margin below Paper components
          background: '#fff', // Ensures background is white for better contrast
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)' // Optional: adds subtle shadows for depth
        }
      }
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
