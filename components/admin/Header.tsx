import { useState } from 'react'
import { Bell, Search, Menu } from 'lucide-react'
import Image from 'next/image'

interface HeaderProps {
  toggleSidebar?: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3">
        <div className="flex items-center justify-between h-12 sm:h-16">
          <div className="flex items-center gap-2 sm:gap-4 flex-1">
            <button
              onClick={toggleSidebar}
              className="p-1.5 sm:p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 lg:hidden"
            >
              <Menu size={18} className="sm:w-5 sm:h-5" />
            </button>
            
            <div className="max-w-lg w-full">
              <div className="relative">
                <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-7 sm:pl-9 pr-3 sm:pr-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="relative p-1.5 sm:p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <Bell size={18} className="sm:w-5 sm:h-5" />
              <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 bg-red-500 text-white text-[10px] sm:text-xs font-medium rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center">
                3
              </span>
            </button>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-right hidden xs:block sm:block">
                <p className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-[120px] sm:max-w-none">Admin User</p>
                <p className="text-[10px] sm:text-xs text-gray-500 font-medium truncate max-w-[120px] sm:max-w-none">admin@example.com</p>
              </div>
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gray-200 overflow-hidden ring-2 ring-white">
                <Image
                  src="/images/admin-avatar.png"
                  alt="Admin avatar"
                  width={32}
                  height={32}
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/32';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header; 