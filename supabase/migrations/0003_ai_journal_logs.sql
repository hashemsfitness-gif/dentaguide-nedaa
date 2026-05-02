-- ══════════════════════════════════════════════════════════════
-- 0003_ai_journal_logs.sql — AI Journal Generation Logs
-- Tracks AI usage for billing, audit, and quota control
-- ══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS ai_journal_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  scenario_id UUID REFERENCES scenarios(id) ON DELETE SET NULL,
  
  -- AI Model info
  model TEXT NOT NULL DEFAULT 'claude-opus-4-7-20250219',
  model_version TEXT,
  
  -- Token tracking for billing
  input_tokens INT NOT NULL DEFAULT 0,
  output_tokens INT NOT NULL DEFAULT 0,
  total_tokens INT NOT NULL DEFAULT 0,
  
  -- Cost tracking (in USD cents)
  estimated_cost_cents INT NOT NULL DEFAULT 0,
  
  -- Content (for audit, not for display)
  prompt_summary TEXT, -- Summary of what was requested (no PII)
  output_length INT NOT NULL DEFAULT 0,
  
  -- Validation
  validation_passed BOOLEAN NOT NULL DEFAULT FALSE,
  validation_errors JSONB DEFAULT '[]'::JSONB,
  
  -- PII detection results
  pii_detected BOOLEAN NOT NULL DEFAULT FALSE,
  pii_patterns_found JSONB DEFAULT '[]'::JSONB,
  
  -- Fabrication detection
  fabrication_detected BOOLEAN NOT NULL DEFAULT FALSE,
  fabrication_patterns JSONB DEFAULT '[]'::JSONB,
  
  -- ICD code check — ICD codes must NEVER appear in AI journal output
  icd_code_in_output BOOLEAN NOT NULL DEFAULT FALSE,
  
  -- User action
  user_approved BOOLEAN, -- NULL = pending, TRUE = approved, FALSE = rejected
  user_approved_at TIMESTAMPTZ,
  
  -- Response time
  response_time_ms INT,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'failed', 'rejected', 'timeout')),
  error_message TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for quota checking and analytics
CREATE INDEX IF NOT EXISTS idx_ai_logs_user ON ai_journal_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_logs_user_date ON ai_journal_logs(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_ai_logs_status ON ai_journal_logs(status);
CREATE INDEX IF NOT EXISTS idx_ai_logs_validation ON ai_journal_logs(validation_passed);
CREATE INDEX IF NOT EXISTS idx_ai_logs_pii ON ai_journal_logs(pii_detected) WHERE pii_detected = TRUE;

-- RLS
ALTER TABLE ai_journal_logs ENABLE ROW LEVEL SECURITY;

-- Users can view their own logs
CREATE POLICY "Users can view own ai logs"
  ON ai_journal_logs FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own logs
CREATE POLICY "Users can insert own ai logs"
  ON ai_journal_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admins can view all logs
CREATE POLICY "Admins can view all ai logs"
  ON ai_journal_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ── Quota checking function ─────────────────────────────────
-- Free: 5 AI journals/day, Kliniker: 100/day, Klinik: unlimited

CREATE OR REPLACE FUNCTION public.check_ai_quota(p_user_id UUID)
RETURNS TABLE (
  allowed BOOLEAN,
  used_today INT,
  daily_limit INT,
  tier user_tier
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_tier user_tier;
  v_used INT;
  v_limit INT;
BEGIN
  -- Get user tier
  SELECT p.tier INTO v_tier
  FROM profiles p
  WHERE p.id = p_user_id;
  
  -- Count today's usage
  SELECT COUNT(*) INTO v_used
  FROM ai_journal_logs
  WHERE user_id = p_user_id
    AND created_at >= CURRENT_DATE
    AND status = 'completed';
  
  -- Set limit based on tier
  CASE v_tier
    WHEN 'free' THEN v_limit := 5;
    WHEN 'kliniker' THEN v_limit := 100;
    WHEN 'klinik' THEN v_limit := 999999; -- Effectively unlimited
    ELSE v_limit := 5;
  END CASE;
  
  RETURN QUERY SELECT (v_used < v_limit), v_used, v_limit, v_tier;
END;
$$;
