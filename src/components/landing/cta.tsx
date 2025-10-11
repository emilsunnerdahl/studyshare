import { Button } from "../../components/Button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function cta() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <>
        {/* 🚀 Call to Action Section */}
            <section className="
                w-full 
                px-6 
                py-16 
                bg-[linear-gradient(90deg,rgba(191,207,219,1)_0%,rgba(59,101,217,1)_44%,rgba(52,90,207,1)_61%,rgba(89,126,235,1)_100%)]
                text-white text-center 
                space-y-6 rounded-4xl"
            >
                <h2 className="text-2xl sm:text-3xl font-semibold">
                    {t("readyToStart")}
                </h2>
                <Button onClick={() => navigate("/auth")}>
                    {t("signUpNow")}
                </Button>
            </section>
        </>
    )
}