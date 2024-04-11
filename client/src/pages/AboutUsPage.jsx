import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CharityPage from './pages/CharityPage';
import SignInPage from './pages/SignInPage';
import DonationHistoryPage from './pages/DonationHistoryPage';
import AboutUsPage from './pages/AboutUsPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/charity/:id" element={<CharityPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/donation-history" element={<DonationHistoryPage />} />
                <Route path="/about-us" element={<AboutUsPage />} /> {About Us - Charity Donation Platform**

                At Charity Donation Platform, we are dedicated to creating connections that matter. Our mission is to empower charitable organizations by providing them with a cutting-edge platform where they can showcase their causes, connect with donors, and receive vital funds to continue their impactful work.

                Founded in 2024, our platform was born from a desire to bridge the gap between charities in need and potential donors. Utilizing the latest technologies in the MERN stack—MongoDB, Express.js, React, and Node.js—we have crafted a seamless, single-page application that prioritizes user experience and responsiveness. Each charity on our platform is vetted and provided with a comprehensive profile that includes mission statements, impact scores, and direct donation capabilities.

                Our innovative platform supports real-time interactions and transactions, including one-time or recurring donations through Stripe. This ensures that every contribution directly supports your chosen cause in a secure and transparent manner. We also incorporate GraphQL to efficiently manage data transactions, making your experience as smooth and reliable as possible.

                We are committed to not just facilitating donations but also to ensuring data security and privacy, employing JWT for user authentication and protecting sensitive information on our servers. Our responsive design ensures that whether you are donating from a laptop at home or on your smartphone, your experience remains uninterrupted.

                Beyond technology, we value and strive for inclusivity and community building. Our platform is a testament to what can be achieved when people come together to support one another. We take pride in our robust community of users who are actively making a difference every day.

                Join us at Charity Donation Platform, where your generosity meets efficiency and integrity. Together, we can create a lasting impact and help those in need around the world.


}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
