import { createServerSupabase } from "@/lib/supabase";
import ScenarioTable from "@/components/admin/ScenarioTable";

export default async function ScenariosPage() {
  const supabase = await createServerSupabase();

  const { data: scenarios } = await supabase
    .from('scenarios')
    .select('*, categories(name)')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold text-[var(--text-primary)] tracking-tight">Kliniskt Innehåll</h2>
        <p className="text-[var(--text-muted)] mt-2 font-medium">Hantera och publicera scenarios, instruktioner och guider.</p>
      </div>

      <ScenarioTable scenarios={scenarios || []} />
    </div>
  );
}
