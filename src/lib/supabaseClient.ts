import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qiunaulinmhrdtvgpqjj.supabase.co";
const supabasePublishableKey = "sb_publishable_FTIFF1x8P0dLAgDymcbuSQ_SQBYcwYu";

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
