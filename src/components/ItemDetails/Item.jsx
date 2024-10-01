import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../../firebase/Firebase'; 
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'; 
import './item.css';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productsList, setProductsList] = useState([]); // Estado para la lista de productos

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, 'productos', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProduct(docSnap.data());
                } else {
                    // Si no se encuentra el producto, no lanzamos un error, solo dejamos product como null
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

    // Efecto para obtener la lista de productos
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'productos'));
                const products = [];
                querySnapshot.forEach((doc) => {
                    products.push({ id: doc.id, ...doc.data() }); // Agrega el ID del documento a los datos
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

    // Mostrar tarjetas si el producto no se encuentra
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

    return (
        <div className="product-details">
            <Link to={`/detalles/${product.id}`} className="product-link">
                <img
                    src={product.image} 
                    alt={product.name} 
                    className="product-image"
                />
                <h1 className="product-name">{product.name}</h1>
                <p className="product-price">Price: ${product.price.toFixed(2)}</p>
            </Link>
        </div>
    );
};

export default ProductDetails;
