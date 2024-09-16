import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './item.css';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch('/shoes.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    const foundProduct = data.find((item) => item.id === parseInt(id));
                    if (foundProduct) {
                        setProduct(foundProduct);
                    } else {
                        throw new Error('Product not found');
                    }
                } else {
                    throw new Error('Data is not an array');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <p className="loading-text">Loading...</p>;
    if (error) return <p className="error-text">Error: {error}</p>;

    if (!product) return <p className="not-found-text">Product not found.</p>;

    return (
        <div className="product-details">
            <img
                src={product.image}
                alt={product.name}
                className="product-image" 
            />
            <h1 className="product-name">{product.name}</h1>
            <p className="product-price">Price: ${product.price.toFixed(2)}</p>
        </div>
    );
};

export default ProductDetails;
