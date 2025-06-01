import React, { useState } from 'react';
import { ShoppingCart, Plus, Check, Filter, Trash2 } from 'lucide-react';

const GroceriesPage: React.FC = () => {
  const [newItem, setNewItem] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'bought'>('all');
  
  // Mock data - in a real app, this would come from Firebase
  const [groceryItems, setGroceryItems] = useState([
    { id: '1', name: 'Milk', addedBy: 'Alex', addedAt: '2025-05-12T10:00:00', bought: false },
    { id: '2', name: 'Bread', addedBy: 'Jordan', addedAt: '2025-05-11T14:30:00', bought: true, boughtBy: 'Alex', boughtAt: '2025-05-12T15:45:00' },
    { id: '3', name: 'Eggs', addedBy: 'Taylor', addedAt: '2025-05-12T09:15:00', bought: false },
    { id: '4', name: 'Apples', addedBy: 'Alex', addedAt: '2025-05-10T16:20:00', bought: false },
    { id: '5', name: 'Pasta', addedBy: 'Jordan', addedAt: '2025-05-09T11:30:00', bought: true, boughtBy: 'Taylor', boughtAt: '2025-05-10T12:15:00' },
    { id: '6', name: 'Tomatoes', addedBy: 'Taylor', addedAt: '2025-05-11T10:45:00', bought: false },
    { id: '7', name: 'Cheese', addedBy: 'Alex', addedAt: '2025-05-12T08:30:00', bought: false },
    { id: '8', name: 'Chicken', addedBy: 'Jordan', addedAt: '2025-05-10T13:15:00', bought: false },
  ]);

  // Filter grocery items based on selected filter
  const filteredItems = groceryItems.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !item.bought;
    if (filter === 'bought') return item.bought;
    return true;
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItem.trim()) return;
    
    // In a real app, this would save to Firebase
    const newGroceryItem = {
      id: Date.now().toString(),
      name: newItem.trim(),
      addedBy: 'Alex', // In a real app, use currentUser.displayName
      addedAt: new Date().toISOString(),
      bought: false
    };
    
    setGroceryItems(prev => [newGroceryItem, ...prev]);
    setNewItem('');
  };

  const toggleItemStatus = (id: string) => {
    setGroceryItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          if (item.bought) {
            // Mark as unbought
            return {
              ...item,
              bought: false,
              boughtBy: undefined,
              boughtAt: undefined
            };
          } else {
            // Mark as bought
            return {
              ...item,
              bought: true,
              boughtBy: 'Alex', // In a real app, use currentUser.displayName
              boughtAt: new Date().toISOString()
            };
          }
        }
        return item;
      })
    );
  };

  const deleteItem = (id: string) => {
    setGroceryItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Grocery List</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center">
                <Filter size={18} className="text-gray-500 mr-2" />
                <h2 className="text-lg font-medium text-gray-800">Filters</h2>
              </div>
            </div>
            
            <div className="p-4 flex flex-wrap gap-2">
              <FilterButton 
                label="All Items" 
                active={filter === 'all'} 
                onClick={() => setFilter('all')} 
              />
              <FilterButton 
                label="To Buy" 
                active={filter === 'pending'} 
                onClick={() => setFilter('pending')} 
              />
              <FilterButton 
                label="Bought" 
                active={filter === 'bought'} 
                onClick={() => setFilter('bought')} 
              />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center">
                <ShoppingCart size={18} className="text-orange-600 mr-2" />
                <h2 className="text-lg font-medium text-gray-800">Items</h2>
              </div>
            </div>
            
            {filteredItems.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {filteredItems.map(item => (
                  <div key={item.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                    <div className="flex items-center">
                      <button 
                        onClick={() => toggleItemStatus(item.id)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                          item.bought ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {item.bought && <Check size={14} />}
                      </button>
                      <div>
                        <span className={`font-medium ${item.bought ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                          {item.name}
                        </span>
                        <div className="text-xs text-gray-500">
                          Added by {item.addedBy} on {new Date(item.addedAt).toLocaleDateString()}
                          {item.bought && item.boughtBy && (
                            <span> • Bought by {item.boughtBy}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteItem(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <ShoppingCart size={40} className="mx-auto mb-4 text-gray-300" />
                <p>No grocery items found matching your filters</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 h-fit">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Add New Item</h2>
          
          <form onSubmit={handleAddItem}>
            <div className="mb-4">
              <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-1">
                Item Name
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="itemName"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter item name"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </form>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-xl font-semibold text-gray-800">{groceryItems.length}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-md">
                <p className="text-sm text-gray-600">Bought</p>
                <p className="text-xl font-semibold text-gray-800">
                  {groceryItems.filter(item => item.bought).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Tips</h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Click the circle to mark an item as bought</li>
              <li>Click the trash icon to remove an item</li>
              <li>All changes sync in real-time with roommates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FilterButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-md text-sm ${
        active 
          ? 'bg-blue-100 text-blue-800 border border-blue-200' 
          : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
};

export default GroceriesPage;