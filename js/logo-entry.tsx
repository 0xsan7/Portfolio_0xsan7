import { darkLogoSettings, loadLogo, startEngine } from '@/lib/liquid-glass-engine'

// Native adapter: the portfolio keeps React off its initial request path.
const host = document.getElementById('logo-reveal')
const motion = matchMedia('(prefers-reduced-motion: reduce)')
if (host && !motion.matches) {
  const wrap = document.createElement('div')
  wrap.className = 'glass-logo-reveal'
  wrap.setAttribute('role', 'img')
  wrap.setAttribute('aria-label', 'SAN / 0xsan7, Security and Blockchain')
  const image = host.querySelector('img')
  if (image) { image.alt = ''; image.setAttribute('aria-hidden', 'true') }
  wrap.append(...host.childNodes)
  host.append(wrap)
  const live = { current: {
    settings: {
      ...darkLogoSettings,
      background: '#000000', originalColors: true, iconPlate: false,
      tileSize: 240, logoScale: 1.1, finalScale: 1.15,
      dispersion: 0.6, colorBleed: 0.25, halo: 0.25, startZoom: 1.5, present: 2.4,
    },
    loop: false, speed: 1,
  } }
  const engine = startEngine(wrap, live)
  let disposed = false
  const dispose = () => {
    disposed = true
    engine?.dispose()
    wrap.removeAttribute('data-rendered')
  }
  if (engine) {
    engine.ready.then(async ready => {
      if (!ready) { dispose(); return }
      if (disposed) return
      const data = await loadLogo('assets/brand/san-logo-420.webp', image ?? undefined)
      if (!disposed) engine.setLogo(data)
    }).catch(dispose)
    motion.addEventListener('change', () => { if (motion.matches) dispose() }, { once: true })
    addEventListener('pagehide', event => { if (!(event as PageTransitionEvent).persisted) dispose() }, { once: true })
  }
}
