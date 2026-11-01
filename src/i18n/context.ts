import { createContext, useContext } from 'react';
import type { MessageKey } from './messages';

export type Locale = 'zh' | 'en';
export interface LanguageContextValue {
  locale: Locale;
  path: string;
  to: (path: string) => string;
  languageUrl: (locale: Locale) => string;
  t: (key: MessageKey, values?: Record<string, string | number>) => string;
}
// Keep the context separate so editing translations does not recreate it during Fast Refresh.
export const LanguageContext = createContext<LanguageContextValue | null>(null);
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('LanguageProvider is required');
  return context;
}
