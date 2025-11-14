import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NotFound = () => {
    const { t } = useTranslation();

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
            <h1 className="text-6xl font-extrabold text-indigo-600 mb-4">
                404
            </h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Page not found
            </h2>
            <p className="text-gray-600 mb-6">{t("notFoundText")}</p>
            <Link
                to="/"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md transition"
            >
                {t("backToHome")}
            </Link>
        </main>
    );
};

export default NotFound;
