import { User, Settings, LogOut } from "lucide-react";
import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabaseClient";


export default function ProfileDropdown() {
    const [open, setOpen] = useState<boolean>(false);
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    // Wait for auth to load

    const name = user?.user_metadata?.full_name ?? "";
    const email = user?.email ?? "";

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    // Close on outside click
    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (!menuRef.current || !btnRef.current) return;

            if (
                !menuRef.current.contains(e.target as Node) &&
                !btnRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, []);

    // Basic keyboard handling
    function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
        if (e.key === "Escape") setOpen(false);
    }

    return (
        <div
            ref={rootRef}
            className="relative flex items-center justify-end w-full pr-4"
            onKeyDown={onKeyDown}
        >
            <button
                type="button"
                ref={btnRef}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-controls="profile-menu"
                onClick={() => setOpen((v) => !v)}
                className={`
                    group inline-flex items-center justify-center p-1 rounded-full 
                    bg-transparent focus:outline-none 
                    transition-all duration-150 ease-in-out
                    hover:bg-gray-200 hover:scale-105
                `}
            >
                <ProfileIcon />
            </button>

            <div
                ref={menuRef}
                id="profile-menu"
                role="menu"
                aria-label="Profile menu"
                aria-hidden={!open}
                className={`absolute right-0 top-[48px] z-50 w-64 rounded-xl border border-gray-200 
                bg-white text-gray-700 shadow-lg p-2 transform transition duration-150 origin-top-right 
                ${open ? "scale-100 opacity-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
            >
                <div className="flex items-center gap-3 px-2 py-2">
                    <ProfileIcon />
                    <div className="grid">
                        <span className="text-sm font-medium leading-tight text-gray-800">
                            {name}
                        </span>
                        <span className="text-xs text-gray-500">
                            {email}
                        </span>
                    </div>
                </div>

                <div className="my-1 h-px bg-gray-200" />

                <MenuItem
                    name={t("profile")}
                    icon={<User className="h-4 w-4" />}
                    onClick={() => navigate("/profile")}
                />
                {/* <MenuItem
                    name="Settings"
                    icon={<Settings className="h-4 w-4" />}
                /> */}
                <MenuItem
                    name={t("Sign out")}
                    icon={<LogOut className="h-4 w-4" />}
                    onClick={handleSignOut}
                />
            </div>
        </div>
    );
}

interface ProfileIconProps {
    url?: string;
}

function ProfileIcon({ url }: ProfileIconProps) {
    return (
        <span
            className="p-1 rounded-full bg-gray-100 border border-gray-300"
            aria-hidden="true"
        >
            {url ? (
                <img
                    src={url}
                    alt="User avatar"
                    className="h-8 w-8 rounded-full object-cover"
                />
            ) : (
                <User className="w-6 h-6 text-gray-700" />
            )}
        </span>
    );
}

interface MenuItemProps {
    name: string;
    icon: React.ReactNode;
    onClick?: () => void;
}

function MenuItem({ name, onClick, icon }: MenuItemProps) {
    return (
        <button
            type="button"
            role="menuitem"
            tabIndex={0}
            onClick={onClick}
            className="flex w-full items-center gap-2 rounded-md px-2 py-2 
                       hover:bg-gray-100 hover:text-gray-900 
                       transition duration-100 text-left"
        >
            {icon}
            {name}
        </button>
    );
}
