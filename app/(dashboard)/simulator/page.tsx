'use client';

/**
 * app/(dashboard)/simulator/page.tsx
 *
 * Huvud-orkestrator för DentaGuide-Pro Simulator & Fortbildning.
 * Kopplar ihop alla UI-komponenter med useSimulatorSession-hooken.
 *
 * Tillstånd:
 *   idle             → <StartScreen>
 *   presenting_case  → <ProgressBar> + <CasePresentation> + <AnswerInterface>
 *   showing_feedback → <ProgressBar> + <FeedbackCard>
 *   showing_results  → <ResultScreen>
 */

import React from 'react';
import { SimulatorLayout } from '@/components/simulator/SimulatorLayout';
import { StartScreen } from '@/components/simulator/StartScreen';
import { ProgressBar } from '@/components/simulator/ProgressBar';
import { CasePresentation } from '@/components/simulator/CasePresentation';
import { AnswerInterface } from '@/components/simulator/AnswerInterface';
import { FeedbackCard } from '@/components/simulator/FeedbackCard';
import { ResultScreen } from '@/components/simulator/ResultScreen';
import { useSimulatorSession } from '@/hooks/useSimulatorSession';
import { getCategoryAccent } from '@/lib/simulator/category-colors';
import { calculateGrade } from '@/lib/simulator/scoring';

export default function SimulatorPage() {
  const {
    state,
    startSession,
    submitAnswer,
    nextCase,
    resetSession,
    totalScore,
    maxScore,
  } = useSimulatorSession();

  // Aktivt scenario och accentfärg för detta domänområde
  const currentScenario = state.scenarios[state.currentCaseIndex] ?? null;
  const accentColor = currentScenario
    ? getCategoryAccent(currentScenario.category_slug)
    : '#CC5833';

  // Betyg beräknas klientside — API:et bekräftar vid finish
  const grade = calculateGrade(
    maxScore > 0 ? (totalScore / maxScore) * 100 : 0,
  );

  // Är detta sista fallet? (0-indexerat)
  const isLastCase = state.currentCaseIndex >= state.scenarios.length - 1;

  return (
    <SimulatorLayout>

      {/* ── IDLE: Startskärm ─────────────────────────────── */}
      {state.status === 'idle' && (
        <StartScreen
          onStart={(difficulty, categoryIds) =>
            startSession.mutate({ difficulty, categoryIds })
          }
          isLoading={startSession.isPending}
        />
      )}

      {/* ── AKTIV SESSION: Progress + fall-innehåll ─────── */}
      {(state.status === 'presenting_case' ||
        state.status === 'showing_feedback') && (
        <>
          <ProgressBar
            current={state.currentCaseIndex + 1}
            total={state.scenarios.length || 5}
            difficulty={
              /* Visa domännamnet (kategori) i progress-baren */
              currentScenario?.category_slug
                ? currentScenario.category_slug.charAt(0).toUpperCase() +
                  currentScenario.category_slug.slice(1)
                : 'Standard'
            }
            accentColor={accentColor}
          />

          <div className="pb-44">
            {/* Fall-presentation + svarspanel */}
            {state.status === 'presenting_case' && currentScenario && (
              <>
                <CasePresentation scenario={currentScenario} />
                <AnswerInterface
                  isSubmitting={submitAnswer.isPending}
                  onSubmit={(data) => submitAnswer.mutate(data)}
                  categoryId={currentScenario.category_id}
                />
              </>
            )}

            {/* Feedback-kort efter insänt svar */}
            {state.status === 'showing_feedback' &&
              state.lastFeedback && (
                <FeedbackCard
                  feedback={state.lastFeedback}
                  onNext={nextCase}
                  isLast={isLastCase}
                />
              )}
          </div>
        </>
      )}

      {/* ── RESULTAT: Sammanfattning ─────────────────────── */}
      {state.status === 'showing_results' && (
        <ResultScreen
          totalScore={totalScore}
          maxScore={maxScore}
          grade={grade}
          results={state.results.map((r) => ({
            user_diagnosis: r.user_diagnosis,
            user_icd:       r.user_icd,
            total_case_score: r.scores.total,
          }))}
          onRestart={resetSession}
        />
      )}

    </SimulatorLayout>
  );
}
