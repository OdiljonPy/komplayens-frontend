import React, { useState, useEffect } from 'react';
import { Eye, ChevronDown } from 'lucide-react';
import login_bg from "../../assets/backgrounds/login_bg.png";
import logo from "../../assets/logos/full_logo.png";
import { Link } from 'react-router-dom';
import PhoneInput from '../../components/PhoneInput';
import { sendRequest } from '../../utils/apiFunctions';

// FloatingLabelInput component with fixed positioning
const FloatingLabelInput = ({ label, type = "text", value, onChange, Icon }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mb-6">
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full p-3 border border-gray-200 rounded-md peer bg-white"
        placeholder=" "
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

// FloatingLabelSelect component with fixed positioning
const FloatingLabelSelect = ({ label, options = [], onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="relative mb-6">
      <select
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full p-3 border border-gray-200 rounded-md peer bg-white appearance-none"
      >
        <option value="" disabled></option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <ChevronDown className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};

const Register = () => {
  const [formData, setFormData] = useState({
    organization: '',
    firstName: '',
    lastName: '',
    phone: '+998 ',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const response = await sendRequest({
        method: 'GET',
        url: '/services/organization/',
      });

      if (response.success) {
        setOrganizations(response.data.result.content);
      } else {
        console.error(response.error);
      }
    };

    fetchOrganizations();
  }, []);

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { organization, firstName, lastName, phone, password } = formData;

    const cleanedPhone = phone.replace(/[^0-9+]/g, '');

    const response = await sendRequest({
      method: 'POST',
      url: '/auth/register/',
      data: {
        organization: organization,
        first_name: firstName,
        last_name: lastName,
        password: password,
        phone_number: cleanedPhone,
      },
    });

    setLoading(false);

    if (response.success) {
      window.location.href = '/login';
    } else {
      const errorDetail = response.error.data?.detail || 'Registration failed. Please try again.';
      setErrorMessage(errorDetail);
      console.error(response.error);
    }
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

      {/* Right side - Register Form */}
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
            <h2 className="text-2xl font-semibold mb-6">Xush kelibsiz</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Toggle Buttons */}
              <div className="flex space-x-4">
                <button className="bg-[#3981F7] text-white px-6 py-2 rounded-md">
                  Ro'yxatdan O'tish
                </button>
                <Link to="/login">
                  <button className="text-gray-600 px-6 py-2">
                    Tizimga Kirish
                  </button>
                </Link>
              </div>

              {/* Organization Field */}
              <div>
                <FloatingLabelSelect
                  label="Tashkilotni tanlang"
                  options={organizations.map(org => ({ value: org.id, label: org.name }))}
                  onChange={handleChange('organization')}
                />
              </div>

              {/* Name Field */}
              <div>
                <FloatingLabelInput
                  label="Ism"
                  value={formData.firstName}
                  onChange={handleChange('firstName')}
                />
              </div>

              {/* Family Name Field */}
              <div>
                <FloatingLabelInput
                  label="Familiya"
                  value={formData.lastName}
                  onChange={handleChange('lastName')}
                />
              </div>

              {/* Phone Field */}
              <div>
                <PhoneInput
                  value={formData.phone}
                  onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                />
              </div>

              {/* Password Field */}
              <div>
                <FloatingLabelInput
                  label="Parol"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange('password')}
                  Icon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Eye className="h-5 w-5 text-gray-400" />
                    </button>
                  }
                />
              </div>
              {errorMessage && (
                <div className="text-red-500 text-center mb-4">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#024072] text-white py-3 rounded-md"
                disabled={loading}
              >
                {loading ? 'Yuborilmoqda...' : 'Ro\'yxatdan O\'tish'}
              </button>
            </form>

            {/* Error Message Display */}

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

export default Register;