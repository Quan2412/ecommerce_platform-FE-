import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { User, CreditCard, MapPin, Lock, Bell, Settings, ShoppingBag } from "lucide-react";

const ProfileSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [notification, setNotification] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date()); // Ngày sinh

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    setIsModalOpen(false);
    setNotification("Thông tin đã được lưu thành công!");
    setTimeout(() => setNotification(""), 3000); // Xóa thông báo sau 3 giây
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-4">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-orange-200 overflow-hidden">
            <img
              src="/api/placeholder/48/48"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-medium">minhtran261</h2>
            <span className="text-gray-500 text-sm">Sửa Hồ Sơ</span>
          </div>
        </div>

        <nav className="space-y-2">
          <button className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100 rounded-lg">
            <User className="mr-2 h-4 w-4" />
            Tài Khoản Của Tôi
          </button>
          <div className="pl-6 space-y-2">
            <button className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100 rounded-lg text-red-500">
              Hồ Sơ
            </button>
            <button className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100 rounded-lg">
              Ngân Hàng
            </button>
            <Link to={`/user/account/profile/address`}>
            <button className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100 rounded-lg">
              Địa Chỉ
            </button>
            </Link>
            <Link to={`/user/account/profile/changePassword`}>
            <button className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100 rounded-lg">
              Đổi Mật Khẩu
            </button>
            </Link>
            <Link to={`/order-list`}>
            <button className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100 rounded-lg">
              Đơn Hàng
            </button>
            </Link>
          </div>
          <button className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100 rounded-lg">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Đơn Mua
          </button>
          <button className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100 rounded-lg">
            <Bell className="mr-2 h-4 w-4" />
            Thông Báo
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-xl font-medium mb-4">Hồ Sơ Của Tôi</h1>
          <p className="text-gray-500 mb-6">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>

          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 space-y-6">
              <div className="grid grid-cols-3 items-center gap-4">
                <label className="font-medium">Tên đăng nhập</label>
                <div className="col-span-2">minhtran261</div>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <label className="font-medium">Tên</label>
                <input
                  type="text"
                  className="col-span-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <label className="font-medium">Email</label>
                <div className="col-span-2 flex items-center">
                  <span>mi********@gmail.com</span>
                  <button
                    className="text-blue-500 ml-2 hover:underline"
                    onClick={() => openModal("Email")}
                  >
                    Thay Đổi
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <label className="font-medium">Số điện thoại</label>
                <div className="col-span-2 flex items-center">
                  <span>*********68</span>
                  <button
                    className="text-blue-500 ml-2 hover:underline"
                    onClick={() => openModal("Số điện thoại")}
                  >
                    Thay Đổi
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <label className="font-medium">Giới tính</label>
                <div className="col-span-2 flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="gender" value="nam" className="text-blue-500" />
                    <span>Nam</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="gender" value="nu" className="text-blue-500" />
                    <span>Nữ</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="gender" value="khac" className="text-blue-500" />
                    <span>Khác</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <label className="font-medium">Ngày sinh</label>
                <div className="col-span-2 flex items-center">
                  <span>
                    {selectedDate
                      ? selectedDate.toLocaleDateString("vi-VN")
                      : "**/**/****"}
                  </span>
                  <button
                    className="text-blue-500 ml-2 hover:underline"
                    onClick={() => openModal("Ngày sinh")}
                  >
                    Thay Đổi
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <div className="col-start-2">
                  <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                    Lưu
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-start">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-4">
                <img
                  src="/api/placeholder/96/96"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 mb-2">
                Chọn Ảnh
              </button>
              <p className="text-gray-500 text-sm text-center">
                Dung lượng file tối đa 1 MB<br />
                Định dạng: .JPEG, .PNG
              </p>
            </div>
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow">
            {notification}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow p-6 w-96">
              <h2 className="text-lg font-medium mb-4">Thay Đổi {modalContent}</h2>

              {modalContent === "Ngày sinh" ? (
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="w-full px-3 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Nhập ${modalContent} mới`}
                />
              )}

              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  onClick={closeModal}
                >
                  Hủy
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={handleSave}
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;
