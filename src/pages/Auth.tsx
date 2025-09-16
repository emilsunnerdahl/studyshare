import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
        full_name: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        const errs: { [key: string]: string } = {};
        if (!formData.email.includes("@")) errs.email = "Invalid email address";
        if (formData.password.length < 6) errs.password = "Password too short";
        if (isSignUp) {
            if (!formData.username) errs.username = "Username is required";
            if (!formData.full_name) errs.full_name = "Full name is required";
        }
        return errs;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        // Place Supabase sign in/up logic here later

        if (!isSignUp) {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });
            if (error) {
                console.error("Login error:", error.message);
            } else {
                console.log("Login success:", data);

                try {
                    console.log("Upserting user profile row…");
                    const user = data.user!;
                    const { error: upsertError } = await supabase
                        .from("users")
                        .upsert({
                            id: user.id, // must equal auth.users.id
                            email: user.email, // safe to store
                            full_name: user.user_metadata?.full_name ?? null,
                            username: user.user_metadata?.username ?? null,
                        });
                    if (upsertError) {
                        console.error(
                            "Profile upsert error:",
                            upsertError.message
                        );
                        // Optional: surface in UI
                        // setErrors((p) => ({ ...p, _form: upsertError.message }));
                    } else {
                        console.log("Profile upsert complete.");
                    }
                } catch (e) {
                    console.error("Profile upsert threw:", e);
                }

                navigate("/");
            }
        } else {
            // --- SIGN UP ---
            const email = formData.email.trim();
            const password = formData.password; //Don't trim
            const full_name = formData.full_name.trim();
            const username = formData.username.trim();

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { full_name, username },
                },
            });

            if (error) {
                console.error("Sign-up error:", error.message);
                // Optionally surface this in UI:
                setErrors((prev) => ({ ...prev, _form: error.message }));
                return;
            }

            // If email confirmations are ON in Supabase, there won't be a session yet.
            // Show a notice instead of navigating immediately.
            if (!data.session) {
                alert("Check your inbox to confirm your email, then sign in.");
            } else {
                // If confirmations are OFF, you may get a session right away.
                navigate("/");
            }
        }
    };

    const handleResend = async () => {
        const email = formData.email.trim();
        if (!email)
            return setErrors((p) => ({
                ...p,
                _form: "Enter your email first.",
            }));

        const { error } = await supabase.auth.resend({
            type: "signup",
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) setErrors((p) => ({ ...p, _form: error.message }));
        else alert("Confirmation email resent. Check your inbox/spam.");
    };

    return (
        <main className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 space-y-6">
                <h1 className="text-2xl font-bold text-center text-gray-800">
                    {isSignUp ? "Create an account" : "Sign in"}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isSignUp && (
                        <>
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md"
                                />
                                {errors.full_name && (
                                    <p className="text-sm text-red-600">
                                        {errors.full_name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 px-4 py-2 rounded-md"
                                />
                                {errors.username && (
                                    <p className="text-sm text-red-600">
                                        {errors.username}
                                    </p>
                                )}
                            </div>
                        </>
                    )}

                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2 rounded-md"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-600">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2 rounded-md"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-600">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition cursor-pointer"
                    >
                        {isSignUp ? "Sign up" : "Sign in"}
                    </button>

                    {isSignUp && (
                        <button
                            type="button"
                            onClick={handleResend}
                            className="text-sm text-indigo-600 hover:underline mt-2"
                        >
                            Resend confirmation email
                        </button>
                    )}

                    {errors._form && (
                        <p className="text-sm text-red-600 mt-2">
                            {errors._form}
                        </p>
                    )}
                </form>

                <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-indigo-600 hover:underline cursor-pointer"
                    >
                        {isSignUp
                            ? "Already have an account? Sign in"
                            : "Don't have an account? Sign up"}
                    </button>

                    {!isSignUp && (
                        <a
                            href="/forgot-password"
                            className="text-indigo-600 hover:underline"
                        >
                            Forgot password?
                        </a>
                    )}
                </div>

                <div className="text-center text-sm pt-4">
                    <a href="/" className="text-gray-500 hover:underline">
                        ← Back to home
                    </a>
                </div>
            </div>
        </main>
    );
};

export default Auth;
