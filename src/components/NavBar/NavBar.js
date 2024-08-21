import './NavBar.css'
import CartWidget from "./CartWidget/CartWidget"
const NavBar = () => {
    return(
        <nav>
                    <CartWidget />
            <h3 className="Title" > Ecommerce React </h3>
            <div className="botones">
            <button>Inicio</button>
            <button>Contacto</button>
            <button>Login</button>
            </div>


    </nav>
    )
}

export default NavBar


//cd desktop cd proyecto-react y npm start (create react app)*
