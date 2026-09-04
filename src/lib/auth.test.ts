import { describe, it, expect, vi, beforeEach } from 'vitest'
import { requireAuth } from './authz'
import { withRole } from './with-role'
import { auth } from './auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Role } from '@prisma/client'
import React from 'react'

vi.mock('next/headers', () => ({
  headers: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

vi.mock('./auth', () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}))

describe('requireAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 401 if no session', async () => {
    ;(auth.api.getSession as any).mockResolvedValue(null)
    ;(headers as any).mockResolvedValue(new Headers())

    const result = await requireAuth()
    expect(result.error).toBeDefined()
    const response = await result.error
    expect(response.status).toBe(401)
  })

  it('returns 403 if role not allowed', async () => {
    ;(auth.api.getSession as any).mockResolvedValue({
      user: { role: Role.USER },
    })
    ;(headers as any).mockResolvedValue(new Headers())

    const result = await requireAuth({ roles: [Role.ADMIN] })
    expect(result.error).toBeDefined()
    const response = await result.error
    expect(response.status).toBe(403)
  })

  it('returns session if authorized', async () => {
    const mockSession = { user: { role: Role.USER } }
    ;(auth.api.getSession as any).mockResolvedValue(mockSession)
    ;(headers as any).mockResolvedValue(new Headers())

    const result = await requireAuth({ roles: [Role.USER] })
    expect(result.session).toEqual(mockSession)
  })
})

describe('withRole', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const MockComponent = () => React.createElement('div', null, 'Protected Content')

  it('redirects to login if no session', async () => {
    ;(auth.api.getSession as any).mockResolvedValue(null)
    ;(headers as any).mockResolvedValue(new Headers())

    const ProtectedPage = withRole(MockComponent, [Role.USER])
    await ProtectedPage({})

    expect(redirect).toHaveBeenCalledWith('/auth/login')
  })

  it('redirects to unauthorized if role not allowed', async () => {
    ;(auth.api.getSession as any).mockResolvedValue({
      user: { role: Role.USER },
    })
    ;(headers as any).mockResolvedValue(new Headers())

    const ProtectedPage = withRole(MockComponent, [Role.ADMIN])
    await ProtectedPage({})

    expect(redirect).toHaveBeenCalledWith('/unauthorized')
  })

  it('renders component if authorized', async () => {
    ;(auth.api.getSession as any).mockResolvedValue({
      user: { role: Role.ADMIN },
    })
    ;(headers as any).mockResolvedValue(new Headers())

    const ProtectedPage = withRole(MockComponent, [Role.ADMIN])
    const result = await ProtectedPage({})

    expect(result).toBeDefined()
    expect(redirect).not.toHaveBeenCalled()
  })
})
