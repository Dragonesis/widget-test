import 'nodelist-foreach-polyfill'
import queryString from 'query-string'

import autoCheckLanguage from '../utils/autoCheckLanguage'
import updateColors from '../views/Form/parts/updateColors'
import handlingResize from '../views/Form/parts/handlingResize'
import handlingSubmit from '../views/Form/parts/handlingSubmit'
import { i18n_en, i18n_ru } from '../i18n'

import widget from '../views/Form/index.hbs'

const params = window.location.search
const paramsObject = queryString.parse(params, {arrayFormat: 'comma'})

const widgetContainer = document.getElementById('widget')
const lang = paramsObject.lang || 'en'

const langStrings = {
  en: i18n_en,
  ru: i18n_ru,
  auto: autoCheckLanguage(i18n_en, i18n_ru)
}

widgetContainer.innerHTML = widget(langStrings[lang])

updateColors(paramsObject.colors)
handlingResize(widgetContainer)
handlingSubmit()

const dateInput = document.querySelectorAll('[required]')

dateInput.forEach(el => {
  el.onfocus = () => {
    parent.postMessage({ type: 'form', isVisibleCalendar: '1' }, '*')
  }
})

window.addEventListener('storage', function(e) {  
  const date = localStorage.getItem('dateStr')
  if (date) {
    const dataAray = date.split(' to ')
    dataAray.forEach((el, i) => {
      dateInput[i].value = el
    })
  }
})

document.addEventListener('click', function (e) {
  if (!event.target.closest('.input__field')) { 
    parent.postMessage({ type: 'form', isVisibleCalendar: '0' }, '*')
  }
})