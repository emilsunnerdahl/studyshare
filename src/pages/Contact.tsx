import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/Button";

const Contact = () => {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you'd handle sending the message (e.g., via Supabase, email API, etc.)
        alert("Message submitted! (Not implemented)");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <main className="flex flex-col items-center">
            {/* 📨 Contact Section */}
            <section className="w-full max-w-3xl px-6 py-20 text-center space-y-6">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                    {t("contactTitle") || "Get in touch"}
                </h1>
                <p className="text-gray-700 text-lg">
                    {t("contactDesc") ||
                        "Have questions, suggestions, or want to collaborate? Fill in the form and we’ll get back to you!"}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    <div className="flex flex-col">
                        <label
                            htmlFor="name"
                            className="text-sm font-medium text-gray-700 mb-1"
                        >
                            {t("nameLabel") || "Your name"}
                        </label>
                        <input
                            id="name"
                            name="name"
                            required
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-700 mb-1"
                        >
                            {t("emailLabel") || "Your email"}
                        </label>
                        <input
                            id="email"
                            name="email"
                            required
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="message"
                            className="text-sm font-medium text-gray-700 mb-1"
                        >
                            {t("messageLabel") || "Your message"}
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="text-center">
                        <Button type="submit">
                            {t("sendMessage") || "Send message"}
                        </Button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default Contact;
