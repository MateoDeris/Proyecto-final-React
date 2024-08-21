import cart from './assets/cart.svg'
import "./CartWidget.css"
const CartWidget = () => {

return (
    <div className='cart-widget'>
        <img src= {cart} alt="cart-widget" width={35} />
            <div className= "badge">
                <p>2</p>
            </div>
    </div>


    )

}

export default CartWidget


