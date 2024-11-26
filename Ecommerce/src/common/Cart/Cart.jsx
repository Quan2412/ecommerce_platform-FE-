import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Cart = ({ CartItem, setCartItem, addToCart, decreaseQty }) => {
  // State to track selected items for checkout
  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemSelection = (item) => {
    if (selectedItems.includes(item.id)) {
      setSelectedItems(selectedItems.filter((id) => id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item.id]);
    }
  };

  // Calculate total price of items
  const totalPrice = CartItem.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  const handleCheckout = () => {
    // Lưu sản phẩm đã chọn vào localStorage
    const selectedCartItems = CartItem.filter((item) =>
      selectedItems.includes(item.id)
    );
    localStorage.setItem("checkoutItems", JSON.stringify(selectedCartItems));
  };

  return (
    <section className="cart-items">
      <div className="container d_flex">
        <div className="cart-details">
          {CartItem.length === 0 && (
            <h1 className="no-items product">No Items are added to Cart</h1>
          )}

          {CartItem.map((item) => {
            const productQty = item.price * item.qty;

            return (
              <div className="cart-list product d_flex" key={item.id}>
                <div className="img">
                  <img src={item.cover} alt="" />
                </div>
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <h4>
                    ${item.price}.00 * {item.qty}
                    <span>${productQty}.00</span>
                  </h4>
                  {/* Checkbox to select item for checkout */}
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleItemSelection(item)}
                  />
                  Select for Checkout
                </div>
                <div className="cart-items-function">
                  <div className="removeCart">
                    <button
                      className="removeCart"
                      onClick={() =>
                        setCartItem(CartItem.filter((cartItem) => cartItem.id !== item.id))
                      }
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                  <div className="cartControl d_flex">
                    <button className="incCart" onClick={() => addToCart(item)}>
                      <i className="fa-solid fa-plus"></i>
                    </button>
                    <button className="desCart" onClick={() => decreaseQty(item)}>
                      <i className="fa-solid fa-minus"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cart-total product">
          <h2>Cart Summary</h2>
          <div className="d_flex">
            <h4>Total Price :</h4>
            <h3>${totalPrice}.00</h3>
          </div>
          {/* Button to go to Checkout */}
          <Link to="/checkout">
            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={selectedItems.length === 0}
              style={{
                backgroundColor: selectedItems.length === 0 ? "#ccc" : "#4CAF50", // Màu nền thay đổi nếu không có sản phẩm chọn
                color: "#fff", // Màu chữ
                padding: "10px 20px", // Khoảng cách trong nút
                border: "none", // Bỏ viền
                borderRadius: "5px", // Bo tròn các góc
                cursor: selectedItems.length === 0 ? "not-allowed" : "pointer", // Thay đổi kiểu con trỏ khi nút bị vô hiệu hóa
                fontSize: "16px", // Kích thước chữ
                fontWeight: "bold", // Đậm chữ
                transition: "background-color 0.3s ease", // Hiệu ứng chuyển màu nền khi hover
              }}
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cart;