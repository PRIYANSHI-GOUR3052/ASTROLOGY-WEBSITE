import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        action: { label: "Action", type: "text" },
        name: { label: "Name", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Check if user exists in database
        let user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        // Handle signup
        if (credentials.action === 'signup') {
          if (user) {
            // User already exists
            return null
          }

          // Hash the password
          const hashedPassword = await bcrypt.hash(credentials.password, 10)

          // Create new user
          user = await prisma.user.create({
            data: {
              email: credentials.email,
              name: credentials.name || '',
              password: hashedPassword
            }
          })
        }

        // Handle login
        if (!user) {
          return null
        }

        // Compare hashed passwords
        const isPasswordValid = user.password 
          ? await bcrypt.compare(credentials.password, user.password)
          : false

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account?.provider === 'google') {
        // Check if a user with this email already exists
        const existingUser = await prisma.user.findUnique({
          where: { email: profile?.email! }
        })

        // If user exists but wasn't created via Google
        if (existingUser) {
          // Check if the existing user has a password
          const hasPassword = existingUser.password !== null

          if (hasPassword) {
            // Automatically update the existing user with Google profile info
            await prisma.user.update({
              where: { email: profile?.email! },
              data: {
                name: profile?.name,
                image: profile?.image
              }
            })
          } else {
            // If no password, allow Google sign-in and update the account
            await prisma.user.update({
              where: { email: profile?.email! },
              data: {
                name: profile?.name,
                image: profile?.image
              }
            })
          }
        }

        return true
      }
      return true
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = {
          ...session.user,
          id: token.sub as string
        } as typeof session.user & { id: string }
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },
  secret: process.env.NEXTAUTH_SECRET
}