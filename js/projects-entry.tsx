import * as React from 'react'
import { createRoot } from 'react-dom/client'
import GlassFolder, { type FolderFile } from '@/components/ui/glass-folder-cards'

function ProjectFolder({ host, title, files, preview }: { host: HTMLElement; title: string; files: FolderFile[]; preview: string }) {
  const [width, setWidth] = React.useState(Math.min(340, host.clientWidth - 24))
  React.useEffect(() => {
    const resize = () => setWidth(Math.min(340, Math.max(180, host.clientWidth - 24)))
    const observer = new ResizeObserver(resize)
    observer.observe(host)
    return () => observer.disconnect()
  }, [host])
  return <GlassFolder label={title} files={files} width={width}
    preview={<div className="gf-project-preview" dangerouslySetInnerHTML={{ __html: preview }} />}
    meta="" />
}

for (const article of document.querySelectorAll<HTMLElement>('.project-card')) {
  const host = article.querySelector<HTMLElement>('.project-visual')
  const title = article.querySelector('h3')?.textContent?.trim()
  if (!host || !title) continue
  const preview = host.querySelector('svg')?.outerHTML ?? ''
  const files = [...article.querySelectorAll<HTMLAnchorElement>('.project-links a')].map(link => ({
    href: link.href,
    name: (link.textContent ?? '').replace(/[\[\]]|->|↗|→/g, '').trim(),
    meta: new URL(link.href).hostname.replace(/^www\./, ''),
  }))
  if (!files.length) {
    const notes = article.querySelector<HTMLElement>('.project-description')
    if (!notes) continue
    notes.id ||= `${article.id}-notes`
    files.push({
      name: 'BUILD NOTES',
      href: `${location.href.split('#')[0]}#${notes.id}`,
      meta: article.querySelector('.project-meta span')?.textContent?.trim() ?? title,
    })
  }
  host.classList.add('project-folder-visual')
  createRoot(host).render(<ProjectFolder host={host} title={title} files={files} preview={preview} />)
}
