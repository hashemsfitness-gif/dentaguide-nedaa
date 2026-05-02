-- ══════════════════════════════════════════════════════════════
-- 0001_init.sql — DentaGuide-Pro Database Schema
-- Complete schema with RLS policies
-- ══════════════════════════════════════════════════════════════

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── ENUM TYPES ──────────────────────────────────────────────

CREATE TYPE user_tier AS ENUM ('free', 'kliniker', 'klinik');
CREATE TYPE user_role AS ENUM ('user', 'admin');
CREATE TYPE scenario_area AS ENUM (
  'endodonti',
  'parodontologi',
  'protetik',
  'oralmedicin',
  'kakkirurgi',
  'bettfysiologi',
  'pedodonti_trauma',
  'pedodonti_akut',
  'pedodonti_munslemhinna',
  'pedodonti_beteende',
  'ortodonti',
  'allmant'
);
CREATE TYPE feedback_type AS ENUM ('thumbs_up', 'thumbs_down', 'bug_report', 'suggestion');
CREATE TYPE comment_status AS ENUM ('pending', 'approved', 'rejected');

-- ══════════════════════════════════════════════════════════════
-- TABLE: profiles
-- Extends auth.users with tier, role, Stripe, and onboarding data
-- ══════════════════════════════════════════════════════════════

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  tier user_tier NOT NULL DEFAULT 'free',
  role user_role NOT NULL DEFAULT 'user',
  
  -- Stripe
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_price_id TEXT,
  stripe_current_period_end TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_sign_in_at TIMESTAMPTZ,
  
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Auto-create profile on auth.users insert
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ══════════════════════════════════════════════════════════════
-- TABLE: categories
-- 12 clinical categories (8 main + 4 pediatric subcategories)
-- ══════════════════════════════════════════════════════════════

CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  emoji TEXT DEFAULT '🦷',
  area scenario_area NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_pediatric BOOLEAN NOT NULL DEFAULT FALSE,
  scenario_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ══════════════════════════════════════════════════════════════
-- TABLE: scenarios
-- 82 clinical scenarios with ICD codes, content sections
-- ICD codes are ONLY shown in scenario overview — NEVER in journal/AI output
-- ══════════════════════════════════════════════════════════════

CREATE TABLE scenarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  
  -- Identifiers
  scenario_code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  
  -- ICD code — ONLY for scenario overview display, NEVER in journal output
  icd_code TEXT,
  
  -- Content sections (HTML)
  definition TEXT,
  anamnes TEXT,
  status_section TEXT,
  diagnostik TEXT,
  behandling TEXT,
  uppfoljning TEXT,
  komplikationer TEXT,
  
  -- Red flags — ALWAYS visible, never behind accordion
  red_flags JSONB DEFAULT '[]'::JSONB,
  
  -- References and sources
  references_text TEXT,
  sources JSONB DEFAULT '[]'::JSONB,
  
  -- Access control
  is_premium BOOLEAN NOT NULL DEFAULT FALSE,
  
  -- Metadata
  display_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  view_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Unique per category
  UNIQUE(category_id, slug)
);

CREATE INDEX idx_scenarios_category ON scenarios(category_id);
CREATE INDEX idx_scenarios_slug ON scenarios(slug);
CREATE INDEX idx_scenarios_code ON scenarios(scenario_code);
CREATE INDEX idx_scenarios_premium ON scenarios(is_premium);
CREATE INDEX idx_scenarios_published ON scenarios(is_published);

CREATE TRIGGER scenarios_updated_at
  BEFORE UPDATE ON scenarios
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ══════════════════════════════════════════════════════════════
-- TABLE: scenario_versions
-- Version history — auto-created on every scenario update
-- ══════════════════════════════════════════════════════════════

CREATE TABLE scenario_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scenario_id UUID NOT NULL REFERENCES scenarios(id) ON DELETE CASCADE,
  version_number INT NOT NULL,
  
  -- Snapshot of content at this version
  content_snapshot JSONB NOT NULL,
  
  -- Who made the change
  changed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  change_description TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_versions_scenario ON scenario_versions(scenario_id);

