import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from './button'

const testId = Date.now()

test('can be rendered', () => {
  render(<Button data-testid={testId} />)
  expect(screen.getByTestId(testId)).toBeDefined()
})
