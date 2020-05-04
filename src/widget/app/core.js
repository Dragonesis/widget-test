import queryString from 'query-string'

const widgetScript = document.getElementById('widget-script')
const widgetContainer = document.getElementById('widget')
const sourceParams = widgetScript.getAttribute('src')
const params = sourceParams.substr(sourceParams.indexOf('?'))
const modParams = params
const paramsObject = queryString.parse(params, {arrayFormat: 'comma'})


widgetContainer.style.cssText = 'position: relative;position: relative;z-index: 10;'

const styleForForm = 'border-width: 0;width: 100%;height: 0;display: block;'
const styleForCalendar = 'border-width: 0;opacity: 0;top: 100%;left: 50%;position: absolute;pointer-events: none;'

const form = document.createElement('iframe')
  form.style.cssText = styleForForm
  form.setAttribute('src', paramsObject.urlToWidget + 'form.html' + modParams)


const calendar = document.createElement('iframe')
  calendar.style.cssText = styleForCalendar
  calendar.setAttribute('src', paramsObject.urlToWidget + 'calendar.html' + modParams)


widgetContainer.appendChild(calendar)
widgetContainer.appendChild(form)

const message = window.addEventListener('message', function (e) {
  if (e.data.type === 'form' && e.data.size) {
    form.style.height = e.data.size.height + 'px'
  }
  if (e.data.type === 'calendar' && e.data.size) {
    calendar.style.width = e.data.size.width + 'px'
    calendar.style.height = e.data.size.height + 'px'
    calendar.style.marginLeft = '-' + e.data.size.width / 2 + 'px'
  }
  if (e.data.isVisibleCalendar) {
    calendar.style.opacity = e.data.isVisibleCalendar
    calendar.style.pointerEvents = e.data.isVisibleCalendar === '1' ? 'auto' : 'none'
  }
})

document.addEventListener('click', function (e) {
  window.postMessage({ type: 'calendar', isVisibleCalendar: '0' }, '*')
})
