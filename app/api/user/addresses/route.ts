// File: app/api/user/addresses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import  pool  from '@/lib/db';

// Type definitions
interface User {
  id: number;
  google_id: string;
}

interface UserAddress {
  id: number;
  user_id: number;
  full_name: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  is_default: number;
  created_at: Date;
}

interface AddressCount {
  count: number;
}

export async function GET(req: NextRequest) {
    try {
      const session = await getServerSession(authOptions);
      
      if (!session || !session.user) {
        return NextResponse.json(
          { error: 'You must be logged in to view addresses' },
          { status: 401 }
        );
      }
  
      // Get Google ID from session
      const userGoogleId = session.user.id;
      const connection = await pool.getConnection();
      
      try {
        // First get the internal user ID by Google ID
        const [userResult] = await connection.query(
          'SELECT id FROM users WHERE google_id = ?',
          [userGoogleId]
        );
        
        if ((userResult as User[]).length === 0) {
          return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        
        const userId = (userResult as User[])[0].id;
        
        // Query the database for user addresses using internal ID
        const [addresses] = await connection.query(
          `SELECT * FROM user_addresses 
           WHERE user_id = ? 
           ORDER BY is_default DESC, created_at DESC`,
          [userId]
        );
  
        // Transform database field names to match frontend naming convention
        const formattedAddresses = (addresses as UserAddress[]).map(address => ({
          fullName: address.full_name,
          addressLine1: address.address_line1,
          addressLine2: address.address_line2,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          phone: address.phone,
          isDefault: address.is_default === 1
        }));
  
        return NextResponse.json({ addresses: formattedAddresses });
      } finally {
        connection.release();
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      return NextResponse.json(
        { error: 'Failed to fetch addresses' },
        { status: 500 }
      );
    }
  }
  
  export async function POST(req: NextRequest) {
    try {
      const session = await getServerSession(authOptions);
      
      if (!session || !session.user) {
        return NextResponse.json(
          { error: 'You must be logged in to save addresses' },
          { status: 401 }
        );
      }
  
      // Get Google ID from session
      const userGoogleId = session.user.id;
      const connection = await pool.getConnection();
      
      try {
        // Get the internal user ID by Google ID
        const [userResult] = await connection.query(
          'SELECT id FROM users WHERE google_id = ?',
          [userGoogleId]
        );
        
        if ((userResult as User[]).length === 0) {
          return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        
        const userId = (userResult as User[])[0].id;
        
        // Get address data from request body
        const { address } = await req.json();
        
        if (!address) {
          return NextResponse.json(
            { error: 'Address data is required' },
            { status: 400 }
          );
        }
  
        // Check if this should be the default address
        let isDefault = false;
        
        // If this is the user's first address, make it default
        const [existingAddresses] = await connection.query(
          'SELECT COUNT(*) as count FROM user_addresses WHERE user_id = ?', 
          [userId]
        );
        
        if ((existingAddresses as AddressCount[])[0].count === 0) {
          isDefault = true;
        }
  
        // Insert the new address with the correct internal user ID
        await connection.query(
          `INSERT INTO user_addresses (
            user_id, 
            full_name, 
            address_line1, 
            address_line2, 
            city, 
            state, 
            pincode, 
            phone, 
            is_default
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            userId, // Using the internal numeric user ID, not the Google ID
            address.fullName,
            address.addressLine1,
            address.addressLine2 || '',
            address.city,
            address.state,
            address.pincode,
            address.phone,
            isDefault
          ]
        );
  
        return NextResponse.json({ 
          success: true, 
          message: 'Address saved successfully' 
        });
      } finally {
        connection.release();
      }
    } catch (error) {
      console.error('Error saving address:', error);
      return NextResponse.json(
        { error: 'Failed to save address' },
        { status: 500 }
      );
    }
  }
  export async function DELETE(req: NextRequest) {
    try {
      const session = await getServerSession(authOptions);
      
      if (!session || !session.user) {
        return NextResponse.json(
          { error: 'You must be logged in to delete addresses' },
          { status: 401 }
        );
      }
  
      // Get Google ID from session
      const userGoogleId = session.user.id;
      const connection = await pool.getConnection();
      
      try {
        // First get the internal user ID by Google ID
        const [userResult] = await connection.query(
          'SELECT id FROM users WHERE google_id = ?',
          [userGoogleId]
        );
        
        if ((userResult as User[]).length === 0) {
          return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        
        const userId = (userResult as User[])[0].id;
        
        // Get all addresses for this user to find the one to delete
        const [addresses] = await connection.query(
          'SELECT id FROM user_addresses WHERE user_id = ? ORDER BY is_default DESC, created_at DESC',
          [userId]
        );
        
        // Get the index from the query parameter
        const url = new URL(req.url);
        const index = parseInt(url.searchParams.get('index') || '0', 10);
        
        if (isNaN(index) || index < 0 || index >= (addresses as UserAddress[]).length) {
          return NextResponse.json({ error: 'Invalid address index' }, { status: 400 });
        }
        
        const addressId = (addresses as UserAddress[])[index].id;
        
        // Delete the address
        await connection.query(
          'DELETE FROM user_addresses WHERE id = ? AND user_id = ?',
          [addressId, userId]
        );
        
        return NextResponse.json({ success: true, message: 'Address deleted successfully' });
      } finally {
        connection.release();
      }
    } catch (error) {
      console.error('Error deleting address:', error);
      return NextResponse.json(
        { error: 'Failed to delete address' },
        { status: 500 }
      );
    }
  }