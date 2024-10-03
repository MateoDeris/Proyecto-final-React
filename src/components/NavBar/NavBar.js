import './NavBar.css';
import CartWidget from "./CartWidget/CartWidget";
import { NavLink } from 'react-router-dom';  

const NavBar = () => {
    return(
        <nav>
            <div className="Title">
                <img src="/images/logonav.png" alt="Logo NavBar" />
            </div>
            <div className="botones">
                <NavLink to="/" className="boton-link"><button>Inicio</button></NavLink>
                <NavLink to="/contacto" className="boton-link"><button>Contacto</button></NavLink>
                <NavLink to="/login" className="boton-link"><button>Login</button></NavLink>
            </div>
            <CartWidget />
        </nav>
    );
}

export default NavBar;
