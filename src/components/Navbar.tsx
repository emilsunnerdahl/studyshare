import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabaseClient";

import { Button } from "./Button";
import ProfileDropDown from "./ProfileDropDown";

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  //const location = useLocation();

  const { user } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const checkLocalStorage = () => {
    const programCode = localStorage.getItem("program_code");
    if (programCode) {
      return `/programs/${programCode}`;
    }
    return "/programs";
  };

  return (
    <header>
      <div className="flex justify-between sm:grid sm:grid-cols-3 sm:items-center p-2 sm:p-5 sm:mx-30">
        <div className="justify-self-start flex gap-5 items-center">
          <Link to="/">
            <img
              src="/graylogo.png"
              alt="StudyShare logo"
              className="h-8 w-auto mr-2 inline-block"
            />
            <h1 className="text-2xl font-bold hidden sm:inline-block align-middle">
              StudyShare
            </h1>
          </Link>
        </div>
        <div className="justify-self-center flex items-center">
          <Link
            to="/programs"
            className="hover:bg-gray-100 transition-colors duration-300  rounded-xl py-2 px-2 sm:px-5"
          >
            {t("programs")}
          </Link>
          <Link
            to={checkLocalStorage()}
            className="hover:bg-gray-100 transition-colors duration-300 py-2 rounded-xl px-2 sm:px-5"
          >
            {t("courses")}
          </Link>
        </div>
        <div className="justify-self-end flex items-center gap-3">
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
