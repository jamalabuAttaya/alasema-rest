import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext(null);
const SUPPORTED_LANGUAGES = Object.freeze(['ar', 'en']);

function normalizeLanguage(value) {
  return SUPPORTED_LANGUAGES.includes(value) ? value : 'ar';
}

function readInitialLanguage() {
  try {
    return normalizeLanguage(localStorage.getItem('preferred_lang'));
  } catch {
    return 'ar';
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(readInitialLanguage);

  useLayoutEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

    try {
      localStorage.setItem('preferred_lang', language);
    } catch {
      // The language still works when browser storage is unavailable.
    }
  }, [language]);

  const setLanguage = useCallback((nextLanguage) => {
    setLanguageState(normalizeLanguage(nextLanguage));
  }, []);

  const t = useCallback(
    (key) => translations[language]?.[key] ?? translations.ar[key] ?? key,
    [language]
  );

  const contextValue = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }

  return context;
}
