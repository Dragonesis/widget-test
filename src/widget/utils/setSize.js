export default function (type, element) {
  const size = {
    width: element.clientWidth,
    height: element.clientHeight
  }
  parent.postMessage({ type: type, size: size }, '*')
}