import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { Program } from "@/types";

export function usePrograms() {
  return useQuery({
    queryKey: ["programs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("programs")
        .select("id, name, program_code, color_code")
        .order("name", { ascending: true });

      if (error) throw error;
      return data as Program[];
    },
    staleTime: 1000 * 60 * 30, // 30 minuter ny fetch
  });
}
