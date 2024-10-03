import React, { useContext, useState } from 'react';
import './modal.css';
import { CartContext } from '../../context/CartContext'; 
import Cards from 'react-credit-cards-2';
import { loadStripe } from '@stripe/stripe-js'; 

const stripePromise = loadStripe('TU_PUBLIC_KEY_DE_STRIPE');

const Modal = ({ isOpen, onClose }) => {
  const { cart, removeFromCart } = useContext(CartContext);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focused: ''
  });

  const handlePayment = async () => {
    const stripe = await stripePromise;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: {
        number: cardDetails.number,
        exp_month: cardDetails.expiry.split('/')[0],
        exp_year: cardDetails.expiry.split('/')[1],
        cvc: cardDetails.cvc,
      },
      billing_details: {
        name: cardDetails.name,
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert(`Pago realizado con éxito: ${paymentMethod.id}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFocus = (e) => {
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      focused: e.target.name,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Modal</h2>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <img src={item.image} alt={item.name} style={{ width: '100px', height: 'auto' }} />
                <p>{item.name} - {item.quantity} units</p>
                <p>Precio: ${item.price}</p>
                <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>El carrito está vacío.</p>
        )}
        {cart.length > 0 && (
          <>
            <p>Total a pagar: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
            <Cards
              number={cardDetails.number}
              name={cardDetails.name}
              expiry={cardDetails.expiry}
              cvc={cardDetails.cvc}
              focused={cardDetails.focused}
            />
            <input
              type="tel"
              className="card-input"
              name="number"
              placeholder="Número de tarjeta"
              value={cardDetails.number}
              onChange={handleInputChange}
              onFocus={handleFocus}
            />
            <input
              type="text"
              className="card-input"
              name="name"
              placeholder="Nombre"
              value={cardDetails.name}
              onChange={handleInputChange}
              onFocus={handleFocus}
            />
            <input
              type="text"
              className="card-input"
              name="expiry"
              placeholder="MM/AA"
              value={cardDetails.expiry}
              onChange={handleInputChange}
              onFocus={handleFocus}
            />
            <input
              type="tel"
              className="card-input"
              name="cvc"
              placeholder="CVC"
              value={cardDetails.cvc}
              onChange={handleInputChange}
              onFocus={handleFocus}
            />
            <button className="pay-btn" onClick={handlePayment}>PAGAR</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
