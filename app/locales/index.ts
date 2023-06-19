import EN from "./en";
import JA from "./ja";
import { merge } from "../utils/merge";

export type { LocaleType, RequiredLocaleType } from "./ja";

export const AllLangs = ["en", "ja"] as const;
export type Lang = (typeof AllLangs)[number];

export const ALL_LANG_OPTIONS: Record<Lang, string> = {
  en: "English",
  ja: "日本語",
};

const LANG_KEY = "lang";
const DEFAULT_LANG = "ja";

function getItem(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setItem(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

function getLanguage() {
  try {
    return navigator.language.toLowerCase();
  } catch {
    return DEFAULT_LANG;
  }
}

export function getLang(): Lang {
  const savedLang = getItem(LANG_KEY);

  if (AllLangs.includes((savedLang ?? "") as Lang)) {
    return savedLang as Lang;
  }

  const lang = getLanguage();

  for (const option of AllLangs) {
    if (lang.includes(option)) {
      return option;
    }
  }

  return DEFAULT_LANG;
}

export function changeLang(lang: Lang) {
  setItem(LANG_KEY, lang);
  location.reload();
}

const fallbackLang = EN;
const targetLang = {
  en: EN,
  ja: JA,
}[getLang()] as typeof JA;

// if target lang missing some fields, it will use fallback lang string
merge(fallbackLang, targetLang);

export default fallbackLang as typeof JA;
