import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProgramHeader from "../components/Search";
import Specialisations from "@/components/Specialisations";
import CourseCard from "@/components/CourseCard";
import { useProgram } from "@/hooks/useProgram";

const Program = () => {
  const { t } = useTranslation();
  const { program: programCodeParam } = useParams<{ program: string }>();
  const [query, setQuery] = useState("");
  const { data, isLoading, error } = useProgram(programCodeParam ?? "");

  if (isLoading) {
    return (
      <main className="p-10 text-center">
        <p className="text-gray-600">{t("loading") || "Loading..."}</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="p-10 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {t("programNotFound") || "Program not found"}
        </h1>
        <p className="text-gray-600 mt-2">
          {t("programNotFoundDesc") ||
            "We couldn't find that program. Try another from the Programs page."}
        </p>
      </main>
    );
  }

  const { specialisations, programName, programCode, colorCode } = data ?? {};

  const filtered = query
    ? Array.from(
        new Map(
          specialisations
            .flatMap((spec) => spec.courses)
            .map((course) => [course.code, course]) // key by code
        ).values()
      ).filter(
        (course) =>
          course.name.toLowerCase().includes(query.toLowerCase().trim()) ||
          course.code.toLowerCase().includes(query.toLowerCase().trim())
      )
    : [];

  return (
    <main className="flex flex-col items-center w-full px-6 py-10">
      <ProgramHeader
        title={programName}
        placeholder="Sök kurs…"
        accent={colorCode}
        onSearch={(q) => setQuery(q)}
      />

      <div className="flex flex-wrap gap-4 w-full">
        {filtered.map((course) => (
          <CourseCard
            rating={5}
            key={`filtered - ${course.code}`}
            programCode={programCode}
            colorCode={colorCode}
            {...course}
          />
        ))}
        {filtered.length == 0 && query != "" && <p>{t("searchResult")}</p>}
      </div>

      {specialisations.map((spec, id) => (
        <section key={id} className="w-full max-w-7xl m-3 p-3 rounded-2xl">
          <Specialisations
            spec={spec}
            programCode={programCode}
            colorCode={colorCode}
          />
        </section>
      ))}
    </main>
  );
};

export default Program;
