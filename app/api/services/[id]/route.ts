import ServiceModel from '@/backend/models/services';
import { NextResponse } from 'next/server';

// PUT handler
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const serviceData = await request.json();
    const updatedService = await ServiceModel.updateService(id, serviceData);
    return NextResponse.json(updatedService, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Internal server error', error: errorMessage }, { status: 500 });
  }
}

// DELETE handler
export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    await ServiceModel.deleteService(id);
    return NextResponse.json({ message: 'Service deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Internal server error', error: errorMessage }, { status: 500 });
  }
}