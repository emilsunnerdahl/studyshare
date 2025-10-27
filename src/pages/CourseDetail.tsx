import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/Button";
import { AvgReviews, Review } from "@/types";
import ReviewCard from "@/components/ReviewCard";
import CourseHeader from "@/components/CourseHeader";
import { useAuth } from "@/hooks/useAuth";
import { useCourseDetail } from "@/hooks/useCourseDetail";

const CourseDetail = () => {
  const { code, program } = useParams<{ code: string; program: string }>();
  const { t } = useTranslation("courseDetail");
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hasMyReview, setHasMyReview] = useState(false);
  const round1 = (num: number) => Math.round(num * 10) / 10;
  const { data, isLoading, error } = useCourseDetail(code ?? "");
  const { course, reviews } = data ?? { course: null, reviews: [] as Review[] };

  const avgRating: AvgReviews | null = useMemo(() => {
    if (!data || reviews.length === 0) return null;
    const len = reviews.length;
    return {
      rating: round1(reviews.reduce((s, r) => s + r.rating, 0) / len),
      difficulty: round1(reviews.reduce((s, r) => s + r.difficulty, 0) / len),
      fun: round1(reviews.reduce((s, r) => s + r.fun, 0) / len),
      lectures: round1(reviews.reduce((s, r) => s + r.lectures, 0) / len),
      material: round1(reviews.reduce((s, r) => s + r.material, 0) / len),
      workload: round1(reviews.reduce((s, r) => s + r.workload, 0) / len),
    };
  }, [reviews]);

  useEffect(() => {
    if (!user) {
      setHasMyReview(false);
      return;
    }
    setHasMyReview(reviews.some((r) => r.user_id === user.id));
  }, [reviews, user]);

  if (isLoading) {
    return (
      <main className="p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-700">
          {t("loading") || "Loading..."}
        </h1>
      </main>
    );
  }

  if (!data || !course) {
    return (
      <main className="p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-700">
          {t("courseNotFound") || "Course not found"}
        </h1>
      </main>
    );
  }

  return (
    <main className="p-6 space-y-12 max-w-5xl mx-auto">
      <header className="space-y-2">
        <Button onClick={() => navigate(-1)}>← {t("courses")}</Button>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-900">{course.name}</h1>

          <Button
            onClick={() =>
              user
                ? navigate(`/programs/${program}/${code}/review`)
                : navigate("/auth")
            }
          >
            {user
              ? hasMyReview
                ? t("updateReview")
                : t("createReview")
              : t("signInToReview")}
          </Button>
        </div>
        <div className="text-gray-600 text-sm">
          {course.code} • {course.credits} hp
        </div>
      </header>

      <CourseHeader avgRating={avgRating} />

      <section>
        <h2 className="text-2xl font-semibold mb-6">
          {t("reviews") || "Student Reviews"} ({reviews.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {reviews.map((review) => {
            return <ReviewCard key={review.id} review={review} />;
          })}
        </div>
      </section>
    </main>
  );
};

export default CourseDetail;
