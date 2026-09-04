import bcrypt from 'bcryptjs'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { admin, openAPI, username } from 'better-auth/plugins'
import sendEmail from '@/lib/email'
import { emailOTP } from 'better-auth/plugins'
import prisma from '@/../prisma/prisma'

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  plugins: [
    openAPI(),
    emailOTP({
      otpLength: 6,
      expiresIn: 10 * 60, // 10 minutes in seconds
      async sendVerificationOTP({ email, otp, type }) {

        if (type === 'sign-in') {
          await sendEmail({
            to: email,
            subject: 'Your Sign-In OTP for Code Showcase Studio',
            text: `Your One-Time Password (OTP) for sign-in is: ${otp}. This OTP is valid for a short period.`,
          })
        } else if (type === 'email-verification') {
          await sendEmail({
            to: email,
            subject: 'Verify your email address for Code Showcase Studio',
            text: `Click the link to verify your email: ${otp}`,
          })
        } else {
          await sendEmail({
            to: email,
            subject: 'Password Reset Request for Code Showcase Studio',
            text: `You requested a password reset. Your One-Time Password (OTP) is: ${otp}. Use this OTP to reset your password. If you did not request this, please ignore this email.`,
          })
        }
      },
    }),
    username(),
    admin({
      defaultRole: 'USER',
      adminRoles: ['MODERATOR', 'ADMIN'],
    }),
  ],

  disabledPaths: [
    // Select some un-used path from better-auth
  ],

  trustedOrigins: [
    'http://localhost:3000',
    'http://localhost:3002',
    'http://127.0.0.1:3000',
    'localhost:3000',
    'localhost:3002',
  ],

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    providerName: 'credentials',
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

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['google', 'github', 'email-password'],
    },
  },

  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'USER',
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

