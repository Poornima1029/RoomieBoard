import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Check } from 'lucide-react';

const GroceriesSummary: React.FC = () => {
  // Mock data - in a real app, this would come from Firebase
  const groceryItems = [
    { id: '1', name: 'Milk', addedBy: 'Alex', bought: false },
    { id: '2', name: 'Bread', addedBy: 'Jordan', bought: true },
    { id: '3', name: 'Eggs', addedBy: 'Taylor', bought: false },
    { id: '4', name: 'Apples', addedBy: 'Alex', bought: false },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <ShoppingCart size={20} className="text-orange-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Grocery List</h2>
        </div>
        <Link 
          to="/groceries" 
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          View all
        </Link>
      </div>
      
      <div className="space-y-2">
        {groceryItems.map(item => (
          <div 
            key={item.id}
            className="flex items-center justify-between p-3 border border-gray-100 rounded-md hover:bg-gray-50"
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                item.bought ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
              }`}>
                {item.bought && <Check size={12} />}
              </div>
              <span className={`font-medium ${item.bought ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                {item.name}
              </span>
            </div>
            <span className="text-xs text-gray-500">Added by {item.addedBy}</span>
          </div>
        ))}
      </div>
      
      <Link 
        to="/groceries" 
        className="mt-4 flex items-center justify-center w-full py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-100"
      >
        <Plus size={16} className="mr-1" />
        Add Grocery Item
      </Link>
    </div>
  );
};

export default GroceriesSummary;