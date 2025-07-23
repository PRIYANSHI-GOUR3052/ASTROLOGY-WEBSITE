
import ServiceModel from '@/backend/models/services';

// Define proper types for request and response
type RequestHandler = {
  query: { 
    slug: string; 
  }; 
  method: string; 
};

type ResponseHandler = {
  status: (code: number) => {
    json: (data: { message: string; error?: string }) => void;
  };
};

export default async function handler(req: RequestHandler, res: ResponseHandler) {
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