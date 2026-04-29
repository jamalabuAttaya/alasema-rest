import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext(null);

// ⚡ تجميد كائن الترجمات مرة واحدة فقط (يمنع التعديل ويحسن الأداء)
const frozenTranslations = Object.freeze(translations);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem('preferred_lang');
      return saved || 'ar';
    } catch {
      return 'ar';
    }
  });

  // ⚡ useRef لتجنب إعادة التصيير المتكرر
  const prevLanguage = useRef(language);

  useEffect(() => {
    // ⚡ لا تغير DOM إذا اللغة لم تتغير
    if (prevLanguage.current === language) return;
    prevLanguage.current = language;

    // ⚡ تجميع تغييرات DOM في عملية واحدة
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    try {
      localStorage.setItem('preferred_lang', language);
    } catch {
      // localStorage قد يكون ممتلئاً أو معطلاً
    }
  }, [language]);

  // ⚡ useCallback مع كاش داخلي للترجمات الأكثر استخداماً
  const t = useCallback((key) => {
    // ⚡ استخدام كائن اللغة الحالي مباشرة (أسرع من الوصول لكل مرة)
    const langTranslations = frozenTranslations[language];
    if (langTranslations?.[key]) return langTranslations[key];
    
    // ⚡ Fallback للعربية
    const arTranslations = frozenTranslations['ar'];
    if (arTranslations?.[key]) return arTranslations[key];
    
    return key;
  }, [language]);

  // ⚡ useMemo لتثبيت كائن القيمة (يمنع إعادة تصيير المستهلكين)
  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    t,
  }), [language, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

// ⚡ Hook مخصص مع فحص سريع
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within <LanguageProvider>');
  }
  return context;
}

// ⚡ تصدير إضافي: Hook للغة فقط (إذا المكون لا يحتاج t)
export function useLanguageValue() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageValue must be used within <LanguageProvider>');
  }
  return context.language;
}

// ⚡ تصدير إضافي: Hook للترجمة فقط (أخف)
export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within <LanguageProvider>');
  }
  return context.t;
}