import { createClient } from '@supabase/supabase-js';
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL as string;

export const supabaseClient = (accessToken: string) => {
  return createClient(supabaseUrl, accessToken);
};

export const supabaseAuthClient = () => {
  return createClient<any, 'auth', any>(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    { db: { schema: 'auth' }}
  );
}
