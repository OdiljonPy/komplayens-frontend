import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from "../assets/logos/logo.png";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

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
          to: '/news',
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
        <div className="hidden lg:grid grid-cols-5 gap-8 text-sm max-w-5xl mx-auto">
          {/* First Row */}
          <div className="text-start">
            <Link to={getLocalizedPath('/training-courses')} className="block hover:text-blue-400 mb-4">
              {t('navbar.training_courses')}
            </Link>
          </div>
          <div className="text-start">
            <Link to={getLocalizedPath('/news')} className="block hover:text-blue-400 mb-4">
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
      </div>
    </footer>
  );
};

export default Footer;