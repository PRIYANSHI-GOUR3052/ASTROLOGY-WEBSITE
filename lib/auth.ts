import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    userId: number;
    email: string;
    role: string;
  };
}

type NextApiHandler = (
  req: AuthenticatedRequest,
  res: NextApiResponse
) => Promise<void> | void;

// Middleware to protect API routes
export function withAuth(handler: NextApiHandler) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      // Get the token from cookies
      const token = req.cookies.adminToken;
      
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      // Verify the token
      const decoded = jwt.verify(
        token, 
        process.env.JWT_SECRET || 'your-secret-key'
      ) as {
        userId: number;
        email: string;
        role: string;
      };
      
      // Attach the user information to the request
      req.user = decoded;
      
      // Call the original handler
      return handler(req, res);
      
    } catch (error) {
      console.error('Auth error:', error);
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
}

// Helper function to verify if a user has admin role
export function isAdmin(req: AuthenticatedRequest): boolean {
  return req.user?.role === 'admin';
}