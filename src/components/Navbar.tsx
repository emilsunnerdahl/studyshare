import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabaseClient";

import { Button } from "./Button";

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation(); // ✨ CHANGED: we'll use this to hide the Profile button on the Profile page

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
      <div className="flex justify-between p-5 border-b border-gray-400">
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

        {/* ✨ CHANGED: wrap right-side actions so we can show both Profile and Sign out */}
        <div className="flex items-center gap-3">
          {" "}
          {/* ✨ CHANGED */}
          {user ? (
            <>
              {/* ✨ CHANGED: show a Profile button if we're not already on /profile */}
              {location.pathname !== "/profile" && ( // ✨ CHANGED
                <Button onClick={() => navigate("/profile")}>
                  {" "}
                  {/* ✨ CHANGED */}
                  {/* If you prefer i18n: t("profile", { defaultValue: "Profile" }) */}
                  {t("profile")}
                </Button>
              )}
              <Button onClick={handleSignOut}>{t("Sign out")}</Button>
            </>
          ) : (
            <Button onClick={() => navigate("/auth")}>{t("signIn")}</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
