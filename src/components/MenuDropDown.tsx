import { useState, useRef, useEffect } from "react";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function MenuDropDown() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const checkLocalStorage = () => {
    const programCode = localStorage.getItem("program_code");
    if (programCode) {
      return `/programs/${programCode}`;
    }
    return "/programs";
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left">
      <button
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
        className={`absolute right-0 mt-2 w-40 origin-top-right rounded-xl border border-gray-200 
                    bg-white text-gray-700 shadow-lg p-2 transform transition duration-150 
                    ${
                      open
                        ? "scale-100 opacity-100 pointer-events-auto"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
      >
        <div className="flex flex-col">
          <Link to="/programs">{t("programs")}</Link>
          <Link to={checkLocalStorage()}>{t("courses")}</Link>
        </div>
      </div>
    </div>
  );
}
