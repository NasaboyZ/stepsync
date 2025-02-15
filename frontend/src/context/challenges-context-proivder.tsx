import React, { createContext, useContext, useState, useCallback } from 'react';
import { Challenge } from '@/types/interfaces/challenges';
import { fetchChallenges } from '@/utils/api';
import { useSession } from 'next-auth/react';

interface ChallengesContextType {
  challenges: Challenge[];
  loading: boolean;
  error: string | null;
  refreshChallenges: () => Promise<void>;
  updateChallengeInState: (updatedChallenge: Challenge) => void;
  addChallengeToState: (newChallenge: Challenge) => void;
}

const ChallengesContext = createContext<ChallengesContextType | undefined>(undefined);

export function ChallengesProvider({ children }: { children: React.ReactNode }) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const refreshChallenges = useCallback(async () => {
    if (!session?.accessToken) return;
    
    try {
      setLoading(true);
      const challengesData = await fetchChallenges(session.accessToken);
      setChallenges(challengesData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  }, [session?.accessToken]);

  const updateChallengeInState = useCallback((updatedChallenge: Challenge) => {
    setChallenges(prev => 
      prev.map(challenge => 
        challenge.id === updatedChallenge.id ? updatedChallenge : challenge
      )
    );
  }, []);

  const addChallengeToState = useCallback((newChallenge: Challenge) => {
    setChallenges(prev => [...prev, newChallenge]);
  }, []);

  return (
    <ChallengesContext.Provider value={{
      challenges,
      loading,
      error,
      refreshChallenges,
      updateChallengeInState,
      addChallengeToState,
    }}>
      {children}
    </ChallengesContext.Provider>
  );
}

export function useChallenges() {
  const context = useContext(ChallengesContext);
  if (context === undefined) {
    throw new Error('useChallenges must be used within a ChallengesProvider');
  }
  return context;
}