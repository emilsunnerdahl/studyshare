import { useTranslation } from "react-i18next";
import CourseCard from "../components/CourseCard";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

type Course = {
  code: string;
  name: string;
};

type Specialisation = {
  title: string;
  courses: Course[];
};

const Courses = () => {
  const { t } = useTranslation();

  const [specialisations, setSpecialisations] = useState<Specialisation[]>([]);

  async function getCoursesForMaster() {
    const { data, error } = await supabase
      .from("programs")
      .select(
        `
                id,
                name,
                programs_masters (
                    masters:masters (
                        name,
                        course_masters (
                            courses:courses (
                            id, code,
                            course_translations (
                                name
                            ))
                        )
                    )
                )
                `
      )
      .eq("name", "Datateknik")
      .eq(
        "programs_masters.masters.course_masters.courses.course_translations.language_code",
        "sv"
      )
      .single();

    if (error) {
      console.error("Error fetching courses: " + error.message);
    } else {
      const specialisations = data.programs_masters.map((pm: any) => ({
        title: pm.masters.name,
        courses: pm.masters.course_masters.map((cm: any) => ({
          code: cm.courses.code,
          name: cm.courses.course_translations[0].name,
        })),
      }));
      specialisations.sort((a, b) => a.title.localeCompare(b.title));
      setSpecialisations(specialisations);
    }
  }

  useEffect(() => {
    getCoursesForMaster();
  }, []);

  return (
    <main className="flex flex-col items-center w-full px-6 py-10 space-y-16">
      <header className="text-center max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-datarosa">
          {t("coursesTitle")}
        </h1>
        <p className="mt-4 text-gray-700 text-lg">{t("coursesDesc")}</p>
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

export default Courses;
