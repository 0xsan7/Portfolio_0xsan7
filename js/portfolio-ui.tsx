import { initDock } from './dock-native'

declare const __SKYLINE_CSS__: string
declare const __PROJECT_ENTRY__: string
declare const __SKYLINE_ENTRY__: string
declare const __FOOTER_ENTRY__: string

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
enhanceNear('projects', () => import(new URL(__PROJECT_ENTRY__, import.meta.url).href))
enhanceNear('contribution-skyline', () => import(new URL(__SKYLINE_ENTRY__, import.meta.url).href), true)
enhanceNear('wordmark-footer', () => import(new URL(__FOOTER_ENTRY__, import.meta.url).href))