-- Auto-create version on scenario update
CREATE OR REPLACE FUNCTION public.create_scenario_version()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  next_version INT;
BEGIN
  -- Get next version number
  SELECT COALESCE(MAX(version_number), 0) + 1
  INTO next_version
  FROM scenario_versions
  WHERE scenario_id = OLD.id;
  
  -- Create version snapshot
  INSERT INTO scenario_versions (scenario_id, version_number, content_snapshot)
  VALUES (
    OLD.id,
    next_version,
    jsonb_build_object(
      'title', OLD.title,
      'icd_code', OLD.icd_code,
      'definition', OLD.definition,
      'anamnes', OLD.anamnes,
      'status_section', OLD.status_section,
      'diagnostik', OLD.diagnostik,
      'behandling', OLD.behandling,
      'uppfoljning', OLD.uppfoljning,
      'komplikationer', OLD.komplikationer,
      'red_flags', OLD.red_flags,
      'is_premium', OLD.is_premium
    )
  );
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER scenario_version_trigger
  BEFORE UPDATE ON scenarios
  FOR EACH ROW
  WHEN (
    OLD.title IS DISTINCT FROM NEW.title OR
    OLD.definition IS DISTINCT FROM NEW.definition OR
    OLD.anamnes IS DISTINCT FROM NEW.anamnes OR
    OLD.status_section IS DISTINCT FROM NEW.status_section OR
    OLD.diagnostik IS DISTINCT FROM NEW.diagnostik OR
    OLD.behandling IS DISTINCT FROM NEW.behandling OR
    OLD.uppfoljning IS DISTINCT FROM NEW.uppfoljning OR
    OLD.komplikationer IS DISTINCT FROM NEW.komplikationer OR
    OLD.red_flags IS DISTINCT FROM NEW.red_flags
  )
  EXECUTE FUNCTION public.create_scenario_version();

-- ══════════════════════════════════════════════════════════════
-- TABLE: bookmarks
-- User-saved scenarios
-- ══════════════════════════════════════════════════════════════

CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  scenario_id UUID NOT NULL REFERENCES scenarios(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  UNIQUE(user_id, scenario_id)
);

CREATE INDEX idx_bookmarks_user ON bookmarks(user_id);
CREATE INDEX idx_bookmarks_scenario ON bookmarks(scenario_id);

-- ══════════════════════════════════════════════════════════════
-- TABLE: clinical_notes
-- User's own notes per scenario (max 10,000 characters)
-- ══════════════════════════════════════════════════════════════

CREATE TABLE clinical_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  scenario_id UUID NOT NULL REFERENCES scenarios(id) ON DELETE CASCADE,
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  UNIQUE(user_id, scenario_id),
  CONSTRAINT notes_max_length CHECK (char_length(content) <= 10000)
);

CREATE INDEX idx_notes_user ON clinical_notes(user_id);

CREATE TRIGGER notes_updated_at
  BEFORE UPDATE ON clinical_notes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ══════════════════════════════════════════════════════════════
-- TABLE: analytics_events
-- Event log for admin analytics
-- ══════════════════════════════════════════════════════════════

CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}'::JSONB,
  page_path TEXT,
  user_agent TEXT,
  ip_hash TEXT, -- Hashed IP, never raw
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_analytics_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_user ON analytics_events(user_id);
CREATE INDEX idx_analytics_created ON analytics_events(created_at);

-- ══════════════════════════════════════════════════════════════
-- TABLE: feedback_entries
-- Thumbs up/down, bug reports, suggestions
-- ══════════════════════════════════════════════════════════════

CREATE TABLE feedback_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  scenario_id UUID REFERENCES scenarios(id) ON DELETE SET NULL,
  feedback_type feedback_type NOT NULL,
  message TEXT,
  is_resolved BOOLEAN NOT NULL DEFAULT FALSE,
  resolved_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_feedback_user ON feedback_entries(user_id);
CREATE INDEX idx_feedback_scenario ON feedback_entries(scenario_id);
CREATE INDEX idx_feedback_type ON feedback_entries(feedback_type);
CREATE INDEX idx_feedback_resolved ON feedback_entries(is_resolved);

-- ══════════════════════════════════════════════════════════════
-- TABLE: scenario_comments
-- Moderated discussions per scenario
-- ══════════════════════════════════════════════════════════════

CREATE TABLE scenario_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  scenario_id UUID NOT NULL REFERENCES scenarios(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES scenario_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  status comment_status NOT NULL DEFAULT 'pending',
  moderated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  moderated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  CONSTRAINT comment_max_length CHECK (char_length(content) <= 5000)
);

CREATE INDEX idx_comments_scenario ON scenario_comments(scenario_id);
CREATE INDEX idx_comments_user ON scenario_comments(user_id);
CREATE INDEX idx_comments_status ON scenario_comments(status);

CREATE TRIGGER comments_updated_at
  BEFORE UPDATE ON scenario_comments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ══════════════════════════════════════════════════════════════
-- TABLE: user_statistics
-- Aggregated statistics per user
-- ══════════════════════════════════════════════════════════════

