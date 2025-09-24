import { inferAdditionalFields } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
import type { auth } from './auth'

const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
})
export default authClient
