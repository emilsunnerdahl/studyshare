import { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }

        setError("");
        setSubmitted(true);

        // 🔗 Supabase integration goes here
        // await supabase.auth.resetPasswordForEmail(email)
    };

    return (
        <main className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 space-y-6">
                <h1 className="text-2xl font-bold text-center text-gray-800">
                    Forgot Password
                </h1>

                {submitted ? (
                    <p className="text-center text-green-600">
                        A reset link has been sent to your email.
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
                            />
                            {error && (
                                <p className="text-sm text-red-600 mt-1">
                                    {error}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition"
                        >
                            Send reset link
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
