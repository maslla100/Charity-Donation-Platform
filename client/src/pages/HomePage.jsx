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
                <Link to="/signuptodonate" style={{ textDecoration: 'none', color: 'white', backgroundColor: 'blue', padding: '10px 20px', borderRadius: '5px' }}>
                    Sign Up to Donate
                </Link>
            </header>
            <main style={{ padding: '20px' }}>
                <h2>Featured Charities</h2>
                <CharityList />
            </main>

        </div>
    );
};

export default HomePage;
