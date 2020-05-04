import setSize from '../../../utils/setSize'

export default function(element) {
  setSize('form', element)
  const throttle = function(type, name, obj) {
    obj = obj || window
    let running = false
    const func = function() {
      if (running) { return }
      running = true
        requestAnimationFrame(function() {
        obj.dispatchEvent(new CustomEvent(name))
        running = false
      })
    }
    obj.addEventListener(type, func)
  }
  throttle('resize', 'optimizedResize')

  window.addEventListener('optimizedResize', () => {
    setSize('form', element)
  })
}