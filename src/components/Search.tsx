import * as React from "react";
import { Search } from "lucide-react";

export interface ProgramHeaderProps {
    title: string;
    subtitle?: string;
    placeholder?: string;
    accent?: string; // HEX
    background?: string; // HEX eller CSS-gradient
    onSearch?: (value: string) => void;
    defaultValue?: string;
    showSearch?: boolean;
}

const DEFAULTS = {
    accent: "#FFD600", // gul
};

export default function ProgramHeader({
    title,
    subtitle = "",
    placeholder = "Sök kurs…",
    accent = DEFAULTS.accent,
    background,
    onSearch,
    defaultValue = "",
    showSearch = true,
}: ProgramHeaderProps) {
    const [value, setValue] = React.useState(defaultValue);

    // CSS-variabler så att designen kan tematiseras utifrån props
    const cssVars = {
        "--accent": accent,
        "--stroke": "#000000",
        "--text": "#0F1222",
        "--muted": "#6B7280",
        "--card": "#FFFFFF",
    } as React.CSSProperties & Record<string, string>;

    const bgStyle: React.CSSProperties = background
        ? { background }
        : {
            background: "#FFFFFF",
        };

    React.useEffect(() => {
        if (onSearch) {
            onSearch(value);
        }
    }, [value, onSearch]);

    const OutlinedTitle = ({ title }: { title: string }) => (
        <h1
            className="text-4xl sm:text-5xl font-black mb-2"
            style={{
                WebkitTextStroke: "2px var(--stroke)",
                color: "var(--accent)",
            }}
        >
            {title}
        </h1>
    );

    return (
        <section className="w-full" style={cssVars}>
            <div className="relative isolate" style={bgStyle}>
                <div className="mx-auto max-w-3xl px-6 py-5 sm:py-10 text-center">
                    <OutlinedTitle title={title} />

                    {subtitle && (
                        <p className="mt-4 text-[clamp(14px,2.5vw,22px)] font-semibold text-[color:var(--text)]/90">
                            {subtitle}
                        </p>
                    )}

                    {showSearch && (
                        <div className="relative">
                            <span
                                className="absolute left-3 top-1/2 -translate-y-1/2"
                                aria-hidden
                            >
                                <Search className="h-5 w-5 text-[color:var(--muted)]" />
                            </span>
                            <input
                                aria-label={placeholder}
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder={placeholder}
                                className="w-full rounded-2xl border border-[#E5E7EB] bg-[color:var(--card)] px-10 py-3 text-[color:var(--text)] shadow-sm outline-none transition focus:border-[#D1D5DB] focus:ring-2 focus:ring-[color:var(--accent)]/35"
                            />
                            {/* Subtle accent glow */}
                            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
