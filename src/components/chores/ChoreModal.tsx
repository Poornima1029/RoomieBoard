import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ChoreModalProps {
  onClose: () => void;
  editChore?: {
    id: string;
    title: string;
    description: string;
    assignedTo: string;
    dueDate: string;
  };
}

const ChoreModal: React.FC<ChoreModalProps> = ({ onClose, editChore }) => {
  const [title, setTitle] = useState(editChore?.title || '');
  const [description, setDescription] = useState(editChore?.description || '');
  const [assignedTo, setAssignedTo] = useState(editChore?.assignedTo || '');
  const [dueDate, setDueDate] = useState(editChore?.dueDate || '');
  
  // Mock roommates - in a real app, this would come from Firebase
  const roommates = [
    { id: '1', name: 'Alex' },
    { id: '2', name: 'Jordan' },
    { id: '3', name: 'Taylor' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would save to Firebase
    console.log({
      title,
      description,
      assignedTo,
      dueDate,
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            {editChore ? 'Edit Chore' : 'Add New Chore'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter chore title"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter chore description"
              rows={3}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 mb-1">
              Assign To
            </label>
            <select
              id="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select roommate</option>
              {roommates.map(roommate => (
                <option key={roommate.id} value={roommate.name}>
                  {roommate.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {editChore ? 'Update Chore' : 'Add Chore'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChoreModal;