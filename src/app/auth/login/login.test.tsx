import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
import { LoginForm } from './_components/login-form'
import authClient from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}))

// Mock ResizeObserver for Radix UI
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

vi.mock('@/lib/auth-client', () => ({
  default: {
    signIn: {
      email: vi.fn(),
      username: vi.fn(),
      social: vi.fn(),
    },
  },
}))

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  it('renders login form', () => {
    render(<LoginForm />)
    screen.debug()
    expect(screen.getByLabelText(/Email or Username/i)).toBeDefined()
    expect(screen.getByLabelText(/Kata Sandi/i)).toBeDefined()
    expect(screen.getByTestId('login-button')).toBeDefined()
  })

  it('shows validation errors for empty fields', async () => {
    render(<LoginForm />)
    fireEvent.click(screen.getByTestId('login-button'))

    await waitFor(() => {
      expect(screen.getByText(/Email or username is required/i)).toBeDefined()
      expect(screen.getByText(/Password is required/i)).toBeDefined()
    })
  })

  it('calls signIn.email when email is provided', async () => {
    render(<LoginForm />)
    
    fireEvent.change(screen.getByLabelText(/Email or Username/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/Kata Sandi/i), {
      target: { value: 'password123' },
    })
    
    fireEvent.click(screen.getByTestId('login-button'))

    await waitFor(() => {
      expect(authClient.signIn.email).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'test@example.com',
          password: 'password123',
        }),
        expect.any(Object)
      )
    })
  })

  it('calls signIn.username when username is provided', async () => {
    render(<LoginForm />)
    
    fireEvent.change(screen.getByLabelText(/Email or Username/i), {
      target: { value: 'testuser' },
    })
    fireEvent.change(screen.getByLabelText(/Kata Sandi/i), {
      target: { value: 'password123' },
    })
    
    fireEvent.click(screen.getByTestId('login-button'))

    await waitFor(() => {
      expect(authClient.signIn.username).toHaveBeenCalledWith(
        expect.objectContaining({
          username: 'testuser',
          password: 'password123',
        }),
        expect.any(Object)
      )
    })
  })

  it('redirects to feeds after successful username login', async () => {
    const push = vi.fn()
    ;(useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ push })
    ;(authClient.signIn.username as ReturnType<typeof vi.fn>).mockImplementation(
      async (_data, callbacks) => {
        callbacks?.onSuccess?.()
      }
    )

    render(<LoginForm />)

    fireEvent.change(screen.getByLabelText(/Email or Username/i), {
      target: { value: 'testuser' },
    })
    fireEvent.change(screen.getByLabelText(/Kata Sandi/i), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByTestId('login-button'))

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/feeds')
    })
  })

  it('calls signIn.social when Google button is clicked', async () => {
    render(<LoginForm />)
    
    fireEvent.click(screen.getByRole('button', { name: /Masuk dengan Google/i }))

    await waitFor(() => {
      expect(authClient.signIn.social).toHaveBeenCalledWith(
        expect.objectContaining({
          provider: 'google',
        }),
        expect.any(Object)
      )
    })
  })
})
