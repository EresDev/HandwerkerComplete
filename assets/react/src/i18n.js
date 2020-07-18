import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import common_de from "./translations/de/common.json";
import common_en from "./translations/en/common.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        common: common_en
      },
      de: {
        common: common_de
      },
    },
    lng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;