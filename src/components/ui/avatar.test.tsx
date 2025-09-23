import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  Avatar,
  // AvatarImage,
  AvatarFallback,
} from './avatar'

test('Avatar can be rendered', () => {
  const testId = Date.now()

  render(<Avatar data-testid={testId} />)
  expect(screen.getByTestId(testId)).toBeDefined()
})

// test('AvatarImage can be rendered', () => {
//   const testId = Date.now()

//   render(
//     <Avatar>
//       <AvatarImage src="/" />
//     </Avatar>
//   )
//   expect(screen.getByTestId(testId)).toBeDefined()
// })

test('AvatarFallback can be rendered', () => {
  const testId = Date.now()

  render(
    <Avatar>
      <AvatarFallback data-testid={testId} />
    </Avatar>
  )
  expect(screen.getByTestId(testId)).toBeDefined()
})
