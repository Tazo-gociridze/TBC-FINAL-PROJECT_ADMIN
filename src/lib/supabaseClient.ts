
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL || '';
const serverRole = import.meta.env.VITE_PUBLIC_SUPABASE_SERVER_ROLE || '';

if (!supabaseUrl || !serverRole) {
    throw new Error("Missing Supabase URL or key. Check your .env file.");
}

export const supabase = createClient(
  supabaseUrl,
  serverRole,
  {
     auth: {
          persistSession: false
     }
  }
);