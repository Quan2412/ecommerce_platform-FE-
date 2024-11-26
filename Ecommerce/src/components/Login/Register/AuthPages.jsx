import React, { useState } from 'react';
import './index.css'
import { FaFacebook, FaGoogle, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmailOrPhone, setForgotEmailOrPhone] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!forgotEmailOrPhone) {
      alert('Vui lòng nhập số điện thoại hoặc email.');
      return;
    }
    alert('Vui lòng kiểm tra số điện thoại hoặc Gmail để lấy lại mật khẩu');
    setShowForgotPassword(false);
    setForgotEmailOrPhone('');
  };

  const handleChangeForgotInput = (e) => {
    setForgotEmailOrPhone(e.target.value);
  };

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

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    // Validate các trường bổ sung cho đăng ký
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

  // Xử lý đăng nhập với Google
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      // Thêm code xử lý đăng nhập Google ở đây
 
      setMessage({ text: 'Đang chuyển hướng đến Google...', type: 'info' });
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
      // Thêm code xử lý đăng nhập Facebook ở đây
 
      setMessage({ text: 'Đang chuyển hướng đến Facebook...', type: 'info' });
    } catch (error) {
      setMessage({ text: 'Đăng nhập với Facebook thất bại', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setMessage({ text: '', type: '' });

      if (isLogin) {
        // Xử lý gọi API đăng nhập
        
        const response = await fetch('http://localhost:8080/auth/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          }),
        });

        if (!response.ok) {
          throw new Error('Đăng nhập thất bại');
        }

        const data = await response.json();
        // Lưu token vào localStorage hoặc Cookie
        localStorage.setItem('token', data.token);
        
        setMessage({ text: 'Đăng nhập thành công!', type: 'success' });
        // Chuyển hướng sau khi đăng nhập thành công
        // window.location.href = '/dashboard';
      } else {
        // Xử lý API đăng ký
        
        const response = await fetch('http://localhost:8080/auth/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password
          }),
        });

        if (!response.ok) {
          throw new Error('Đăng ký thất bại');
        }

        setMessage({ text: 'Đăng ký thành công! Vui lòng đăng nhập.', type: 'success' });
        // Chuyển sang form đăng nhập sau khi đăng ký thành công
        setIsLogin(true);
      }
    } catch (error) {
      setMessage({ 
        text: error.message || 'Có lỗi xảy ra. Vui lòng thử lại.', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-lg">
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
            }}
          >
            Đăng ký
          </button>
        </div>

        {message.text && (
          <div className={`p-3 rounded ${
            message.type === 'error' ? 'bg-red-100 text-red-700' :
            message.type === 'success' ? 'bg-green-100 text-green-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {message.text}
          </div>
        )}

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
            {isLogin ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />


            
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                </button>

                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="text-blue-500 hover:underline"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Quên mật khẩu?
                  </button>
                </div>
              </>
            ) : (
              // Registration form (unchanged)
              <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Họ tên</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
          
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
          
              <div>
                <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>
          
              <div>
                <label className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
          
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Đang xử lý...' : 'Đăng ký'}
              </button>
            </>
            )}
          </form>
        </div>

        {showForgotPassword && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Quên mật khẩu</h3>
            <form onSubmit={handleForgotPassword}>
              <label className="block text-sm font-medium text-gray-700">
                Nhập email hoặc số điện thoại của bạn
              </label>
              <input
                type="text"
                value={forgotEmailOrPhone}
                onChange={handleChangeForgotInput}
                className="mt-1 w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  className="text-gray-500 hover:underline mr-4"
                  onClick={() => setShowForgotPassword(false)}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Gửi
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPages;