'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Home, 
  Users, 
  BookOpen,
  MessageCircle, 
  Star, 
  Settings, 
  LogOut,
  Package 
} from 'lucide-react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const navItems = [
    { 
      icon: Home, 
      label: 'Dashboard', 
      href: '/admin/dashboard',
      active: pathname === '/admin/dashboard'
    },
    { 
      icon: Users, 
      label: 'Clients', 
      href: '/admin/clients',
      active: pathname === '/admin/clients'
    },
    { 
      icon: BookOpen, 
      label: 'Courses', 
      href: '/admin/courses',
      active: pathname === '/admin/courses'
    },
    {
      icon: Package,
      label: 'Products',
      href: '/admin/products',
      active: pathname === '/admin/products'
    },
    { 
      icon: MessageCircle, 
      label: 'Messages', 
      href: '/admin/messages',
      active: pathname === '/admin/messages'
    },
    { 
      icon: Star, 
      label: 'Reviews', 
      href: '/admin/reviews',
      active: pathname === '/admin/reviews'
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      href: '/admin/settings',
      active: pathname === '/admin/settings'
    }
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Nakshatra Gyaan</h2>
          <p className="text-sm text-gray-500">Admin Portal</p>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className={`
                flex items-center space-x-3 p-2 rounded-lg transition-colors
                ${item.active 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'hover:bg-gray-100 text-gray-700'
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <button 
            className="w-full bg-red-50 text-red-600 p-2 rounded-lg 
            hover:bg-red-100 transition-colors flex items-center justify-center"
          >
            <LogOut className="mr-2 w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {/* Page Content */}
        <main className="p-6 bg-gray-50 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;