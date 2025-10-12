import * as React from "react";
import { Search } from "lucide-react";

/**
 * ProgramHeader – modern hero/header med färgbar, konturerad titel + sökfält.
 *
 * Props
 * - title: huvudrubriken (ex. "B – Bioteknik")
 * - subtitle: rad under titeln (ex. programCoursesDesc)
 * - placeholder: placeholder i sökfältet
 * - accent: HEX-färg som fyller titeln (ex. "#FFD600")
 * - background: valfri HEX/gradient för bakgrund (annars auto)
 * - onSearch: callback när användaren skriver/submitar
 * - defaultValue: initial text i sökfältet
 * - showSearch: visa/dölj sökfältet (default: true)
 */
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
            background:
                "#FFFFFF",
        };

    React.useEffect(() => {
        if (onSearch) {
            onSearch(value);
        }
    }, [value, onSearch]);

    const OutlinedTitle = ({ title }: { title: string }) => (
        <svg viewBox="0 0 100 20" className="w-full h-auto">
            <text
                x="50%"               // Center horizontally
                y="50%"               // Center vertically
                textAnchor="middle"   // Align the text's center to x
                dominantBaseline="middle" // Align vertically to y
                fontSize="10"
                fontWeight="900"
                fill="var(--accent)"
                stroke="var(--stroke)"
                strokeWidth="0.6"
                strokeLinejoin="round"
                paintOrder="stroke fill"
                style={{ letterSpacing: "-0.02em" }}

            >
                {title}
            </text>
        </svg>
    );


    return (
        <section
            className="w-full"
            style={cssVars}
        >
            <div
                className="relative isolate"
                style={bgStyle}
            >
                {/* Dekorativ grid/bling */}
                <div className="pointer-events-none absolute inset-0 opacity-[.08] [mask-image:radial-gradient(60%_60%_at_50%_20%,black,transparent)]">
                    <svg
                        aria-hidden
                        className="h-full w-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20 text-center">
                    <OutlinedTitle title={title} />

                    {subtitle && (
                        <p className="mt-4 text-[clamp(14px,2.5vw,22px)] font-semibold text-[color:var(--text)]/90">
                            {subtitle}
                        </p>
                    )}

                    {showSearch && (
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2" aria-hidden>
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



