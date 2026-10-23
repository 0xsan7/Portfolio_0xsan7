import * as React from 'react'
import { createRoot } from 'react-dom/client'
import ContributionSkyline, { type PaletteInput } from '@/components/ui/contribution-skyline'
import activity from '../data/github-contributions.json'

// Match the existing amber blueprint palette in both portfolio themes.
const palette: PaletteInput = {
  dark: ['#493922', '#79562c', '#b98645', '#e3b56a'],
  light: ['#eddfc5', '#c6a373', '#a57637', '#835516'],
}

class SkylineBoundary extends React.Component<React.PropsWithChildren, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    return this.state.failed ? <p className="skyline-error">The interactive chart is unavailable. <a href={activity.profile}>View activity on GitHub.</a></p> : this.props.children
  }
}

const root = document.getElementById('contribution-skyline')
if (root) {
  createRoot(root).render(
    <SkylineBoundary>
      <ContributionSkyline
        data={activity.days}
        endDate={activity.rangeEnd}
        palette={palette}
        defaultView="3d"
        showStats={false}
        title={<><strong>{activity.total.toLocaleString('en-US')}</strong> contributions</>}
        className="skyline-card"
      />
    </SkylineBoundary>,
  )
}
