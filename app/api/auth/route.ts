import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, action, name, role } = body

    console.log('API received request:', { ...body, password: '***' })

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Login
    if (action === 'login') {
      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user || user.role !== role.toUpperCase()) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }

      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Invalid password' },
          { status: 401 }
        )
      }

      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
      )

      return NextResponse.json({
        token,
        user: {
          name: user.name,
          email: user.email,
          role: user.role
        }
      })
    }

    // Sign up
    if (action === 'signup') {
      try {
        // Validate inputs
        if (!email || !password || !name) {
          return NextResponse.json(
            { error: 'All fields are required' },
            { status: 400 }
          )
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
          where: { email },
        })

        if (existingUser) {
          return NextResponse.json(
            { error: 'Email already registered' },
            { status: 400 }
          )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12)

        // Create user
        const user = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            role: role.toUpperCase(),
          },
        })

        console.log('User created:', { id: user.id, email: user.email, role: user.role })

        const token = jwt.sign(
          { userId: user.id, role: user.role },
          process.env.JWT_SECRET || 'fallback-secret',
          { expiresIn: '24h' }
        )

        return NextResponse.json({
          success: true,
          token,
          user: {
            name: user.name,
            email: user.email,
            role: user.role
          }
        })
      } catch (error) {
        console.error('Signup error details:', error)
        return NextResponse.json(
          { error: 'Failed to create user: ' + (error as Error).message },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    )
  }
} 