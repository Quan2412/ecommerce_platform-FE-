import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Address = () => {
  // State lưu trữ danh sách địa chỉ
  const [addresses, setAddresses] = useState([
    { id: 1, name: "Trần Ngọc Minh", phone: "+84 336 051 966", city: "Hà Nội, Quận Hai Bà Trưng, Phường Trương Định", addressDetail: "Ngách 113 Trại Cá", type: "Nhà Riêng", default: true },
    { id: 2, name: "Khánh Ling", phone: "+84 336 051 966", city: "Điện Biên, Huyện Điện Biên, Xã Thanh Chăn", addressDetail: "5 Thanh Chăn", type: "Văn Phòng", default: false },
  ]);
  const [isModalOpen, setModalOpen] = useState(false);  // Kiểm tra modal có mở hay không
  const [currentAddress, setCurrentAddress] = useState(null); // Địa chỉ hiện tại đang chỉnh sửa
  const navigate = useNavigate(); // Hook điều hướng trang

  // Mở modal để thêm hoặc cập nhật địa chỉ
  const openModal = (address = null) => {
    setCurrentAddress(address); // Nếu có địa chỉ thì chỉnh sửa, không có thì thêm mới
    setModalOpen(true);
  };

  // Đóng modal và reset địa chỉ hiện tại
  const closeModal = () => {
    setModalOpen(false);
    setCurrentAddress(null);
  };

  // Hàm thay đổi giá trị trong form nhập liệu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAddress({ ...currentAddress, [name]: value });
  };

  // Lưu địa chỉ (thêm mới hoặc cập nhật)
  const handleSave = () => {
    if (currentAddress.id) {
      // Cập nhật địa chỉ
      setAddresses(
        addresses.map((addr) =>
          addr.id === currentAddress.id ? currentAddress : addr
        )
      );
    } else {
      // Thêm địa chỉ mới
      setAddresses([
        ...addresses,
        { id: Date.now(), ...currentAddress, default: false },
      ]);
    }
    closeModal();
  };

  // Xóa địa chỉ
  const handleDelete = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  // Quay lại trang trước
  const handleBack = () => {
    navigate(-1);
  };

  // Kiểu dáng của các phần tử
  const containerStyle = {
    width: "60%",
    margin: "20px auto",
    fontFamily: "Arial, sans-serif",
  };

  const buttonStyle = {
    padding: "10px 15px",
    backgroundColor: "#f04e30",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  };

  const addressCardStyle = {
    border: "1px solid #ccc",
    padding: "15px",
    margin: "10px 0",
    borderRadius: "5px",
    position: "relative",
  };

  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const modalContentStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  return (
    <div style={containerStyle}>
      <h2>Địa chỉ của tôi</h2>
      <button style={buttonStyle} onClick={handleBack}>
        Trở lại
      </button>
      <button style={buttonStyle} onClick={() => openModal()}>
        + Thêm địa chỉ mới
      </button>

      <div>
        {addresses.map((address) => (
          <div key={address.id} style={addressCardStyle}>
            <h4>{address.name}</h4>
            <p>{address.phone}</p>
            <p>{address.city}</p>
            <p>{address.addressDetail}</p>
            <button style={buttonStyle} onClick={() => openModal(address)}>
              Cập nhật
            </button>
            <button
              style={{ ...buttonStyle, backgroundColor: "gray" }}
              onClick={() => handleDelete(address.id)}
            >
              Xóa
            </button>
          </div>
        ))}
      </div>

      {/* Modal thêm hoặc cập nhật địa chỉ */}
      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3>{currentAddress?.id ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}</h3>
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              value={currentAddress?.name || ""}
              onChange={handleInputChange}
              style={inputStyle}
            />
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              value={currentAddress?.phone || ""}
              onChange={handleInputChange}
              style={inputStyle}
            />
            <input
              type="text"
              name="city"
              placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
              value={currentAddress?.city || ""}
              onChange={handleInputChange}
              style={inputStyle}
            />
            <input
              type="text"
              name="addressDetail"
              placeholder="Địa chỉ cụ thể"
              value={currentAddress?.addressDetail || ""}
              onChange={handleInputChange}
              style={inputStyle}
            />
            <div>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="Nhà Riêng"
                  checked={currentAddress?.type === "Nhà Riêng"}
                  onChange={handleInputChange}
                />
                Nhà Riêng
              </label>
              <label style={{ marginLeft: "10px" }}>
                <input
                  type="radio"
                  name="type"
                  value="Văn Phòng"
                  checked={currentAddress?.type === "Văn Phòng"}
                  onChange={handleInputChange}
                />
                Văn Phòng
              </label>
            </div>
            <div style={{ marginTop: "20px" }}>
              <button
                style={{ ...buttonStyle, backgroundColor: "gray" }}
                onClick={closeModal}
              >
                Trở Lại
              </button>
              <button style={buttonStyle} onClick={handleSave}>
                Hoàn Thành
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
