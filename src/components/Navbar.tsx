import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button } from "./Button";

const Navbar = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <header>
            <div className="flex justify-between p-5 border-b border-gray-400">
                <div className="flex gap-5 items-center">
                    <Link to="/">
                        <h1 className="text-2xl font-bold">StudyShare</h1>
                    </Link>
                    <Link to="/courses" className="">
                        {t("courses")}
                    </Link>
                </div>

                <div>
                    <Button onClick={() => navigate("/auth")}>
                        {t("signIn")}
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
