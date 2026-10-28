import { dockConfig, dockScale } from '../lib/dock-math'

// Enhance the rendered anchors directly; the dock needs no React at runtime.
export function initDock() {
  const dock = document.querySelector<HTMLElement>('.macos-dock')
  if (!dock) return
  const slots = [...dock.querySelectorAll<HTMLElement>('.dock-slot')]
  const links = [...dock.querySelectorAll<HTMLAnchorElement>('.dock-link')]
  const motion = matchMedia('(prefers-reduced-motion: reduce)')
  let config = dockConfig(document.documentElement.clientWidth, links.length, motion.matches)
  const current = links.map(() => 1)
  let target = links.map(() => 1)
  let frame = 0, last = 0
  const paint = () => slots.forEach((slot, i) => {
    slot.style.width = `${config.size * current[i]}px`
    slot.style.setProperty('--dock-scale', String(current[i]))
  })
  const tick = (now: number) => {
    frame = 0
    const blend = motion.matches ? 1 : 1 - Math.exp(-Math.min(50, Math.max(1, now - last)) / 65)
    last = now
    let moving = false
    current.forEach((value, i) => {
      current[i] = Math.abs(target[i] - value) < .002 ? target[i] : value + (target[i] - value) * blend
      if (Math.abs(target[i] - current[i]) >= .002) moving = true
    })
    paint()
    if (moving) frame = requestAnimationFrame(tick)
  }
  const aim = (point: number | null) => {
    target = links.map((_, i) => point === null ? 1 : dockScale(point - (i * (config.size + config.gap) + config.size / 2), config.effectWidth, config.maxScale))
    if (!frame) { last = performance.now(); frame = requestAnimationFrame(tick) }
  }
  const resize = () => {
    config = dockConfig(document.documentElement.clientWidth, links.length, motion.matches)
    dock.style.setProperty('--dock-size', `${config.size}px`)
    dock.style.setProperty('--dock-gap', `${config.gap}px`)
    dock.style.setProperty('--dock-padding', `${config.padding}px`)
    target = links.map(() => 1); current.fill(1); paint()
  }
  dock.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') dock.closest('.dock-nav')?.setAttribute('data-auto-hide', '')
  }, { passive: true })
  dock.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return
    const baseline = links.length * config.size + Math.max(0, links.length - 1) * config.gap
    aim(event.clientX - (document.documentElement.clientWidth / 2 - baseline / 2))
  }, { passive: true })
  dock.addEventListener('pointerleave', () => aim(null))
  dock.addEventListener('focusout', event => { if (!dock.contains(event.relatedTarget as Node | null)) aim(null) })
  links.forEach((link, i) => {
    link.addEventListener('focus', () => aim(i * (config.size + config.gap) + config.size / 2))
    link.addEventListener('click', () => {
      const icon = link.querySelector<HTMLElement>('.dock-tile')
      if (!icon || motion.matches) return
      icon.getAnimations().forEach(animation => animation.cancel())
      icon.animate([{ translate: '0 0' }, { translate: '0 -8px' }, { translate: '0 0' }], { duration: 360, easing: 'ease-out' })
    })
    link.addEventListener('keydown', event => {
      let next = i
      if (event.key === 'ArrowRight') next = (i + 1) % links.length
      else if (event.key === 'ArrowLeft') next = (i - 1 + links.length) % links.length
      else if (event.key === 'Home') next = 0
      else if (event.key === 'End') next = links.length - 1
      else if (event.key === 'Escape') { aim(null); link.blur(); return }
      else return
      event.preventDefault(); links[next].focus()
    })
  })
  const sections = links.map(link => document.getElementById(link.hash.slice(1))).filter((section): section is HTMLElement => !!section)
    .sort((a,b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1)
  let scrollFrame = 0
  const update = () => {
    scrollFrame = 0
    let active: string | undefined = sections[0]?.id
    for (const section of sections) if (section.getBoundingClientRect().top <= 72) active = section.id
    if (scrollY + innerHeight >= document.documentElement.scrollHeight - 2) active = sections.at(-1)?.id
    for (const link of links) {
      if (link.hash === `#${active}`) link.setAttribute('aria-current', 'location')
      else link.removeAttribute('aria-current')
    }
  }
  const schedule = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(update) }
  addEventListener('scroll', schedule, { passive: true })
  addEventListener('resize', () => { resize(); schedule() }, { passive: true })
  motion.addEventListener('change', resize)
  const main = document.querySelector('main')
  if (main) new ResizeObserver(schedule).observe(main)
  resize(); schedule()
}
