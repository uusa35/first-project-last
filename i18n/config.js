import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    // defaultNS: "translation",
    fallbackLng: "en",
    debug: false,
    whitelist: ["en", "ar"],
    lng: "en",
    backend: {
      loadPath: `${process.env.NEXT_PUBLIC_URL}dictionaries/{{lag}}.json?lng={{lng}}&{{lng}}`,
      //   addPath: `${process.env.NEXT_PUBLIC_URL}locales/add/{{lng}}/{{ns}}`,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
