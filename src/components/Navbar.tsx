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
      <div className="flex justify-between p-5 border-b border-gray-400 bg-blue-50/30">
        <div className="flex gap-5 items-center">
          <Link to="/">
            <img
              src="/graylogo.png"
              alt="StudyShare logo"
              className="h-8 w-auto mr-2 inline-block"
            />
            <h1 className="text-2xl font-bold inline-block align-middle">
              StudyShare
            </h1>
          </Link>
          <Link to="/programs" className="">
            {t("programs")}
          </Link>
          <Link to={checkLocalStorage()} className="">
            {t("courses")}
          </Link>
        </div>
        <div className="flex items-center gap-3">
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
