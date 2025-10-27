import { useTranslation } from "react-i18next";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import InfoCard from "../components/InfoCard";
import TestimonialCard from "../components/TestimonialCard";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabaseClient";
import CTA from "../components/landing/cta";

const Landing = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleClick = () => {
    const programCode = localStorage.getItem("program_code");
    if (programCode) {
      navigate(`/programs/${programCode}`);
      return;
    }
    navigate("/programs");
  };

  return (
    <>
      <main className="flex flex-col items-center">
        <section
          className="w-full 
                 bg-[linear-gradient(45deg,rgba(191,217,255,1)_0%,rgba(245,247,250,1)_44%,rgba(191,217,255,1)_80%)]
                 px-6 sm:px-8 md:px-12 py-20 text-center space-y-6 rounded-4xl"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            {t("landingTitle")}
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {t("landingDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => handleClick()}>{t("courses")}</Button>
            {!user && (
              <Button onClick={() => navigate("/auth")}>{t("signIn")}</Button>
            )}
          </div>
        </section>

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

        <section className="w-full max-w-6xl px-6 py-20 bg-gray-50 space-y-10 rounded-4xl mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">
            {t("testimonialsTitle")}
          </h2>
          <div className="flex flex-col md:flex-row gap-6">
            <TestimonialCard
              quote="StudyShare helped me choose electives that actually matched my interests!"
              author="Anna, KTH"
            />
            <TestimonialCard
              quote="I finally avoided a boring course thanks to a review someone posted."
              author="Erik, Lund University"
            />
            <TestimonialCard
              quote="The platform is clean, simple, and useful. Love the anonymity!"
              author="Sara, Chalmers"
            />
          </div>
        </section>

        {!user && <CTA />}
      </main>
    </>
  );
};

export default Landing;
