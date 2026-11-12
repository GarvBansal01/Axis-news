import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Retrieve public environment variables for Supabase (Vite prefix: VITE_)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

/**
 * Returns true if Supabase URL and Anon Key are configured in the environment.
 */
export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    supabaseUrl !== 'https://your-project-id.supabase.co' &&
    supabaseAnonKey !== 'your_supabase_anon_key_here'
  );
};

/**
 * Singleton Supabase client instance.
 * If credentials are not yet supplied, an initialized dummy client or null is safely handled.
 */
export const supabase: SupabaseClient = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
