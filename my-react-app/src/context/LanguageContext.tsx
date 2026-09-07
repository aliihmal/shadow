import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { translations } from "../Data/translations";

type Language = "en" | "ar";

type BilingualField = {
  en?: string;
  ar?: string;
};

type LanguageContextType = {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  t: (key: string) => string;
  pick: (field: string | BilingualField | null | undefined) => string;
  isRtl: boolean;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = "bakrico-lang";

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return "en";
    }

    const savedLanguage = localStorage.getItem(STORAGE_KEY);

    return savedLanguage === "ar" ? "ar" : "en";
  });

  useEffect(() => {
    document.documentElement.lang = language;

    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr";

    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  // Translate UI text:
  // t("nav.home")
  const t = (key: string): string => {
    const parts = key.split(".");

    let value: unknown = translations[language];

    for (const part of parts) {
      if (
        value &&
        typeof value === "object" &&
        part in value
      ) {
        value = (value as Record<string, unknown>)[part];
      } else {
        value = undefined;
        break;
      }
    }

    return typeof value === "string" ? value : key;
  };

  // Pick the correct language from bilingual JSON content:
  // pick(category.name)
  //
  // Example:
  // {
  //   "en": "Mixers",
  //   "ar": "خلاطات"
  // }
  const pick = (
    field: string | BilingualField | null | undefined
  ): string => {
    if (field == null) {
      return "";
    }

    if (typeof field === "string") {
      return field;
    }

    return field[language] ?? field.en ?? "";
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        pick,
        isRtl: language === "ar",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);

  if (!ctx) {
    throw new Error(
      "useLanguage must be used within a LanguageProvider"
    );
  }

  return ctx;
}