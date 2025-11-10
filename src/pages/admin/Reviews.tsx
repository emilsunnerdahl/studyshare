import AllReviews from "@/components/admin/allReviews";
import NonVerifiedReviews from "@/components/admin/nonVerifiedReviews";
import MessagePopup from "@/components/MessagePopup";
import { useDeleteReview } from "@/hooks/useDeleteReview";
import { useState } from "react";

export default function Reviews() {
    const [deleting, setDeleting] = useState<string | null>(null);
    const { handleDeleteReview } = useDeleteReview();

    return (
        <>
            <NonVerifiedReviews setDeleting={setDeleting} />
            <AllReviews setDeleting={setDeleting} />

            {deleting && (
                <MessagePopup
                    message="Do you want to delete review"
                    onClose={() => { handleDeleteReview(deleting); setDeleting(null); }}
                />
            )}
        </>
    );
}