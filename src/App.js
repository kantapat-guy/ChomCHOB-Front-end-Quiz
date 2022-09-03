import NavBar from './Components/Navbar/navbar';
import Footer from './Components/Footer/footer';
import ProductList from './Components/Product list/product-list';
import ProductDetail from './Components/Product detail/product-detail';
import Cart from './Components/Cart/cart';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { useState } from 'react';


function App() {

  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    console.log("Add to cart",cart)
    setCart([...cart, product])
}

  return (
    <div className="App">
        <BrowserRouter>
            <NavBar itemOnCart={cart.length} />
            <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/product/:id" element={<ProductDetail onAdd={addToCart} />} />
                    <Route path="/cart" element={<Cart CartItem={cart} />} />
            </Routes>
        </BrowserRouter>
        <Footer />
    </div>
  );
}

export default App;
