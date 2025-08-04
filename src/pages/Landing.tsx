import { useTranslation } from "react-i18next";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { BookOpen, Users, Star, ArrowRight, Github } from "lucide-react";

const Landing = () => {
    const { t } = useTranslation();

    return (
        <main className="flex flex-col items-center m-10">
            <h1 className="mt-5 text-4xl text font-bold">
                {t("landingTitle")}
            </h1>
            <p className="m-5">{t("landingDesc")}</p>
            <div className="flex gap-10 m-5">
                <Button>{t("courses")}</Button>
                <Button>{t("signIn")}</Button>
            </div>
        </main>
    );
};

export default Landing;
