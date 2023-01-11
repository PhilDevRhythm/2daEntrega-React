import React, { useEffect, useState } from 'react';
import NavBar from './components/Navbar';
import ProductList from './components/ProductList';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/Home';
import Cart from './components/Cart'
import Checkout from './components/Checkout';
import ProductDetail from './components/ProductDetail';
import prodList from './data/prodList';
import ProductDetailContainer from './components/ProductDetailContainer';
import Category from './components/Category';

function App() {

  
  const [show, setShow] = useState(1);
  const [cart, setCart] = useState([]);
  const [warning, setWarning] = useState(false);
  const [price, setPrice] = useState(0);

  
    
  const handleClick = (item) => {
    let isPresent = false;
    cart.forEach((product) => {
      if (item.id === product.id)
        isPresent = true;
      if (item.stock == product.stock)
        return
    })
    if (isPresent) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 5000);
      return;
    }
    setCart([...cart, item]);
  }
  const handlePrice = () => {
    let ans = 0
    cart.map((item) => (
      ans += item.amount * item.dprice));
    setPrice(ans);
  }

  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr)
  }


  return (
    <>

      <BrowserRouter>
        <NavBar  size={cart.length} price={price} handlePrice={handlePrice}/>
        {warning && <>
          <div className='alert alert-warning shadow-lg'>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>Item is already added to your cart, please modify quantity on your Cart </span>
            </div></div>
        </>}


        <Routes>
          {/* <Route index element={<ProductList handleClick={handleClick} />} /> */}
          <Route path='/' element={<ProductList handleClick={handleClick}/>}/>
          <Route path='/' element={<Category/>}/>
          <Route path='/cart' element={<Cart cart={cart} setCart={setCart} price={price} handlePrice={handlePrice} handleRemove={handleRemove} />} />
          <Route path='/checkout' element={<Checkout cart={cart} price={price} />} />
          <Route path='/store/product/id:product_id' element={<ProductDetailContainer preData={prodList}/>} />
          <Route path='/store/category/telescopes' element={<ProductList/>} category_id={"telescopes"}/>
          <Route path='/store/category/accesories' element={<ProductList/>} category_id={"accesories"}/>
        </Routes>
        <Footer />
      </BrowserRouter>

    </>
  );

}
export default App;
