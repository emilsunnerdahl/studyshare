import { useTranslation } from "react-i18next";
import InfoCard from "./InfoCard";
import { Heart } from "lucide-react";
import { Compass, Edit3, Bookmark } from "lucide-react";

export default function HowItWorks() {
  const { t } = useTranslation();

  return (
    <section className="w-full max-w-6xl px-6 py-10 sm:py-20 bg-white space-y-10 rounded-4xl sm:mt-10 sm:mb-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center">
        {t("howItWorksTitle")}
      </h2>
      <div className="flex flex-col md:flex-row gap-6">
        <InfoCard
          title={t("browseCourses")}
          description={t("browseDesc")}
          Icon={Compass}
        />
        <InfoCard
          title={t("writeReviews")}
          description={t("writeDesc")}
          Icon={Edit3}
        />
        <InfoCard
          title={t("saveCourses")}
          description={t("saveDesc")}
          Icon={Bookmark}
        />
      </div>
    </section>
  );
}
