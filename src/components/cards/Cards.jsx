 import React, { useEffect, useState } from 'react';
 import { Link } from 'react-router-dom';
import "./cards.css"
const Cards = () => {
  const [shoes, setShoes] = useState([]);

  
  useEffect(() => {
    fetch('/shoes.json')  
      .then((response) => response.json())
      .then((data) => setShoes(data.shoes))
      .catch((error) => console.error('Error fetching JSON:', error));
  }, []);

  return (
    <div className='div-padre'>
      {shoes.map((shoe) => (
        <div key={shoe.id}>
         <img src={`/images/${shoe.id}.jpg` } alt={shoe.name} />
          <h3>{shoe.name}</h3>
          <p>Precio: ${shoe.price.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Cards; 

