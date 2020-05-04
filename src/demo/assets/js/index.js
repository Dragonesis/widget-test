import 'nodelist-foreach-polyfill'

const host = window.location.host
const btnChangeColor = document.querySelector('.js-change-color')
const btnChangeLanguage = document.querySelector('.js-change-language')
const btnAutoCheckLanguage = document.querySelector('.js-toggle-autochek-language')
const textBoxUrl = document.querySelector('#text-box-url')
const urlWidget = document.getElementById('widget-script').getAttribute('src')


function stringToInsert(url) {
  return `<div id="widget"></div> <script src="${host}/${url}" async id="widget-script"></script>`
}

textBoxUrl.value = stringToInsert(urlWidget)

const params = {
  colors: {
    params: 'fill-color:444,text-color:08e692,accent-color:23c4f5',
    isOn: false,
  },
  lang: {
    params: 'en',
    isOn: false,
  }
}

function changeLocation(el) {
  const currentSrc = el.getAttribute('src')
  
  const serializeParams = Object
    .entries(params)
    .filter(item => item[1].isOn)
    .map(item => {
      return `${item[0]}=${item[1].params}`
    }).join('&')    
  el.contentWindow.location = `${currentSrc}&${serializeParams}`
  textBoxUrl.value = stringToInsert(`${urlWidget}&${serializeParams}`)
}

btnChangeColor.addEventListener('click', function (e) {
  const iframeTag = document.querySelectorAll('iframe')
  params.colors.isOn = !params.colors.isOn
  changeLocation(iframeTag[1])
})

btnChangeLanguage.addEventListener('click', function (e) {
  const iframeTag = document.querySelectorAll('iframe')
  params.lang.isOn = true
  params.lang.params = params.lang.params === 'ru' ? 'en' : 'ru'
  iframeTag.forEach((el, i) => {
    changeLocation(el)
  })
})

btnAutoCheckLanguage.addEventListener('click', function (e) {
  const iframeTag = document.querySelectorAll('iframe')
  params.lang.isOn = true
  params.lang.params = params.lang.params === 'auto' ? 'en' : 'auto'
  iframeTag.forEach((el, i) => {
    changeLocation(el, params)
  })
})

