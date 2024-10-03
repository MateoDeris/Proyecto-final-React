import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './cards.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/Firebase';
import { CartContext } from '../../context/CartContext';

const Cards = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantities, setQuantities] = useState({});
    const navigate = useNavigate();

    // Usa el contexto del carrito
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productosRef = collection(db, "Productos");
                const resp = await getDocs(productosRef);
                const fetchedItems = resp.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                setItems(fetchedItems);

                const initialQuantities = {};
                fetchedItems.forEach(item => {
                    initialQuantities[item.id] = 1; // Inicializa las cantidades a 1
                });
                setQuantities(initialQuantities);
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

    const handleIncrease = (id) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: prevQuantities[id] + 1
        }));
    };

    const handleDecrease = (id) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: Math.max(1, prevQuantities[id] - 1)
        }));
    };

    const handleAddToCart = (id) => {
        const itemToAdd = items.find(item => item.id === id); 
        if (itemToAdd) {
            console.log(`Cantidad a agregar: ${quantities[id]}`); 
            addToCart(itemToAdd, quantities[id]); 
            alert(`Producto agregado al carrito: ${itemToAdd.name} (Cantidad: ${quantities[id]})`);
        } else {
            alert("Producto no encontrado.");
        }
    };

    return (
        <div className="div-padre">
            {items.length === 0 ? (
                <p>No items found.</p>
            ) : (
                items.map((item) => (
                    <div key={item.id} style={{ cursor: 'pointer' }}>
                        <img src={item.image} alt={item.name} onClick={() => handleProductClick(item.id)} />
                        <h2>{item.name}</h2>
                        <p>Price: ${item.price.toFixed(2)}</p>

                        <div className="quantity-controls">
                            <button onClick={() => handleDecrease(item.id)}>-</button>
                            <span>{quantities[item.id]}</span>
                            <button onClick={() => handleIncrease(item.id)}>+</button>
                        </div>

                        <button onClick={() => handleAddToCart(item.id)}>Agregar al carrito</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Cards;
