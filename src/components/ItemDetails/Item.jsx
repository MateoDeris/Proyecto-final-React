import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../../firebase/Firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import './item.css';
import { CartContext } from '../../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productsList, setProductsList] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, 'Productos', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setProduct(null);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'Productos'));
                const products = [];
                querySnapshot.forEach((doc) => {
                    products.push({ id: doc.id, ...doc.data() });
                });
                setProductsList(products);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p className="loading-text">Loading...</p>;
    if (error) return <p className="error-text">Error: {error}</p>;

    if (!product) {
        return (
            <div>
                <p className="not-found-text">El producto no fue encontrado. Aquí hay otros productos:</p>
                <div className="product-catalog">
                    {productsList.map((item) => (
                        <div key={item.id} className="product-card">
                            <Link to={`/detalles/${item.id}`}>
                                <img src={item.image} className="imagen-producto" alt="imagen del producto" />
                                <h3>{item.name}</h3>
                                <p>Precio: ${item.price.toFixed(2)}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart({ ...product, quantity: 1 });
    };

    return (
        <div className="product-details">
            <img src={product.image} alt={product.name} className="product-image" />
            <h1 className="product-name">{product.name}</h1>
            <p className="product-price">Precio: ${product.price.toFixed(2)}</p>
            <button onClick={handleAddToCart} className="add-to-cart-btn">Añadir al carrito</button>
        </div>
    );
};

export default ProductDetails;
