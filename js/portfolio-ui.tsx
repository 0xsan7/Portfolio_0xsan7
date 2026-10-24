import { initDock } from './dock-native'

initDock()

let componentStyles: Promise<void> | undefined
function loadComponentStyles() {
  return componentStyles ??= new Promise<void>((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = new URL('../css/skyline.generated.css?v=8', import.meta.url).href
    link.onload = () => resolve()
    link.onerror = () => { componentStyles = undefined; link.remove(); reject(new Error('Component styles unavailable')) }
    document.head.append(link)
  })
}
function enhanceNear(id: string, load: () => Promise<unknown>, styles = false) {
  const element = document.getElementById(id)
  if (!element) return
  const enhance = () => {
    const start = styles ? loadComponentStyles() : Promise.resolve()
    start.then(load).catch(() => element.setAttribute('data-load-error', 'true'))
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); enhance() }
    }, { rootMargin: '400px' })
    observer.observe(element)
  } else enhance()
}
enhanceNear('projects', () => import('./projects-entry'))
enhanceNear('contribution-skyline', () => import('./skyline-entry'), true)
enhanceNear('wordmark-footer', () => import('./footer-entry'))
