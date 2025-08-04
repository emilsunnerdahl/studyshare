import { useTranslation } from "react-i18next";
import { Button } from "../components/Button";

// 💡 Flytta gärna till components/
const InfoCard = ({
    title,
    description,
}: {
    title: string;
    description: string;
}) => (
    <div className="bg-white border-t-4 border-indigo-500 rounded-xl shadow-md p-6 flex-1 transition hover:shadow-xl">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

const TestimonialCard = ({
    quote,
    author,
}: {
    quote: string;
    author: string;
}) => (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-left flex-1">
        <p className="italic text-gray-700 mb-2">"{quote}"</p>
        <p className="text-sm text-gray-600 font-medium">– {author}</p>
    </div>
);

const Landing = () => {
    const { t } = useTranslation();

    return (
        <main className="flex flex-col items-center">
            {/* 🎯 Hero Section */}
            <section className="w-full bg-gray-100 px-6 sm:px-8 md:px-12 py-20 text-center space-y-6">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
                    {t("landingTitle")}
                </h1>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    {t("landingDesc")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button>{t("courses")}</Button>
                    <Button>{t("signIn")}</Button>
                </div>
            </section>

            {/* 💡 How It Works Section */}
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

            {/* 💬 Testimonials Section */}
            <section className="w-full max-w-6xl px-6 py-20 bg-gray-50 space-y-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-center">
                    {t("testimonialsTitle") || "What students say"}
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

            {/* 🚀 Call to Action Section */}
            <section className="w-full px-6 py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center space-y-6">
                <h2 className="text-2xl sm:text-3xl font-semibold">
                    {t("readyToStart") ||
                        "Ready to find your next great course?"}
                </h2>
                <Button>{t("signUpNow") || "Sign up now"}</Button>
            </section>
        </main>
    );
};

export default Landing;
