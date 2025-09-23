import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from './page'

test('landing page can be rendered', () => {
  render(<Page />)
  expect(screen.getByRole('heading', { level: 1, name: 'Code Showcase Studio' })).toBeDefined()
})
