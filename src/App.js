import NavBar from './Components/Navbar/navbar';
import Footer from './Components/Footer/footer';
import ProductList from './Components/Product list/product-list';
import ProductDetail from './Components/Product detail/product-detail';
import Cart from './Components/Cart/cart';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
        
        <BrowserRouter>
            <NavBar />
            <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
            </Routes>
        </BrowserRouter>
        <Footer />
    </div>
  );
}

export default App;
