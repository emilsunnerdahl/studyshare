import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { Review } from "@/types";

export function useCourseReviews() {
  return useQuery({
    queryKey: ["reviews", "sv"],
    staleTime: 1000 * 60 * 30, // Data anses färsk i 30 min
    gcTime: 1000 * 60 * 10, // Rensas om oanvänd i 10 min

    queryFn: async () => {
      // Hämta alla rader i "reviews"-tabellen
      const { data, error } = await supabase
        .from("reviews")
        .select("id, rating, difficulty, labs, relevance, lectures, material, workload, comment, created_at, user_id")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Returnera listan av reviews
      return data as Review[];
    },
  });
}
