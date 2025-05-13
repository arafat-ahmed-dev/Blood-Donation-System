"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, type TranslationKey } from "./translations"

type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
  t: (key: TranslationKey) => string
  formatDate: (date: Date | string | null) => string
  formatNumber: (num: number) => string
  formatCurrency: (amount: number) => string
  getDirection: () => "ltr" | "rtl"
  availableLanguages: { code: string; name: string }[]
}

const availableLanguages = [
  { code: "en", name: "English" },
  { code: "bn", name: "বাংলা" },
]

const defaultValue: LanguageContextType = {
  language: "bn", // Default to Bengali
  setLanguage: () => {},
  t: (key: TranslationKey) => String(key),
  formatDate: () => "",
  formatNumber: () => "",
  formatCurrency: () => "",
  getDirection: () => "ltr",
  availableLanguages,
}

const LanguageContext = createContext<LanguageContextType>(defaultValue)

export const useTranslation = () => useContext(LanguageContext)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState("bn") // Default to Bengali

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage && availableLanguages.some((lang) => lang.code === savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language)
    // Update html lang attribute
    document.documentElement.lang = language
    // Update direction
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
  }, [language])

  // Translation function
  const t = (key: TranslationKey): string => {
    // @ts-ignore - We know our keys exist in the translations
    if (translations[language] && translations[language][key]) {
      // @ts-ignore
      return translations[language][key]
    }

    // Fallback to English
    // @ts-ignore
    if (translations.en && translations.en[key]) {
      // @ts-ignore
      return translations.en[key]
    }

    // Return key if no translation found
    return String(key)
  }

  // Format date according to the current language
  const formatDate = (date: Date | string | null): string => {
    if (!date) return ""

    const dateObj = typeof date === "string" ? new Date(date) : date

    try {
      return new Intl.DateTimeFormat(language === "bn" ? "bn-BD" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(dateObj)
    } catch (error) {
      return String(date)
    }
  }

  // Format number according to the current language
  const formatNumber = (num: number): string => {
    try {
      return new Intl.NumberFormat(language === "bn" ? "bn-BD" : "en-US").format(num)
    } catch (error) {
      return String(num)
    }
  }

  // Format currency according to the current language
  const formatCurrency = (amount: number): string => {
    try {
      return new Intl.NumberFormat(language === "bn" ? "bn-BD" : "en-US", {
        style: "currency",
        currency: "BDT",
      }).format(amount)
    } catch (error) {
      return String(amount)
    }
  }

  // Get text direction based on language
  const getDirection = (): "ltr" | "rtl" => {
    return language === "ar" ? "rtl" : "ltr"
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        formatDate,
        formatNumber,
        formatCurrency,
        getDirection,
        availableLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
