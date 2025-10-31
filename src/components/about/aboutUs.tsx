import { useTranslation } from "react-i18next";

export default function AboutUs() {
    const { t } = useTranslation();

    return (
        <section className="w-full max-w-6xl px-6 py-20 space-y-6 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                {t("aboutUsTitle") || "Who we are"}
            </h1>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
                {t("aboutUsDesc") ||
                    "We are two Computer Science students at Lund University (LTH) who wanted to make it easier for students to navigate course choices."}
            </p>
        </section>
    );
}