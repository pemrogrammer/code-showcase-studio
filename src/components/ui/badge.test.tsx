import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './badge'

const testId = Date.now()

test('can be rendered', () => {
  render(<Badge data-testid={testId} />)
  expect(screen.getByTestId(testId)).toBeDefined()
})
