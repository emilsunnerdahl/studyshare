import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { Specialisation } from "@/types";

export function useProgram(programCode: string) {
  return useQuery({
    queryKey: ["programs", programCode],
    enabled: !!programCode,
    staleTime: 1000 * 60 * 30, // 30 minuter ny fetch
    queryFn: async () => {
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
                  id, code, name, credits, avg_rating, review_count,
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
        throw error;
      }

      if (!data) {
        throw new Error("Program not found");
      }

      const specs: Specialisation[] = (
        data.programs_program_sections || []
      ).map((pm: any) => ({
        title: pm.program_sections.name as string,
        courses: (pm.program_sections.course_program_sections || []).map(
          (cm: any) => ({
            code: cm.courses.code as string,
            name: cm.courses.name ?? cm.courses.code,
            credits: cm.courses.credits as string,
            avg_rating: cm.courses.avg_rating as number,
            review_count: cm.courses.review_count as number,
          })
        ),
      }));

      // Sortera utifrån Årskurs eller Specialisering osv.
      specs.sort((a, b) => {
        const getPriority = (title: string) => {
          if (title.startsWith("Å")) return 0;
          if (title.startsWith("S")) return 1;
          if (title.startsWith("V")) return 2;
          if (title.startsWith("Ext")) return 3;
          return 4;
        };

        const pa = getPriority(a.title);
        const pb = getPriority(b.title);

        if (pa !== pb) return pa - pb;

        return a.title.localeCompare(b.title, "sv", { sensitivity: "accent" });
      });

      return {
        programName: data.name as string,
        colorCode: data.color_code ?? "#000000",
        specialisations: specs as Specialisation[],
      };
    },
  });
}
