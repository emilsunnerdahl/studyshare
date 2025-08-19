import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

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
    workload_hours: number;
    comment: string;
    created_at: string;
    profiles: {
        username: string;
        full_name: string;
    } | null;
};

type Course = {
    code: string;
    name: string;
    credits: number;
};

const mockStats: CourseStats = {
    avg_rating: 4.2,
    avg_difficulty: 3.4,
    avg_fun: 4.0,
    avg_lectures: 3.7,
    avg_material: 4.1,
    avg_workload: 12,
    review_count: 17,
};

const mockReviews: Review[] = [
    {
        id: "1",
        rating: 5,
        difficulty: 3,
        fun: 5,
        lectures: 4,
        material: 4,
        workload_hours: 10,
        comment: "Fantastic course with engaging lectures!",
        created_at: "2025-05-01",
        profiles: {
            username: "anna123",
            full_name: "Anna Svensson",
        },
    },
    {
        id: "2",
        rating: 4,
        difficulty: 4,
        fun: 4,
        lectures: 3,
        material: 5,
        workload_hours: 14,
        comment: "Challenging but very rewarding.",
        created_at: "2025-05-10",
        profiles: null,
    },
];

const allCourses: Course[] = [
    { code: "FMAN20", name: "Bildanalys", credits: 7.5 },
    { code: "EDAF80", name: "Datorgrafik", credits: 7.5 },
    // Extend as needed or import from main dataset
];

const CourseDetail = () => {
    const { code } = useParams<{ code: string }>();
    const { t } = useTranslation();

    const [course, setCourse] = useState<Course | null>(null);

    const fetchCourse = async () => {
        const { data, error } = await supabase
            .from("courses")
            .select(
                `
                code,
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

            console.log(data);
            setCourse({
                code: data.code,
                name: data.course_translations[0].name,
                credits: 5,
            });
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
                <h1 className="text-3xl font-bold text-gray-900">
                    {course.name}
                </h1>
                <div className="text-gray-600 text-sm">
                    {course.code} • {course.credits} hp
                </div>
            </header>

            {/* 📊 Stats Section */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-lg shadow">
                <StatBox
                    label={t("averageRating") || "Avg. Rating"}
                    value={mockStats.avg_rating}
                />
                <StatBox
                    label={t("difficulty") || "Difficulty"}
                    value={mockStats.avg_difficulty}
                />
                <StatBox label={t("fun") || "Fun"} value={mockStats.avg_fun} />
                <StatBox
                    label={t("lectures") || "Lectures"}
                    value={mockStats.avg_lectures}
                />
                <StatBox
                    label={t("material") || "Material"}
                    value={mockStats.avg_material}
                />
                <StatBox
                    label={t("workload") || "Workload"}
                    value={`${mockStats.avg_workload} h/week`}
                />
            </section>

            {/* 💬 Reviews Section */}
            <section>
                <h2 className="text-2xl font-semibold mb-6">
                    {t("reviews") || "Student Reviews"} (
                    {mockStats.review_count})
                </h2>
                <div className="space-y-6">
                    {mockReviews.map((r) => (
                        <div
                            key={r.id}
                            className="border border-gray-200 rounded-xl p-5 shadow-sm"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <div className="text-sm font-medium text-gray-800">
                                    {r.profiles?.full_name ||
                                        r.profiles?.username ||
                                        "Anonymous"}
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
                                    value={`${r.workload_hours} h/week`}
                                />
                            </div>
                            <p className="text-gray-700 italic">{r.comment}</p>
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
    value: number | string;
}) => (
    <div className="bg-white p-4 rounded-lg border text-center">
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-xl font-semibold text-indigo-600">{value}</div>
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
