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
            landingTitle: "Discover and evaluate courses together",
            landingDesc:
                "StudyShare is a platform where students can review courses anonymously – so you can make informed decisions",
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
            landingTitle: "Upptäck och utvärdera kurser tillsammans",
            landingDesc:
                "StudyShare är en plattform där studenter kan recensera kurser anonymt - så att du kan fatta välgrundade beslut",
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
