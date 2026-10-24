'use client'

import * as React from 'react'
import { dockConfig, dockScale } from '@/lib/dock-math'

export interface DockApp { id: string; name: string; icon: React.ReactNode; href?: string }
export interface MacOSDockProps { apps: DockApp[]; onAppClick?: (id: string) => void; openApps?: string[]; className?: string }

export default function MacOSDock({ apps, onAppClick, openApps = [], className = '' }: MacOSDockProps) {
  const dock = React.useRef<HTMLDivElement>(null)
  const slots = React.useRef<(HTMLDivElement | null)[]>([])
  const links = React.useRef<(HTMLAnchorElement | null)[]>([])
  const engine = React.useRef<{ point: (x: number | null) => void; focus: (i: number) => void; bounce: (i: number) => void } | null>(null)

  React.useLayoutEffect(() => {
    const host = dock.current
    if (!host) return
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    let config = dockConfig(document.documentElement.clientWidth, apps.length, motion.matches)
    const current = apps.map(() => 1)
    let target = apps.map(() => 1)
    let frame = 0
    let last = 0
    const paint = () => slots.current.forEach((slot, i) => {
      if (slot) { slot.style.width = `${config.size * current[i]}px`; slot.style.setProperty('--dock-scale', String(current[i])) }
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
    const kick = () => { if (!frame) { last = performance.now(); frame = requestAnimationFrame(tick) } }
    const aim = (x: number | null) => {
      target = apps.map((_, i) => x === null ? 1 : dockScale(x - (i * (config.size + config.gap) + config.size / 2), config.effectWidth, config.maxScale))
      kick()
    }
    const resize = () => {
      config = dockConfig(document.documentElement.clientWidth, apps.length, motion.matches)
      host.style.setProperty('--dock-size', `${config.size}px`)
      host.style.setProperty('--dock-gap', `${config.gap}px`)
      host.style.setProperty('--dock-padding', `${config.padding}px`)
      target = apps.map(() => 1); current.fill(1); paint()
    }
    engine.current = {
      point: x => {
        if (x === null) return aim(null)
        const bounds = host.parentElement!.getBoundingClientRect()
        const baseline = apps.length * config.size + Math.max(0, apps.length - 1) * config.gap
        aim(x - (bounds.left + bounds.width / 2 - baseline / 2))
      },
      focus: i => aim(i * (config.size + config.gap) + config.size / 2),
      bounce: i => {
        const icon = links.current[i]?.querySelector('.dock-tile')
        if (!icon || motion.matches) return
        icon.getAnimations().forEach(animation => animation.cancel())
        icon.animate([{ translate: '0 0' }, { translate: '0 -8px' }, { translate: '0 0' }], { duration: 360, easing: 'ease-out' })
      },
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })
    motion.addEventListener('change', resize)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); motion.removeEventListener('change', resize); engine.current = null }
  }, [apps])

  const keyboard = (event: React.KeyboardEvent, index: number) => {
    let next = index
    if (event.key === 'ArrowRight') next = (index + 1) % apps.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + apps.length) % apps.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = apps.length - 1
    else if (event.key === 'Escape') { engine.current?.point(null); links.current[index]?.blur(); return }
    else return
    event.preventDefault(); links.current[next]?.focus()
  }

  return (
    <div ref={dock} className={`macos-dock ${className}`}
      onPointerMove={event => { if (event.pointerType === 'mouse') engine.current?.point(event.clientX) }}
      onPointerLeave={() => engine.current?.point(null)}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) engine.current?.point(null) }}>
      {apps.map((app, i) => (
        <div className="dock-slot" key={app.id} ref={element => { slots.current[i] = element }}>
          <a ref={element => { links.current[i] = element }} className="dock-link" href={app.href ?? `#${app.id}`}
            aria-label={app.name} aria-current={openApps.includes(app.id) ? 'location' : undefined}
            onFocus={() => engine.current?.focus(i)} onKeyDown={event => keyboard(event, i)}
            onClick={() => { engine.current?.bounce(i); onAppClick?.(app.id) }}>
            <span className="dock-tile">{typeof app.icon === 'string' ? <img src={app.icon} alt="" width="32" height="32" /> : app.icon}</span>
            <span className="dock-dot" aria-hidden="true" />
          </a>
          <span className="dock-label" aria-hidden="true">{app.name}</span>
        </div>
      ))}
    </div>
  )
}
