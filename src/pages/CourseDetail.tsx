import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/Button";
import { AvgReviews, Review, Course } from "@/types";
import ReviewCard from "@/components/ReviewCard";
import CourseHeader from "@/components/CourseHeader";
import { useAuth } from "@/hooks/useAuth";

const CourseDetail = () => {
  const { code, program } = useParams<{ code: string; program: string }>();
  const { t } = useTranslation("courseDetail");
  const navigate = useNavigate();
  const { user } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [hasMyReview, setHasMyReview] = useState(false);

  const round1 = (num: number) => Math.round(num * 10) / 10;

  const avgRating: AvgReviews | null = useMemo(() => {
    if (reviews.length === 0) return null;
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

  const fetchCourse = async () => {
    const { data: courseRow, error: courseErr } = await supabase
      .from("courses")
      .select(
        `
        code,
        name,
        credits,
        id
      `
      )
      .eq("code", code)
      .maybeSingle();

    if (courseErr) {
      console.error(courseErr);
      return;
    }

    if (!courseRow) return;

    const translatedName = courseRow.name ?? courseRow.code;

    setCourse({
      code: courseRow.code,
      name: translatedName,
      id: courseRow.id,
      credits: courseRow.credits,
      avg_rating: 0,
      review_count: 0,
    });

    await fetchReviews(courseRow.id);
  };

  const fetchReviews = async (course_id: string) => {
    const { data: reviewsData, error: reviewsErr } = await supabase
      .from("reviews")
      .select(
        `
        created_at,
        difficulty,
        fun,
        lectures,
        material,
        workload,
        rating,
        id,
        comment,
        user_id
      `
      )
      .eq("course_id", course_id)
      .order("created_at", { ascending: false });

    if (reviewsErr) {
      console.error(reviewsErr);
      return;
    }
    setReviews(reviewsData ?? []);
  };

  useEffect(() => {
    if (!code) return;
    fetchCourse();
  }, [code]);

  useEffect(() => {
    if (!user) {
      setHasMyReview(false);
      return;
    }
    setHasMyReview(reviews.some((r) => r.user_id === user.id));
  }, [reviews, user]);

  if (!course) {
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
