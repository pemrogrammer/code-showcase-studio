import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card'

test('Card can be rendered', () => {
  const testId = Date.now()

  render(<Card data-testid={testId} />)
  expect(screen.getByTestId(testId)).toBeDefined()
})

test('CardHeader can be rendered', () => {
  const testId = Date.now()

  render(<CardHeader data-testid={testId} />)
  expect(screen.getByTestId(testId)).toBeDefined()
})

test('CardContent can be rendered', () => {
  const testId = Date.now()

  render(<CardContent data-testid={testId} />)
  expect(screen.getByTestId(testId)).toBeDefined()
})

test('CardFooter can be rendered', () => {
  const testId = Date.now()

  render(<CardFooter data-testid={testId} />)
  expect(screen.getByTestId(testId)).toBeDefined()
})

test('CardTitle can be rendered', () => {
  const testId = Date.now()

  render(<CardTitle data-testid={testId} />)
  expect(screen.getByTestId(testId)).toBeDefined()
})

test('CardAction can be rendered', () => {
  const testId = Date.now()

  render(<CardAction data-testid={testId} />)
  expect(screen.getByTestId(testId)).toBeDefined()
})

test('CardDescription can be rendered', () => {
  const testId = Date.now()

  render(<CardDescription data-testid={testId} />)
  expect(screen.getByTestId(testId)).toBeDefined()
})
