import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Button } from "../Button"
import { useAuth } from "@/hooks/useAuth"

export default function Hero() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { user } = useAuth()

    const handleClick = () => {
        const programCode = localStorage.getItem("program_code");
        if (programCode) {
            navigate(`/programs/${programCode}`);
            return;
        }
        navigate("/programs");
    };

    return (
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
    )
}