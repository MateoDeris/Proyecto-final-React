import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ItemsDetails = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch('/public/shoes.json') // Asegúrate de que la ruta al JSON es correcta
      .then(res => res.json())
      .then(data => {
        const foundProduct = data.shoes.find(p => p.id === id);
        setProduct(foundProduct);
      })
      .catch(err => console.error('Error fetching product details:', err)); 
  }, [id]);

  const handleAddToCart = () => {
    console.log('Producto añadido al carrito:', product);
  };

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div className="item-details">
      <div className="item-details__images">
        {}
        <img src={`/images/${product.id}.jpg`} alt={`${product.name} - Figura`} />
        <img src={`/images/${product.id}.jpg`} alt={`${product.name} - Caja`} />
      </div>
      <div className="item-details__info">
        <h2>{product.name}</h2>
        <p>$ {product.price} .-</p>
        {}
        <button className="item-details__add-to-cart" onClick={handleAddToCart}>
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default ItemsDetails;
