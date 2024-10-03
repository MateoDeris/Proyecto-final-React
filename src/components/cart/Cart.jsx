import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart } = useContext(CartContext);

    if (cart.length === 0) {
        return <p>Tu carrito está vacío.</p>;
    }

    return (
        <div className="cart-container">
            {cart.map((item) => (
                <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-details">
                        <h3>{item.name}</h3>
                        <p>Precio: ${item.price.toFixed(2)}</p>
                        <p>Cantidad: {item.quantity}</p>
                        <button onClick={() => removeFromCart(item.id)} className="remove-btn">Eliminar</button>
                    </div>
                </div>
            ))}
            <div className="total-price">
                Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </div>
        </div>
    );
};

export default Cart; // Asegúrate de que esta línea esté presente
