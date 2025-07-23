
import ServiceModel from '@/backend/models/services';
import { NextApiRequest, NextApiResponse } from 'next';

// Type definitions
interface ServiceRequest extends NextApiRequest {
  query: {
    slug: string;
  };
}

interface ErrorResponse {
  message: string;
  error?: string;
}

interface ServiceResponse {
  [key: string]: unknown;
}

export default async function handler(req: ServiceRequest, res: NextApiResponse<ServiceResponse | ErrorResponse>) {
  try {
    const { slug } = req.query;
    
    // GET - Fetch service by slug
    if (req.method === 'GET') {
      const service = await ServiceModel.getServiceBySlug(slug);
      
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      
      return res.status(200).json(service);
    }
    
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ message: 'Internal server error', error: errorMessage });
  }
}