import { useTranslation } from "react-i18next";
import HowItWorks from "@/components/landing/howItWorks";
import CTA from "../../components/landing/cta";
import AboutSite from "@/components/about/aboutSiteDesc";
import { useAuth } from "@/hooks/useAuth";
import AboutUs from "@/components/about/aboutUs";

const About = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <main className="flex flex-col items-center">
      <AboutUs />

      <AboutSite />

      <HowItWorks />

      {!user && <CTA />}
    </main>
  );
};

export default About;
