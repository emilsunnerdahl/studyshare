import { useTranslation } from "react-i18next";
import InfoCard from "../InfoCard";

export default function HowItWorks() {
    const { t } = useTranslation();

    return (
        <section className="w-full max-w-6xl px-6 py-20 bg-white space-y-10 rounded-4xl mt-10 mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-center">
                {t("howItWorksTitle")}
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
                <InfoCard
                    title={t("browseCourses")}
                    description={t("browseDesc")}
                />
                <InfoCard title={t("writeReviews")} description={t("writeDesc")} />
                <InfoCard title={t("saveCourses")} description={t("saveDesc")} />
            </div>
        </section>
    )
}