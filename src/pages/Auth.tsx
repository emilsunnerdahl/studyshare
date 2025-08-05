import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        // Place Supabase sign in/up logic here later
        alert(isSignUp ? "Signing up..." : "Signing in...");
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
