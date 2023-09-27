const camelize = (str) => {
  const isDefis = str.startsWith('-');
  const arrString = str.split('-').filter(Boolean)
  return arrString.map((elem, i) => {
    if(i === 0 && !isDefis) return elem
    return elem[0].toUpperCase() + elem.slice(1)

  }).join('')
}
