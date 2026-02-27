'use client';

import { FuriganaProvider } from '@/contexts/FuriganaContext';
import type { ReactNode } from 'react';

/**
 * Client Componentラッパー
 * Server Component（layout.tsx）から直接Context Providerを使えないため、
 * このコンポーネントでラップする
 */
export function Providers({ children }: { children: ReactNode }) {
  return <FuriganaProvider>{children}</FuriganaProvider>;
}
