import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { Globe } from "lucide-react";
import MenuDropDown from "./MenuDropDown";
import { Button } from "./Button";
import ProfileDropDown from "./ProfileDropDown";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const buttonStyles =
    "hover:bg-gray-100 transition-colors duration-300 py-2 rounded-xl px-2 sm:px-5 cursor-pointer";

  const checkLocalStorage = () => {
    const programCode = localStorage.getItem("program_code");
    if (programCode) {
      return `/programs/${programCode}`;
    }
    return "/programs";
  };

  const changeLanguage = () => {
    const newLang = i18n.language === "sv" ? "en" : "sv";
    i18n.changeLanguage(newLang);
  };

  return (
    <header>
      <div className="flex justify-between md:grid md:grid-cols-3 md:items-center p-2 sm:p-5 md:mx-30">
        <div className="block md:hidden">
          <MenuDropDown changeLanguage={changeLanguage} />
        </div>
        <div className="justify-self-start flex gap-5 items-center">
          <Link to="/">
            <img
              src="/graylogo.png"
              alt="StudyShare logo"
              className="h-8 w-auto mr-2 inline-block"
            />
            <h1 className="text-lg sm:text-2xl font-bold inline-block align-middle">
              StudyShare
            </h1>
          </Link>
        </div>
        <div className="justify-self-center hidden md:flex items-center">
          <Link to="/programs" className={buttonStyles}>
            {t("programs")}
          </Link>
          <Link to={checkLocalStorage()} className={buttonStyles}>
            {t("courses")}
          </Link>
        </div>
        <div className="justify-self-end flex items-center gap-3">
          <button
            className={`${buttonStyles} hidden md:flex gap-2`}
            onClick={changeLanguage}
          >
            <Globe />
            {i18n.language === "en" ? "English" : "Svenska"}
          </button>
          {user ? (
            <ProfileDropDown />
          ) : (
            <Button onClick={() => navigate("/auth")}>{t("signIn")}</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
