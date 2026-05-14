
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function listUsers() {
  const { data, error } = await supabase.auth.admin.listUsers()
  if (error) {
    console.error('Error listing users:', error)
    return
  }
  console.log('Users:', data.users.map(u => ({ id: u.id, email: u.email })))
}

listUsers()
