// Profile.tsx — uses PUBLIC users table for profile, Auth only for password
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/hooks/useAuth";
import FormField from "../components/FormField";

type UserRow = {
  id: string;
  email: string | null;
  name: string | null;
};

const Profile = () => {
  const navigate = useNavigate();
  const { user: authUser, loading: authLoading } = useAuth();

  // ✨ CHANGED: only the fields you actually have/show: name, email (read-only), password (for Auth)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);  // ✨ CHANGED: loading for public.users fetch
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // ✨ CHANGED: fetch from public.users (source of truth for profile)
  useEffect(() => {
    if (authLoading) return;

    if (!authUser) {
      navigate("/auth");
      return;
    }

    const load = async () => {
      setLoading(true);
      setError("");

      // Try to load profile row from public.users by auth id
      const { data, error } = await supabase
        .from("users")
        .select("name,email")
        .eq("id", authUser.id)
        .single<UserRow>();

      if (error && error.code !== "PGRST116") {
        // PGRST116 = No rows found (we handle that below)
        setError(error.message);
        setLoading(false);
        return;
      }

      // If no row yet, seed email from Auth (but keep it read-only in UI)
      const email = data?.email ?? authUser.email ?? "";
      const name = data?.name ?? "";

      setFormData({
        name,
        email,     // read-only in the form; not updated via Auth
        password: "",
      });

      setLoading(false);
    };

    load();
  }, [authUser, authLoading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!authUser) {
      setError("You must be signed in.");
      return;
    }

    // basic validation for name (optional)
    if (!formData.name.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    setError("");
    setSuccess(false);

    // ✨ CHANGED: upsert to public.users (so it works even if the row doesn't exist yet)
    const { error: upsertErr } = await supabase
      .from("users")
      .upsert(
        {
          id: authUser.id,
          name: formData.name || null,
          // keep email as the one shown (read-only). We DO NOT change Auth email.
          email: formData.email || authUser.email || null,
        },
        { onConflict: "id" }
      );

    if (upsertErr) {
      setError(upsertErr.message);
      return;
    }

    // ✨ CHANGED: update password via Auth ONLY if provided
    if (formData.password.trim()) {
      const { error: pwErr } = await supabase.auth.updateUser({
        password: formData.password.trim(),
      });
      if (pwErr) {
        setError(pwErr.message);
        return;
      }
    }

    setSuccess(true);
    setFormData((s) => ({ ...s, password: "" })); // clear password input
    setTimeout(() => setSuccess(false), 3000);
  };

  if (authLoading || loading) {
    return (
      <main className="max-w-xl mx-auto p-6">
        <p className="text-gray-600">Loading your profile…</p>
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ✨ CHANGED: Only Name is editable from public.users */}
        <FormField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        {/* ✨ CHANGED: Email is displayed but not editable */}
        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={() => {}}
          placeholder=""
          // Make it read-only/disabled to prevent edits in the UI
          // If your FormField supports props: readOnly or disabled
          readOnly
        />

        {/* ✨ CHANGED: Password updates Auth only */}
        <FormField
          label="New Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Leave blank to keep current password"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">Profile updated!</p>}

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
