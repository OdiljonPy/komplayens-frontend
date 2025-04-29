import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLocalizedPath } from '../utils/localizedPath';

const Footer = () => {
  const { t } = useTranslation();
  const [logo, setLogo] = useState(null);
  const [footer_logo, setFooterLogo] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Fetch logo and footer_logo
    fetch('/api/logo')
      .then(response => response.json())
      .then(data => {
        setLogo(data.logo);
        setFooterLogo(data.footer_logo);
      });

    // Fetch menu items
    fetch('/api/menu-items')
      .then(response => response.json())
      .then(data => {
        setMenuItems(data.menuItems);
      });
  }, []);

  return (
    <footer className="bg-[#2A2A2A] text-white py-16">
      <div className="container mx-auto px-4">
        {/* Logo section */}
        <div className="flex flex-col items-center mb-16">
          <Link to={getLocalizedPath('/')}>
            <img src={logo} alt="Logo" className="h-14 mb-6" />
          </Link>
          <h2 className="text-center text-2xl font-medium max-w-2xl">
            {t('platform_title_1')}
          </h2>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:grid grid-cols-5 gap-x-8 gap-y-6 text-[15px] max-w-6xl mx-auto mb-16">
          {/* First Column */}
          <div className="space-y-4">
            <Link to={getLocalizedPath('/training-courses')} className="block hover:text-blue-400 transition-colors">
              {t('navbar.training_courses')}
            </Link>
            <Link to={getLocalizedPath('/corruption-risks')} className="block hover:text-blue-400 transition-colors">
              {t('navbar.corruption_risks')}
            </Link>
          </div>

          {/* Second Column */}
          <div className="space-y-4">
            <Link to={getLocalizedPath('/xabar-berish')} className="block hover:text-blue-400 transition-colors">
              {t('navbar.report')}
            </Link>
            <Link to={getLocalizedPath('/benefits')} className="block hover:text-blue-400 transition-colors">
              {t('navbar.conflict_of_interest')}
            </Link>
          </div>

          {/* Third Column */}
          <div className="space-y-4">
            <Link to={getLocalizedPath('/operations')} className="block hover:text-blue-400 transition-colors">
              {t('navbar.practice')}
            </Link>
            <Link to={getLocalizedPath('/compliance')} className="block hover:text-blue-400 transition-colors">
              {t('navbar.compliance_officers')}
            </Link>
          </div>

          {/* Fourth Column */}
          <div className="space-y-4">
            <Link to={getLocalizedPath('/status')} className="block hover:text-blue-400 transition-colors">
              {t('navbar.integrity_test')}
            </Link>
            <Link to={getLocalizedPath('/announcements')} className="block hover:text-blue-400 transition-colors">
              {t('navbar.announcements')}
            </Link>
          </div>

          {/* Fifth Column */}
          <div className="space-y-4">
            <Link to={getLocalizedPath('/violations')} className="block hover:text-blue-400 transition-colors">
              {t('navbar.news')}
            </Link>
            <Link to={getLocalizedPath('/handouts')} className="block hover:text-blue-400 transition-colors">
              {t('navbar.handouts')}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden space-y-6 text-[15px] mb-16">
          {menuItems.map((section, index) => (
            <div key={index} className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  to={getLocalizedPath(item.to)}
                  className="block hover:text-blue-400 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="flex justify-between items-center flex-col md:flex-row gap-4 pt-8 border-t border-gray-700">
          <span className="text-[15px] text-gray-300">© 2024. Barcha huquqlar himoyalangan.</span>
          <div className="flex items-center gap-4">
            <span className="text-[15px] text-gray-300">Powered by</span>
            <a href="https://zerodev.uz/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity">
              <img src={footer_logo} alt="footer_logo" className="h-5 w-auto" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 