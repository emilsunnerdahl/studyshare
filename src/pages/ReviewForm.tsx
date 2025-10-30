import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import RatingField from "../components/RatingField";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabaseClient";

const ReviewForm = () => {
  const { program, code } = useParams<{ program: string; code: string }>();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { t } = useTranslation("courseDetail");

  const [courseId, setCourseId] = useState<string>("");
  const [formData, setFormData] = useState({
    rating: 0,
    difficulty: 0,
    labs: 0,
    relevance: 0,
    lectures: 0,
    material: 0,
    workload: 0,
    comment: "",
  });

  const [errors, setErrors] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [hasExistingReview, setHasExistingReview] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!code || !user) return;
      setIsFetching(true);
      setErrors(null);

      const { data: course, error: courseErr } = await supabase
        .from("courses")
        .select("id")
        .eq("code", code)
        .maybeSingle();

      if (courseErr) {
        setErrors("Error fetching course: " + courseErr.message);
        setIsFetching(false);
        return;
      }

      if (!course) {
        setErrors("Course not found.");
        setIsFetching(false);
        return;
      }

      setCourseId(course.id);

      const { data: review, error: reviewErr } = await supabase
        .from("reviews")
        .select(
          "rating,difficulty,labs,relevance,lectures,material,workload,comment"
        )
        .eq("course_id", course.id)
        .eq("user_id", user.id)
        .maybeSingle();

      if (reviewErr) {
        setErrors("Error fetching existing review: " + reviewErr.message);
        setIsFetching(false);
        return;
      }

      if (review) {
        setHasExistingReview(true);
        setFormData({
          rating: review.rating ?? 0,
          difficulty: review.difficulty ?? 0,
          labs: review.labs ?? 0,
          relevance: review.relevance ?? 0,
          lectures: review.lectures ?? 0,
          material: review.material ?? 0,
          workload: review.workload ?? 0,
          comment: review.comment ?? "",
        });
      } else {
        setHasExistingReview(false);
      }

      setIsFetching(false);
    };

    fetchData();
  }, [code, user]);

  const handleStarChange = (field: keyof typeof formData, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    const { error } = await supabase
      .from("reviews")
      .upsert(
        {
          ...formData,
          course_id: courseId,
          user_id: user.id,
        },
        { onConflict: "user_id,course_id" }
      )
      .select()
      .single();

    if (error) {
      setErrors(error.message);
      return;
    }

    navigate(`/programs/${program}/${code}`);
  };

  const pageTitle = useMemo(
    () => (hasExistingReview ? t("editReviewTitle") : t("createReviewTitle")),
    [hasExistingReview, code, t]
  );

  const submitLabel = hasExistingReview ? t("updateReview") : t("submitReview");

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">
        {pageTitle} {code}
      </h1>

      {isFetching ? (
        <p className="text-gray-500">
          {t("loading", { defaultValue: "Loading..." })}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2">
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
              label={t("labs", { defaultValue: "Labs" })}
              value={formData.labs}
              onChange={(val) => handleStarChange("labs", val)}
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
              label={t("relevance", { defaultValue: "Relevance" })}
              value={formData.relevance}
              onChange={(val) => handleStarChange("relevance", val)}
            />
            <RatingField
              label={t("workload", { defaultValue: "Workload" })}
              value={formData.workload}
              onChange={(val) => handleStarChange("workload", val)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("reviewText")}
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none"
              rows={5}
              value={formData.comment}
              placeholder={t("reviewPlaceholder")}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, comment: e.target.value }))
              }
            />
          </div>

          {errors && <p className="text-red-600 text-sm">{errors}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            {submitLabel}
          </button>
        </form>
      )}
    </main>
  );
};

export default ReviewForm;
