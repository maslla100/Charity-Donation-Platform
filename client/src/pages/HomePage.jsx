import React from 'react';
import { Link } from 'react-router-dom';  // Moved up as per import order
import CharityList from '../components/CharityList'; // Adjusted to be after react-router-dom
import '../styles/HomePage.css';

function HomePage() {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to Charity Donation Platform</h1>
                <p>Connect with causes you care about and make a difference today!</p>
                <Link to="/donation" className="signup-button">
                    Donate
                </Link>
            </header>
            <main className="main-content">
                <h2>Featured Charities</h2>
                <CharityList />
            </main>
        </div>
    );
}

export default HomePage;
