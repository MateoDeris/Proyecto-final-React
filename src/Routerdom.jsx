import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Inicio from './pages/Inicio';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import App from './App.js';

const Routerdom = () => {
  return (
    <Router>
      <App /> {/* 'App dentro del Router, por eso no funcionaba!' */}
      <Routes>
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Contacto" element={<Contacto />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default Routerdom;
