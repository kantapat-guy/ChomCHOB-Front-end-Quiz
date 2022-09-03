import './cart.css';
import {Link} from 'react-router-dom';

const Cart = (props) => {
    const {CartItem} = props
    const sum =[]

    const summary = () => {
        CartItem.map((data) => {
            let total = ((data.quantity)*parseInt(data.price))
            sum.push(total)
        })

        return (sum.reduce((a,b) => a+b, 0)).toLocaleString("en-US", {minimumFractionDigits: 2})

    }

    return (
        <div className='cart-container'>
            <h2 className='cart-header-text'>Cart</h2>
            <table>
                <tr className='table-header'>
                    <th style={{width: "70%", textAlign: "left"}}>PRODUCT NAME</th>
                    <th style={{width: "15%"}}>PRICE</th>
                    <th style={{width: "15%"}}>QUANTITY</th>
                    <th style={{width: "auto", textAlign: "right"}}>TOTAL</th>
                </tr>
                <tbody>
                {CartItem.map ((data) => (
                <tr className='table-data' key={data.id}>
                    <Link style={{textDecoration: "none"}} to={`/product/${data.id}`}><td className='cart-img-name'><img className='cart-img' src={data.img} alt="product-img" /><span className='cart-name'>{data.name}</span></td></Link>
                    <td>{data.price}</td>
                    <td className='quantity-text'>{data.quantity}</td>
                    <td>{((data.quantity)*parseInt(data.price)).toLocaleString("en-US", {minimumFractionDigits: 2})}</td>
                </tr>
                ))}
                </tbody>
            </table>
            <div className='checkout-container'>
                <div className='total-text'>Subtotal ({CartItem.length} Product): <span className='total-cost'>{summary()}</span></div>
                <button className='checkout'>PROCEED TO CHECKOUT</button>
            </div>
        </div>
    )
}

export default Cart;