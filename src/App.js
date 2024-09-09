/* import './App.css';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemListContainer from './components/NavBar/ItemListContainer'; // 
import Cards from './components/cards/Cards';





function App() {
  return (
    <>
    <div className="App">
      <NavBar />
      {}
      <ItemListContainer greeting="¡Bienvenido 🛒!" />
    </div>

    <Cards></Cards>

    
    
    </>
  
);
}
export default App;  
 */

import './App.css';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemListContainer from './components/NavBar/ItemListContainer';
import Cards from './components/cards/Cards';
import ItemsDetails from './components/ItemsDetails/ItemsDetails';
import Contact from './components/Contact/Contact'; 
import Login from './components/Login/Login'; 

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer greeting="¡Bienvenido 🛒!" />} />
          <Route path="/products" element={<Cards />} />
          <Route path="/details/:id" element={<ItemsDetails />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
