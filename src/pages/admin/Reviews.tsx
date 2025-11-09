import AllReviews from "@/components/admin/allReviews";
import NonVerifiedReviews from "@/components/admin/nonVerifiedReviews";

export default function Reviews() {
    return (
        <>
            <NonVerifiedReviews />
            <AllReviews />
        </>
    );
}