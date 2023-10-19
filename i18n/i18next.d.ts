import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
        defaultNS: "trans",
        fallbackLng: "en",
        debug: true,
        whitelist: ["en", "ar", "ru"],
        languages: ["en", "ar", "ru"],
        lng: "en",
        backend: {
            loadPath: `${process.env.NEXT_PUBLIC_URL}dictionaries/{{lng}}.json`,
            //   addPath: `${process.env.NEXT_PUBLIC_URL}locales/add/{{lng}}/{{ns}}`,
        },
        interpolation: {
            escapeValue: false,
        },
        react: { useSuspense: true },
    });

export default i18n;
