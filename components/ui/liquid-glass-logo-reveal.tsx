"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/* React wrapper for the supplied glass-reveal shader and spring timeline.
 * Engine adapted from zanwei/glass-icon-reveal (MIT).
 * License: assets/brand/glass-icon-reveal-LICENSE.txt
 */

import { loadLogo, startEngine, darkLogoSettings, type Settings } from '@/lib/liquid-glass-engine'
type Look = 'dark'
type GlassTuning = Partial<Settings>
const LOOKS = { dark: darkLogoSettings }

/* ------------------------------------------------------------------ *
 * Component
 * ------------------------------------------------------------------ */
interface GlassIconRevealProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** SVG markup (`<svg …>…</svg>`) or an image URL. Only the shape is used unless `originalColors` is on */
  logo: string
  /** Starting preset: light glass over a pale backdrop, or dark glass with an icon plate */
  look?: Look
  /** Backdrop colour (hex). Match it to the page: the canvas paints it */
  background?: string
  logoColor?: string
  /** Colour of the tile behind the logo while `iconPlate` is on */
  plateColor?: string
  iconPlate?: boolean
  /** End on the flat icon plate (an app icon, a badge) instead of the bare logo */
  keepPlate?: boolean
  /** Keep the logo's own colours instead of `logoColor` */
  originalColors?: boolean
  /** Largest tile size in px; it shrinks to fit the container */
  tileSize?: number
  /** Logo half size relative to the tile's half size */
  logoScale?: number
  /** Logo size once the glass is gone, relative to `logoScale` */
  finalScale?: number
  /** Shift of the logo's centre, in tile half sizes (y up) */
  logoOffset?: [number, number]
  loop?: boolean
  /** Seconds the finished logo stays before the next loop */
  hold?: number
  speed?: number
  /** Freeze the reveal at this many seconds instead of playing it (scroll-driven or static use).
   * Past the reveal it runs on through the loop pause and the blur-out, so 0 … end + hold + 0.5 is
   * one seamless loop */
  time?: number
  /** Fine-tune the glass and the motion */
  tuning?: Partial<GlassTuning>
  /** Accessible name of the logo */
  label?: string
}

function GlassIconReveal({
  logo,
  look = "dark",
  background,
  logoColor,
  plateColor,
  iconPlate,
  keepPlate,
  originalColors,
  tileSize,
  logoScale,
  finalScale,
  logoOffset,
  loop = false,
  hold,
  speed = 1,
  time,
  tuning,
  label = "Logo",
  className,
  style,
  ...props
}: GlassIconRevealProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null)
  const engineRef = React.useRef<ReturnType<typeof startEngine> | null>(null)
  const [fallback, setFallback] = React.useState(false)

  // Objects and arrays go through JSON so inline literals don't restart the memo every render.
  const tuningKey = JSON.stringify(tuning ?? {})
  const offsetKey = logoOffset ? logoOffset.join(",") : ""
  const settings = React.useMemo<Settings>(() => {
    const own = { background, logoColor, plateColor, iconPlate, keepPlate, originalColors, tileSize, logoScale, finalScale, hold }
    const set: Partial<Settings> = Object.fromEntries(Object.entries(own).filter(([, v]) => v !== undefined))
    if (offsetKey) set.logoOffset = offsetKey.split(",").map(Number) as [number, number]
    return { ...LOOKS[look], ...set, ...(JSON.parse(tuningKey) as Partial<GlassTuning>) }
  }, [look, background, logoColor, plateColor, iconPlate, keepPlate, originalColors, tileSize, logoScale, finalScale, hold, offsetKey, tuningKey])

  const live = React.useRef({ settings, loop, speed, time })
  live.current = { settings, loop, speed, time }

  React.useEffect(() => {
    if (fallback) return
    const wrap = wrapRef.current
    if (!wrap) return
    const engine = startEngine(wrap, live)
    if (!engine) {
      setFallback(true)
      return
    }
    engineRef.current = engine
    return () => {
      engineRef.current = null
      engine.dispose()
    }
  }, [])

  React.useEffect(() => {
    engineRef.current?.invalidate()
  }, [settings, loop, speed, time])

  React.useEffect(() => {
    if (!engineRef.current) return
    let cancelled = false
    loadLogo(logo).then(
      (data) => {
        if (cancelled) return
        engineRef.current?.setLogo(data)
      },
      () => {
        if (cancelled) return
        engineRef.current?.dispose()
        engineRef.current = null
        setFallback(true)
        wrapRef.current?.removeAttribute("data-rendered")
      },
    )
    return () => {
      cancelled = true
    }
  }, [logo])

  const staticSrc = logo.trimStart().startsWith("<") ? "data:image/svg+xml;charset=utf-8," + encodeURIComponent(logo) : logo

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label={label}
      className={cn("glass-logo-reveal", className)}
      style={{ backgroundColor: settings.background, ...style }}
      {...props}
    >
      <img className="glass-logo-static" src={staticSrc} alt="" aria-hidden="true" width="700" height="371" />
    </div>
  )
}

export { GlassIconReveal }
export type { GlassIconRevealProps }
export default GlassIconReveal
