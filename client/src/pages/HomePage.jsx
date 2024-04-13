import React from 'react';
import CharityList from '../components/CharityList';
import ContactForm from '../components/ContactForm'; // Importing the ContactForm
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <header style={{ padding: '20px', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
                <h1>Welcome to Charity Donation Platform</h1>
                <p>Connect with causes you care about and make a difference today!</p>
                <Link to="/signup" style={{ textDecoration: 'none', color: 'white', backgroundColor: 'blue', padding: '10px 20px', borderRadius: '5px' }}>
                    Sign Up to Donate
                </Link>
            </header>
            <main style={{ padding: '20px' }}>
                <h2>Featured Charities</h2>
                <CharityList />
            </main>
            <footer style={{ backgroundColor: '#333', color: 'white', padding: '20px', textAlign: 'center' }}>
                <p>Join our community to keep updated on how you can help!</p>
                <div>
                    <Link to="/about-us" style={{ color: 'white', marginRight: '15px' }}>About Us</Link>
                    <Link to="/contact" style={{ color: 'white', marginRight: '15px' }}>Contact</Link>
                    <Link to="/joinus" style={{ color: 'white' }}>Join Us</Link>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
