import { createServerSupabase } from "@/lib/supabase";
import ScenarioEditor from "@/components/admin/ScenarioEditor";
import VersionHistoryDrawer from "@/components/admin/VersionHistoryDrawer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditScenarioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabase();

  const { data: scenario } = await supabase
    .from("scenarios")
    .select("*, categories(name)")
    .eq("id", id)
    .single();

  if (!scenario) {
    notFound();
  }

  return (
    <div className="space-y-8 h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link 
            href="/admin/scenarios"
            className="w-12 h-12 rounded-2xl bg-white border border-[var(--border-light)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-medium)] transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                Redigera Scenario
              </h2>
              <span className="text-[10px] font-mono bg-[var(--neutral)] px-2 py-1 rounded-md text-[var(--text-muted)] border border-[var(--border-light)]">
                ID: {scenario.id.slice(0, 8)}
              </span>
            </div>
            <p className="text-[var(--text-muted)] mt-1 font-medium">
              {scenario.categories?.name} / {scenario.title}
            </p>
          </div>
        </div>
      </div>

      <ScenarioEditor scenario={scenario} />
      <VersionHistoryDrawer scenarioId={scenario.id} />
    </div>
  );
}
