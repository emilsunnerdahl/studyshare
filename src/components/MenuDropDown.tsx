import { useState, useRef, useEffect } from "react";
import { Globe, Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

type Props = {
  changeLanguage: () => void;
};

export default function MenuDropDown({ changeLanguage }: Props) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const checkLocalStorage = () => {
    const programCode = localStorage.getItem("program_code");
    if (programCode) {
      return `/programs/${programCode}`;
    }
    return "/programs";
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Menu />
      </button>

      <div
        ref={menuRef}
        role="menu"
        aria-label="Explore menu"
        aria-hidden={!open}
        className={`absolute z-10 right-0 mt-2 w-40 origin-top-right rounded-xl border border-gray-200 
                    bg-white text-gray-700 shadow-lg p-2 transform transition duration-150 
                    ${
                      open
                        ? "scale-100 opacity-100 pointer-events-auto"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
      >
        <div className="flex text-xl flex-col">
          <Link className="p-2" to="/programs">
            {t("programs")}
          </Link>
          <Link className="p-2" to={checkLocalStorage()}>
            {t("courses")}
          </Link>
          <button
            className="flex p-2 items-center gap-2"
            onClick={changeLanguage}
          >
            {i18n.language === "en" ? "English" : "Svenska"}
            <Globe />
          </button>
        </div>
      </div>
    </div>
  );
}
