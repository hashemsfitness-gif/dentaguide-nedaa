-- ══════════════════════════════════════════════════════════════
-- 0007_simulator.sql — Simulator & Leaderboard
-- ══════════════════════════════════════════════════════════════

-- Sessions: one per completed 5-case round
CREATE TABLE simulator_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('basic','standard','advanced')),
  category_filter UUID[] DEFAULT '{}',
  scenario_ids UUID[] NOT NULL,           -- pre-selected 5 scenarios (resumability)
  total_cases SMALLINT NOT NULL DEFAULT 5,
  completed_cases SMALLINT NOT NULL DEFAULT 0,
  total_score INTEGER NOT NULL DEFAULT 0,
  max_possible_score INTEGER NOT NULL DEFAULT 500,
  status TEXT NOT NULL DEFAULT 'in_progress'
    CHECK (status IN ('in_progress','completed','abandoned')),
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- Individual case answers
CREATE TABLE simulator_case_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES simulator_sessions(id) ON DELETE CASCADE,
  scenario_id UUID REFERENCES public.scenarios(id) ON DELETE SET NULL,
  case_order SMALLINT NOT NULL,
  user_diagnosis TEXT,
  user_icd TEXT,
  user_tlv_codes TEXT[],
  diagnosis_score SMALLINT NOT NULL DEFAULT 0 CHECK (diagnosis_score BETWEEN 0 AND 40),
  icd_score SMALLINT NOT NULL DEFAULT 0 CHECK (icd_score BETWEEN 0 AND 30),
  tlv_score SMALLINT NOT NULL DEFAULT 0 CHECK (tlv_score BETWEEN 0 AND 30),
  total_case_score SMALLINT GENERATED ALWAYS AS
    (diagnosis_score + icd_score + tlv_score) STORED,
  time_taken_seconds INTEGER,
  answered_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(session_id, case_order)
);

-- Opt-in for leaderboard and clinic name (if missing)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS leaderboard_opt_in BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS clinic_name TEXT;

-- Indexes
CREATE INDEX idx_sim_sessions_user_completed
  ON simulator_sessions(user_id, completed_at DESC)
  WHERE status = 'completed';
CREATE INDEX idx_sim_sessions_in_progress
  ON simulator_sessions(user_id, started_at DESC)
  WHERE status = 'in_progress';
CREATE INDEX idx_sim_results_session_order
  ON simulator_case_results(session_id, case_order);

-- RLS
ALTER TABLE simulator_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulator_case_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_sessions" ON simulator_sessions
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "users_own_results" ON simulator_case_results
  FOR ALL USING (
    session_id IN (SELECT id FROM simulator_sessions WHERE user_id = auth.uid())
  );

-- Leaderboard: only opt-in users in same clinic visible to others
CREATE POLICY "leaderboard_opt_in_visible" ON simulator_sessions
  FOR SELECT USING (
    user_id IN (
      SELECT p.id FROM public.profiles p
      WHERE p.leaderboard_opt_in = true
        AND p.clinic_name IS NOT NULL
        AND p.clinic_name = (SELECT clinic_name FROM public.profiles WHERE id = auth.uid())
    )
  );

-- Align scenarios table with Simulator requirements
ALTER TABLE public.scenarios
  ADD COLUMN IF NOT EXISTS difficulty TEXT DEFAULT 'standard' CHECK (difficulty IN ('basic','standard','advanced')),
  ADD COLUMN IF NOT EXISTS patient_quote TEXT,
  ADD COLUMN IF NOT EXISTS trolig_diagnos TEXT,
  ADD COLUMN IF NOT EXISTS differentialdiagnoser TEXT[],
  ADD COLUMN IF NOT EXISTS kallor JSONB DEFAULT '[]'::JSONB;
