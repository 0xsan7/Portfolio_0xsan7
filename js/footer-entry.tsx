import * as React from 'react'
import { createRoot } from 'react-dom/client'
import HalftoneWordmarkFooter from '@/components/ui/halftone-wordmark-footer'

function PortfolioFooter() {
  const readPalette = () => {
    const style = getComputedStyle(document.documentElement)
    return {
      background: style.getPropertyValue('--bg').trim(),
      ink: style.getPropertyValue('--fg').trim(),
      warm: style.getPropertyValue('--accent').trim(),
    }
  }
  const [palette, setPalette] = React.useState(readPalette)
  React.useEffect(() => {
    const observer = new MutationObserver(() => setPalette(readPalette()))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])
  return <HalftoneWordmarkFooter
    wordmark="0xsan7"
    label="0xsan7 / Santiago Jerald"
    meta="© 2026"
    columns={[]}
    palette={palette}
    crop={0.12}
    grain={0}
    dotGap={5}
    radius={65}
    fontFamily="Sora, sans-serif"
    fontWeight={700}
    monoFamily="'JetBrains Mono', monospace"
    height="clamp(200px, 32vw, 300px)"
    className="portfolio-wordmark"
  />
}

const root = document.getElementById('wordmark-footer')
if (root) createRoot(root).render(<PortfolioFooter />)
