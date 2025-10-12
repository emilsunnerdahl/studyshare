import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useMemo, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";

type Review = {
  id: string;
  rating: number;
  difficulty: number;
  fun: number;
  lectures: number;
  material: number;
  workload: number;
  comment: string;
  created_at: string;
  user_id?: string;
};

type AvgReviews = {
  rating: number;
  difficulty: number;
  fun: number;
  lectures: number;
  material: number;
  workload: number;
};

type Course = {
  code: string;
  name: string;
  id: string;
  credits: number;
};

const CourseDetail = () => {
  const { code, program } = useParams<{ code: string; program: string }>();
  const { t } = useTranslation("courseDetail");
  const navigate = useNavigate();
  const { user } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [hasMyReview, setHasMyReview] = useState(false);

  // expand states
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [overviewOpen, setOverviewOpen] = useState(false); // bottom inner ratings window in Overview

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

  // overall Average (single number) helpers
  const perReviewAverage = useCallback(
    (r: Review) =>
      round1(
        (r.rating +
          r.difficulty +
          r.fun +
          r.lectures +
          r.material +
          r.workload) /
          6
      ),
    []
  );

  const courseOverallAverage = useMemo(() => {
    if (!avgRating) return undefined;
    return round1(
      (avgRating.rating +
        avgRating.difficulty +
        avgRating.fun +
        avgRating.lectures +
        avgRating.material +
        avgRating.workload) /
        6
    );
  }, [avgRating]);

  // ✅ fetch course
  const fetchCourse = async () => {
    const { data: courseRow, error: courseErr } = await supabase
      .from("courses")
      .select(
        `
        code,
        name,
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
      credits: 5,
    });

    await fetchReviews(courseRow.id);
  };

  // ✅ fetch reviews
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
      {/* 📘 Header */}
      <header className="space-y-2">
        <div className="flex justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-900">{course.name}</h1>

          <Button
            onClick={() =>
              user
                ? navigate(`/programs/${program}/${code}review`)
                : navigate("/auth")
            }
          >
            {user
              ? hasMyReview
                ? t("updateReview") || "Update review"
                : t("createReview") || "Create review"
              : t("signInToReview") || "Sign in to review"}
          </Button>
        </div>
        <div className="text-gray-600 text-sm">
          {course.code} • {course.credits} hp
        </div>
      </header>

      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">
            {t("aboutThisCourse") || "About this course"}
          </h2>
        </div>
        <div className="p-5">
          <p className="text-gray-700">
            {t("courseDefaultDescription") ||
              "This course provides an overview of the subject, combining lectures with course materials and practical workload. Replace this text with a real course description when available."}
          </p>
        </div>

        <div className="h-px bg-gray-100" />
        <div className="p-5 bg-white">
          <h3 className="text-base font-semibold text-gray-900">
            {t("courseAverages") || "Course Averages"}
          </h3>

          {!overviewOpen && (
            <div className="mt-2">
              <div className="text-sm text-gray-600">
                {t("overallAverage") || "Overall Average"}:
                <span className="ml-2 text-xl font-semibold text-datarosa align-middle">
                  {courseOverallAverage ?? "—"}
                </span>
              </div>
            </div>
          )}

          {overviewOpen && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <StatBox
                label={t("averageRating") || "Avg. Rating"}
                value={avgRating?.rating}
              />
              <StatBox
                label={t("difficulty") || "Difficulty"}
                value={avgRating?.difficulty}
              />
              <StatBox label={t("fun") || "Fun"} value={avgRating?.fun} />
              <StatBox
                label={t("lectures") || "Lectures"}
                value={avgRating?.lectures}
              />
              <StatBox
                label={t("material") || "Material"}
                value={avgRating?.material}
              />
              <StatBox
                label={t("workload") || "Workload"}
                value={avgRating?.workload}
              />
            </div>
          )}

          <div className="mt-4 border-t border-gray-100 pt-3">
            <GreyLinkButton
              onClick={() => setOverviewOpen((v) => !v)}
              ariaLabel={
                overviewOpen
                  ? t("showLess") || "Show less"
                  : t("showMore") || "Show more"
              }
            >
              {overviewOpen ? t("less") || "Less" : t("more") || "More"}
            </GreyLinkButton>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">
          {t("reviews") || "Student Reviews"} ({reviews.length})
        </h2>

        <div className="space-y-6">
          {reviews.map((r) => {
            const isOpen = !!expanded[r.id];
            return (
              <article
                key={r.id}
                className="border border-gray-200 rounded-2xl shadow-sm overflow-hidden bg-white"
                aria-expanded={isOpen}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="text-xs text-gray-500">
                      {new Date(r.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  {!isOpen && (
                    <div className="mt-1 text-sm text-gray-600">
                      {t("averageRating") || "Average"}:
                      <span className="ml-2 text-xl font-semibold text-datarosa align-middle">
                        {perReviewAverage(r)}
                      </span>
                    </div>
                  )}

                  {isOpen && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-700">
                      <ReviewStat
                        label={t("rating") || "Rating"}
                        value={r.rating}
                      />
                      <ReviewStat
                        label={t("difficulty") || "Difficulty"}
                        value={r.difficulty}
                      />
                      <ReviewStat label={t("fun") || "Fun"} value={r.fun} />
                      <ReviewStat
                        label={t("lectures") || "Lectures"}
                        value={r.lectures}
                      />
                      <ReviewStat
                        label={t("material") || "Material"}
                        value={r.material}
                      />
                      <ReviewStat
                        label={t("workload") || "Workload"}
                        value={r.workload}
                      />
                    </div>
                  )}

                  <div className="mt-4 border-t border-gray-100 pt-3">
                    <GreyLinkButton
                      onClick={() =>
                        setExpanded((prev) => ({ ...prev, [r.id]: !isOpen }))
                      }
                      ariaLabel={
                        isOpen
                          ? t("showLess") || "Show less"
                          : t("showMore") || "Show more"
                      }
                    >
                      {isOpen ? t("less") || "Less" : t("more") || "More"}
                    </GreyLinkButton>
                  </div>
                </div>

                <div className="h-px bg-gray-100" />

                <div className="p-5 bg-gray-50">
                  <h3 className="text-sm font-medium text-gray-800 mb-2">
                    {t("reviewText") || "Review"}
                  </h3>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {r.comment?.trim()
                      ? r.comment
                      : t("noComment") || "No comment provided."}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default CourseDetail;

/* Sub-components */
const StatBox = ({
  label,
  value,
}: {
  label: string;
  value: number | undefined;
}) => (
  <div className="bg-white p-4 rounded-lg border text-center">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-xl font-semibold text-datarosa">{value}</div>
  </div>
);

const ReviewStat = ({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) => (
  <div className="flex items-baseline gap-2">
    <span className="font-medium text-gray-800">{label}:</span>
    <span className="text-gray-700">{value}</span>
  </div>
);

/** Grey, stylish text-link button used at the bottom of windows */
const GreyLinkButton = ({
  onClick,
  ariaLabel,
  children,
}: {
  onClick: () => void;
  ariaLabel?: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    className="mx-auto block text-gray-500 hover:text-gray-700 text-sm font-medium underline-offset-2 hover:underline"
  >
    {children}
  </button>
);
