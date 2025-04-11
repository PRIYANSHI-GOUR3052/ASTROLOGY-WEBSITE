// app/api/services/route.ts
import ServiceModel from '@/backend/models/services';
import { NextRequest, NextResponse } from 'next/server';

// GET handler
export async function GET() {
  try {
    const services = await ServiceModel.getAllServices();
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Internal server error', error: errorMessage }, { status: 500 });
  }
}

// POST handler
export async function POST(request: NextRequest) {
  try {
    // Get request body
    const serviceData = await request.json();
    
    // Create service
    const newService = await ServiceModel.createService(serviceData);
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Internal server error', error: errorMessage }, { status: 500 });
  }
}