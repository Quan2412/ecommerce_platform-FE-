import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = ({ CartItem = [] }) => {
  // Danh sách địa chỉ mẫu
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Trần Ngọc Minh",
      phone: "+84 336 051 966",
      city: "Hà Nội, Quận Hai Bà Trưng, Phường Trương Định",
      addressDetail: "Ngách 113 Trại Cá",
      type: "Nhà Riêng",
      default: true, // Đánh dấu địa chỉ mặc định
    },
    {
      id: 2,
      name: "Khánh Ling",
      phone: "+84 336 051 966",
      city: "Điện Biên, Huyện Điện Biên, Xã Thanh Chăn",
      addressDetail: "5 Thanh Chăn",
      type: "Văn Phòng",
      default: false,
    },
  ]);

  // Địa chỉ được chọn (mặc định là địa chỉ có `default: true`)
  const [selectedAddress, setSelectedAddress] = useState(
    addresses.find((addr) => addr.default) || null
  );

  // Trạng thái mở/đóng modal chọn địa chỉ
  const [isAddressModalOpen, setAddressModalOpen] = useState(false);

  // Danh sách sản phẩm trong giỏ hàng, được tải từ localStorage
  const [cartItems, setCartItems] = useState([]);
  
  // Danh sách các phương thức vận chuyển mẫu
  const [shippingMethods, setShippingMethods] = useState([
    { id: 1, name: "Nhanh", cost: 12800, estimatedTime: "28 Tháng 11 - 29 Tháng 11" },
    { id: 2, name: "Hỏa Tốc", cost: 20000, estimatedTime: "Ngày mai" },
  ]);

  // Trạng thái mở/đóng modal chọn phương thức vận chuyển
  const [isShippingModalOpen, setShippingModalOpen] = useState(false);

  // Phương thức vận chuyển được chọn (mặc định là phương thức đầu tiên)
  const [selectedShipping, setSelectedShipping] = useState(shippingMethods[0]);

  // Trạng thái đặt hàng thành công
  const [isOrderPlaced, setOrderPlaced] = useState(false);

  // Điều hướng (sử dụng `react-router-dom`)
  const navigate = useNavigate();

  // Lấy danh sách sản phẩm được chọn từ localStorage khi trang được tải
  useEffect(() => {
    const selectedItemsFromStorage = JSON.parse(localStorage.getItem("checkoutItems")) || [];
    setCartItems(selectedItemsFromStorage); // Lưu sản phẩm vào state
  }, []);

  // Tính tổng giá trị sản phẩm trong giỏ hàng (không bao gồm phí vận chuyển)
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );

  // Mở modal chọn địa chỉ
  const openAddressModal = () => setAddressModalOpen(true);
  // Đóng modal chọn địa chỉ
  const closeAddressModal = () => setAddressModalOpen(false);

  // Mở modal chọn phương thức vận chuyển
  const openShippingModal = () => setShippingModalOpen(true);
  // Đóng modal chọn phương thức vận chuyển
  const closeShippingModal = () => setShippingModalOpen(false);

  // Xử lý chọn địa chỉ
  const handleSelectAddress = (address) => {
    setSelectedAddress(address); // Cập nhật địa chỉ được chọn
    closeAddressModal(); // Đóng modal
  };

  // Xử lý chọn phương thức vận chuyển
  const handleSelectShipping = (method) => {
    setSelectedShipping(method); // Cập nhật phương thức vận chuyển
    closeShippingModal(); // Đóng modal
  };

  // Xử lý đặt hàng
  const handleOrder = () => {
    // Tạo đơn hàng mới
    const newOrder = {
      id: Date.now(), // ID duy nhất
      date: new Date().toLocaleString(), // Ngày giờ đặt hàng
      address: selectedAddress, // Địa chỉ nhận hàng
      items: cartItems, // Sản phẩm trong giỏ hàng
      shipping: selectedShipping, // Phương thức vận chuyển
      total: totalPrice + selectedShipping.cost, // Tổng giá trị đơn hàng
    };

    // Lưu đơn hàng vào localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...orders, newOrder]));

    // Xóa các sản phẩm đã đặt khỏi localStorage
    localStorage.removeItem("checkoutItems");

    // Điều hướng về trang danh sách đơn hàng
    navigate("/order-list");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", fontFamily: "Arial" }}>
      <h2>Trang Thanh Toán</h2>

      {/* Địa chỉ nhận hàng */}
      <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "20px" }}>
        <h3>Địa Chỉ Nhận Hàng</h3>
        {selectedAddress ? (
          <div>
            <p>
              <strong>{selectedAddress.name}</strong> - {selectedAddress.phone}
            </p>
            <p>
              {selectedAddress.addressDetail}, {selectedAddress.city} ({selectedAddress.type})
            </p>
            <button
              style={{
                padding: "8px 12px",
                backgroundColor: "#f60",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={openAddressModal}
            >
              Thay Đổi
            </button>
          </div>
        ) : (
          <p>Không có địa chỉ mặc định, vui lòng thêm địa chỉ.</p>
        )}
      </div>

      {/* Phương thức vận chuyển */}
      <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "20px" }}>
        <h3>Phương Thức Vận Chuyển</h3>
        <p>
          <strong>{selectedShipping.name}</strong> - ₫{selectedShipping.cost.toLocaleString()} <br />
          Nhận hàng: {selectedShipping.estimatedTime}
        </p>
        <button
          style={{
            padding: "8px 12px",
            backgroundColor: "#f60",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={openShippingModal}
        >
          Thay Đổi
        </button>
      </div>

      {/* Sản phẩm trong giỏ hàng */}
      <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "20px" }}>
        <h3>Sản Phẩm</h3>
        {cartItems.length === 0 ? (
          <p>Không có sản phẩm nào được chọn.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                borderBottom: "1px solid #ddd",
                paddingBottom: "10px",
                marginBottom: "10px",
              }}
            >
              <p>{item.name}</p>
              <p>Số Lượng: {item.qty}</p>
              <p>Giá: ₫{item.price.toLocaleString()}</p>
              <p>Tổng: ₫{(item.qty * item.price).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>

      {/* Tổng cộng */}
      <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "20px" }}>
        <h3>Tổng Cộng</h3>
        <p>₫{(totalPrice + selectedShipping.cost).toLocaleString()}</p>
      </div>

      {/* Nút thanh toán */}
      <button
        style={{
          width: "100%",
          padding: "15px",
          backgroundColor: "#f60",
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        onClick={handleOrder}
      >
        Thanh Toán
      </button>
    </div>
  );
};

export default Checkout;
