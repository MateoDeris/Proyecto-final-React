import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './cards.css';

const Cards = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/shoes.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    setItems(data);
                } else {
                    throw new Error('Data is not an array');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleProductClick = (id) => {
        navigate(`/details/${id}`);
    };

    return (
        <div className="div-padre">
            {items.length === 0 ? (
                <p>No items found.</p>
            ) : (
                items.map((item) => (
                    <div key={item.id} onClick={() => handleProductClick(item.id)} style={{ cursor: 'pointer' }}>
                        <img src={item.image} alt={item.name} />
                        <h2>{item.name}</h2>
                        <p>Price: ${item.price.toFixed(2)}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Cards;
