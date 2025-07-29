'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Home, 
  Users, 
  BookOpen,
  MessageCircle, 
  Star, 
  Settings, 
  LogOut,
  Package,
  Search,
  Moon,
  Sun,
  Bell,
  Grid,
  UserCircle2,
  Orbit,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Check if current path is login page
  const isLoginPage = pathname === '/admin/login';

  // Effect to apply dark mode and persist preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    
    // Check for saved theme preference or system preference
    if (savedTheme === 'dark' || 
        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    // Update HTML class
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Redirect to login page after successful logout
        router.push('/admin/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
      icon: Orbit, 
      label: 'Astrologers', 
      href: '/admin/astrologers',
      active: pathname === '/admin/astrologers'
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
      // No href for parent
      children: [
        {
          label: 'Zodiac Sign',
          href: '/admin/products/zodiac-sign',
          active: pathname === '/admin/products/zodiac-sign',
        },
        {
          label: 'Categories',
          href: '/admin/products/categories',
          active: pathname === '/admin/products/categories',
        },
        {
          label: 'Attributes',
          href: '/admin/products/attributes',
          active: pathname === '/admin/products/attributes',
        },
        {
          label: 'Product Creation',
          href: '/admin/products/create',
          active: pathname === '/admin/products/create',
        },
      ],
      // Expanded if any child is active
      expanded: ['/admin/products/zodiac-sign', '/admin/products/categories', '/admin/products/create'].includes(pathname || ''),
      active: ['/admin/products/zodiac-sign', '/admin/products/categories', '/admin/products/create'].includes(pathname || ''),
    },
    {
      icon: Package,
      label: 'Stone',
      href: '/admin/stone',
      active: pathname === '/admin/stone'
    },
    { 
      icon: MessageCircle, 
      label: 'Services', 
      href: '/admin/services',
      active: pathname === '/admin/services'
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

  // If login page, only render children without layout
  if (isLoginPage) {
    return (
      <div className="h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {children}
      </div>
    );
  }

  // Regular admin layout for all other admin pages
  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Nakshatra Gyaan</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Admin Portal</p>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            // Products dropdown
            if (item.label === 'Products' && item.children) {
              const isAnyChildActive = item.children.some(child => child.active);
              const isOpen = productsDropdownOpen || isAnyChildActive;
              return (
                <div key="products-dropdown">
                  <button
                    type="button"
                    onClick={() => setProductsDropdownOpen((open) => !open)}
                    className={`flex items-center justify-between w-full space-x-3 p-2 rounded-lg transition-colors cursor-pointer focus:outline-none
                      ${isAnyChildActive
                        ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}
                    `}
                  >
                    <span className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`flex items-center space-x-2 p-2 rounded-lg transition-colors
                            ${child.active
                              ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}
                          `}
                        >
                          <span className="text-sm font-medium">{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            // Regular nav item
            return item.href ? (
              <Link 
                key={item.href}
                href={item.href}
                className={`
                  flex items-center space-x-3 p-2 rounded-lg transition-colors
                  ${item.active 
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ) : (
              <div
                className={`flex items-center space-x-3 p-2 rounded-lg transition-colors cursor-default
                  ${item.active
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Bagisto-style Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-between items-center">
          {/* Left side - Mega Search */}
          <div className="flex items-center w-1/3">
            <Search className="text-gray-400 dark:text-gray-500 mr-2" size={20} />
            <input 
              type="text" 
              placeholder="Mega Search" 
              className="w-full text-sm focus:outline-none bg-transparent text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Right side - Icons and User */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full"
            >
              {isDarkMode ? (
                <Sun className="text-gray-600 dark:text-gray-300" size={20} />
              ) : (
                <Moon className="text-gray-600" size={20} />
              )}
            </button>

            {/* Notifications */}
            <button className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full relative">
              <Bell className="text-gray-600 dark:text-gray-300" size={20} />
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs">
                2
              </span>
            </button>

            {/* Grid/Apps */}
            <button className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full">
              <Grid className="text-gray-600 dark:text-gray-300" size={20} />
            </button>

            {/* User Profile and Logout */}
            <div className="flex items-center space-x-2">
              <UserCircle2 className="text-gray-600 dark:text-gray-300" size={30} />
              <div className="mr-2">
                <p className="text-sm font-medium">Hi | Example</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
              </div>
              
              {/* Updated Logout Button */}
              <button 
                onClick={handleLogout}
                className="bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-300 p-2 rounded-lg 
                hover:bg-red-100 dark:hover:bg-red-800 transition-colors flex items-center justify-center"
              >
                <LogOut className="mr-1 w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;