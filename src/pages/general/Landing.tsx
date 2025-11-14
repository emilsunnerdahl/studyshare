import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import TestimonialCard from "../components/TestimonialCard";
import { useAuth } from "@/hooks/useAuth";
import CTA from "../components/landing/cta";
import Hero from "../components/landing/hero";
import HowItWorks from "@/components/landing/howItWorks";

const Landing = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <>
      <main className="flex flex-col items-center">
        <Hero />

        <HowItWorks />

        {/* När vi har testimonials, lägg in här */}
        {/* <section className="w-full max-w-6xl px-6 py-20 bg-gray-50 space-y-10 rounded-4xl mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">
            {t("testimonialsTitle")}
          </h2>
          <div className="flex flex-col md:flex-row gap-6">
            <TestimonialCard quote="Lorem ipsum" author="x, LTH" />
            <TestimonialCard quote="Lorem ipsum" author="x, LTH" />
            <TestimonialCard quote="Lorem ipsum" author="x, LTH" />
          </div>
        </section> */}

        {!user && <CTA />}
      </main>
    </>
  );
};

export default Landing;
