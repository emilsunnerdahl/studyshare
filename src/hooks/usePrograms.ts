import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { Program } from "@/types";
import { useTranslation } from "react-i18next";

export function usePrograms() {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return useQuery({
    queryKey: ["programs", lang],
    queryFn: async () => {
      if (lang === "sv") {
        const { data, error } = await supabase
          .from("programs")
          .select("id, name, program_code, color_code")
          .order("name", { ascending: true });

        if (error) throw error;
        return data as Program[];
      } else {
        const { data, error } = await supabase
          .from("programs")
          .select(
            `
            id,
            name,
            program_code,
            color_code,
            translations:program_translations!inner(
              language_code,
              name
            )
          `
          )
          .eq("translations.language_code", lang)
          .order("name", { ascending: true });

        if (error) throw error;

        const programs: Program[] = data.map((p: any) => ({
          id: p.id as string,
          name: p.translations[0].name as string,
          program_code: p.program_code as string,
          color_code: p.color_code as string,
        }));

        return programs;
      }
    },
    staleTime: 1000 * 60 * 30, // 30 minuter ny fetch
  });
}
