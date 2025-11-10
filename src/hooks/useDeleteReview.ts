import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";

export const useDeleteReview = () => {
    const queryClient = useQueryClient();

    const deleteReview = async (reviewId: string) => {
        const { error } = await supabase
            .from("reviews")
            .delete()
            .eq("id", reviewId);

        if (error) {
            throw error;
        }
    };

    const handleDeleteReview = (reviewId: string) => {
        deleteReview(reviewId)
            .then(() => {
                queryClient.invalidateQueries({ queryKey: ["reviews", "sv"] });
            })
            .catch((error) => {
                console.error("Error deleting review:", error);
            });
    };

    return { handleDeleteReview };
};
