'use client';

import { useReducer, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

type SessionState = 'idle' | 'presenting_case' | 'showing_feedback' | 'showing_results';

interface State {
  status: SessionState;
  currentCaseIndex: number;
  sessionId: string | null;
  scenarios: any[];
  results: any[];
  lastFeedback: any | null;
}

type Action =
  | { type: 'START_SESSION'; sessionId: string; scenarios: any[] }
  | { type: 'SUBMIT_ANSWER'; feedback: any }
  | { type: 'NEXT_CASE' }
  | { type: 'FINISH_SESSION' }
  | { type: 'REHYDRATE'; session: any; results: any[]; scenarios: any[] }
  | { type: 'RESET' };

const initialState: State = {
  status: 'idle',
  currentCaseIndex: 0,
  sessionId: null,
  scenarios: [],
  results: [],
  lastFeedback: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START_SESSION':
      return {
        ...state,
        status: 'presenting_case',
        sessionId: action.sessionId,
        scenarios: action.scenarios,
        currentCaseIndex: 0,
        results: [],
      };
    case 'SUBMIT_ANSWER':
      return {
        ...state,
        status: 'showing_feedback',
        lastFeedback: action.feedback,
        results: [...state.results, action.feedback],
      };
    case 'NEXT_CASE':
      return {
        ...state,
        status: 'presenting_case',
        currentCaseIndex: state.currentCaseIndex + 1,
        lastFeedback: null,
      };
    case 'FINISH_SESSION':
      return {
        ...state,
        status: 'showing_results',
      };
    case 'REHYDRATE':
      const completedCount = action.results.length;
      const isFinished = action.session.status === 'completed';
      return {
        ...state,
        sessionId: action.session.id,
        scenarios: action.scenarios,
        results: action.results,
        currentCaseIndex: completedCount < 5 ? completedCount : 4,
        status: isFinished ? 'showing_results' : 'presenting_case',
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function useSimulatorSession() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const sessionIdFromUrl = searchParams.get('session');

  // Rehydrate session if ID in URL
  useEffect(() => {
    if (sessionIdFromUrl && !state.sessionId) {
      fetch(`/api/simulator/session/${sessionIdFromUrl}`)
        .then(res => res.json())
        .then(data => {
          if (data.session) {
            dispatch({ 
              type: 'REHYDRATE', 
              session: data.session, 
              results: data.results, 
              scenarios: data.scenarios 
            });
          }
        })
        .catch(err => console.error('Failed to rehydrate session', err));
    }
  }, [sessionIdFromUrl, state.sessionId]);

  const startSession = useMutation({
    mutationFn: async (opts: { difficulty: string; categoryIds: string[] }) => {
      const res = await fetch('/api/simulator/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(opts),
      });
      if (!res.ok) throw new Error('Failed to start session');
      return res.json();
    },
    onSuccess: (data) => {
      dispatch({ type: 'START_SESSION', sessionId: data.sessionId, scenarios: data.scenarios });
      router.push(`/simulator?session=${data.sessionId}`);
    },
  });

  const submitAnswer = useMutation({
    mutationFn: async (answer: {
      userDiagnosis: string;
      userIcd: string;
      userTlvCodes: string[];
      timeTakenSeconds: number;
    }) => {
      const res = await fetch('/api/simulator/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...answer,
          sessionId: state.sessionId,
          caseOrder: state.currentCaseIndex,
        }),
      });
      if (!res.ok) throw new Error('Failed to submit answer');
      return res.json();
    },
    onSuccess: (data) => {
      dispatch({ type: 'SUBMIT_ANSWER', feedback: data });
    },
  });

  const nextCase = useCallback(() => {
    if (state.currentCaseIndex < 4) {
      dispatch({ type: 'NEXT_CASE' });
    } else {
      dispatch({ type: 'FINISH_SESSION' });
    }
  }, [state.currentCaseIndex]);

  const resetSession = useCallback(() => {
    dispatch({ type: 'RESET' });
    router.push('/simulator');
  }, [router]);

  return {
    state,
    startSession,
    submitAnswer,
    nextCase,
    resetSession,
  };
}
