import React, { useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./common/header/Header"
import Pages from "./pages/Pages"
import Data from "./components/Data"
import Cart from "./common/Cart/Cart"
import Footer from "./common/footer/Footer"
import Sdata from "./components/shops/Sdata"
import AuthPages from "./common/header/AuthPages"
import Detail from "./components/shops/Detail"
import SearchResults from "./common/header/SearchResults"

function App() {
    const { productItems } = Data
  const { shopItems } = Sdata


  const [CartItem, setCartItem] = useState([])


  const addToCart = (product) => {
       const productExit = CartItem.find((item) => item.id === product.id)
       if (productExit) {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty + 1 } : item)))
    } else {
           setCartItem([...CartItem, { ...product, qty: 1 }])
    }
  }

  // Stpe: 6
  const decreaseQty = (product) => {
        const productExit = CartItem.find((item) => item.id === product.id)

      if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id))
    } else {
           setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item)))
    }
  }

  return (
    <>
      <Router>
        <Header CartItem={CartItem} />
        <Routes>
        <Route path='/' element={<Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} />} />
        <Route path='/AuthPages' element={<AuthPages />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path='/cart' element={<Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
