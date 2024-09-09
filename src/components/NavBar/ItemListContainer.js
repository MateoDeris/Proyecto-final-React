import React from 'react';
import { Link } from 'react-router-dom';
import './ItemListContainer.css';

const ItemListContainer = ({ greeting }) => {
    return (
        <div className="item-list-container">
            <h2>{greeting}</h2>
        </div>
    );
}

export default ItemListContainer;