import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function check() {
  const { data: categories, error } = await supabase.from('categories').select('count');
  console.log('Categories count:', categories?.[0]?.count || 0);
  if (error) console.error(error);
}

check();
