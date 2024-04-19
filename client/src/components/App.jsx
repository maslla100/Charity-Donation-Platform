import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SignInPage from '../pages/SignInPage';
import DonationHistoryPage from '../pages/DonationHistoryPage';
import AboutUsPage from '../pages/AboutUsPage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import JoinUsForm from '../components/JoinUsForm';
import DonationForm from '../components/DonationForm';
import UserDashboardPage from '../pages/UserDashboardPage';
import NotFoundPage from '../pages/NotfoundPage';
import { loadStripe } from '@stripe/stripe-js';


//const stripePromise = loadStripe('your_stripe_publishable_key_here');


function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/donation-history" element={<DonationHistoryPage />} />
                <Route path="/about-us" element={<AboutUsPage />} />
                <Route path="/contact" element={<ContactForm />} />
                <Route path="/joinus" element={<JoinUsForm />} />
                <Route path="/donation" element={<DonationForm />} />
                <Route path="/user-dashboard" element={<UserDashboardPage />} />
                <Route path="*" element={<NotFoundPage />} /> {/* Catch-all route */}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
