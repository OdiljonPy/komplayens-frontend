import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import login_bg from "../../assets/backgrounds/login_bg.png";
import logo from "../../assets/logos/full_logo.png";
import { Link } from 'react-router-dom';
import PhoneInput from '../../components/PhoneInput';
import { sendRequest } from '../../utils/apiFunctions';
import { useTranslation } from 'react-i18next';

const FloatingLabelInput = ({ label, type = "text", value, onChange, Icon, required }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mb-4">
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full p-3 border border-gray-200 rounded-md peer bg-white"
        placeholder=" "
        required={required}
      />
      <label
        className={`absolute text-sm duration-150 transform 
          ${isFocused || value
            ? 'text-gray-600 bg-white px-1 text-sm -translate-y-1/2 top-0 left-2 z-10'
            : 'text-gray-400 top-1/2 left-3 -translate-y-1/2'
          }
        `}
      >
        {label}
      </label>
      {Icon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {Icon}
        </div>
      )}
    </div>
  );
};

const Login = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    phone: '+998 ',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    // Clean up the phone number to remove non-numeric characters
    const cleanedValue = field === 'phone' ? value.replace(/[^0-9+]/g, '') : value;

    setFormData(prev => ({
      ...prev,
      [field]: cleanedValue
    }));
    setErrorMessage(''); // Clear error message on input change
  };

  const handleLogin = async () => {
    setLoading(true);
    const { phone, password } = formData;

    // Clean the phone number to remove spaces and dashes
    const cleanedPhone = phone.replace(/[^0-9+]/g, ''); // Keep only numbers and the '+' sign

    const response = await sendRequest({
      method: 'POST',
      url: '/auth/login/',
      data: {
        phone_number: cleanedPhone, // Send the cleaned phone number
        password: password,
      },
    });

    setLoading(false);

    if (response.success) {
      // Save tokens to local storage
      localStorage.setItem('user', JSON.stringify(response.data.result));
      // Redirect to home page
      window.location.href = '/';
    } else {
      // Set error message to display to the user
      const errorDetail = response.error.data?.detail || 'Login failed. Please try again.';
      setErrorMessage(errorDetail);
      console.error(response.error);
    }
  };

  // Add this function to check if form is valid
  const isFormValid = () => {
    const cleanedPhone = formData.phone.replace(/[^0-9+]/g, '');
    return cleanedPhone.length >= 13 && formData.password.length >= 1;
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left side - Image */}
      <div className="hidden md:block md:w-[60%] h-full">
        <img
          src={login_bg}
          alt="Contract signing"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side - Login Form */}
      <div className="w-full md:w-[40%] h-full flex flex-col overflow-y-auto bg-white">
        <div className="w-full px-4 md:px-10 py-6 md:py-10 flex flex-col h-full">
          {/* Logo for desktop */}
          <div className="hidden md:block mb-8">
            <Link to="/">
              <img
                src={logo}
                alt="Company Logo"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-6">{t('auth.welcome')}</h2>

            <div className="space-y-5 ">
              {/* Toggle Buttons */}
              <div className="flex space-x-4 mb-10">
                <Link to="/register">
                  <button className="text-gray-600 px-6 py-2">
                    {t('auth.register')}
                  </button>
                </Link>
                <button className="bg-[#3981F7] text-white px-6 py-2 rounded-md">
                  {t('auth.login')}
                </button>
              </div>

              {/* Login Field */}
              <div >
                <PhoneInput
                  value={formData.phone}
                  onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <FloatingLabelInput
                  label={t('auth.password')}
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange('password')}
                  required
                  Icon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Eye className="h-5 w-5 text-gray-400" />
                    </button>
                  }
                />
                <div className="flex justify-end">
                  <Link to="/forgot-password" className="text-[#3981F7] text-sm">
                    {t('auth.forgot_password')}
                  </Link>
                </div>
              </div>

              {errorMessage && (
                <div className="text-red-500 text-center mb-4">
                  {errorMessage}
                </div>
              )}

              <button
                className={`w-full bg-[#024072] text-white py-3 rounded-md ${(loading || !isFormValid()) ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleLogin}
                disabled={loading || !isFormValid()}
              >
                {loading ? t('common.loading') : t('auth.login')}
              </button>
            </div>
          </div>

          {/* Logo for mobile - at the bottom */}
          <div className="md:hidden mt-auto pt-6">
            <Link to="/">
              <img
                src={logo}
                alt="Company Logo"
                className="h-8 w-auto mx-auto"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;