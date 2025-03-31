import type { NextApiResponse } from 'next';
import { withAuth, AuthenticatedRequest } from '@/lib/auth'; // Adjust path as needed

async function handler(
  req: AuthenticatedRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Since this is protected by withAuth, we can safely return the user
  return res.status(200).json({ 
    user: {
      id: req.user?.userId,
      email: req.user?.email,
      role: req.user?.role
    }
  });
}

// Export the protected handler
export default withAuth(handler);