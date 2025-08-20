import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/Button";

type CourseStats = {
    avg_rating: number;
    avg_difficulty: number;
    avg_fun: number;
    avg_lectures: number;
    avg_material: number;
    avg_workload: number;
    review_count: number;
};

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
    const { code } = useParams<{ code: string }>();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [course, setCourse] = useState<Course | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);

    const round1 = (num: number) => {
        return Math.round(num * 10) / 10;
    };

    const avgRating: AvgReviews | null = useMemo(() => {
        if (reviews.length === 0) return null;
        const rating = reviews.reduce((s, r) => s + r.rating, 0);
        const difficulty = reviews.reduce((s, r) => s + r.difficulty, 0);
        const fun = reviews.reduce((s, r) => s + r.fun, 0);
        const lectures = reviews.reduce((s, r) => s + r.lectures, 0);
        const material = reviews.reduce((s, r) => s + r.material, 0);
        const workload = reviews.reduce((s, r) => s + r.workload, 0);

        const length = reviews.length;

        return {
            rating: round1(rating / length),
            difficulty: round1(difficulty / length),
            fun: round1(fun / length),
            lectures: round1(lectures / length),
            material: round1(material / length),
            workload: round1(workload / length),
        };
    }, [reviews]);

    const fetchCourse = async () => {
        const { data, error } = await supabase
            .from("courses")
            .select(
                `
                code,
                id,
                course_translations(
                name)`
            )
            .eq("code", code)
            .eq("course_translations.language_code", "sv")
            .maybeSingle();

        if (error) {
            console.error(error);
        } else {
            if (!data) {
                return;
            }

            setCourse({
                code: data.code,
                name: data.course_translations[0].name,
                id: data.id,
                credits: 5,
            });

            fetchReviews(data.id);
        }
    };

    const fetchReviews = async (course_id: string) => {
        const { data, error } = await supabase
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
                comment
                `
            )
            .eq("course_id", course_id);

        if (error) {
            console.error(error);
        } else {
            setReviews(data);
        }
    };

    useEffect(() => {
        fetchCourse();
    }, []);

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
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {course.name}
                    </h1>
                    <Button
                        onClick={() => navigate("/courses/" + code + "/review")}
                    >
                        Create review
                    </Button>
                </div>
                <div className="text-gray-600 text-sm">
                    {course.code} • {course.credits} hp
                </div>
            </header>

            {/* 📊 Stats Section */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-lg shadow">
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
            </section>

            {/* 💬 Reviews Section */}
            <section>
                <h2 className="text-2xl font-semibold mb-6">
                    {t("reviews") || "Student Reviews"} ({reviews.length})
                </h2>
                <div className="space-y-6">
                    {reviews.map((r) => (
                        <div
                            key={r.id}
                            className="border border-gray-200 rounded-xl p-5 shadow-sm"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <div className="text-lg font-medium text-gray-800">
                                    {r.comment}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {new Date(
                                        r.created_at
                                    ).toLocaleDateString()}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-600 mb-3">
                                <ReviewStat
                                    label={t("rating") || "Rating"}
                                    value={r.rating}
                                />
                                <ReviewStat
                                    label={t("difficulty") || "Difficulty"}
                                    value={r.difficulty}
                                />
                                <ReviewStat
                                    label={t("fun") || "Fun"}
                                    value={r.fun}
                                />
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
                                    value={`${r.workload}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default CourseDetail;

// 📦 Sub-components
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
    <div>
        <span className="font-medium text-gray-800">{label}:</span> {value}
    </div>
);
