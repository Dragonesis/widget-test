import queryString from 'query-string'

import flatpickr from 'flatpickr'
import { Russian } from 'flatpickr/dist/l10n/ru.js'
import autoCheckLanguage from '../utils/autoCheckLanguage'
import setSize from '../utils/setSize'

const params = window.location.search

const paramsObject = queryString.parse(params)
const lang = paramsObject.lang || 'en'

const langStrings = {
  en: null,
  ru: Russian,
  auto: autoCheckLanguage(null, Russian)
}

const dateFrom = flatpickr('.calendar', {
  dateFormat: 'd.m.Y',
  inline: true,
  mode: 'range',
  minDate: 'today',
  locale: langStrings[lang],
  onChange: function(selectedDates, dateStr, instance) {
    if (selectedDates.length === 2) {
      parent.postMessage({ type: 'calendar', isVisibleCalendar: '0' }, '*')
      localStorage.setItem('dateStr', dateStr)
    }
  },
})

setSize('calendar', dateFrom.calendarContainer)