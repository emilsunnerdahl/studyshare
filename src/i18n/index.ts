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
            aboutUsTitle: "Who we are",
            aboutUsDesc:
                "We are two Computer Science students at Lund University (LTH) who wanted to make it easier for students to navigate course choices.",
            aboutSiteTitle: "What is StudyShare?",
            aboutSiteDesc:
                "StudyShare is a student-driven platform for finding and sharing reviews of university courses across Sweden. Our goal is to improve transparency and help you make more informed academic choices.",
            contactTitle: "Get in touch",
            contactDesc:
                "Have questions or suggestions? Fill in the form and we'll get back to you!",
            nameLabel: "Your name",
            emailLabel: "Your email",
            messageLabel: "Your message",
            sendMessage: "Send message",
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
            aboutUsTitle: "Vilka är vi",
            aboutUsDesc:
                "Vi är två studenter på datateknik på LTH som vill göra det lättare för studenter att navigera i valet av specialiseringskurser.",
            aboutSiteTitle: "Vad är StudyShare?",
            aboutSiteDesc:
                "StudyShare är en studentdriven plattform med fokus på recensioner av kurser för att studenter ska göra ett informerat val av specialiseringskurser på LTH.",
            contactTitle: "Kontakta oss",
            contactDesc:
                "Har du frågor eller förslag? Fyll i formuläret så återkommer vi snart!",
            nameLabel: "Ditt namn",
            emailLabel: "Din mail",
            messageLabel: "Ditt meddelande",
            sendMessage: "Skicka meddelande",
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
