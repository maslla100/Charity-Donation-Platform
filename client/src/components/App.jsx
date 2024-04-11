import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CharityPage from '../pages/CharityPage';
import SignInPage from '../pages/SignInPage';
import DonationHistoryPage from '../pages/DonationHistoryPage';
import Navbar from './Navbar';
import Footer from './Footer';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/charity/:id" element={<CharityPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/donation-history" element={<DonationHistoryPage />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
