import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonUZ from '../locales/uz/common.json';
import commonRU from '../locales/ru/common.json';
import commonENG from '../locales/en/common.json';


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      uz: {
        common: commonUZ,
      },
      ru: {
        common: commonRU,
      },
      en: {
        common: commonENG,
      },
    },
    fallbackLng: 'uz',
    debug: process.env.NODE_ENV === 'development',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;