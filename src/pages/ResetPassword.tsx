import { useState } from "react";
import {supabase} from "@/lib/supabaseClient";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        if (password !== confirm) {
            setError("Passwords do not match.");
            return;
        }

        

        setError("");
        setLoading(true);

        // 🔗 Supabase integration goes here:
        const {error: err} = await supabase.auth.updateUser({ password });

        setLoading(false);

        setError("");
        setSuccess(true);

        if (err) {
            setError(err.message);
            return;
        }

        setSuccess(true);

        
    };

    return (
        <main className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 space-y-6">
                <h1 className="text-2xl font-bold text-center text-gray-800">
                    Reset Password
                </h1>

                {success ? (
                    <p className="text-center text-green-600">
                        Your password has been updated. You can now sign in.
                    </p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">
                                New password
                            </label>
                            <input
                                type="password"
                                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">
                                Confirm new password
                            </label>
                            <input
                                type="password"
                                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-600">{error}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition"
                        >
                            Update password
                        </button>
                    </form>
                )}
            </div>
        </main>
    );
};

export default ResetPassword;
