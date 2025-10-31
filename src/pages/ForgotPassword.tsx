import { useState } from "react";
import {supabase} from "@/lib/supabaseClient";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }

        const redirectTo =
            typeof window !== "undefined"
                ? `${window.location.origin}/reset-password`
                : undefined;

        setError("");
        setLoading(true);

        // 🔗 Supabase integration goes here
        const {error: err} = await supabase.auth.resetPasswordForEmail(email, {redirectTo});
        console.log(err)


        setLoading(false);

        if (err) {
            setError(err.message);
            return;
        }

        setSubmitted(true);
    };

    return (
        <main className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 space-y-6">
            <h1 className="text-2xl font-bold text-center text-gray-800">
            Forgot Password
            </h1>

            {submitted ? (
            <p className="text-center text-green-600">
                If an account exists for that email, a reset link has been sent.
                Please check your inbox and spam folder.
            </p>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                    Email address
                </label>
                <input
                    type="email"
                    className="w-full border border-gray-300 px-4 py-2 rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                />
                {error && (
                    <p className="text-sm text-red-600 mt-1">{error}</p>
                )}
                </div>

                <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-md transition"
                >
                {loading ? "Sending..." : "Send reset link"}
                </button>
            </form>
            )}

            <div className="text-center text-sm">
            <a href="/auth" className="text-indigo-600 hover:underline">
                ← Back to sign in
            </a>
            </div>
        </div>
        </main>
  );
};

export default ForgotPassword;
