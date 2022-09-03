import './navbar.css';
import Logo from '../../Assets/cob-logo.webp'
import { BagHappy } from 'iconsax-react';
import {Link} from 'react-router-dom';

const NavBar = (props) => {

    return (
        <div className="nav-container">
            <div className="logo-container">
                <Link to="/" ><img src={Logo} alt="logo" /></Link>
            </div>
            <div className="menu-container">
                <ul className='menu-list'>
                <Link className='menu-link' to="/" ><li>Home</li></Link>
                <Link className='menu-link' to="/" ><li>New Products</li></Link>
                <Link className='menu-link' to="/" ><li>Women</li></Link>
                <Link className='menu-link' to="/" ><li>Men</li></Link>
                <Link className='menu-link' to="/" ><li>Kid</li></Link>
                <Link className='menu-link' to="/" ><li>Accessories</li></Link>
                </ul>
            </div>
            <Link className='menu-link' to="/cart" >
                <div className="cart-icon-container">
                    <BagHappy 
                    size="24"
                    color="#ffffff"
                    />
                    <div className="itemOnCart" >{props.itemOnCart}</div>
                    <p className='cart'>Cart</p>
                </div>
            </Link>
        </div>
    )
}

export default NavBar;