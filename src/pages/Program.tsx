import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabaseClient";
import CourseCard from "../components/CourseCard";

type Course = {
  code: string;
  name: string;
};

type Specialisation = {
  title: string;
  courses: Course[];
};

const Program = () => {
  const { t } = useTranslation();
  const { program: programId } = useParams<{ program: string }>();

  const [programName, setProgramName] = useState<string>("");
  const [specialisations, setSpecialisations] = useState<Specialisation[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  async function getCoursesForProgram(id: string) {
    const { data, error } = await supabase
      .from("programs")
      .select(
        `
          id,
          name,
          programs_program_sections (
            program_sections:program_sections (
              name,
              course_program_sections (
                courses:courses (
                  id, code, name,
                  course_translations (
                    language_code
                  )
                )
              )
            )
          )
        `
      )
      .eq("id", id)
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

    const specs: Specialisation[] = (data.programs_program_sections || []).map(
      (pm: any) => ({
        title: pm.program_sections.name as string,
        courses: (pm.program_sections.course_program_sections || []).map(
          (cm: any) => ({
            code: cm.courses.code as string,
            name: cm.courses.name ?? cm.courses.code,
          })
        ),
      })
    );

    specs.sort((a, b) => a.title.localeCompare(b.title));
    setSpecialisations(specs);
    setLoading(false);
  }

  useEffect(() => {
    if (!programId) return;
    setLoading(true);
    setNotFound(false);
    getCoursesForProgram(programId);
  }, [programId]);

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
    <main className="flex flex-col items-center w-full px-6 py-10 space-y-16">
      <header className="text-center max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-datarosa">
          {programName}
        </h1>
        <p className="mt-4 text-gray-700 text-lg">
          {t("programCoursesDesc") ||
            "Browse specialisations and their courses in this program."}
        </p>
      </header>

      {specialisations.map((spec, id) => (
        <section key={id} className="w-full max-w-7xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {spec.title}
          </h2>
          <div className="flex flex-wrap gap-4">
            {spec.courses.map((course) => (
              <CourseCard
                credits={5}
                rating={5}
                key={course.code}
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
