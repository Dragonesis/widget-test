export default function (colors) {
  if (colors) {   
    const colorsFormatted = colors.map(item => {
      const itemArray = item.split(':')
      return `--${itemArray[0]}: #${itemArray[1]}`
    }).join(';')

    document.documentElement.style.cssText = colorsFormatted
  }
}