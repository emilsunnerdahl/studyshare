import { useTranslation } from "react-i18next";

export default function AboutSite()  {
    const { t } = useTranslation();

    return (
        <section className="w-full max-w-6xl px-6 py-20 space-y-6 bg-gray-50 text-center rounded-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {t("aboutSiteTitle") || "What is StudyShare?"}
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
                {t("aboutSiteDesc") ||
                    "StudyShare is a student-driven platform for finding and sharing reviews of university courses across Sweden. Our goal is to improve transparency and help you make more informed academic choices."}
            </p>
        </section>
    );
}