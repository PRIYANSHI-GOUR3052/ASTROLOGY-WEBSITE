import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'

// Extend the next-auth types
declare module "next-auth" {
  interface Session {
    user: {
      role: string
      id: string;
      name?: string | null;
      email?: string | null;

    }
  }
}

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error('Missing credentials')
          return null
        }

        let connection;
        try {
          connection = await mysql.createConnection(dbConfig)
          
          const [users] = await connection.execute(
            'SELECT * FROM users WHERE email = ?',
            [credentials.email]
          )
          
          const user = (users as any[])[0]
          
          if (!user) {
            console.error('User not found')
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password, 
            user.password
          )

          if (!isPasswordValid) {
            console.error('Invalid password')
            return null
          }

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email
          }
        } catch (error) {
          console.error('Authentication error:', error)
          return null
        } finally {
          if (connection) await connection.end()
        }
      }
    })
  ],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const connection = await mysql.createConnection(dbConfig)
        
        try {
          const [existingUsers] = await connection.execute(
            'SELECT * FROM users WHERE email = ?',
            [user.email!]
          )

          if ((existingUsers as any[]).length === 0) {
            await connection.execute(
              'INSERT INTO users (name, email, google_id,password) VALUES (?, ?, ?, ?)',
              [
                user.name!, 
                user.email!, 
                account?.providerAccountId,
                'google_login'
              ]
            )
          }

          return true
        } catch (error) {
          console.error('User sign-in/signup error:', error)
          return false
        } finally {
          await connection.end()
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  
  // Added error handling
  events: {
    async signIn(message) {
      console.log('Sign in event', message)
    },
    async signOut(message) {
      console.log('Sign out event', message)
    },
    async createUser(message) {
      console.log('User created', message)
    }
  },
  
  // Debugging options
  debug: process.env.NODE_ENV === 'development'
}

export default NextAuth(authOptions)