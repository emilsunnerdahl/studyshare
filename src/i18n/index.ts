import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation resources
const resources = {
    en: {
        translation: {
            welcome: "Welcome",
            courses: "Courses",
            signIn: "Sign In",
            about: "About",
            contact: "Contact",
            madeBy: "Made by students, for students.",
        },
    },
    sv: {
        translation: {
            welcome: "Välkommen",
            courses: "Kurser",
            signIn: "Logga in",
            about: "Om",
            contact: "Kontakt",
            madeBy: "Gjord av studenter, för studenter.",
        },
    },
};

i18n.use(LanguageDetector) // auto-detect browser language
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "sv",
        lng: "sv", // this sets the language to swedish as default
        interpolation: {
            escapeValue: false, // React already escapes
        },
    });

export default i18n;
