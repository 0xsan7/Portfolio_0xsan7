'use client'

import * as React from 'react'

export interface FolderFile { name: string; meta?: string; href: string }
export interface GlassFolderProps {
  label: string
  meta?: string
  files: FolderFile[]
  preview?: React.ReactNode
  width?: number
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

// Folder geometry and hinged, fanned sheets adapted from the supplied component.
const BACK = 'M0 56A22 22 0 0 1 22 34L146 34C170 34 172 0 198 0L318 0A22 22 0 0 1 340 22L340 250A22 22 0 0 1 318 272L22 272A22 22 0 0 1 0 250Z'
const FRONT = 'M0 22A22 22 0 0 1 22 0L118 0C144 0 146 32 172 32L318 32A22 22 0 0 1 340 54L340 176A22 22 0 0 1 318 198L22 198A22 22 0 0 1 0 176Z'

export default function GlassFolder({ label, meta, files, preview, width = 340, open: controlled, onOpenChange, className = '' }: GlassFolderProps) {
  const id = React.useId()
  const root = React.useRef<HTMLDivElement>(null)
  const trigger = React.useRef<HTMLButtonElement>(null)
  const contents = React.useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = React.useState(false)
  const open = controlled ?? expanded
  const setOpen = React.useCallback((next: boolean) => {
    setExpanded(next)
    onOpenChange?.(next)
  }, [onOpenChange])
  const scale = Math.max(0, width) / 340

  React.useEffect(() => { contents.current?.toggleAttribute('inert', !open) }, [open])
  React.useEffect(() => {
    if (!open) return
    const close = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [open, setOpen])

  return <div ref={root} className={`gf-root ${className}`} data-open={open || undefined}
    style={{ width, height: 326 * scale }} onKeyDown={event => {
      if (event.key === 'Escape' && open) { event.stopPropagation(); setOpen(false); trigger.current?.focus() }
    }}>
    <div className="gf-stage" style={{ transform: `translateY(${54 * scale}px) scale(${scale})` }}>
      <div className="gf-back" style={{ clipPath: `path('${BACK}')` }} aria-hidden="true">
        {preview}<span className="gf-back-tab">0xsan7 / PROJECT FILES</span>
      </div>
      <svg className="gf-rim gf-back-rim" viewBox="0 0 340 272" aria-hidden="true"><path d={BACK} /></svg>
      <div className="gf-front" style={{ clipPath: `path('${FRONT}')` }}>
        <div className="gf-tint" aria-hidden="true" />
        <svg className="gf-rim gf-front-rim" viewBox="0 0 340 198" aria-hidden="true"><path d={FRONT} /></svg>
        <button ref={trigger} className="gf-hit" type="button" aria-expanded={open} aria-controls={id}
          aria-label={`${open ? 'Close' : 'Open'} ${label} project links`} onClick={() => setOpen(!open)} />
        <div className="gf-label" aria-hidden="true"><span className="gf-title">{label}</span><span className="gf-meta">{meta ?? `${files.length} project links`}</span></div>
        <span className="gf-status" aria-hidden="true">{open ? '[-]' : '[+]'}</span>
      </div>
      <div ref={contents} id={id} className="gf-files" role="list" aria-label={`${label} links`}>
        {files.slice(0,4).map((file, i, visible) => {
          const slot = visible.length <= 1 ? 0 : i / (visible.length - 1) * 2 - 1
          return <div className="gf-sheet-slot" role="listitem" key={file.href}>
            <a className="gf-sheet" href={file.href} tabIndex={open ? 0 : -1}
              style={{ '--gf-slot': slot, '--gf-depth': visible.length - 1 - i, zIndex: i + 1 } as React.CSSProperties}>
              <span className="gf-sheet-head"><span className="gf-sheet-name">{file.name}</span><span className="gf-sheet-arrow" aria-hidden="true">↗</span></span>
              <span className="gf-sheet-meta">{file.meta}</span>
              <span className="gf-file-mark" aria-hidden="true">{file.name === 'REPO' ? '</>' : '[↗]'}</span>
              <span className="gf-lines" aria-hidden="true"><i /><i /><i /></span>
            </a>
          </div>
        })}
      </div>
    </div>
  </div>
}
