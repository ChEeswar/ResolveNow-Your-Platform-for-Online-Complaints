import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  Menu, 
  X,
  MessageSquare,
  FileText,
  Home
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getNavigationItems = () => {
    if (!user) return [];
    
    const baseItems = [
      { name: 'Dashboard', href: '/dashboard', icon: Home }
    ];

    switch (user.userType) {
      case 'customer':
        return [
          ...baseItems,
          { name: 'New Complaint', href: '/complaint/new', icon: FileText },
          { name: 'My Complaints', href: '/dashboard', icon: MessageSquare }
        ];
      case 'agent':
        return [
          ...baseItems,
          { name: 'Assigned Complaints', href: '/dashboard', icon: MessageSquare },
          { name: 'All Complaints', href: '/dashboard', icon: FileText }
        ];
      case 'admin':
        return [
          ...baseItems,
          { name: 'All Complaints', href: '/dashboard', icon: FileText },
          { name: 'Manage Users', href: '/dashboard', icon: User },
          { name: 'Analytics', href: '/dashboard', icon: Settings }
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex-shrink-0 flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2 rounded-lg">
                <MessageSquare className="h-6 w-6" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">ResolveNow</span>
            </Link>
            
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </button>

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-medium">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="ml-2 hidden sm:block font-medium">{user?.name}</span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-gray-500 text-xs capitalize">{user?.userType}</div>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}