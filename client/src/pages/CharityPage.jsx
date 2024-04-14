import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CharityPage = () => {
    const { id } = useParams();
    const [charity, setCharity] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharityData = async () => {
            setLoading(true);
            try {
                // Example API call, replace URL with your actual API endpoint
                const response = await fetch(`https://api.example.com/charities/${id}`);
                const data = await response.json();
                setCharity(data);
            } catch (err) {
                setError(err.message);
                console.error("Failed to fetch charity data:", err);
            }
            setLoading(false);
        };

        fetchCharityData();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading charity: {error}</p>;
    if (!charity) return <p>No charity found</p>;

    return (
        <div>
            <h2>{charity.name}</h2>
            <p>{charity.mission}</p>
            <p>Telephone: {charity.telephone}</p>
            <p>Address: {charity.address}</p>
            <p>Website: <a href={charity.website} target="_blank" rel="noopener noreferrer">{charity.website}</a></p>
            {/* Navigation to Donation Form */}
            <button onClick={() => { window.location.href = `/donate/${id}`; }}>
                Donate to {charity.name}
            </button>
        </div>
    );
};

export default CharityPage;
