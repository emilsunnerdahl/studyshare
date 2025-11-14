// src/pages/AuthCallback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const url = window.location.href;

      const { error } = await supabase.auth.exchangeCodeForSession(url);

      if (error) {
        console.error("Auth callback error:", error.message);
        // TODO handle error (show message to user)
      }

      // User now has a valid session, go home
      navigate("/"); 
    })();
  }, [navigate]);

  return <p>Logging you in…</p>;
}
