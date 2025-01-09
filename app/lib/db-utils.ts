import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase';
export const dbStart = async function() {
  const DBURL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const DBKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  return createClient<Database>(DBURL, DBKEY);
}
