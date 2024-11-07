import React, { useState } from 'react';
import './index.css'

const AuthPages = () => {
  // Các state quản lý form
  const [isLogin, setIsLogin] = useState(true);  // true: đăng nhập, false: đăng ký
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});  // Lưu trữ các lỗi validation
  const [loading, setLoading] = useState(false);  // Trạng thái loading
  const [message, setMessage] = useState({ text: '', type: '' });  // Thông báo cho người dùng

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Xóa lỗi khi user bắt đầu gõ
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    // Validate mật khẩu
    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    // Validate thêm cho form đăng ký
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Họ tên là bắt buộc';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
      } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = 'Mật khẩu không khớp';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setMessage({ text: '', type: '' });

      // Chuẩn bị dữ liệu gửi lên server
      const requestData = isLogin ? {
        username: formData.email,
        password: formData.password
      } : {
        username: formData.email,
        email: formData.email,
        password: formData.password,
        name: formData.name
      };

      // Gọi API đăng nhập/đăng ký
      const response = await fetch(`http://localhost:8080/auth/api/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();

      // Xử lý các loại lỗi từ server
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('Email này đã được sử dụng');
        } else if (response.status === 401) {
          throw new Error('Email hoặc mật khẩu không chính xác');
        } else if (response.status === 409) {
          throw new Error('Email này đã được sử dụng');
        } else {
          throw new Error(data.message || 'Đã xảy ra lỗi');
        }
      }

      // Xử lý thành công
      setMessage({ 
        text: isLogin ? 'Đăng nhập thành công!' : 'Đăng ký thành công! Vui lòng đăng nhập', 
        type: 'success' 
      });

      if (data.token) {
        localStorage.setItem('token', data.token);
        
        // Chuyển hướng sau khi đăng nhập thành công
        if (isLogin) {
          setTimeout(() => {
            window.location.href = 'http://localhost:3000';
          }, 3000); // Đợi 3 giây trước khi chuyển hướng
        }
      }

      // Nếu đăng ký thành công, chuyển sang form đăng nhập
      if (!isLogin) {
        setTimeout(() => {
          setIsLogin(true);
          // Reset form
          setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
        }, 2000);
      }

    } catch (error) {
      console.error('Lỗi:', "Username không hợp lệ/đã tồn tại!");
      setMessage({ 
        text: error.message || 'Có lỗi xảy ra. Vui lòng thử lại.', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  // Xử lý đăng nhập với Google
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setMessage({ text: 'Đang chuyển hướng đến Google...', type: 'info' });
      // TODO: Thêm xử lý đăng nhập Google
    } catch (error) {
      setMessage({ text: 'Đăng nhập với Google thất bại', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Xử lý đăng nhập với Facebook
  const handleFacebookLogin = async () => {
    try {
      setLoading(true);
      setMessage({ text: 'Đang chuyển hướng đến Facebook...', type: 'info' });
      // TODO: Thêm xử lý đăng nhập Facebook
    } catch (error) {
      setMessage({ text: 'Đăng nhập với Facebook thất bại', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-lg">
        {/* Thanh chuyển đổi Đăng nhập/Đăng ký */}
        <div className="flex space-x-2 border-b">
          <button
            className={`pb-2 px-4 ${
              isLogin
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
            onClick={() => {
              setIsLogin(true);
              setErrors({});
              setMessage({ text: '', type: '' });
              // Reset form khi chuyển tab
              setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
              });
            }}
          >
            Đăng nhập
          </button>
          <button
            className={`pb-2 px-4 ${
              !isLogin
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
            onClick={() => {
              setIsLogin(false);
              setErrors({});
              setMessage({ text: '', type: '' });
              // Reset form khi chuyển tab
              setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
              });
            }}
          >
            Đăng ký
          </button>
        </div>

        {/* Hiển thị thông báo lỗi/thành công */}
        {message.text && (
          <div 
            className={`p-3 rounded ${
              message.type === 'error' 
                ? 'bg-red-100 text-red-700 border border-red-300' 
                : message.type === 'success' 
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'bg-blue-100 text-blue-700 border border-blue-300'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Container form */}
        <div>
          <h2 className="text-2xl font-bold text-center text-gray-800">
            {isLogin ? 'Đăng nhập' : 'Tạo tài khoản mới'}
          </h2>
          <p className="mt-2 text-center text-gray-600">
            {isLogin
              ? 'Chào mừng bạn trở lại!'
              : 'Chỉ mất vài phút để tạo tài khoản'}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Trường họ tên - chỉ hiển thị khi đăng ký */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Họ và tên
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border 
                      ${errors.name ? 'border-red-500' : 'border-gray-300'}
                      rounded-md shadow-sm placeholder-gray-400
                      focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Nhập họ và tên của bạn"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
            )}

            {/* Trường email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border 
                    ${errors.email ? 'border-red-500' : 'border-gray-300'}
                    rounded-md shadow-sm placeholder-gray-400
                    focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Nhập địa chỉ email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Trường mật khẩu */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border 
                    ${errors.password ? 'border-red-500' : 'border-gray-300'}
                    rounded-md shadow-sm placeholder-gray-400
                    focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Nhập mật khẩu"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Trường xác nhận mật khẩu - chỉ hiển thị khi đăng ký */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Xác nhận mật khẩu
                </label>
                <div className="mt-1 relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border 
                      ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}
                      rounded-md shadow-sm placeholder-gray-400
                      focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Nhập lại mật khẩu"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {/* Nút submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent 
                rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 
                hover:bg-blue-700 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Đang xử lý...' : (isLogin ? 'Đăng nhập' : 'Đăng ký')}
            </button>

            {/* Phần đăng nhập mạng xã hội */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Hoặc tiếp tục với
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleFacebookLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center px-4 py-2 
                    border border-gray-300 rounded-md shadow-sm text-sm 
                    font-medium text-gray-700 bg-white hover:bg-gray-50 
                    disabled:opacity-50"
                >
                  Facebook
                </button>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center px-4 py-2 
                    border border-gray-300 rounded-md shadow-sm text-sm 
                    font-medium text-gray-700 bg-white hover:bg-gray-50 
                    disabled:opacity-50"
                >
                  Google
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPages;