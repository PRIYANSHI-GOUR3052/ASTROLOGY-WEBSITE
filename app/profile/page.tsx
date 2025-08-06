// File: app/profile/page.tsx
"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { toast } from 'sonner'

interface Address {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

interface OrderItem {
  product_name: string;
  quantity: number;
  carats?: number;
  price: number;
  is_stone: boolean;
  is_service: boolean;
}

interface Order {
  id: number;
  total_amount: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [newAddress, setNewAddress] = useState<Address>({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    isDefault: false,
  })
  
  useEffect(() => {
    // Redirect if not authenticated
    if (status === 'unauthenticated') {
      router.push('/signin?redirect=profile');
      return;
    }
    
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Fetch saved addresses
        const addressRes = await fetch('/api/user/addresses');
        if (addressRes.ok) {
          const addressData = await addressRes.json();
          setAddresses(addressData.addresses || []);
        }
        
        // Fetch order history
        const ordersRes = await fetch('/api/user/orders');
        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          setOrders(ordersData.orders || []);
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        toast.error("Failed to load profile information");
      } finally {
        setLoading(false);
      }
    };
    
    if (status === 'authenticated') {
      fetchUserData();
    }
  }, [status, router]);
  
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/user/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: newAddress }),
      });
      
      if (!res.ok) {
        throw new Error('Failed to save address');
      }
      
      // Reset form and refresh addresses
      setNewAddress({
        fullName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
        isDefault: false,
      });
      
      // Fetch updated addresses
      const addressRes = await fetch('/api/user/addresses');
      if (addressRes.ok) {
        const addressData = await addressRes.json();
        setAddresses(addressData.addresses || []);
        toast.success('Address saved successfully');
      }
    } catch (err) {
      console.error("Failed to save address:", err);
      toast.error("Failed to save address");
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };
  
  const handleDeleteAddress = async (index: number) => {
    try {
      const res = await fetch(`/api/user/addresses?index=${index}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) {
        throw new Error('Failed to delete address');
      }
      
      // Fetch updated addresses
      const addressRes = await fetch('/api/user/addresses');
      if (addressRes.ok) {
        const addressData = await addressRes.json();
        setAddresses(addressData.addresses || []);
        toast.success('Address deleted successfully');
      }
    } catch (err) {
      console.error("Failed to delete address:", err);
      toast.error("Failed to delete address");
    }
  };
  
  if (status === 'loading' || loading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-golden-amber-dark via-sunburst-yellow to-golden-amber-dark">
        <div className="container mx-auto pt-32 px-4 py-16 relative z-10">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gold"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-amber-50 to-white">
      <div className="container mx-auto pt-32 px-4 py-16 relative z-10">
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-center text-black">
          My Profile
        </h1>

        {session?.user && (
          <div className="flex flex-col items-center mb-12">
            {session.user.image && (
              <img 
                src={session.user.image} 
                alt="Profile" 
                className="w-24 h-24 rounded-full border-4 border-amber-400 mb-4 bg-white"
              />
            )}
            <h2 className="text-2xl md:text-3xl font-serif text-center text-black">
              {session.user.name || 'Cosmic Explorer'}
            </h2>
            <p className="text-lg text-gray-700">
              {session.user.email}
            </p>
          </div>
        )}

        <Tabs defaultValue="addresses" className="max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-3 bg-white border border-amber-200 mb-8">
            <TabsTrigger value="addresses" className="text-gray-700 data-[state=active]:text-amber-600">
              Your Addresses
            </TabsTrigger>
            <TabsTrigger value="orders" className="text-gray-700 data-[state=active]:text-amber-600">
              Order History
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-gray-700 data-[state=active]:text-amber-600">
              Account Settings
            </TabsTrigger>
          </TabsList>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Add New Address Form */}
              <Card className="bg-white border border-amber-200 shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-amber-600">Add New Address</CardTitle>
                  <CardDescription className="text-gray-600">
                    Add a new shipping address to your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddressSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-gray-700">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={newAddress.fullName}
                        onChange={handleAddressChange}
                        required
                        className="bg-white border-amber-200 text-black"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={newAddress.phone}
                        onChange={handleAddressChange}
                        required
                        className="bg-white border-amber-200 text-black"
                        placeholder="10-digit mobile number"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="addressLine1" className="text-gray-700">Address Line 1</Label>
                      <Input
                        id="addressLine1"
                        name="addressLine1"
                        value={newAddress.addressLine1}
                        onChange={handleAddressChange}
                        required
                        className="bg-white border-amber-200 text-black"
                        placeholder="House no., Building name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="addressLine2" className="text-gray-700">Address Line 2 (Optional)</Label>
                      <Input
                        id="addressLine2"
                        name="addressLine2"
                        value={newAddress.addressLine2}
                        onChange={handleAddressChange}
                        className="bg-white border-amber-200 text-black"
                        placeholder="Street, Locality"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-gray-700">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={newAddress.city}
                          onChange={handleAddressChange}
                          required
                          className="bg-white border-amber-200 text-black"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-gray-700">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={newAddress.state}
                          onChange={handleAddressChange}
                          required
                          className="bg-white border-amber-200 text-black"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pincode" className="text-gray-700">PIN Code</Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        value={newAddress.pincode}
                        onChange={handleAddressChange}
                        required
                        className="bg-white border-amber-200 text-black"
                        placeholder="6-digit PIN code"
                      />
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <input
                        type="checkbox"
                        id="isDefault"
                        name="isDefault"
                        checked={newAddress.isDefault}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-amber-600 border-amber-200 focus:ring-amber-200"
                      />
                      <Label htmlFor="isDefault" className="text-gray-700">
                        Set as default address
                      </Label>
                    </div>

                    <Button type="submit" className="w-full bg-amber-600 text-white hover:bg-amber-700">
                      Save Address
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Saved Addresses */}
              <div className="space-y-6">
                <h3 className="text-2xl font-serif text-black">Your Saved Addresses</h3>

                {addresses.length === 0 ? (
                  <Card className="bg-white border border-amber-200 p-6">
                    <p className="text-center text-gray-700">You don&apos;t have any saved addresses yet.</p>
                  </Card>
                ) : (
                  addresses.map((address, index) => (
                    <Card key={index} className="bg-white border border-amber-200 shadow-md">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-lg font-medium text-amber-600 flex items-center">
                              {address.fullName}
                              {address.isDefault && (
                                <span className="ml-2 text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded-full">
                                  Default
                                </span>
                              )}
                            </h4>
                            <p className="text-gray-700 mt-1">{address.phone}</p>
                          </div>
                          <Button 
                            variant="outline" 
                            onClick={() => handleDeleteAddress(index)}
                            className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                          >
                            Delete
                          </Button>
                        </div>

                        <div className="mt-4 text-gray-700 space-y-1">
                          <p>{address.addressLine1}</p>
                          {address.addressLine2 && <p>{address.addressLine2}</p>}
                          <p>{address.city}, {address.state} - {address.pincode}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="bg-white border border-amber-200 shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-amber-600">Order History</CardTitle>
                <CardDescription className="text-gray-600">
                  View your recent orders and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center p-8">
                    <p className="text-lg text-gray-700 mb-4">You haven&apos;t placed any orders yet</p>
                    <Button 
                      onClick={() => router.push('/shop')}
                      className="bg-amber-600 text-white hover:bg-amber-700"
                    >
                      Explore Products
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-amber-200 rounded-lg p-6 bg-white shadow-md">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                          <div>
                            <h4 className="text-amber-600 font-medium">Order #{order.id}</h4>
                            <p className="text-gray-600 text-sm">{formatDate(order.created_at)}</p>
                          </div>
                          <div className="mt-2 md:mt-0 flex items-center">
                            <span className={`
                              px-3 py-1 rounded-full text-sm font-medium
                              ${order.status === 'completed' ? 'bg-green-500/20 text-green-700' : ''}
                              ${order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-700' : ''}
                              ${order.status === 'processing' ? 'bg-blue-500/20 text-blue-700' : ''}
                              ${order.status === 'cancelled' ? 'bg-red-500/20 text-red-700' : ''}
                            `}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                            <span className="ml-4 text-amber-600 font-medium">
                              ₹{order.total_amount.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-gray-700">Item</TableHead>
                              <TableHead className="text-gray-700 text-right">Quantity/Carats</TableHead>
                              <TableHead className="text-gray-700 text-right">Price</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {order.items.map((item, idx) => (
                              <TableRow key={idx}>
                                <TableCell className="text-gray-700 font-medium">
                                  {item.product_name}
                                </TableCell>
                                <TableCell className="text-gray-700 text-right">
                                  {item.is_stone ? `${item.carats} carats` : item.quantity}
                                </TableCell>
                                <TableCell className="text-amber-600 text-right">
                                  ₹{item.price.toLocaleString('en-IN')}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="bg-white border border-amber-200 shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-amber-600">Account Settings</CardTitle>
                <CardDescription className="text-gray-600">
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-amber-600 mb-3">Email Preferences</h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="email-marketing"
                      className="h-4 w-4 text-amber-600 border-amber-200 focus:ring-amber-200"
                    />
                    <Label htmlFor="email-marketing" className="text-gray-700">
                      Receive promotional emails and offers
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      type="checkbox"
                      id="email-orders"
                      defaultChecked
                      className="h-4 w-4 text-amber-600 border-amber-200 focus:ring-amber-200"
                    />
                    <Label htmlFor="email-orders" className="text-gray-700">
                      Receive order updates and shipping notifications
                    </Label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-amber-600 mb-3">Language Preference</h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="lang-en"
                      name="language"
                      defaultChecked
                      className="h-4 w-4 text-amber-600 border-amber-200 focus:ring-amber-200"
                    />
                    <Label htmlFor="lang-en" className="text-gray-700">
                      English
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      type="radio"
                      id="lang-hi"
                      name="language"
                      className="h-4 w-4 text-amber-600 border-amber-200 focus:ring-amber-200"
                    />
                    <Label htmlFor="lang-hi" className="text-gray-700">
                      Hindi
                    </Label>
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="bg-amber-600 text-white hover:bg-amber-700 mr-4">
                    Save Settings
                  </Button>
                  <Button variant="outline" className="border-red-500/30 text-red-500 hover:bg-red-500/10">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}