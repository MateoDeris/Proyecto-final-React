import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/NavBar/ItemListContainer';
import Cards from './components/cards/Cards';
import ProductDetails from './components/ItemDetails/Item';
import { CartProvider } from './context/CartContext'; 
import Cart from './components/cart/Cart';
import PaymentForm from './components/checkout/Checkout';
import Contacto from './pages/Contacto';  
import Login from './pages/Login'; 

function App() {
  return (
    <CartProvider> {/* envolver con CartProvider. */}
      <Router>
        <div className="App">
          <NavBar />
          <ItemListContainer greeting="¡Bienvenido 🛒!" />
          <Routes>
            <Route path="/" element={<Cards />} />
            <Route path="/details/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<PaymentForm />} />
            <Route path="/contacto" element={<Contacto />} /> 
            <Route path="/login" element={<Login />} /> 
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
