import { useTranslation } from "react-i18next";
import { Button } from "../components/Button";
import InfoCard from "../components/InfoCard";

const About = () => {
  const { t } = useTranslation();

  return (
    <main className="flex flex-col items-center">
      <section className="w-full max-w-6xl px-6 py-20 space-y-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
          {t("aboutUsTitle") || "Who we are"}
        </h1>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto">
          {t("aboutUsDesc") ||
            "We are two Computer Science students at Lund University (LTH) who wanted to make it easier for students to navigate course choices."}
        </p>
      </section>

      <section className="w-full max-w-6xl px-6 py-20 space-y-6 bg-gray-50 text-center rounded-4xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {t("aboutSiteTitle") || "What is StudyShare?"}
        </h2>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto">
          {t("aboutSiteDesc") ||
            "StudyShare is a student-driven platform for finding and sharing reviews of university courses across Sweden. Our goal is to improve transparency and help you make more informed academic choices."}
        </p>
      </section>

      <section className="w-full max-w-6xl px-6 py-20 bg-white space-y-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          {t("howItWorksTitle") || "How it works"}
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          <InfoCard
            title={t("browseCourses") || "Browse Courses"}
            description={
              t("browseDesc") ||
              "Search for your university courses and read honest reviews from other students."
            }
          />
          <InfoCard
            title={t("writeReviews") || "Write Reviews"}
            description={
              t("writeDesc") ||
              "Share your experience anonymously to help others make informed choices."
            }
          />
          <InfoCard
            title={t("saveCourses") || "Save Favorites"}
            description={
              t("saveDesc") ||
              "Bookmark useful courses to revisit later or compare options."
            }
          />
        </div>
      </section>

      <section className="w-full px-6 py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center space-y-6 rounded-4xl">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          {t("readyToStart") || "Ready to find your next great course?"}
        </h2>
        <Button>{t("signUpNow") || "Sign up now"}</Button>
      </section>
    </main>
  );
};

export default About;
