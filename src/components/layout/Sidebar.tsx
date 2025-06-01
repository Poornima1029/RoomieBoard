import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  DollarSign, 
  ShoppingCart, 
  Vote, 
  Calendar, 
  MessageSquare, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { userRoomId } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/chores', icon: <CheckSquare size={20} />, label: 'Chores' },
    { path: '/expenses', icon: <DollarSign size={20} />, label: 'Expenses' },
    { path: '/groceries', icon: <ShoppingCart size={20} />, label: 'Groceries' },
    { path: '/polls', icon: <Vote size={20} />, label: 'Polls' },
    { path: '/calendar', icon: <Calendar size={20} />, label: 'Calendar' },
    { path: '/chat', icon: <MessageSquare size={20} />, label: 'Chat' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  if (!userRoomId) {
    return null;
  }

  return (
    <>
      {/* Mobile menu button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out z-30`}>
        <div className="h-full w-64 bg-white shadow-lg flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-blue-600">RoomieBoard</h1>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => 
                      `flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                        isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">© 2025 RoomieBoard</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;