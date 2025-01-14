import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';


import logo from "../../assets/logos/logo.png";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setIsLangOpen(false);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  // Menu items with line breaks where needed
  const menuItems = [
    {
      id: 1,
      twoLines: true,
      label1: 'menu.study_materials_1',
      label2: 'menu.study_materials_2',
      to: '/educational-materials'
    },
    {
      id: 2,
      twoLines: true,
      label1: 'menu.corruption_risks_1',
      label2: 'menu.corruption_risks_2',
      to: '/corruption-risks'
    },
    {
      id: 3,
      twoLines: false,
      label: 'menu.report',
      to: '/news'
    },
    {
      id: 4,
      twoLines: true,
      label1: 'menu.conflict_1',
      label2: 'menu.conflict_2',
      to: '/benefits'
    },
    {
      id: 5,
      twoLines: false,
      label: 'menu.activity',
      to: '/operations'
    },
    {
      id: 6,
      twoLines: true,
      label1: 'menu.useful_info_1',
      label2: 'menu.useful_info_2',
      to: '/resources'
    },
    {
      id: 7,
      twoLines: false,
      label: 'menu.integrity_test',
      to: '/status'
    },
    {
      id: 8,
      twoLines: true,
      label1: 'menu.compliance_1',
      label2: 'menu.compliance_2',
      to: '/compliance'
    },
    {
      id: 9,
      twoLines: false,
      label: 'menu.news',
      to: '/violations'
    },
    {
      id: 10,
      twoLines: false,
      label: 'menu.announcements',
      to: '/announcements'
    }
  ];

  const renderMenuItem = (item, isMobile = false) => {
    if (item.twoLines && !isMobile) {
      return (
        <span className="inline-block leading-tight text-left">
          <span className="block">{t(item.label1)}</span>
          <span className="block">{t(item.label2)}</span>
        </span>
      );
    }
    // Mobile va medium ekranlar uchun
    if (item.twoLines && isMobile) {
      return <span>{t(item.label1)} {t(item.label2)}</span>;
    }
    return <span>{t(item.label)}</span>;
  };

  return (
    <nav>
      {/* Main container */}
      <div className="w-full">
        {/* Desktop Version (xl) */}
        <div className="hidden xl:block">
          {/* Top row - with shadow and white background */}
          <div className="w-full bg-white shadow-md">
            <div className="p-4 ">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <Link to="/">
                    <img
                      className="h-8 w-auto mr-3"
                      src={logo}
                      alt="Logo"
                    />
                  </Link>
                  <div className="text-sm text-gray-600">
                    <div>{t('platform_title_1')}</div>
                    <div>{t('platform_title_2')}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-600 mr-2" />
                    <span className="text-sm text-gray-600">+998 71 222-77-77</span>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setIsLangOpen(!isLangOpen)}
                      className="flex items-center space-x-2 px-3 py-1 text-sm text-gray-700"
                    >
                      <div className="w-5 h-5 rounded-full bg-blue-100"></div>
                      <span>{i18n.language === 'uz' ? 'O\'ZB' : 'РУС'}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {isLangOpen && (
                      <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg z-50">
                        <button
                          onClick={() => changeLanguage('uz')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          O'ZB
                        </button>
                        <button
                          onClick={() => changeLanguage('ru')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          РУС
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row - transparent with border */}
          <div className="w-full border-b">
            <div className="p-4">
              <div className="flex justify-between items-center h-16">
                <div className="flex flex-1 items-center justify-between">
                  {menuItems.map((item) => (
                    <Link
                      key={item.id}
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                    >
                      {renderMenuItem(item, true)} {/* true parametrini qo'shdik */}
                    </Link>
                  ))}
                </div>
                <Link to="/login">
                  <button className="bg-blue-900 text-white px-6 py-2 rounded text-sm ml-4">
                    {t('login')}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Medium Screens Version */}
        <div className="hidden md:block xl:hidden bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link to="/">
                  <img
                    className="h-8 w-auto mr-3"
                    src={logo}
                    alt="Logo"
                  />
                </Link>
                <div className="text-sm text-gray-600">
                  <div>{t('platform_title_1')}</div>
                  <div>{t('platform_title_2')}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-600 mr-2" />
                  <span className="text-sm text-gray-600">+998 71 222-77-77</span>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setIsLangOpen(!isLangOpen)}
                    className="flex items-center space-x-2 px-3 py-1 text-sm text-gray-700"
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-100"></div>
                    <span>{i18n.language === 'uz' ? 'O\'ZB' : 'РУС'}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {isLangOpen && (
                    <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg z-50">
                      <button
                        onClick={() => changeLanguage('uz')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        O'ZB
                      </button>
                      <button
                        onClick={() => changeLanguage('ru')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        РУС
                      </button>
                    </div>
                  )}
                </div>
                <Link to="/login">
                  <button className="bg-blue-900 text-white px-6 py-2 rounded text-sm">
                    {t('login')}
                  </button>
                </Link>
                <button
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center p-2 text-gray-700 hover:text-blue-600"
                >
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Version */}
        <div className="md:hidden bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link to="/">
                <img
                  className="h-8 w-auto"
                  src={logo}
                  alt="Logo"
                />
              </Link>
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 text-gray-700 hover:text-blue-600"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Menu */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)} />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex flex-col bg-white">
              <div className="flex justify-between items-center h-16 px-4 border-b">
                <Link to="/">
                  <img
                    className="h-8 w-auto"
                    src={logo}
                    alt="Logo"
                  />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center p-2 text-gray-700 hover:text-blue-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="px-4 py-3 border-b">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => changeLanguage('uz')}
                      className="flex items-center space-x-2 text-sm text-gray-700 hover:text-blue-600"
                    >
                      <div className="w-5 h-5 rounded-full bg-blue-100"></div>
                      <span>O'ZB</span>
                    </button>
                    <button
                      onClick={() => changeLanguage('ru')}
                      className="flex items-center space-x-2 text-sm text-gray-700 hover:text-blue-600"
                    >
                      <div className="w-5 h-5 rounded-full bg-blue-100"></div>
                      <span>РУС</span>
                    </button>
                  </div>
                </div>

                <div className="px-4 py-3 border-b">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-600 mr-2" />
                    <span className="text-sm text-gray-600">+998 71 222-77-77</span>
                  </div>
                </div>

                <div className="px-4 py-4 space-y-3">
                  {menuItems.map((item) => (
                    <Link
                      key={item.id}
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className="block text-lg font-medium text-gray-700 hover:text-blue-600"
                    >
                      {renderMenuItem(item, true)}
                    </Link>
                  ))}
                  <Link to="/login">
                    <button className="w-full mt-6 px-3 py-2 text-base font-medium bg-blue-900 text-white rounded">
                      {t('login')}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;