CREATE TABLE user_statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Usage stats
  scenarios_viewed INT NOT NULL DEFAULT 0,
  scenarios_bookmarked INT NOT NULL DEFAULT 0,
  journals_generated INT NOT NULL DEFAULT 0,
  ai_journals_generated INT NOT NULL DEFAULT 0,
  tools_used INT NOT NULL DEFAULT 0,
  
  -- Time tracking
  total_time_saved_minutes INT NOT NULL DEFAULT 0,
  
  -- Most used
  top_scenarios JSONB DEFAULT '[]'::JSONB,
  top_tools JSONB DEFAULT '[]'::JSONB,
  
  -- Dates
  first_activity_at TIMESTAMPTZ,
  last_activity_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER stats_updated_at
  BEFORE UPDATE ON user_statistics
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- ══════════════════════════════════════════════════════════════

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenario_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinical_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenario_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_statistics ENABLE ROW LEVEL SECURITY;

-- ── PROFILES ────────────────────────────────────────────────

-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update all profiles (e.g., tier changes)
CREATE POLICY "Admins can update all profiles"
  ON profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ── CATEGORIES ──────────────────────────────────────────────

-- Everyone can read categories
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  USING (true);

-- Only admins can modify categories
CREATE POLICY "Admins can manage categories"
  ON categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ── SCENARIOS ───────────────────────────────────────────────

-- Free users see only non-premium published scenarios
CREATE POLICY "Free users view free scenarios"
  ON scenarios FOR SELECT
  USING (
    is_published = TRUE AND (
      is_premium = FALSE OR
      EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND (tier IN ('kliniker', 'klinik') OR role = 'admin')
      )
    )
  );

-- Admins can manage all scenarios
CREATE POLICY "Admins can manage scenarios"
  ON scenarios FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ── SCENARIO VERSIONS ───────────────────────────────────────

-- Only admins can view version history
CREATE POLICY "Admins can view versions"
  ON scenario_versions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ── BOOKMARKS ───────────────────────────────────────────────

-- Users can manage their own bookmarks
CREATE POLICY "Users manage own bookmarks"
  ON bookmarks FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ── CLINICAL NOTES ──────────────────────────────────────────

-- Users can manage their own notes
CREATE POLICY "Users manage own notes"
  ON clinical_notes FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ── ANALYTICS EVENTS ────────────────────────────────────────

-- Users can insert their own events
CREATE POLICY "Users can insert own events"
  ON analytics_events FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Only admins can read analytics
CREATE POLICY "Admins can view analytics"
  ON analytics_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ── FEEDBACK ENTRIES ────────────────────────────────────────

-- Users can create feedback
CREATE POLICY "Users can create feedback"
  ON feedback_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can view their own feedback
CREATE POLICY "Users can view own feedback"
  ON feedback_entries FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can manage all feedback
CREATE POLICY "Admins can manage feedback"
  ON feedback_entries FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ── SCENARIO COMMENTS ───────────────────────────────────────

-- Anyone can view approved comments
CREATE POLICY "View approved comments"
  ON scenario_comments FOR SELECT
  USING (status = 'approved' OR auth.uid() = user_id);

-- Users can create comments
CREATE POLICY "Users can create comments"
  ON scenario_comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update own pending comments
CREATE POLICY "Users can update own comments"
  ON scenario_comments FOR UPDATE
  USING (auth.uid() = user_id AND status = 'pending')
  WITH CHECK (auth.uid() = user_id);

-- Users can delete own comments
CREATE POLICY "Users can delete own comments"
  ON scenario_comments FOR DELETE
  USING (auth.uid() = user_id);

-- Admins can manage all comments
CREATE POLICY "Admins can manage comments"
  ON scenario_comments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ── USER STATISTICS ─────────────────────────────────────────

-- Users can view their own stats
CREATE POLICY "Users view own stats"
  ON user_statistics FOR SELECT
  USING (auth.uid() = user_id);

-- Users can update their own stats (via triggers/functions)
CREATE POLICY "Users update own stats"
  ON user_statistics FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- System can insert stats
CREATE POLICY "System can insert stats"
  ON user_statistics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admins can view all stats
CREATE POLICY "Admins can view all stats"
  ON user_statistics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ══════════════════════════════════════════════════════════════
-- Update category scenario counts (trigger)
-- ══════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.update_category_scenario_count()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE categories SET scenario_count = scenario_count + 1 WHERE id = NEW.category_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE categories SET scenario_count = scenario_count - 1 WHERE id = OLD.category_id;
  ELSIF TG_OP = 'UPDATE' AND OLD.category_id != NEW.category_id THEN
    UPDATE categories SET scenario_count = scenario_count - 1 WHERE id = OLD.category_id;
    UPDATE categories SET scenario_count = scenario_count + 1 WHERE id = NEW.category_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE TRIGGER update_category_count
  AFTER INSERT OR UPDATE OR DELETE ON scenarios
  FOR EACH ROW EXECUTE FUNCTION public.update_category_scenario_count();
