import { createServerSupabase } from "@/lib/supabase";
import UserTable from "@/components/admin/UserTable";

export default async function UsersPage() {
  const supabase = await createServerSupabase();

  const { data: users } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold text-[var(--text-primary)] tracking-tight">Användare & Abonnemang</h2>
        <p className="text-[var(--text-muted)] mt-2 font-medium">Hantera åtkomstnivåer, se registreringsdatum och exportera användarstatistik.</p>
      </div>

      <UserTable users={users || []} />
    </div>
  );
}
