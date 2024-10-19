const scrollUp = (selector = 'root'): void => {
  const main = window.document.querySelector(`#${selector}`)
  if (main !== undefined && main !== null) {
    main.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    return
  }
  
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}
  
export default scrollUp
  