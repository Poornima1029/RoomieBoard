import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Clock, Plus } from 'lucide-react';

const ChoresSummary: React.FC = () => {
  // Mock data - in a real app, this would come from Firebase
  const chores = [
    { id: '1', title: 'Clean kitchen', assignedTo: 'Alex', dueDate: '2025-05-15', status: 'pending' },
    { id: '2', title: 'Take out trash', assignedTo: 'Jordan', dueDate: '2025-05-14', status: 'completed' },
    { id: '3', title: 'Vacuum living room', assignedTo: 'Taylor', dueDate: '2025-05-16', status: 'pending' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <CheckSquare size={20} className="text-green-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Chores</h2>
        </div>
        <Link 
          to="/chores" 
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          View all
        </Link>
      </div>
      
      <div className="space-y-3">
        {chores.map(chore => (
          <div 
            key={chore.id}
            className="flex items-center justify-between p-3 border border-gray-100 rounded-md hover:bg-gray-50"
          >
            <div>
              <h3 className="font-medium text-gray-800">{chore.title}</h3>
              <p className="text-sm text-gray-600">Assigned to: {chore.assignedTo}</p>
            </div>
            <div className="flex items-center">
              <Clock size={14} className="text-gray-400 mr-1" />
              <span className="text-xs text-gray-500">
                Due: {new Date(chore.dueDate).toLocaleDateString()}
              </span>
              <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
                chore.status === 'completed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {chore.status === 'completed' ? 'Completed' : 'Pending'}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <Link 
        to="/chores/new" 
        className="mt-4 flex items-center justify-center w-full py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-100"
      >
        <Plus size={16} className="mr-1" />
        Add New Chore
      </Link>
    </div>
  );
};

export default ChoresSummary;