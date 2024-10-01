import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './cards.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/Firebase'; 

const Cards = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productosRef = collection(db, "productos");
                const resp = await getDocs(productosRef);
                const fetchedItems = resp.docs.map(doc => ({ id: doc.id, ...doc.data() }));
               
                console.log("Fetched Items:", fetchedItems);

                setItems(fetchedItems);
            } catch (err) {
                setError(err.message);
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
