import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabaseClient";
import { usePrograms } from "@/hooks/usePrograms";

const Programs = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: programs, isLoading, error } = usePrograms();

  const handleClick = (program_code: string) => {
    localStorage.setItem("program_code", program_code);
    navigate(`/programs/${program_code}`);
  };

  return (
    <main className="flex flex-col items-center w-full sm:px-6 py-10 space-y-12">
      <header className="text-center max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          {t("programsTitle") || "Programs"}
        </h1>
      </header>

      {isLoading ? (
        <p className="text-gray-600">{t("loading") || "Loading..."}</p>
      ) : (
        <section className="w-full max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {programs?.map((p) => (
              <button
                key={p.id}
                onClick={() => handleClick(p.program_code)}
                className="p-5 text-left rounded-2xl border-4 border-gray-300 bg-white shadow-sm hover:border-[var(--hoverColor)] hover:shadow-lg w-full hover:cursor-pointer hover:bg-[var(--hoverColor)]/30"
                style={
                  {
                    ["--hoverColor" as any]: p.color_code,
                  } as React.CSSProperties
                }
              >
                <div className="text-lg font-semibold">{p.name}</div>
                <div className="text-sm text-gray-500">View courses</div>
              </button>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Programs;
