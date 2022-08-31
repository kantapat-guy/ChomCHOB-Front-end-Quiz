import NavBar from './Components/Navbar/navbar';
import Footer from './Components/Footer/footer';
import ProductList from './Components/Product list/product-list';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar/>
        <ProductList/>
      <Footer/>
    </div>
  );
}

export default App;
