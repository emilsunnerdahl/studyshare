import ReviewsPerUser from "@/components/admin/reviewsPerUser";
import MessagePopup from "@/components/ui/MessagePopup";
import { useDeleteReview } from "@/hooks/useDeleteReview";
import { useState } from "react";

export default function Users() {
  const [deleting, setDeleting] = useState<string | null>(null);
  const { handleDeleteReview } = useDeleteReview();

  return (
    <>
      <ReviewsPerUser setDeleting={setDeleting} />

      {deleting && (
        <MessagePopup
          message="Do you want to delete review"
          onClose={() => {
            handleDeleteReview(deleting);
            setDeleting(null);
          }}
        />
      )}
    </>
  );
}
