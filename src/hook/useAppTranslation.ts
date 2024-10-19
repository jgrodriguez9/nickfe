import { useCallback, useMemo } from "react"
import { useTranslation, UseTranslationResponse } from "react-i18next"

type AppTranslationProps = {
    ns?: string
    keyPrefix?: string
}

type Format = {
    date: string
    time: string
    dateTime: string
  }

interface AppTranslationReturn  extends Pick<UseTranslationResponse<string, string>, 't'> {
  language: string
  languages: string[]
  format: Format
  changeLanguage: (lng: string) => Promise<void>
}

const useAppTranslation = ({
  ns = 'translation',
  keyPrefix
}: AppTranslationProps = {}): AppTranslationReturn => {
  const { t, i18n } = useTranslation(ns, { keyPrefix })
  
  const language = useMemo(() => i18n.language, [i18n.language])
  
  const format = useMemo<Format>(() => {
    const _format = {
      date: 'MM/dd/yyyy',
      time: 'HH:mm',
      dateTime: ''
    }
  
    if (language === 'es') {
      _format.time = 'hh:mm a'
      _format.date = 'dd/MM/yyyy'
    }
  
    _format.dateTime = `${_format.date} ${_format.time}`
  
    return _format
  }, [language])
  
  const changeLanguage = useCallback(
    async (lng: string): Promise<void> => {
      await i18n.changeLanguage(lng)
    },
  
    [i18n]
  )
  
  return {
    t,
    language,
    languages: Object.keys(i18n.store.data),
    format,
    changeLanguage,    
  }
}
  
export default useAppTranslation