import React, { useState } from 'react';
import { Plus, Filter, CheckSquare, Clock, User } from 'lucide-react';
import ChoreModal from './ChoreModal';

const ChoresPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'mine' | 'pending' | 'completed'>('all');
  
  // Mock data - in a real app, this would come from Firebase
  const chores = [
    { 
      id: '1', 
      title: 'Clean kitchen', 
      description: 'Wipe counters, clean stove, and mop floor',
      assignedTo: 'Alex', 
      createdBy: 'Jordan',
      createdAt: '2025-05-10T10:00:00',
      dueDate: '2025-05-15', 
      status: 'pending' 
    },
    { 
      id: '2', 
      title: 'Take out trash', 
      description: 'Empty all trash cans and take to dumpster',
      assignedTo: 'Jordan', 
      createdBy: 'Taylor',
      createdAt: '2025-05-09T14:30:00',
      dueDate: '2025-05-14', 
      status: 'completed' 
    },
    { 
      id: '3', 
      title: 'Vacuum living room', 
      description: 'Vacuum carpet and dust furniture',
      assignedTo: 'Taylor', 
      createdBy: 'Alex',
      createdAt: '2025-05-11T09:15:00',
      dueDate: '2025-05-16', 
      status: 'pending' 
    },
  ];

  // Filter chores based on selected filter
  const filteredChores = chores.filter(chore => {
    if (filter === 'all') return true;
    if (filter === 'mine') return chore.assignedTo === 'Alex'; // In a real app, use currentUser.displayName
    if (filter === 'pending') return chore.status === 'pending';
    if (filter === 'completed') return chore.status === 'completed';
    return true;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Chores</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus size={18} className="mr-1" />
          Add Chore
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center">
            <Filter size={18} className="text-gray-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-800">Filters</h2>
          </div>
        </div>
        
        <div className="p-4 flex flex-wrap gap-2">
          <FilterButton 
            label="All Chores" 
            active={filter === 'all'} 
            onClick={() => setFilter('all')} 
          />
          <FilterButton 
            label="Assigned to Me" 
            active={filter === 'mine'} 
            onClick={() => setFilter('mine')} 
          />
          <FilterButton 
            label="Pending" 
            active={filter === 'pending'} 
            onClick={() => setFilter('pending')} 
          />
          <FilterButton 
            label="Completed" 
            active={filter === 'completed'} 
            onClick={() => setFilter('completed')} 
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center">
            <CheckSquare size={18} className="text-green-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-800">Chore List</h2>
          </div>
        </div>
        
        {filteredChores.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredChores.map(chore => (
              <div key={chore.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800 flex items-center">
                      <span className={`mr-2 w-4 h-4 rounded-full ${
                        chore.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></span>
                      {chore.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{chore.description}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    chore.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {chore.status === 'completed' ? 'Completed' : 'Pending'}
                  </span>
                </div>
                
                <div className="mt-3 flex flex-wrap items-center text-sm text-gray-500 gap-4">
                  <div className="flex items-center">
                    <User size={14} className="mr-1" />
                    <span>Assigned to: {chore.assignedTo}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>Due: {new Date(chore.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="mt-3 flex space-x-2">
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Edit
                  </button>
                  {chore.status === 'pending' ? (
                    <button className="text-sm text-green-600 hover:text-green-800">
                      Mark Complete
                    </button>
                  ) : (
                    <button className="text-sm text-yellow-600 hover:text-yellow-800">
                      Mark Incomplete
                    </button>
                  )}
                  <button className="text-sm text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <CheckSquare size={40} className="mx-auto mb-4 text-gray-300" />
            <p>No chores found matching your filters</p>
          </div>
        )}
      </div>
      
      {showModal && <ChoreModal onClose={() => setShowModal(false)} />}
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

export default ChoresPage;