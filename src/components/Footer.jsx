import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from "../assets/logos/logo.png";
import footer_logo from "../assets/logos/footer_logo.png";

const Footer = () => {
  const { t, i18n } = useTranslation();

  // Add helper function to handle link paths
  const getLocalizedPath = (path) => {
    return `/${i18n.language}${path}`;
  };

  const menuItems = [
    {
      items: [
        {
          to: '/training-courses',
          label: t('navbar.training_courses')
        },
        {
          to: '/electronic-library',
          label: t('navbar.electronic_library')
        },
        {
          to: '/corruption-risks',
          label: t('navbar.corruption_risks')
        }
      ]
    },
    {
      items: [
        {
          to: '/xabar-berish',
          label: t('navbar.report')
        },
        {
          to: '/benefits',
          label: t('navbar.conflict_of_interest')
        }
      ]
    },
    {
      items: [
        {
          to: '/operations',
          label: t('navbar.practice')
        },
        {
          to: '/compliance',
          label: t('navbar.compliance_officers')
        }
      ]
    },
    {
      items: [
        {
          to: '/status',
          label: t('navbar.integrity_test')
        }
      ]
    },
    {
      items: [
        {
          to: '/violations',
          label: t('navbar.news')
        },
        {
          to: '/announcements',
          label: t('navbar.announcements')
        },
        {
          to: '/handouts',
          label: t('navbar.handouts')
        }
      ]
    }
  ];

  return (
    <footer className="bg-[#2A2A2A] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <Link to={getLocalizedPath('/')}>
            <img src={logo} alt="Logo" className="h-12 mb-4" />
          </Link>
          <h2 className="text-center text-xl font-medium max-w-md">
            {t('platform_title_1')}
          </h2>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:grid grid-cols-5 gap-1 text-sm  mx-auto">
          {/* First Row */}
          <div className="text-start">
            <Link to={getLocalizedPath('/training-courses')} className="block hover:text-blue-400 mb-4">
              {t('navbar.training_courses')}
            </Link>
          </div>
          <div className="text-start">
            <Link to={getLocalizedPath('/xabar-berish')} className="block hover:text-blue-400 mb-4">
              {t('navbar.report')}
            </Link>
          </div>
          <div className="text-start">
            <Link to={getLocalizedPath('/operations')} className="block hover:text-blue-400 mb-4">
              {t('navbar.practice')}
            </Link>
          </div>
          <div className="text-start">
            <Link to={getLocalizedPath('/status')} className="block hover:text-blue-400 mb-4">
              {t('navbar.integrity_test')}
            </Link>
          </div>
          <div className="text-start">
            <Link to={getLocalizedPath('/violations')} className="block hover:text-blue-400 mb-4">
              {t('navbar.news')}
            </Link>
          </div>

          {/* Second Row */}
          <div className="text-start">
            <Link to={getLocalizedPath('/corruption-risks')} className="block hover:text-blue-400">
              {t('navbar.corruption_risks')}
            </Link>
          </div>
          <div className="text-start">
            <Link to={getLocalizedPath('/benefits')} className="block hover:text-blue-400">
              {t('navbar.conflict_of_interest')}
            </Link>
          </div>
          <div className="text-start">
            <Link to={getLocalizedPath('/compliance')} className="block hover:text-blue-400">
              {t('navbar.compliance_officers')}
            </Link>
          </div>
          <div className="text-start">
            <Link to={getLocalizedPath('/announcements')} className="block hover:text-blue-400">
              {t('navbar.announcements')}
            </Link>
          </div>
          <div className="text-start">
            <Link to={getLocalizedPath('/handouts')} className="block hover:text-blue-400">
              {t('navbar.handouts')}
            </Link>
          </div>


        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden space-y-4 text-sm text-start">
          {menuItems.map((section, index) => (
            <div key={index} className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  to={getLocalizedPath(item.to)}
                  className="block hover:text-blue-400"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-between flex-col md:flex-row gap-2  w-full mx-auto mt-10">
          <span className="text-sm text-white">© 2024. Barcha huquqlar himoyalangan.</span>
          <div className="flex items-center flex-row gap-4">
            <span className="text-sm text-white">Powered by</span>
            <a href="https://zerodev.uz/" target="_blank" rel="noopener noreferrer">
              <img src={footer_logo} alt="footer_logo" className="h-4 w-24 mr-12" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;