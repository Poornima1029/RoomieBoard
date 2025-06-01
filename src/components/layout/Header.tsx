import React, { useState } from 'react';
import { Bell, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Mock notifications for UI
  const notifications = [
    { id: '1', title: 'New Chore', message: 'You have been assigned a new chore', time: '5m ago' },
    { id: '2', title: 'Expense Added', message: 'Alex added a new expense', time: '1h ago' },
    { id: '3', title: 'Poll Closing', message: 'The dinner poll is closing soon', time: '3h ago' },
  ];

  return (
    <header className="sticky top-0 z-20 bg-white shadow-sm h-16 flex items-center px-4 md:px-6">
      <div className="flex-1 md:ml-64">
        <h2 className="text-lg font-medium text-gray-800 md:hidden">RoomieBoard</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="text-sm font-semibold">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map(notification => (
                  <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-800">{notification.title}</p>
                    <p className="text-xs text-gray-600">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 text-center border-t border-gray-200">
                <button className="text-xs text-blue-600 hover:text-blue-800">
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* User menu */}
        <div className="relative">
          <button 
            className="flex items-center space-x-2"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              {currentUser?.photoURL ? (
                <img 
                  src={currentUser.photoURL} 
                  alt={currentUser.displayName || 'User'} 
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <User size={18} className="text-blue-600" />
              )}
            </div>
            <span className="text-sm font-medium text-gray-700 hidden md:block">
              {currentUser?.displayName || 'User'}
            </span>
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
              <button 
                onClick={() => {
                  navigate('/settings');
                  setShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile Settings
              </button>
              <button 
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <LogOut size={16} className="mr-2" />
                  <span>Logout</span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;