
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: { main: '#0d47a1' },
        secondary: { main: '#ffc400' },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
    },
    // Define breakpoints
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
