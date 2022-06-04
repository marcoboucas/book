import i18n from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  // .use(LanguageDetector)
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    nonExplicitSupportedLngs: true,
    cleanCode: true,
    lowerCaseLng: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'i', 'strong', 'li', 'ul', 'ol', 'center'],
    },
    returnEmptyString: false,
  });

export default i18n;
