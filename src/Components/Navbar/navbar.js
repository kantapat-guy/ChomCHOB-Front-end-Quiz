import './navbar.css';
import Logo from '../../Assets/cob-logo.webp'
import { BagHappy } from 'iconsax-react';

const NavBar = () => {

    return (
        <div className="nav-container">
            <div className="logo-container">
                <img src={Logo} alt="logo" />
            </div>
            <div className="menu-container">
                <ul className='menu-list'>
                    <li>Home</li>
                    <li>New Products</li>
                    <li>Women</li>
                    <li>Men</li>
                    <li>Kid</li>
                    <li>Accessories</li>
                </ul>
            </div>
            <div className="cart-container">
                <BagHappy 
                  size="24"
                  color="#ffffff"
                />
                <p className='cart'>Cart</p>
            </div>
        </div>
    )
}

export default NavBar;