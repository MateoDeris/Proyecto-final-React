import './NavBar.css';
import CartWidget from "./CartWidget/CartWidget";

const NavBar = () => {
    return(
        <nav>
            <div className="Title">
                <img src="/images/logonav.png" alt="Logo NavBar" />
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
