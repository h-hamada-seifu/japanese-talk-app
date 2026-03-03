'use client';

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface TranslationContextValue {
  showTranslation: boolean;
  setShowTranslation: (value: boolean) => void;
}

const TranslationContext = createContext<TranslationContextValue | null>(null);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [showTranslation, setShowTranslation] = useState(true);

  return (
    <TranslationContext.Provider value={{ showTranslation, setShowTranslation }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation(): TranslationContextValue {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
