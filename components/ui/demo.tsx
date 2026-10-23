import ContributionSkyline from '@/components/ui/contribution-skyline'
import activity from '../../data/github-contributions.json'

export default function Demo() {
  return <ContributionSkyline data={activity.days} endDate={activity.rangeEnd} showStats={false} />
}
