import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Test environment variables
  const envTest = {
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'NOT SET',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT SET',
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
  };

  // Test request headers
  const requestInfo = {
    host: req.headers.host,
    origin: req.headers.origin,
    referer: req.headers.referer,
    'x-forwarded-proto': req.headers['x-forwarded-proto'],
    cookie: req.headers.cookie ? 'PRESENT' : 'MISSING',
  };

  return res.status(200).json({
    message: 'Environment test',
    environment: envTest,
    request: requestInfo,
    timestamp: new Date().toISOString()
  });
}
