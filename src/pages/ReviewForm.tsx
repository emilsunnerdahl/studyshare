import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next"; // NEW: i18n for labels/titles (optional, but matches your app)
import RatingField from "../components/RatingField";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabaseClient";

const ReviewForm = () => {
  const { program, code } = useParams<{ program: string; code: string }>();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const { t } = useTranslation(); // NEW: useTranslation to keep strings localized

  const [courseId, setCourseId] = useState<string>("");

  // CHANGED: initialize as before
  const [formData, setFormData] = useState({
    rating: 0,
    difficulty: 0,
    fun: 0,
    lectures: 0,
    material: 0,
    workload: 0,
    comment: "",
  });

  const [errors, setErrors] = useState<string | null>(null);

  const [isFetching, setIsFetching] = useState(true); // NEW: show loading state while fetching course/review
  const [hasExistingReview, setHasExistingReview] = useState(false); // NEW: toggle Create vs Edit UI

  // CHANGED: include `navigate` in deps (React best practice), and guard on loading
  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/auth"); // SAME behavior: redirect to auth when not logged in
    }
  }, [user, loading, navigate]); // WHY: add `navigate` to avoid stale closure warnings

  // CHANGED: single effect to fetch course AND any existing review by this user
  useEffect(() => {
    const fetchData = async () => {
      if (!code || !user) return; // WHY: only fetch when both are available
      setIsFetching(true);
      setErrors(null);

      // 1) Fetch course id (same logic as before)
      const { data: course, error: courseErr } = await supabase
        .from("courses")
        .select("id")
        .eq("code", code)
        .maybeSingle();

      if (courseErr) {
        setErrors("Error fetching course: " + courseErr.message); // CHANGED: clearer message
        setIsFetching(false);
        return;
      }

      if (!course) {
        setErrors("Course not found.");
        setIsFetching(false);
        return;
      }

      setCourseId(course.id);

      // 2) NEW: Check for existing review from this user for this course
      const { data: review, error: reviewErr } = await supabase
        .from("reviews")
        .select("rating,difficulty,fun,lectures,material,workload,comment")
        .eq("course_id", course.id)
        .eq("user_id", user.id)
        .maybeSingle();

      if (reviewErr) {
        setErrors("Error fetching existing review: " + reviewErr.message);
        setIsFetching(false);
        return;
      }

      if (review) {
        setHasExistingReview(true); // NEW: we’re in “Edit” mode
        setFormData({
          rating: review.rating ?? 0,
          difficulty: review.difficulty ?? 0,
          fun: review.fun ?? 0,
          lectures: review.lectures ?? 0,
          material: review.material ?? 0,
          workload: review.workload ?? 0,
          comment: review.comment ?? "",
        }); // NEW: prefill the form
      } else {
        setHasExistingReview(false); // NEW: “Create” mode
      }

      setIsFetching(false);
    };

    fetchData();
  }, [code, user]); // WHY: rerun when route code/user changes

  // CHANGED: functional update to avoid depending on stale formData
  const handleStarChange = (field: keyof typeof formData, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value })); // WHY: safer state update
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // SAME: validation, but slightly clearer messages
    if (
      Object.entries(formData).some(([, v]) => typeof v === "number" && v === 0)
    ) {
      setErrors("Please rate all categories.");
      return;
    }

    if (!formData.comment.trim()) {
      setErrors("Please write a comment.");
      return;
    }

    if (!courseId || !user) {
      setErrors("Course or user not loaded yet.");
      return;
    }

    // SAME core DB behavior: upsert so it creates or updates
    const { error } = await supabase
      .from("reviews")
      .upsert(
        {
          ...formData,
          course_id: courseId,
          user_id: user.id,
        },
        { onConflict: "user_id,course_id" } // SAME: ensures one review per user/course
      )
      .select()
      .single();

    if (error) {
      setErrors(error.message);
      return;
    }

    navigate(`/programs/${program}/${code}`); // SAME redirect
  };

  // NEW: dynamic title + submit label (falls back to English if translation key missing)
  const pageTitle = useMemo(
    () =>
      hasExistingReview
        ? t("editReviewTitle", {
            defaultValue: "Edit your review for {{code}}",
            code,
          })
        : t("createReviewTitle", {
            defaultValue: "Create new review for {{code}}",
            code,
          }),
    [hasExistingReview, code, t]
  );

  const submitLabel = hasExistingReview
    ? t("updateReview", { defaultValue: "Update Review" })
    : t("submitReview", { defaultValue: "Submit Review" });

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      {/* CHANGED: dynamic title instead of fixed "Write a review for {code}" */}
      <h1 className="text-2xl font-bold text-gray-800">{pageTitle}</h1>

      {/* NEW: show a simple loading state while course/review are being fetched */}
      {isFetching ? (
        <p className="text-gray-500">
          {t("loading", { defaultValue: "Loading..." })}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <RatingField
            label={t("overallRating", { defaultValue: "Overall Rating" })}
            value={formData.rating}
            onChange={(val) => handleStarChange("rating", val)}
          />
          <RatingField
            label={t("difficulty", { defaultValue: "Difficulty" })}
            value={formData.difficulty}
            onChange={(val) => handleStarChange("difficulty", val)}
          />
          <RatingField
            label={t("fun", { defaultValue: "Fun" })}
            value={formData.fun}
            onChange={(val) => handleStarChange("fun", val)}
          />
          <RatingField
            label={t("lectures", { defaultValue: "Lectures" })}
            value={formData.lectures}
            onChange={(val) => handleStarChange("lectures", val)}
          />
          <RatingField
            label={t("material", { defaultValue: "Material" })}
            value={formData.material}
            onChange={(val) => handleStarChange("material", val)}
          />
          <RatingField
            label={t("workload", { defaultValue: "Workload" })}
            value={formData.workload}
            onChange={(val) => handleStarChange("workload", val)}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("comment", { defaultValue: "Comment" })}
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none"
              rows={5}
              value={formData.comment}
              onChange={
                (e) =>
                  setFormData((prev) => ({ ...prev, comment: e.target.value })) // CHANGED: functional update pattern
              }
            />
          </div>

          {errors && <p className="text-red-600 text-sm">{errors}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            {submitLabel} {/* NEW: text reflects Create vs Edit */}
          </button>
        </form>
      )}
    </main>
  );
};

export default ReviewForm;
