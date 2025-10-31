import { use, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabaseClient";
import MessagePopup from "@/components/MessagePopup";

const Auth = () => {
  const { t } = useTranslation("login");
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [notice, setNotice] = useState<string | null>(null);

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
      if (!formData.name) errs.name = "A name is required";
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

    if (!isSignUp) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) {

        //remove later
        console.log("Auth error:", { status: error.status, name: error.name, message: error.message });

        //
        setErrors((prev) => ({ ...prev, _form: error.message }));
        return;
      } else {
        try {
          const user = data.user!;
          const { error: upsertError } = await supabase.from("users").upsert({
            id: user.id, // must equal auth.users.id
            email: user.email, // safe to store
            name: user.user_metadata?.name ?? null,
          });
          if (upsertError) {
            setErrors((p) => ({ ...p, _form: upsertError.message }));
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
      const name = formData.name.trim();

      if (!email.endsWith("@student.lu.se"))
        return setErrors((p) => ({
          ...p,
          email: t("studentEmail"),
        }));

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name, username },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {name},
        },
      });

      if (error) {
        console.error("Sign-up error:", error.message);
        setErrors((prev) => ({ ...prev, _form: error.message }));
        return;
      }

      // If email confirmations are ON in Supabase, there won't be a session yet. ( We can remove this )
      // Show a notice instead of navigating immediately.
      if (!data.session) {
        setNotice("Check your inbox cto confirm your email, then sign in.");
        //alert("Check your inbox to confirm your email, then sign in.");
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

    if (!email.endsWith("@student.lu.se"))
      return setErrors((p) => ({
        ...p,
        _form: t("studentEmail"),
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
    <>
      {notice && <MessagePopup message={notice} onClose={() => setNotice(null)} />}
      <main className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            {isSignUp ? t("createAccount") : t("signIn")}
          </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md"
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name}</p>
                )}
              </div>
            </>
          )}

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                {t("email")}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
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
                <p className="text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition cursor-pointer"
            >
              {isSignUp ? t("signUp") : t("signIn")}
            </button>

            {isSignUp && (
              <button
                type="button"
                onClick={handleResend}
                className="text-sm text-indigo-600 hover:underline mt-2"
              >
                {t("resendEmail")}
              </button>
            )}

            {errors._form && (
              <p className="text-sm text-red-600 mt-2">{errors._form}</p>
            )}
          </form>

          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-indigo-600 hover:underline cursor-pointer"
            >
              {isSignUp ? t("haveAccount") : t("noAccount")}
            </button>

            {!isSignUp && (
              <a
                href="/forgot-password"
                className="text-indigo-600 hover:underline"
              >
                {t("forgotPassword")}
              </a>
            )}
          </div>

          <div className="text-center text-sm pt-4">
            <button
              onClick={() => navigate("/")}
              className="text-gray-500 cursor-pointer hover:underline"
            >
              ← {t("backToHome")}
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Auth;
