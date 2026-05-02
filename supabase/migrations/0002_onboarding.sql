-- ══════════════════════════════════════════════════════════════
-- 0002_onboarding.sql — Onboarding fields for profiles
-- Tracks user onboarding progress, tutorial, and checklist
-- ══════════════════════════════════════════════════════════════

-- Add onboarding columns to profiles
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS onboarding_step INT NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS onboarding_completed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS tutorial_completed BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS tutorial_completed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS checklist JSONB NOT NULL DEFAULT '{
    "profile_setup": false,
    "first_scenario_viewed": false,
    "first_bookmark": false,
    "first_tool_used": false,
    "journal_generated": false,
    "shortcuts_discovered": false
  }'::JSONB;

-- Track onboarding email status
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS onboarding_email_1_sent BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS onboarding_email_1_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS onboarding_email_2_sent BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS onboarding_email_2_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS onboarding_email_3_sent BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS onboarding_email_3_sent_at TIMESTAMPTZ;

-- Specialization and clinic info for personalization
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS specialization TEXT,
  ADD COLUMN IF NOT EXISTS clinic_name TEXT,
  ADD COLUMN IF NOT EXISTS years_experience INT,
  ADD COLUMN IF NOT EXISTS preferred_areas JSONB DEFAULT '[]'::JSONB;

-- Index for finding users who need onboarding emails
CREATE INDEX IF NOT EXISTS idx_profiles_onboarding
  ON profiles(onboarding_completed, created_at)
  WHERE onboarding_completed = FALSE;

-- Index for finding users by tier (for admin/analytics)
CREATE INDEX IF NOT EXISTS idx_profiles_tier ON profiles(tier);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- ── Function to mark checklist item ─────────────────────────

CREATE OR REPLACE FUNCTION public.complete_checklist_item(
  p_user_id UUID,
  p_item TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE profiles
  SET checklist = jsonb_set(checklist, ARRAY[p_item], 'true'::JSONB)
  WHERE id = p_user_id;
  
  -- Check if all items are complete
  UPDATE profiles
  SET
    onboarding_completed = TRUE,
    onboarding_completed_at = NOW()
  WHERE id = p_user_id
    AND NOT (checklist ? 'false');
END;
$$;

-- ── Function to advance onboarding step ─────────────────────

CREATE OR REPLACE FUNCTION public.advance_onboarding(
  p_user_id UUID,
  p_step INT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE profiles
  SET onboarding_step = GREATEST(onboarding_step, p_step)
  WHERE id = p_user_id;
END;
$$;
