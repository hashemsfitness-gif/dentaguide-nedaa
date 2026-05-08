-- ══════════════════════════════════════════════════════════════
-- 0006_scenario_drafts.sql — Add draft columns to scenarios
-- ══════════════════════════════════════════════════════════════

ALTER TABLE public.scenarios
  ADD COLUMN IF NOT EXISTS debitering TEXT,
  ADD COLUMN draft_title TEXT,
  ADD COLUMN draft_anamnes TEXT,
  ADD COLUMN draft_status TEXT, -- Maps to status_section
  ADD COLUMN draft_behandling TEXT,
  ADD COLUMN draft_debitering TEXT,
  ADD COLUMN draft_roda_flaggor JSONB,
  ADD COLUMN draft_updated_at TIMESTAMPTZ,
  ADD COLUMN draft_updated_by UUID REFERENCES public.profiles(id);

-- Update RLS is not strictly needed since "Admins can manage scenarios" is FOR ALL
-- but we ensure the policy is robust.

COMMENT ON COLUMN public.scenarios.draft_status IS 'Draft version of status_section';
COMMENT ON COLUMN public.scenarios.draft_roda_flaggor IS 'Draft version of red_flags';
