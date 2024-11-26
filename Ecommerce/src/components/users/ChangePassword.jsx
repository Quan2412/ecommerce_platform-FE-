import React, { useState } from 'react';
import { Link } from "react-router-dom";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handlePasswordChange = () => {
    if (!newPassword || !confirmPassword) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin.');
      setSuccessMessage('');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không khớp.');
      setSuccessMessage('');
      return;
    }

    // Simulate a successful password change
    setErrorMessage('');
    setSuccessMessage('Mật khẩu đã được thay đổi thành công.');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h1 className="text-xl font-medium mb-4">Đổi mật khẩu</h1>
        <p className="text-gray-500 mb-6">
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </p>

        {errorMessage && (
          <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-300 rounded">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 text-green-700 bg-green-100 border border-green-300 rounded">
            {successMessage}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Mật khẩu mới
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nhập mật khẩu mới"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Xác nhận mật khẩu mới"
          />
        </div>

<Link to='/user/account/profile'>
        <button
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={handlePasswordChange}
        >
          Xác Nhận
        </button>
        </Link>
      </div>
    </div>
  );
};

export default ChangePassword;
