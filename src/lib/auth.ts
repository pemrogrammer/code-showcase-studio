import bcrypt from 'bcryptjs'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { openAPI } from 'better-auth/plugins'
import prisma from '@/../prisma/prisma'

export const auth = betterAuth({
  plugins: [openAPI()],
  disabledPaths: [
    // Select some un-used path from better-auth
    // "/sign-in/social",
    // "/verify-email",
    // "/send-verification-email",
    // "/change-email",
    // "/update-user",
    // "/delete-user",
    // "/link-social",
    // "/delete-user/callback",
    // "/unlink-account",
    // "/account-info",
  ],
  trustedOrigins: [
    // add your trusted origin, example: https://ngodestudio.my.id
    'localhost:3000',
    'localhost:3002',
  ],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    password: {
      hash: async (password) => {
        return await bcrypt.hash(password, 10)
      },
      verify: async ({ password, hash }) => {
        return await bcrypt.compare(password, hash)
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        input: false,
      },
    },
  },

  // Setup your rate limiting for auth api
  rateLimit: {
    enabled: true,
    window: 60, // time window in seconds
    max: 30, // max requests in the window
  },
})
