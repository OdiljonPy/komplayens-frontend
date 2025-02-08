import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, ChevronDown, Menu, X, User } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from "../../assets/logos/logo.png";
import { allowedLanguages, defaultLanguage } from '../../utils/constants';


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Add effect to handle language changes
  useEffect(() => {
    const currentPath = location.pathname;
    const pathLang = currentPath.split('/')[1];

    // Agar URL da til ko'rsatilmagan yoki noto'g'ri til bo'lsa
    if (!allowedLanguages.includes(pathLang)) {
      const newPath = currentPath === '/' ? `/${defaultLanguage}` : `/${defaultLanguage}${currentPath}`;
      navigate(newPath, { replace: true });
      return;
    }

    // Agar joriy til URL dagi tildan farq qilsa
    if (i18n.language !== pathLang) {
      i18n.changeLanguage(pathLang);
    }
  }, [location.pathname, i18n.language]);

  // Add effect to check localStorage for user
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Add this helper function to handle link paths
  const getLocalizedPath = (path) => {
    return `/${i18n.language}${path}`;
  };

  const menuItems = [
    {
      title: t('navbar.education_resources'),
      dropdown: true,
      to: '/training-courses',
      items: [
        {
          label: t('navbar.training_courses'),
          to: '/training-courses'
        },
        {
          label: t('navbar.electronic_library'),
          to: '/electronic-library'
        },
        {
          label: t('navbar.corruption_risks'),
          to: '/corruption-risks'
        }
      ]
    },
    {
      title: t('navbar.report'),
      to: '/news',
      dropdown: true,
      items: [
        {
          label: t('navbar.report'),
          to: '/news'
        },
        {
          label: t('navbar.conflict_of_interest'),
          to: '/benefits'
        }
      ]
    },
    {
      title: t('navbar.surveys'),
      to: '/operations',
      dropdown: true,
      items: [
        {
          label: t('navbar.practice'),
          to: '/operations'
        },
        {
          label: t('navbar.compliance_officers'),
          to: '/compliance'
        }
      ]
    },
    {
      title: t('navbar.integrity_test'),
      to: '/status',
      dropdown: false
    },
    {
      title: t('navbar.useful_resources'),
      to: '/violations',
      dropdown: true,
      items: [
        {
          label: t('navbar.news'),
          to: '/violations'
        },
        {
          label: t('navbar.announcements'),
          to: '/announcements'
        },
        {
          label: t('navbar.handouts'),
          to: '/handouts'
        }
      ]
    }
  ];

  const changeLanguage = (lng) => {
    const currentPath = location.pathname;
    const pathWithoutLang = currentPath.replace(/^\/(uz|ru|en)/, '');

    i18n.changeLanguage(lng);
    setIsLangOpen(false); // Selectni yopish
    navigate(`/${lng}${pathWithoutLang}`, { replace: true });
    window.location.reload(); // Sahifani qayta yuklash
  };

  const toggleMobileDropdown = (index) => {
    setActiveMobileDropdown(activeMobileDropdown === index ? null : index);
  };

  // Update language buttons to use current language
  const languageOptions = [
    {
      code: 'uz', label: 'O\'ZB'
    },
    {
      code: 'ru', label: 'РУС'
    },
    {
      code: 'en', label: 'ENG'
    }
  ];

  // Helper function to get current language label
  const getCurrentLanguageLabel = () => {
    const currentLang = i18n.language;
    const option = languageOptions.find(opt => opt.code === currentLang);
    return option ? option.label : 'O\'ZB'; // default to O'ZB if not found
  };

  const renderAuthButton = () => {
    if (user) {
      return (
        <Link to={getLocalizedPath('/profile')} className="hidden md:block">
          <div className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
            <User className="h-6 w-6" />
            <span className="text-sm">{user.name || 'Profile'}</span>
          </div>
        </Link>
      );
    }
    return (
      <Link to={getLocalizedPath('/login')} className="hidden md:block">
        <button className="bg-blue-900 text-white px-6 py-2 rounded text-sm">
          {t('login')}
        </button>
      </Link>
    );
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
        {/* Top Bar */}
        <div className="border-b">
          <div className="container mx-auto">
            <div className="flex items-center justify-between h-16">
              {/* Logo and Title */}
              <div className="flex items-center space-x-4">
                <Link to={getLocalizedPath('/')} className="flex items-center space-x-2">
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
                    <img src={`/flags/${i18n.language}.png`} alt={i18n.language} className={` ${i18n.language == "uz" ? "w-5 h-5" : "w-8 h-6"}`} />
                    <span>{getCurrentLanguageLabel()}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {isLangOpen && (
                    <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg z-50">
                      {languageOptions.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            changeLanguage(lang.code);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${i18n.language === lang.code ? 'bg-gray-100' : ''
                            }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {renderAuthButton()}

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
          <div className="container mx-auto">
            <div className="flex items-center justify-between h-14">
              <nav className="flex space-x-10">
                {menuItems.map((item, index) => (
                  <div key={index} className="relative group">
                    {item.dropdown ? (
                      <div className="flex items-center space-x-1 py-2 text-gray-700 hover:text-blue-600 cursor-pointer">
                        <span>{item.title}</span>
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    ) : (
                      <Link
                        to={getLocalizedPath(item.to)}
                        className="flex items-center space-x-1 py-2 text-gray-700 hover:text-blue-600"
                      >
                        <span>{item.title}</span>
                      </Link>
                    )}
                    {item.dropdown && (
                      <div className="absolute hidden group-hover:block w-64 left-0 top-full bg-white shadow-lg rounded-md overflow-hidden z-50">
                        {item.items.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={getLocalizedPath(subItem.to)}
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

                  <img src={`/flags/${i18n.language}.png`} alt={i18n.language} className={` ${i18n.language == "uz" ? "w-5 h-5" : "w-8 h-6"}`} />
                  <span>{getCurrentLanguageLabel()}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isLangOpen && (
                  <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg z-50">
                    {languageOptions.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${i18n.language === lang.code ? 'bg-gray-100' : ''
                          }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Navigation Items */}
            <nav className="space-y-4">
              {menuItems.map((item, index) => (
                <div key={index} className="border-b pb-2">
                  {item.dropdown ? (
                    <button
                      onClick={() => toggleMobileDropdown(index)}
                      className="flex items-center justify-between w-full py-2 text-gray-700"
                    >
                      <span>{item.title}</span>
                      <ChevronDown className={`h-4 w-4 transform transition-transform duration-200 ${activeMobileDropdown === index ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link
                      to={getLocalizedPath(item.to)}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between w-full py-2 text-gray-700"
                    >
                      {item.title}
                    </Link>
                  )}
                  {item.dropdown && activeMobileDropdown === index && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.items.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={getLocalizedPath(subItem.to)}
                          onClick={() => setIsMobileMenuOpen(false)}
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
            {!user ? (
              <Link to={getLocalizedPath('/login')}>
                <button className="w-full bg-blue-900 text-white px-6 py-2 rounded text-sm">
                  {t('login')}
                </button>
              </Link>
            ) : (
              <Link to={getLocalizedPath('/profile')} className="flex items-center space-x-2 px-4 py-2 text-gray-700">
                <User className="h-6 w-6" />
                <span>{user.name || 'Profile'}</span>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-30 md:h-32"></div>
    </>
  );
};

export default Navbar;