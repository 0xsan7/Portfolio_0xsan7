import { initDock } from './dock-native'

declare const __SKYLINE_CSS__: string
declare const __PROJECT_ENTRY__: string
declare const __SKYLINE_ENTRY__: string
declare const __FOOTER_ENTRY__: string
declare const __LOGO_ENTRY__: string

initDock()

let componentStyles: Promise<void> | undefined
function loadComponentStyles() {
  return componentStyles ??= new Promise<void>((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = new URL(__SKYLINE_CSS__, import.meta.url).href
    link.onload = () => resolve()
    link.onerror = () => { componentStyles = undefined; link.remove(); reject(new Error('Component styles unavailable')) }
    document.head.append(link)
  })
}
function enhanceNear(id: string, load: () => Promise<unknown>, styles = false, rootMargin = '400px') {
  const element = document.getElementById(id)
  if (!element) return
  const enhance = () => {
    const start = styles ? loadComponentStyles() : Promise.resolve()
    start.then(load).catch(() => element.setAttribute('data-load-error', 'true'))
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); enhance() }
    }, { rootMargin })
    observer.observe(element)
  } else enhance()
}
enhanceNear('projects', () => import(new URL(__PROJECT_ENTRY__, import.meta.url).href))
enhanceNear('contribution-skyline', () => import(new URL(__SKYLINE_ENTRY__, import.meta.url).href), true)
enhanceNear('wordmark-footer', () => import(new URL(__FOOTER_ENTRY__, import.meta.url).href))

// Defer the optional logo effect until the page and its primary content are ready.
const prepareLogo = () => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) return
  const start = () => enhanceNear('logo-reveal', () => import(new URL(__LOGO_ENTRY__, import.meta.url).href), false, '0px')
  if ('requestIdleCallback' in window) window.requestIdleCallback(start, { timeout: 2000 })
  else setTimeout(start, 250)
}
if (document.readyState === 'complete') prepareLogo()
else addEventListener('load', prepareLogo, { once: true })
