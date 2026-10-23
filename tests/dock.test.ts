import assert from 'node:assert/strict'
import test from 'node:test'
import { dockConfig, dockScale } from '../lib/dock-math'

test('eight icons fit across phone widths without magnification', () => {
  for (const width of [320, 375, 390, 430]) {
    const c = dockConfig(width, 8)
    assert.ok(c.size * 8 + c.gap * 7 + c.padding * 2 <= width - 24 + 1e-8)
    assert.equal(c.maxScale, 1)
  }
})
test('magnification is symmetric, bounded and respects reduced motion', () => {
  assert.equal(dockScale(0, 170, 1.65), 1.65)
  assert.equal(dockScale(85, 170, 1.65), 1)
  assert.equal(dockScale(30, 170, 1.65), dockScale(-30, 170, 1.65))
  assert.equal(dockConfig(1440, 8, true).maxScale, 1)
})
