import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, ChevronDown, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from "../../assets/logos/logo.png";


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const menuItems = [
    {
      title: "Ta'lim resurslari",
      dropdown: true,
      items: [
        {
          label: "O'quv kurslari",
          to: '/training-courses'
        },
        {
          label: "Elektron kutubxona",
          to: '/electronic-library'
        },
        {
          label: "Korrupsiyaviy xavf-xatarlar",
          to: '/corruption-risks'
        }
      ]
    },
    {
      title: "Xabar berish",
      to: '/news',
      dropdown: true,
      items: [
        {
          label: "Xabar berish",
          to: '/news'
        },
        {
          label: "Manfaatlar to'qnashuvi",
          to: '/benefits'
        }
      ]
    },
    {
      title: "So'rovnomalar",
      to: '/',
      dropdown: true,
      items: [
        {
          label: "Amaliyot",
          to: '/operations'
        },
        {
          label: "Komplayens ofitserlar",
          to: '/compliance'
        }
      ]
    },
    {
      title: "Halollik testi",
      to: '/status',
      dropdown: false
    },
    {
      title: "Foydali resurslar",
      to: '/resources',
      dropdown: true,
      items: [
        // {
        //   label: "Targ'ibot va foydali axborotlar",
        //   to: '/resources'
        // },
        {
          label: "Yangiliklar",
          to: '/violations'
        },
        {
          label: "E'lonlar",
          to: '/announcements'
        },
        {
          label: "Tarqatma materiallar",
          to: '/handouts'
        }
      ]
    }
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  const toggleMobileDropdown = (index) => {
    setActiveMobileDropdown(activeMobileDropdown === index ? null : index);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
        {/* Top Bar */}
        <div className="border-b">
          <div className=" px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo and Title */}
              <div className="flex items-center space-x-4">
                <Link to="/" className="flex items-center space-x-2">
                  <img src={logo} alt="Logo" className="h-8 w-auto" />
                  <div className="text-sm hidden sm:block">
                    <div>{t('platform_title_1')}</div>
                    <div>{t('platform_title_2')}</div>
                  </div>
                </Link>
              </div>

              {/* Right Side Items */}
              <div className="flex items-center space-x-4 md:space-x-8">
                <div className="hidden md:flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">+998 71 222-77-77</span>
                </div>

                {/* Language Selector */}
                <div className="hidden md:block relative">
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

                <Link to="/login" className="hidden md:block">
                  <button className="bg-blue-900 text-white px-6 py-2 rounded text-sm">
                    {t('login')}
                  </button>
                </Link>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block bg-white">
          <div className=" px-4">
            <div className="flex items-center justify-between h-14">
              <nav className="flex space-x-10">
                {menuItems.map((item, index) => (
                  <div key={index} className="relative group">
                    <Link
                      to={item.to}
                      className="flex items-center space-x-1 py-2 text-gray-700 hover:text-blue-600"
                    >
                      <span>{item.title}</span>
                      {item.dropdown && <ChevronDown className="h-4 w-4" />}
                    </Link>
                    {item.dropdown && (
                      <div className="absolute hidden group-hover:block w-64 left-0 top-full bg-white shadow-lg rounded-md overflow-hidden z-50">
                        {item.items.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.to}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden" style={{ top: '64px' }}>
          <div className="p-4 space-y-4">
            {/* Mobile Contact and Language */}
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-600">+998 71 222-77-77</span>
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center space-x-2 px-2 py-1 text-sm"
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

            {/* Mobile Navigation Items */}
            <nav className="space-y-4">
              {menuItems.map((item, index) => (
                <div key={index} className="border-b pb-2">
                  <button
                    onClick={() => item.dropdown && toggleMobileDropdown(index)}
                    className="flex items-center justify-between w-full py-2 text-gray-700"
                  >
                    <Link to={item.to}>{item.title}</Link>
                    {item.dropdown && (
                      <ChevronDown className={`h-4 w-4 transform transition-transform duration-200 ${activeMobileDropdown === index ? 'rotate-180' : ''
                        }`} />
                    )}
                  </button>
                  {item.dropdown && activeMobileDropdown === index && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.items.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.to}
                          className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Login Button */}
            <Link to="/login">
              <button className="w-full bg-blue-900 text-white px-6 py-2 rounded text-sm">
                {t('login')}
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-30 md:h-32"></div>
    </>
  );
};

export default Navbar;