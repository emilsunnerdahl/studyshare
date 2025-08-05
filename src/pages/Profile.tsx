import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { useAuth } from "@/hooks/useAuth"; // 🔁 Replace with your auth hook
import FormField from "../components/FormField";

const Profile = () => {
    const navigate = useNavigate();
    //const { user } = useAuth();
    const user = {
        full_name: "emil sunnerdahl",
        username: "emil",
        email: "emil@gmail.com",
    };

    const [formData, setFormData] = useState({
        full_name: "",
        username: "",
        email: "",
        password: "",
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user) {
            navigate("/auth");
        } else {
            // populate initial values
            setFormData({
                full_name: user.full_name || "",
                username: user.username || "",
                email: user.email || "",
                password: "",
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email.includes("@")) {
            setError("Please enter a valid email.");
            return;
        }

        // 🔁 Replace with actual Supabase update logic
        // await supabase.auth.updateUser(...)
        console.log("Profile update:", formData);

        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    return (
        <main className="max-w-xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>

            <form onSubmit={handleSubmit} className="space-y-5">
                <FormField
                    label="Full Name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                />
                <FormField
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <FormField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <FormField
                    label="New Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current"
                />

                {error && <p className="text-red-600 text-sm">{error}</p>}
                {success && (
                    <p className="text-green-600 text-sm">Profile updated!</p>
                )}

                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition"
                >
                    Save Changes
                </button>
            </form>
        </main>
    );
};

export default Profile;
