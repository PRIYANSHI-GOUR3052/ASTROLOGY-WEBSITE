import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    console.log('Test endpoint - JWT Secret available:', !!jwtSecret);
    
    // Generate a test token
    const testToken = jwt.sign(
      { 
        id: 123, 
        email: 'test@example.com',
        name: 'Test User',
        role: 'client'
      }, 
      jwtSecret, 
      { expiresIn: '1h' }
    );

    console.log('Test token generated:', typeof testToken, testToken);

    // Verify the token
    try {
      const decoded = jwt.verify(testToken, jwtSecret);
      console.log('Test token verified successfully:', decoded);
      
      return res.status(200).json({ 
        success: true,
        token: testToken,
        decoded,
        tokenType: typeof testToken
      });
    } catch (verifyError) {
      console.error('Test token verification failed:', verifyError);
      return res.status(500).json({ 
        success: false,
        error: 'Token verification failed',
        details: verifyError
      });
    }
  } catch (error) {
    console.error('Test token generation error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Token generation failed',
      details: error
    });
  }
} 