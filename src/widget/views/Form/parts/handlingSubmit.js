import 'nodelist-foreach-polyfill'
import 'element-closest-polyfill'
import formSerialize from 'form-serialize'

export default function () {
  const form = document.querySelector('.widget__form')
  const fields = form.querySelectorAll('[required]')
  const button = form.querySelector('.widget__button')

  function sending(form) {
    const action = form.getAttribute('action')
    const params = formSerialize(form)

    if (!params) {
      fields.forEach(element => {
        element.classList.add('_error')
      })
      return
    }
    
    window.open(`${action}?${params}`)
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    sending(form)
  })

  if (button !== null) {
    button.addEventListener('click', (event) => {
      event.preventDefault()
      const domEvent = document.createEvent('Event')
      domEvent.initEvent('submit', false, true)
      event.target.closest('form').dispatchEvent(domEvent)
    })
  }
}