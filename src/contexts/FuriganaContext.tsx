'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { removeFurigana } from '@/lib/furigana';
import type { ReactNode } from 'react';

interface FuriganaContextValue {
  showFurigana: boolean;
  setShowFurigana: (value: boolean) => void;
  /** ONならそのまま返す、OFFならふりがなを除去する */
  f: (text: string) => string;
}

const FuriganaContext = createContext<FuriganaContextValue | null>(null);

export function FuriganaProvider({ children }: { children: ReactNode }) {
  const [showFurigana, setShowFurigana] = useState(true);

  const f = useCallback(
    (text: string): string => {
      return showFurigana ? text : removeFurigana(text);
    },
    [showFurigana]
  );

  return (
    <FuriganaContext.Provider value={{ showFurigana, setShowFurigana, f }}>
      {children}
    </FuriganaContext.Provider>
  );
}

export function useFurigana(): FuriganaContextValue {
  const context = useContext(FuriganaContext);
  if (!context) {
    throw new Error('useFurigana must be used within a FuriganaProvider');
  }
  return context;
}
