import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from "../assets/logos/logo.png";
import footer_logo from "../assets/logos/footer_logo.png";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  // Add helper function to handle link paths
  const getLocalizedPath = (path) => {
    return `${i18n.language}${path}`;
  };

  return (
    <footer className="bg-[#2A2A2A] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start mb-12">
          <Link to={getLocalizedPath('/')} className="flex items-center gap-2 justify-start">
            <img src={logo} alt="Logo" className="h-12 " />
            <h2 className="text-left text-xl font-medium max-w-md">
              {t('platform_title_1')} <br />
              {t('platform_title_2')}
            </h2>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Agentlik haqida */}
          <div>
            <h3 className="text-xl mb-4">Agentlik haqida</h3>
            <div className="flex flex-col gap-2">
              <Link to={getLocalizedPath('/about')} className="text-gray-400 hover:text-white">
                Agentlik haqida
              </Link>
              <Link to={getLocalizedPath('/leadership')} className="text-gray-400 hover:text-white">
                Rahbariyat
              </Link>
              <Link to={getLocalizedPath('/structure')} className="text-gray-400 hover:text-white">
                Agentlik tuzilmasi
              </Link>
            </div>
          </div>

          {/* Faoliyat */}
          <div>
            <h3 className="text-xl mb-4">Faoliyat</h3>
            <div className="flex flex-col gap-2">
              <Link to={getLocalizedPath('/statistics')} className="text-gray-400 hover:text-white">
                {t('navbar.practice')}
              </Link>
              <Link to={getLocalizedPath('/corruption-risks')} className="text-gray-400 hover:text-white">
                {t('navbar.corruption_risks')}
              </Link>
              <Link to={getLocalizedPath('/compliance')} className="text-gray-400 hover:text-white">
                {t('navbar.compliance_officers')}
              </Link>
            </div>
          </div>

          {/* Axborot xizmati */}
          <div>
            <h3 className="text-xl mb-4">Axborot xizmati</h3>
            <div className="flex flex-col gap-2">
              <Link to={getLocalizedPath('/violations')} className="text-gray-400 hover:text-white">
                {t('navbar.news')}
              </Link>
              <Link to={getLocalizedPath('/announcements')} className="text-gray-400 hover:text-white">
                {t('navbar.announcements')}
              </Link>
              <Link to={getLocalizedPath('/handouts')} className="text-gray-400 hover:text-white">
                {t('navbar.handouts')}
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-400">© {currentYear}. {t('footer.rights')}</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-sm text-gray-400">Powered by</span>
            <a href="https://zerodev.uz/" target="_blank" rel="noopener noreferrer">
              <img src={footer_logo} alt="footer_logo" className="h-4 w-24" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;