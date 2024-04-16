import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CharityPage = () => {
    const { id } = useParams();
    const [charity, setCharity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharityData = async () => {
            try {
                const response = await fetch(`https://api.example.com/charities/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCharity(data);
            } catch (err) {
                setError("Failed to fetch charity data: " + err.message);
                console.error("Failed to fetch charity data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCharityData();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading charity: {error}</div>;
    if (!charity) return <div>No charity found</div>;

    return (
        <div>
            <h2>{charity.name}</h2>
            <p>{charity.missionStatement}</p>
            <p>Telephone: {charity.telephone}</p>
            <p>Address: <address>{charity.address}</address></p>
            <p>Website: <a href={charity.website} target="_blank" rel="noopener noreferrer">{charity.website}</a></p>
            <Link to={`/donate/${id}`} className="button">Donate to {charity.name}</Link>
        </div>
    );
};

export default CharityPage;
