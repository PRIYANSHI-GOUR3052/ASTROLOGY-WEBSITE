import { NextAuthOptions } from 'next-auth';
import { DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import pool from '@/lib/db';
import { getToken } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';
import { jwtVerify, SignJWT } from 'jose';

// Extend the next-auth types
declare module 'next-auth' {
  interface User {
    role?: string;
  }
  
  interface Session {
    user: {
      id: number;
      role: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: number;
    role: string;
  }
}

// Define the AuthenticatedRequest type
export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    userId: number;
    email: string;
    role: string;
  };
}

// Create the withAuth middleware
export function withAuth(handler: any) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      const session = await getServerSession(req, res, authOptions);
      
      if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      // Add user info to the request
      req.user = {
        userId: session.user.id,
        email: session.user.email || '',
        role: session.user.role
      };
      
      return handler(req, res);
    } catch (error) {
      console.error('Auth error:', error);
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }

        const connection = await pool.getConnection();
        try {
          const [users] = await connection.query(
            'SELECT * FROM users WHERE email = ?',
            [credentials.email]
          );

          const user = (users as any[])[0];
          
          if (!user) {
            throw new Error('No user found with this email');
          }

          // In a real application, you should hash the password and compare hashes
          // This is just a basic example
          if (user.password !== credentials.password) {
            throw new Error('Invalid password');
          }

          return {
            id: user.id,
            email: user.email,
            role: user.role
          };
        } finally {
          connection.release();
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = Number(user.id);
        token.role = String(user.role);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as number;
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// --- Astrologer Auth Helpers ---

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

const ASTROLOGER_JWT_SECRET = process.env.JWT_SECRET || 'astrologer-secret-key';

function getAstrologerSecretKey() {
  return new TextEncoder().encode(ASTROLOGER_JWT_SECRET);
}

export async function signAstrologerJwt(payload: object, expiresIn = '7d') {
  // jose does not support '7d' directly, so we convert to seconds (7*24*60*60)
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 7 * 24 * 60 * 60;
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .sign(getAstrologerSecretKey());
}

export async function verifyAstrologerJwt(token: string) {
  const { payload } = await jwtVerify(token, getAstrologerSecretKey());
  return payload;
}