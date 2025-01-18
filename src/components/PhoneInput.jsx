import React, { useState } from 'react';

const PhoneInput = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const formatPhoneNumber = (input) => {
    // Remove all non-digit characters
    const numbers = input.replace(/\D/g, '');

    // Remove the country code if present
    const phoneNumbers = numbers.startsWith('998') ? numbers.slice(3) : numbers;

    // Take only the first 9 digits
    const trimmed = phoneNumbers.slice(0, 9);

    // Format the number according to the pattern: XX XXX-XX-XX
    let formatted = '';
    if (trimmed.length > 0) formatted += trimmed.slice(0, 2);
    if (trimmed.length > 2) formatted += ' ' + trimmed.slice(2, 5);
    if (trimmed.length > 5) formatted += '-' + trimmed.slice(5, 7);
    if (trimmed.length > 7) formatted += '-' + trimmed.slice(7);

    return '+998 ' + formatted;
  };

  const handleChange = (e) => {
    let input = e.target.value;

    // Allow only numbers
    if (!/^\+998 [\d \-]*$/.test(input)) {
      return;
    }

    const formatted = formatPhoneNumber(input);
    onChange(formatted);
  };

  // Function to handle phone number submission
  const getCleanNumber = (phoneNumber) => {
    return phoneNumber.replace(/\D/g, '').slice(3);
  };

  return (
    <div className="relative mb-10">
      <input
        type="text"
        value={value}
        onChange={handleChange}
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
        Telefon raqam
      </label>
    </div>
  );
};

export default PhoneInput;