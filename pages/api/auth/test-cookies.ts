import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Return all request information for debugging
  return res.status(200).json({
    message: 'Cookie test endpoint',
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      JWT_SECRET: process.env.JWT_SECRET ? 'set' : 'not set'
    },
    request: {
      method: req.method,
      url: req.url,
      headers: {
        host: req.headers.host,
        origin: req.headers.origin,
        referer: req.headers.referer,
        cookie: req.headers.cookie ? 'present' : 'missing',
        'user-agent': req.headers['user-agent']
      },
      cookies: req.cookies,
      query: req.query
    }
  });
}
