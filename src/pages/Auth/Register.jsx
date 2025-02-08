import React, { useState, useEffect, useRef } from 'react';
import { Eye, ChevronDown } from 'lucide-react';
import login_bg from "../../assets/backgrounds/login_bg.png";
import logo from "../../assets/logos/full_logo.png";
import { Link } from 'react-router-dom';
import PhoneInput from '../../components/PhoneInput';
import { sendRequest } from '../../utils/apiFunctions';
import { useTranslation } from 'react-i18next';

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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onChange({ target: { value: option.value } });
    setIsOpen(false);
  };

  return (
    <div className="relative mb-6" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 h-[50px] border border-gray-200 rounded-md bg-white text-left relative"
      >
        <span className={`block truncate ${selectedOption ? 'text-black' : 'text-gray-400'}`}>
          {selectedOption ? selectedOption.label : ''}
        </span>
      </button>

      <label
        className={`absolute text-sm duration-150 transform bg-white px-1
          ${selectedOption || isOpen
            ? 'text-gray-600 -translate-y-1/2 top-0 left-2 z-30'
            : 'text-gray-400 top-1/2 left-3 -translate-y-1/2'
          }
        `}
      >
        {label}
      </label>

      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 truncate"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
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
  const { t } = useTranslation();

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
    console.log(response);

    if (response.success) {
      window.location.href = '/login';
    } else {
      const errorDetail = response.error.data?.detail || 'Registration failed. Please try again.';
      setErrorMessage(errorDetail);
      console.error(response.error);
    }
  };

  // Add validation function
  const isFormValid = () => {
    return (
      formData.organization &&
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.phone.replace(/[^0-9+]/g, '').length >= 13 && // Validate phone length
      formData.password.length >= 6 // Minimum password length
    );
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
            <h2 className="text-2xl font-semibold mb-6">{t('auth.welcome')}</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Toggle Buttons */}
              <div className="flex space-x-4">
                <button className="bg-[#3981F7] text-white px-6 py-2 rounded-md">
                  {t('auth.register')}
                </button>
                <Link to="/login">
                  <button className="text-gray-600 px-6 py-2">
                    {t('auth.login')}
                  </button>
                </Link>
              </div>

              {/* Organization Field */}
              <div>
                <FloatingLabelSelect
                  label={t('auth.select_organization')}
                  options={organizations.map(org => ({ value: org.id, label: org.name }))}
                  onChange={handleChange('organization')}
                />
              </div>

              {/* Name Fields */}
              <div>
                <FloatingLabelInput
                  label={t('auth.first_name')}
                  value={formData.firstName}
                  onChange={handleChange('firstName')}
                />
              </div>

              <div>
                <FloatingLabelInput
                  label={t('auth.last_name')}
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
                  label={t('auth.password')}
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
                className={`w-full py-3 rounded-md ${isFormValid() ? 'bg-[#024072] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                disabled={loading || !isFormValid()}
              >
                {loading ? t('common.sending') : t('auth.register')}
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