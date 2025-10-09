import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer>
            <div className="flex justify-between p-5 border-t border-gray-400 text-gray-500">
                <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full border border-gray-300">
                    <p>{t("madeBy")}</p>
                </div>

                <div className="flex items-center gap-10">
                    <Link to="/about" className="">
                        {t("about")}
                    </Link>
                    <Link to="/contact" className="">
                        {t("contact")}
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
