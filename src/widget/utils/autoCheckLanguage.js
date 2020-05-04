const lang = navigator.language || navigator.userLanguage

export default function (defaultLang, ruLang) {
  switch (lang) {
    case 'ru-RU': return ruLang
    default: return defaultLang
  }
}