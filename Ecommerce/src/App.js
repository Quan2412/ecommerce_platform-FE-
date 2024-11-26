import React, { useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./common/header/Header"
import Pages from "./pages/Pages"
import Data from "./components/Data"
import Cart from "./common/Cart/Cart"
import Footer from "./common/footer/Footer"
import Sdata from "./components/shops/Sdata"
import AuthPages from "./components/Login/Register/AuthPages"
import Detail from "./components/shops/Detail"
import SearchResults from "./common/header/SearchResults"
import ShopCart from '../src/components/shops/ShopCart';
import User from '../src/components/users/Profile';
import ChangePassword from "./components/users/ChangePassword"
import Address from "./components/users/Address"
import Checkout from "./components/checkout/checkout"
import OrderList from "./components/orderlist/OrderList"
function App() {



  
  // Lấy dữ liệu sản phẩm từ các nguồn dữ liệu khác nhau
  const { productItems } = Data;
  const { shopItems } = Sdata;

  // State để lưu danh sách sản phẩm trong giỏ hàng
  const [CartItem, setCartItem] = useState([]);

  // Hàm để thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const productExit = CartItem.find((item) => item.id === product.id);
    if (productExit) {
      // Nếu có, tăng số lượng sản phẩm đó
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id ? { ...productExit, qty: productExit.qty + 1 } : item
        )
      );
    } else {
      // Nếu chưa có, thêm sản phẩm vào giỏ với số lượng 1
      setCartItem([...CartItem, { ...product, qty: 1 }]);
    }
  };


  

  // Hàm để giảm số lượng của sản phẩm trong giỏ hàng
  const decreaseQty = (product) => {
    // Kiểm tra nếu sản phẩm đã có trong giỏ hàng
    const productExit = CartItem.find((item) => item.id === product.id);

    if (productExit.qty === 1) {
      // Nếu số lượng là 1, xóa sản phẩm khỏi giỏ hàng
      setCartItem(CartItem.filter((item) => item.id !== product.id));
    } else {
      // Nếu số lượng lớn hơn 1, giảm số lượng sản phẩm đó
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item
        )
      );
    }
  };
  const folderPath = "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/folder_name"; // Thay 'folder_name' bằng tên folder trong Cloudinary


  return (
   
      <Router>
        {/* Header hiển thị số lượng sản phẩm trong giỏ hàng */}
        <Header   CartItem={CartItem}
              setCartItem={setCartItem}
              addToCart={addToCart}
              decreaseQty={decreaseQty} />
       
        <Routes>
          {/* Trang chủ hiển thị các sản phẩm và nhận hàm addToCart */}
          <Route path='/' element={<Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} />} />

          {/* Trang đăng nhập hoặc đăng ký */}
          <Route path='/AuthPages' element={<AuthPages />} />

          {/* Trang chi tiết sản phẩm */}
          <Route path="/detail/:id" element={<Detail />} />

          {/* Trang hiển thị kết quả tìm kiếm */}
          <Route path="/search-results" element={<SearchResults />} />

          <Route path="/user/account/profile" element={<User />} />
          <Route path="/user/account/profile/changePassword" element={<ChangePassword />} />
          <Route path="/user/account/profile/address" element={<Address />} />
          <Route path="/order-list" element={<OrderList />} />

          <Route path="/checkout" element={<Checkout />} />

          {/* Trang giỏ hàng hiển thị sản phẩm và có thể thêm hoặc giảm số lượng */}
          <Route path='/cart' element={<Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </Router>
  
  );
}


export default App
