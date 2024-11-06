import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
  });

  console.log('Component rendered with mode:', isLogin ? 'login' : 'register');

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('Input changed:', name, value);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Common validations
    if (!formData.username?.trim()) {
      newErrors.username = 'Tên đăng nhập là bắt buộc';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    // Registration validations
    if (!isLogin) {
      if (!formData.email) {
        newErrors.email = 'Email là bắt buộc';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Email không hợp lệ';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
      } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = 'Mật khẩu không khớp';
      }

      if (!formData.firstName?.trim()) {
        newErrors.firstName = 'Họ là bắt buộc';
      }

      if (!formData.lastName?.trim()) {
        newErrors.lastName = 'Tên là bắt buộc';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);

    if (!validateForm()) {
      console.log('Form validation failed', errors);
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const endpoint = `http://localhost:8080/api/auth/${isLogin ? 'login' : 'register'}`;
      console.log('Making request to:', endpoint);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(isLogin ? {
          username: formData.username,
          password: formData.password
        } : {
          username: formData.username,
          password: formData.password,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber
        }),
      });

      console.log('Response status:', response.status);

      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || (isLogin ? 'Đăng nhập thất bại' : 'Đăng ký thất bại'));
      }

      if (isLogin) {
        localStorage.setItem('token', data.token);
        setMessage({ text: 'Đăng nhập thành công!', type: 'success' });
        // Redirect or handle successful login
        window.location.href = '/dashboard';
      } else {
        setIsLogin(true);
        setMessage({ text: 'Đăng ký thành công! Vui lòng đăng nhập.', type: 'success' });
        setFormData(prev => ({
          ...prev,
          password: '',
          confirmPassword: ''
        }));
      }
    } catch (error) {
      console.error('Request failed:', error);
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
        {/* Tab switcher */}
        <div className="flex space-x-2 border-b">
          <button
            type="button"
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
            type="button"
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

        {/* Message display */}
        {message.text && (
          <div className={`p-3 rounded ${
            message.type === 'error' ? 'bg-red-100 text-red-700' :
            message.type === 'success' ? 'bg-green-100 text-green-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {message.text}
          </div>
        )}

        {/* Form container */}
        <div>
          <h2 className="text-2xl font-bold text-center text-gray-800">
            {isLogin ? 'Đăng nhập vào tài khoản' : 'Tạo tài khoản mới'}
          </h2>
          <p className="mt-2 text-center text-gray-600">
            {isLogin
              ? 'Chào mừng bạn trở lại!'
              : 'Chỉ mất vài phút để tạo tài khoản'}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Registration fields */}
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Họ
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`mt-1 appearance-none block w-full px-3 py-2 border ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tên
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`mt-1 appearance-none block w-full px-3 py-2 border ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
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
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </>
            )}

            {/* Common fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tên đăng nhập
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
                    errors.username ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none block w-full pl-10 pr-3 py-2 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Xác nhận mật khẩu
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
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
            )}

            

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Đang xử lý...' : (isLogin ? 'Đăng nhập' : 'Đăng ký')}
              
            </button>
            
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;