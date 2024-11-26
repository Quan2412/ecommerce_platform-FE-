import React from "react";

const OrderList = () => {
  // Lấy danh sách đơn hàng từ localStorage (nếu không có, sử dụng mảng rỗng)
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  // Định nghĩa các style inline cho các thành phần giao diện
  const containerStyle = {
    maxWidth: "800px", // Giới hạn chiều rộng của danh sách đơn hàng
    margin: "20px auto", // Canh giữa nội dung
    fontFamily: "'Arial', sans-serif", // Font chữ sử dụng
  };

  const orderCardStyle = {
    border: "1px solid #ddd", // Viền của từng đơn hàng
    borderRadius: "8px", // Bo tròn các góc
    padding: "20px", // Khoảng cách bên trong
    marginBottom: "20px", // Khoảng cách giữa các đơn hàng
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Hiệu ứng đổ bóng
    backgroundColor: "#fff", // Màu nền trắng
  };

  const orderTitleStyle = {
    marginBottom: "10px", // Khoảng cách bên dưới tiêu đề
    color: "#333", // Màu chữ
    fontSize: "18px", // Kích thước chữ
    fontWeight: "bold", // Đậm chữ
  };

  const sectionStyle = {
    marginBottom: "15px", // Khoảng cách giữa các phần
  };

  const productListStyle = {
    listStyleType: "none", // Loại bỏ ký hiệu danh sách (bullet points)
    padding: 0, // Loại bỏ padding mặc định
    margin: 0, // Loại bỏ margin mặc định
  };

  const productItemStyle = {
    padding: "10px 0", // Khoảng cách trên dưới
    borderBottom: "1px solid #eee", // Đường phân cách dưới mỗi sản phẩm
    display: "flex", // Hiển thị nội dung dạng hàng ngang
    justifyContent: "space-between", // Canh đều hai đầu (tên sản phẩm bên trái, giá bên phải)
    alignItems: "center", // Canh giữa theo chiều dọc
  };

  const totalStyle = {
    fontSize: "16px", // Kích thước chữ
    fontWeight: "bold", // Đậm chữ
    textAlign: "right", // Canh phải
    marginTop: "10px", // Khoảng cách trên
  };

  return (
    <div style={containerStyle}>
      {/* Tiêu đề của danh sách đơn hàng */}
      <h2 style={{ textAlign: "center", color: "#f60" }}>Danh Sách Đơn Hàng</h2>

      {/* Hiển thị thông báo nếu không có đơn hàng nào */}
      {orders.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>Chưa có đơn hàng nào.</p>
      ) : (
        // Lặp qua danh sách đơn hàng để hiển thị từng đơn hàng
        orders.map((order) => (
          <div key={order.id} style={orderCardStyle}>
            {/* Thông tin tiêu đề của đơn hàng */}
            <h3 style={orderTitleStyle}>Đơn Hàng #{order.id}</h3>

            {/* Phần thông tin chung của đơn hàng */}
            <div style={sectionStyle}>
              <p>
                <strong>Ngày Đặt Hàng:</strong> {order.date}
              </p>
              <p>
                <strong>Địa Chỉ:</strong> {order.address.addressDetail}, {order.address.city} ({order.address.type})
              </p>
              <p>
                <strong>Phương Thức Vận Chuyển:</strong> {order.shipping.name} - ₫
                {order.shipping.cost.toLocaleString()}
              </p>
            </div>

            {/* Danh sách sản phẩm trong đơn hàng */}
            <div style={sectionStyle}>
              <h4 style={{ marginBottom: "10px" }}>Sản Phẩm:</h4>
              <ul style={productListStyle}>
                {order.items.map((item) => (
                  <li key={item.id} style={productItemStyle}>
                    {/* Tên sản phẩm và số lượng */}
                    <span>
                      {item.name} x {item.qty}
                    </span>
                    {/* Tổng giá của sản phẩm (giá x số lượng) */}
                    <span>₫{(item.price * item.qty).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tổng giá trị của đơn hàng */}
            <div style={totalStyle}>
              <p>
                Tổng Cộng: <span style={{ color: "#f60" }}>₫{order.total.toLocaleString()}</span>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderList;
