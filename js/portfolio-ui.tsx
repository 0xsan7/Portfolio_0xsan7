import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { House, Cpu, UserRound, SquareTerminal, FlaskConical, UsersRound, ChartNoAxesColumnIncreasing, Mail } from 'lucide-react'
import MacOSDock, { type DockApp } from '@/components/ui/mac-os-dock'

// Selected from the official Lucide library; no generated icon assets.
const apps: DockApp[] = [
  { id: 'home', name: 'Home', icon: <House /> },
  { id: 'about', name: 'About', icon: <UserRound /> },
  { id: 'skills', name: 'Skills', icon: <Cpu /> },
  { id: 'projects', name: 'Projects', icon: <SquareTerminal /> },
  { id: 'research', name: 'Research', icon: <FlaskConical /> },
  { id: 'leadership', name: 'Leadership', icon: <UsersRound /> },
  { id: 'activity', name: 'Activity', icon: <ChartNoAxesColumnIncreasing /> },
  { id: 'contact', name: 'Contact', icon: <Mail /> },
]

function PortfolioDock() {
  const [active, setActive] = React.useState('home')
  React.useEffect(() => {
    const sections = apps.map(app => document.getElementById(app.id)).filter((section): section is HTMLElement => !!section)
      .sort((a, b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1)
    let frame = 0
    const update = () => {
      frame = 0
      let current: HTMLElement | undefined = sections[0]
      const threshold = 72
      for (const section of sections) if (section.getBoundingClientRect().top <= threshold) current = section
      if (scrollY + innerHeight >= document.documentElement.scrollHeight - 2) current = sections.at(-1)
      if (current) setActive(current.id)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    addEventListener('scroll', schedule, { passive: true }); addEventListener('resize', schedule, { passive: true })
    const observer = new ResizeObserver(schedule)
    const main = document.querySelector('main')
    if (main) observer.observe(main)
    update()
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); observer.disconnect() }
  }, [])
  return <MacOSDock apps={apps} openApps={[active]} onAppClick={setActive} />
}

const nav = document.getElementById('main-nav')
if (nav) createRoot(nav).render(<PortfolioDock />)

// Share React with the skyline while deferring canvas initialization.
const activity = document.getElementById('contribution-skyline')
if (activity) {
  const load = () => { import('./skyline-entry').catch(() => activity.setAttribute('data-load-error', 'true')) }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); load() }
    }, { rootMargin: '300px' })
    observer.observe(activity)
  } else load()
}

// The footer shares the existing runtime and starts near the viewport.
const footer = document.getElementById('wordmark-footer')
if (footer) {
  const load = () => { import('./footer-entry').catch(() => footer.setAttribute('data-load-error', 'true')) }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); load() }
    }, { rootMargin: '300px' })
    observer.observe(footer)
  } else load()
}

const projects = document.getElementById('projects')
if (projects) {
  const load = () => { import('./projects-entry').catch(() => projects.setAttribute('data-load-error', 'true')) }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); load() }
    }, { rootMargin: '300px' })
    observer.observe(projects)
  } else load()
}
