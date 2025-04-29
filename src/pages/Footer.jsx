import React, { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear(); // Get current year

  return (
    <footer className="bg-[#2A2A2A] text-white py-12">
      <div className="flex justify-between flex-col md:flex-row gap-2  w-full mx-auto mt-10">
        <span className="text-sm text-white">© {currentYear}. Barcha huquqlar himoyalangan.</span>
      </div>
    </footer>
  );
};

export default Footer; 