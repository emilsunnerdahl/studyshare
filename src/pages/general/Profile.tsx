import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/hooks/useAuth";
import FormField from "../components/FormField";

const Profile = () => {
  const navigate = useNavigate();
  const { user: authUser, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;

    if (!authUser) {
      navigate("/auth");
      return;
    }

    setFormData({
      name: authUser?.user_metadata?.full_name ?? "",
      email: authUser?.email ?? "",
      password: "",
    });
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

    if (!formData.name.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    setError("");
    setSuccess(false);

    const { error: upsertErr } = await supabase.from("users").upsert(
      {
        id: authUser.id,
        name: formData.name || null,
        email: formData.email || authUser.email || null,
      },
      { onConflict: "id" }
    );

    const { error: authError } = await supabase.auth.updateUser({
      data: { full_name: formData.name },
    });

    if (authError) {
      setError(authError.message);
      return;
    }

    if (upsertErr) {
      setError(upsertErr.message);
      return;
    }

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
    setFormData((s) => ({ ...s, password: "" }));
    setTimeout(() => setSuccess(false), 3000);
  };

  if (authLoading) {
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
        <FormField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={() => {}}
          placeholder=""
          readOnly
        />

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
