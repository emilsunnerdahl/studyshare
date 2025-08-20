import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Session, User } from "@supabase/supabase-js";

type AuthState = {
    user: User | null;
    session: Session | null;
    loading: boolean;
    error: string | null;
};

export function useAuth(): AuthState {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        const init = async () => {
            setLoading(true);
            const { data, error } = await supabase.auth.getSession();
            if (!mounted) return;

            if (error) {
                setError(error.message);
            }
            setSession(data.session ?? null);
            setUser(data.session?.user ?? null);
            setLoading(false);
        };

        init();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, newSession) => {
            if (!mounted) return;
            setSession(newSession);
            setUser(newSession?.user ?? null);
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    return { user, session, loading, error };
}
