import React, { useContext, useState } from 'react';
import carrito from '../../../assets/PABLITOMELI.png';
import "./CartWidget.css";
import { CartContext } from '../../../context/CartContext';
import Pill from '../../pill/Pill';
import Modal from '../../modal/Modal'; 

const CartWidget = () => {
    const { cart } = useContext(CartContext);
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const totalItems = cart.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0); 

    const handleCartClick = () => {
        setIsModalOpen(true); 
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); 
    };

    return (
        <div className='cart-widget'>
            <img src={carrito} alt="cart-widget" width={35} onClick={handleCartClick} /> 
            <Pill quantity={totalItems} />
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} /> 
        </div>
    );
};


export default CartWidget;



