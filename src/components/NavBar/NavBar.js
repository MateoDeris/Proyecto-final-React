import './NavBar.css';
import CartWidget from "./CartWidget/CartWidget";
import logonav from '../../assets/images/logonav.png'; 

const NavBar = () => {
    return(
        
        <nav>
            <div className="Title">
                <img src={logonav} alt="Logo NavBar" />
            </div>
            <div className="botones">
                <button>Inicio</button>
                <button>Contacto</button>
                <button>Login</button>
            </div>
            <CartWidget />
        </nav>

        
    );
}

export default NavBar;
