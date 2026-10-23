import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabasePublishKey) {
  throw new Error('Supabase environment variables are missing')
}

export const supabase = createClient(supabaseUrl, supabasePublishKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detect: {
      supabaseKey: supabasePublishKey,
    },
  },
})
