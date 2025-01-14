// import React, { useState } from 'react';
// import { Eye } from 'lucide-react';
// import login_bg from "../../assets/backgrounds/login_bg.png";
// import logo from "../../assets/logos/full_logo.png";
// import { Link } from 'react-router-dom';
// const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="flex h-screen w-screen overflow-hidden">
//       {/* Left side - Image */}
//       <div className="hidden md:block md:w-[60%] h-full">
//         <img
//           src={login_bg}
//           alt="Contract signing"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Right side - Login Form */}
//       <div className="w-full md:w-[40%] h-full flex flex-col overflow-y-auto bg-white">
//         <div className="w-full px-4 md:px-10 py-6 md:py-10 flex flex-col h-full">
//           {/* Logo for desktop */}
//           <div className="hidden md:block mb-8">
//             <img
//               src={logo}
//               alt="Company Logo"
//               className="h-8 w-auto"
//             />
//           </div>

//           <div className="flex-1">
//             <h2 className="text-2xl font-semibold mb-6">Xush kelibsiz</h2>

//             <div className="space-y-5">
//               {/* Toggle Buttons */}
//               <div className="flex space-x-4">
//                 <button className="bg-[#3981F7] text-white px-6 py-2 rounded-md">
//                   Ro'yxatdan O'tish
//                 </button>
//                 <Link to="/login">
//                   <button className="text-gray-600 px-6 py-2">
//                     Tizimga Kirish
//                   </button>
//                 </Link>
//               </div>

//               {/* Organization Field */}
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">
//                   Tashkilotni tanlang
//                 </label>
//                 <select className="w-full p-3 border border-gray-200 rounded-md bg-white">
//                   <option>Tashkilotni no'mi</option>
//                 </select>
//               </div>

//               {/* Name Field */}
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">
//                   Ism
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full p-3 border border-gray-200 rounded-md"
//                 />
//               </div>

//               {/* Family Name Field */}
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">
//                   Familiya
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full p-3 border border-gray-200 rounded-md"
//                 />
//               </div>

//               {/* Phone Field */}
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">
//                   Telefon nomer
//                 </label>
//                 <input
//                   type="tel"
//                   className="w-full p-3 border border-gray-200 rounded-md"
//                 />
//               </div>

//               {/* Password Field */}
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">
//                   Parol
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     className="w-full p-3 border border-gray-200 rounded-md pr-10"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2"
//                   >
//                     <Eye className="h-5 w-5 text-gray-400" />
//                   </button>
//                 </div>
//                 <div className="mt-2 flex justify-end">
//                   <a href="#" className="text-[#3981F7] text-sm">
//                     Parolni unutdingizmi?
//                   </a>
//                 </div>
//               </div>

//               <button className="w-full bg-[#024072] text-white py-3 rounded-md">
//                 Ro'yxatdan O'tish
//               </button>
//             </div>
//           </div>

//           {/* Logo for mobile - at the bottom */}
//           <div className="md:hidden mt-auto pt-6">
//             <img
//               src={logo}
//               alt="Company Logo"
//               className="h-8 w-auto mx-auto"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import login_bg from "../../assets/backgrounds/login_bg.png";
import logo from "../../assets/logos/full_logo.png";
import { Link } from 'react-router-dom';

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
const FloatingLabelSelect = ({ label, options = [] }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="relative mb-6">
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full p-3 border border-gray-200 rounded-md peer bg-white appearance-none"
      >
        <option value="" disabled></option>
        <option>Tashkilotni no'mi</option>
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
    </div>
  );
};

const Register = () => {
  const [formData, setFormData] = useState({
    organization: '',
    firstName: '',
    lastName: '',
    phone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
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
            <img
              src={logo}
              alt="Company Logo"
              className="h-8 w-auto"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-6">Xush kelibsiz</h2>

            <div className="space-y-5">
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
                <FloatingLabelInput
                  label="Telefon nomer"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange('phone')}
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
                <div className="mt-2 flex justify-end">
                  <a href="#" className="text-[#3981F7] text-sm">
                    Parolni unutdingizmi?
                  </a>
                </div>
              </div>

              <button className="w-full bg-[#024072] text-white py-3 rounded-md">
                Ro'yxatdan O'tish
              </button>
            </div>
          </div>

          {/* Logo for mobile - at the bottom */}
          <div className="md:hidden mt-auto pt-6">
            <img
              src={logo}
              alt="Company Logo"
              className="h-8 w-auto mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;