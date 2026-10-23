import assert from 'node:assert/strict'
import test from 'node:test'
import { buildGrid, camera, computeStats, dayMs, project, riseAt, toKey } from '../components/ui/contribution-skyline'
import activity from '../data/github-contributions.json'

test('the rendered calendar preserves every captured public GitHub count', () => {
  const grid = buildGrid(activity.days, dayMs(activity.rangeEnd))
  const counts = new Map(activity.days.map(day => [day.date, day.count]))
  for (const cell of grid.cells) assert.equal(cell.count, counts.get(cell.date) ?? 0)
  assert.equal(computeStats(grid.cells).total, activity.total)
  assert.equal(grid.cells[0].date, activity.rangeStart)
  assert.equal(grid.cells.at(-1)?.date, activity.rangeEnd)
  assert.ok(grid.cells.length >= 365)
})

test('UTC dates, duplicate entries and invalid input stay consistent across the year boundary', () => {
  const grid = buildGrid([
    { date: '2025-12-31', count: 2 },
    { date: '2025-12-31', count: 3 },
    { date: '2026-01-01', count: 1 },
    { date: '2026-01-02', count: -8 },
    { date: 'invalid', count: 10 },
  ], dayMs('2026-01-02'))
  assert.equal(toKey(dayMs('2026-01-01')), '2026-01-01')
  assert.equal(grid.cells.find(cell => cell.date === '2025-12-31')?.count, 5)
  const stats = computeStats(grid.cells)
  assert.equal(stats.total, 6)
  assert.deepEqual(stats.current, { days: 2, start: '2025-12-31', end: '2026-01-01' })
  assert.deepEqual(stats.busiest, { count: 5, date: '2025-12-31' })
})

test('the same scene goes from a flat grid to raised skyline bars', () => {
  const flat = camera(0)
  const raised = camera(1)
  const a = project(flat, 10, 3, 0)
  const b = project(flat, 10, 3, 7)
  assert.ok(Math.abs(a[1] - b[1]) < 1e-10)
  assert.ok(project(raised, 10, 3, 7)[1] < project(raised, 10, 3, 0)[1])
  for (let week = 0; week < 53; week++) {
    assert.equal(riseAt(0, week, 53, 6), 0)
    assert.equal(riseAt(1, week, 53, 6), 1)
  }
  assert.ok(riseAt(0.4, 0, 53, 0) > riseAt(0.4, 52, 53, 0))
})
