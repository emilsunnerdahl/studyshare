import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabaseClient";
import CourseCard from "../components/CourseCard";
import ProgramHeader from "../components/Search";

type Course = {
  code: string;
  name: string;
  credits: string;
};

type Specialisation = {
  title: string;
  courses: Course[];
};

const Program = () => {
  const { t } = useTranslation();
  const { program: programCode } = useParams<{ program: string }>();

  const [programName, setProgramName] = useState<string>("");
  const [specialisations, setSpecialisations] = useState<Specialisation[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [colorCode, setColorCode] = useState("");
  const [query, setQuery] = useState("");

  async function getCoursesForProgram(id: string) {
    const { data, error } = await supabase
      .from("programs")
      .select(
        `
          id,
          name,
          program_code,
          color_code,
          programs_program_sections (
            program_sections:program_sections (
              name,
              course_program_sections (
                courses:courses (
                  id, code, name, credits,
                  course_translations (
                    language_code
                  )
                )
              )
            )
          )
        `
      )
      .eq("program_code", programCode)
      /*       .eq(
        "programs_program_sections.program_sections.course_program_sections.courses.course_translations.language_code",
        "sv"
      ) */
      .maybeSingle();

    if (error || !data) {
      console.error("Error fetching program courses:", error?.message);
      setNotFound(true);
      setLoading(false);
      return;
    }

    setProgramName(data.name as string);
    setColorCode(data.color_code ?? "#000000");

    const specs: Specialisation[] = (data.programs_program_sections || []).map(
      (pm: any) => ({
        title: pm.program_sections.name as string,
        courses: (pm.program_sections.course_program_sections || []).map(
          (cm: any) => ({
            code: cm.courses.code as string,
            name: cm.courses.name ?? cm.courses.code,
            credits: cm.courses.credits as string,
          })
        ),
      })
    );

    specs.sort((a, b) => a.title.localeCompare(b.title));
    setSpecialisations(specs);
    setLoading(false);
  }

  useEffect(() => {
    if (!programCode) return;
    setLoading(true);
    setNotFound(false);
    getCoursesForProgram(programCode);
  }, [programCode]);

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

  if (loading) {
    return (
      <main className="p-10 text-center">
        <p className="text-gray-600">{t("loading") || "Loading..."}</p>
      </main>
    );
  }

  if (notFound) {
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
        <section key={id} className="w-full max-w-7xl my-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {spec.title}
          </h2>
          <div className="flex flex-wrap gap-4">
            {spec.courses.map((course) => (
              <CourseCard
                rating={5}
                key={course.code}
                programCode={programCode}
                colorCode={colorCode}
                {...course}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default Program;
