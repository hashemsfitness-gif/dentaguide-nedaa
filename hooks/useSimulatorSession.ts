'use client';

/**
 * hooks/useSimulatorSession.ts
 *
 * Huvud-hook för simulatorns sessionstillstånd.
 * Orkestrerar: start, svar, nästa fall, reset.
 * All nätverkskommunikation sker via TanStack Query-mutations mot API-routes.
 *
 * API-routes som krävs (implementeras av backend-agent):
 *   POST /api/simulator/start    → { sessionId, scenarios }
 *   POST /api/simulator/submit   → { scores, correct }
 *   POST /api/simulator/finish   → { finalGrade, savedAt }
 */

import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { calculateGrade, type Grade } from '@/lib/simulator/scoring';

// ── Typer ──────────────────────────────────────────────────

export type SimulatorStatus =
  | 'idle'
  | 'presenting_case'
  | 'showing_feedback'
  | 'showing_results';

export interface SimulatorScenario {
  id: string;
  category_id: string;
  category_slug: string;
  patient_quote: string;
  /** HTML-sträng med anamnes */
  anamnes: string;
  /** HTML-sträng med klinisk status & fynd */
  status_section: string;
}

export interface ScoreBreakdown {
  diagnosis: number;
  icd: number;
  tlv: number;
  total: number;
}

export interface FeedbackData {
  scores: ScoreBreakdown;
  correct: {
    trolig_diagnos: string;
    icd_code: string;
    differentialdiagnoser: string[];
    tlvCodes: string[];
    kallor: Array<{ name: string }>;
  };
}

export interface CaseResult {
  user_diagnosis: string;
  user_icd: string;
  scores: ScoreBreakdown;
}

interface SimulatorState {
  status: SimulatorStatus;
  sessionId: string | null;
  scenarios: SimulatorScenario[];
  currentCaseIndex: number;
  lastFeedback: FeedbackData | null;
  results: CaseResult[];
  grade: Grade;
}

// ── Initialt tillstånd ─────────────────────────────────────

const INITIAL_STATE: SimulatorState = {
  status: 'idle',
  sessionId: null,
  scenarios: [],
  currentCaseIndex: 0,
  lastFeedback: null,
  results: [],
  grade: 'F',
};

// ── Hook ───────────────────────────────────────────────────

export function useSimulatorSession() {
  const [state, setState] = useState<SimulatorState>(INITIAL_STATE);
  const queryClient = useQueryClient();

  // ── Starta session ───────────────────────────────────────
  const startSession = useMutation({
    mutationFn: async (params: {
      difficulty: 'basic' | 'standard' | 'advanced';
      categoryIds: string[];
    }) => {
      const res = await fetch('/api/simulator/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? 'Kunde inte starta session');
      }
      return res.json() as Promise<{
        sessionId: string;
        scenarios: SimulatorScenario[];
      }>;
    },
    onSuccess: (data) => {
      setState({
        ...INITIAL_STATE,
        status: 'presenting_case',
        sessionId: data.sessionId,
        scenarios: data.scenarios,
      });
    },
  });

  // ── Skicka svar ──────────────────────────────────────────
  const submitAnswer = useMutation({
    mutationFn: async (params: {
      userDiagnosis: string;
      userIcd: string;
      userTlvCodes: string[];
      timeTakenSeconds: number;
    }) => {
      const res = await fetch('/api/simulator/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: state.sessionId,
          caseIndex: state.currentCaseIndex,
          ...params,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? 'Kunde inte skicka svar');
      }
      return res.json() as Promise<FeedbackData>;
    },
    onSuccess: (feedback, variables) => {
      setState((prev) => ({
        ...prev,
        status: 'showing_feedback',
        lastFeedback: feedback,
        results: [
          ...prev.results,
          {
            user_diagnosis: variables.userDiagnosis,
            user_icd: variables.userIcd,
            scores: feedback.scores,
          },
        ],
      }));
    },
  });

  // ── Nästa fall ───────────────────────────────────────────
  const nextCase = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.currentCaseIndex + 1;

      if (nextIndex >= prev.scenarios.length) {
        // Sessionens alla fall klara
        const totalScore = [...prev.results].reduce(
          (sum, r) => sum + r.scores.total,
          0,
        );
        const maxScore = prev.scenarios.length * 100;
        const pct = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

        return {
          ...prev,
          status: 'showing_results',
          grade: calculateGrade(pct),
        };
      }

      return {
        ...prev,
        status: 'presenting_case',
        currentCaseIndex: nextIndex,
        lastFeedback: null,
      };
    });
  }, []);

  // ── Återställ ────────────────────────────────────────────
  const resetSession = useCallback(() => {
    // Invalidera aktiv-session-query så ResumeBanner försvinner
    queryClient.invalidateQueries({ queryKey: ['active-session'] });
    setState(INITIAL_STATE);
  }, [queryClient]);

  // ── Beräknade värden ─────────────────────────────────────
  const totalScore = state.results.reduce((sum, r) => sum + r.scores.total, 0);
  const maxScore   = (state.scenarios.length || 5) * 100;

  return {
    state,
    startSession,
    submitAnswer,
    nextCase,
    resetSession,
    totalScore,
    maxScore,
  };
}
