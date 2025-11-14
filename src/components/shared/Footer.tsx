import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="flex items-center justify-between gap-20 p-5 border-t border-gray-400 text-gray-500">
        <span className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full">
          {t("madeBy")}
        </span>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-10">
          <Link to="/about" className="">
            {t("about")}
          </Link>
          <Link to="/contact" className="">
            {t("contact")}
          </Link>
          <Link to="/terms" className="">
            {"Terms"}
          </Link>
          <Link to="/privacy" className="">
            {"Privacy"}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
