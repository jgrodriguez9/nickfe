import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import intervalPlural from 'i18next-intervalplural-postprocessor'
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from './localization/en'
import es from './localization/es'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(intervalPlural)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      es: { translation: es },
      en: { translation: en }
    },
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

export default i18n