import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/NavBar/ItemListContainer';
import Cards from './components/cards/Cards';
import ProductDetails from './components/ItemDetails/Item';



function App() {
  return (
    <Router>
      <div className="App">
         <NavBar />
          <ItemListContainer greeting="¡Bienvenido 🛒!"/>
          <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/details/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;