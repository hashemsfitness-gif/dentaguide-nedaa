-- ══════════════════════════════════════════════════════════════
-- ai_journal_logs — Audit hardening (PSL 2010:659 / GDPR)
-- - Lägg till output_json + edits_made för spårbarhet
-- - Stäng INSERT till service-role only
-- - Blockera UPDATE av godkända poster (immutable audit)
-- ══════════════════════════════════════════════════════════════

-- Nya kolumner
ALTER TABLE ai_journal_logs
  ADD COLUMN IF NOT EXISTS output_json JSONB,
  ADD COLUMN IF NOT EXISTS edits_made BOOLEAN NOT NULL DEFAULT FALSE;

-- ── Sänk INSERT-policy till service-role ──────────────────────
DROP POLICY IF EXISTS "Users can insert own ai logs" ON ai_journal_logs;

-- (Ingen INSERT-policy för anon/authenticated → service-role only via createServiceSupabase)

-- ── UPDATE-policy: ägaren får UPDATE endast om posten ej är godkänd ──
DROP POLICY IF EXISTS "Users can update own pending ai logs" ON ai_journal_logs;
CREATE POLICY "Users can update own pending ai logs"
  ON ai_journal_logs
  FOR UPDATE
  USING (
    auth.uid() = user_id
    AND user_approved IS NULL
    AND user_approved_at IS NULL
  )
  WITH CHECK (
    auth.uid() = user_id
  );

-- ── Trigger: spärra UPDATE på posten efter att user_approved_at är satt ──
CREATE OR REPLACE FUNCTION public.ai_journal_logs_lock_after_approve()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF OLD.user_approved_at IS NOT NULL THEN
    RAISE EXCEPTION 'ai_journal_logs är immutable efter godkännande (PSL 2010:659 audit-trail)';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS ai_journal_logs_lock_after_approve ON ai_journal_logs;
CREATE TRIGGER ai_journal_logs_lock_after_approve
  BEFORE UPDATE ON ai_journal_logs
  FOR EACH ROW
  EXECUTE FUNCTION public.ai_journal_logs_lock_after_approve();

-- ── Index för snabba uppslag på godkända poster ──
CREATE INDEX IF NOT EXISTS idx_ai_logs_approved
  ON ai_journal_logs(user_id, user_approved_at)
  WHERE user_approved IS NOT NULL;
