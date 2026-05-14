'use client';

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

export default function SimulatorPage() {
  const { 
    state, 
    startSession, 
    submitAnswer, 
    nextCase, 
    resetSession 
  } = useSimulatorSession();

  const currentScenario = state.scenarios[state.currentCaseIndex];
  const accentColor = currentScenario ? getCategoryAccent(currentScenario.category_slug) : '#CC5833';

  return (
    <SimulatorLayout>
      {state.status === 'idle' && (
        <StartScreen 
          onStart={(difficulty, categoryIds) => startSession.mutate({ difficulty, categoryIds })} 
        />
      )}

      {(state.status === 'presenting_case' || state.status === 'showing_feedback') && (
        <>
          <ProgressBar 
            current={state.currentCaseIndex + 1} 
            total={5} 
            difficulty={state.sessionId ? 'Active' : '...'} 
            accentColor={accentColor}
          />

          <div className="pb-40">
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

            {state.status === 'showing_feedback' && state.lastFeedback && (
              <FeedbackCard 
                feedback={state.lastFeedback} 
                onNext={nextCase}
                isLast={state.currentCaseIndex === 4}
              />
            )}
          </div>
        </>
      )}

      {state.status === 'showing_results' && (
        <ResultScreen 
          totalScore={state.results.reduce((sum, r) => sum + r.scores.total, 0)}
          maxScore={500}
          grade={state.results.length === 5 ? 'A' : 'F'} // Simplified for now, finish API should provide this
          results={state.results.map((r, i) => ({
            user_diagnosis: r.user_diagnosis,
            user_icd: r.user_icd,
            total_case_score: r.scores.total
          }))}
          onRestart={resetSession}
        />
      )}
    </SimulatorLayout>
  );
}
