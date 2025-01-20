import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import login_bg from "../../assets/backgrounds/login_bg.png";
import logo from "../../assets/logos/full_logo.png";
import PhoneInput from '../../components/PhoneInput';
import { sendRequest } from '../../utils/apiFunctions';

const ForgotPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState('+998 ');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanNumber = phoneNumber.replace(/\D/g, '').slice(3);
    if (cleanNumber.length === 9) {
      setLoading(true);
      try {
        const response = await sendRequest({
          method: 'POST',
          url: '/auth/password/recovery/',
          data: {
            phone_number: `+998${cleanNumber}`,
          },
        });
        if (response.success) {
          window.location.href = '/login';
          setErrorMessage('');
        } else {
          const errorDetail = response.error.data?.detail || 'Password recovery failed. Please try again.';
          setErrorMessage(errorDetail);
        }
      } catch (error) {
        const errorDetail = error.response?.data?.detail || 'Password recovery failed. Please try again.';
        setErrorMessage(errorDetail);
      } finally {
        setLoading(false);
      }
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

      {/* Right side - Forgot Password Form */}
      <div className="w-full md:w-[40%] h-full flex flex-col overflow-y-auto bg-white">
        <div className="w-full px-4 md:px-10 py-6 md:py-10 flex flex-col h-full">
          {/* Logo for desktop */}
          <div className="hidden md:block mb-8">
            <Link to="/">
              <img
                src={logo}
                alt="Korrupsiyaviy omillarni profilaktika qilish platformasi"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-6">Parolni tiklash</h2>



            <p className="text-gray-600 mb-8">
              Bog'langan telefon raqamingizni kiriting va biz sizga parol jo'natamiz
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <PhoneInput
                value={phoneNumber}
                onChange={setPhoneNumber}
              />
              {errorMessage && (
                <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
              )}

              <button
                type="submit"
                className="w-full bg-[#024072] text-white py-3 rounded-md hover:bg-[#02355f] transition-colors"
                disabled={loading}
              >
                {loading ? (
                  "Yuborilmoqda..."
                ) : (
                  'Parol Yuborish'
                )}
              </button>

              <div className="text-center">
                <Link
                  to="/login"
                  className="text-[#024072] hover:text-[#02355f] transition-colors"
                >
                  Orqaga Qaytish
                </Link>
              </div>
            </form>
          </div>

          {/* Logo for mobile - at the bottom */}
          <div className="md:hidden mt-auto pt-6">
            <Link to="/">
              <img
                src={logo}
                alt="Korrupsiyaviy omillarni profilaktika qilish platformasi"
                className="h-8 w-auto mx-auto"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;