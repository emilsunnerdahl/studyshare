import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RatingField from "../components/RatingField";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabaseClient";

const ReviewForm = () => {
    const { code } = useParams<{ code: string }>();
    const navigate = useNavigate();
    const { user, loading } = useAuth();
    const [courseId, setCourseId] = useState<string>("");

    useEffect(() => {
        if (loading) return;

        if (!user) {
            navigate("/auth");
        }
    }, [user, loading]);

    useEffect(() => {
        const fetchCourse = async () => {
            const { data, error } = await supabase
                .from("courses")
                .select("id")
                .eq("code", code)
                .maybeSingle();

            if (error) {
                console.error("Error fetching course" + error.message);
            } else {
                if (!data) {
                    console.log("Course not found");
                    return;
                }

                setCourseId(data.id);
            }
        };

        fetchCourse();
    }, []);

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

    const handleStarChange = (field: keyof typeof formData, value: number) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (
            Object.values(formData).some(
                (val) => typeof val === "number" && val === 0
            )
        ) {
            setErrors("Please rate all categories.");
            return;
        }

        if (!formData.comment.trim()) {
            setErrors("Please write a comment.");
            return;
        }

        const { error } = await supabase.from("reviews").insert({
            ...formData,
            course_id: courseId,
            user_id: user?.id,
        });

        navigate(`/courses/${code}`);
    };

    return (
        <main className="max-w-3xl mx-auto p-6 space-y-8">
            <h1 className="text-2xl font-bold text-gray-800">
                Write a review for {code}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <RatingField
                    label="Overall Rating"
                    value={formData.rating}
                    onChange={(val) => handleStarChange("rating", val)}
                />
                <RatingField
                    label="Difficulty"
                    value={formData.difficulty}
                    onChange={(val) => handleStarChange("difficulty", val)}
                />
                <RatingField
                    label="Fun"
                    value={formData.fun}
                    onChange={(val) => handleStarChange("fun", val)}
                />
                <RatingField
                    label="Lectures"
                    value={formData.lectures}
                    onChange={(val) => handleStarChange("lectures", val)}
                />
                <RatingField
                    label="Material"
                    value={formData.material}
                    onChange={(val) => handleStarChange("material", val)}
                />
                <RatingField
                    label="Workload"
                    value={formData.workload}
                    onChange={(val) => handleStarChange("workload", val)}
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Comment
                    </label>
                    <textarea
                        className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none"
                        rows={5}
                        value={formData.comment}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                comment: e.target.value,
                            })
                        }
                    />
                </div>

                {errors && <p className="text-red-600 text-sm">{errors}</p>}

                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition"
                >
                    Submit Review
                </button>
            </form>
        </main>
    );
};

export default ReviewForm;
