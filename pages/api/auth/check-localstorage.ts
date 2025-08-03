import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // This is just for debugging - in a real scenario, you'd get this from the client
    return res.status(200).json({ 
      message: 'Check your browser console for localStorage data',
      instructions: 'Open browser console and run: console.log(JSON.parse(localStorage.getItem("user")))'
    });
  } catch (error) {
    console.error('Check localStorage error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 