import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CalendarEventModalProps {
  onClose: () => void;
  initialDate?: Date | null;
  editEvent?: {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    type: 'task' | 'payment' | 'birthday' | 'other';
  };
}

const CalendarEventModal: React.FC<CalendarEventModalProps> = ({ 
  onClose, 
  initialDate,
  editEvent 
}) => {
  const formatDateTimeLocal = (date: Date) => {
    return date.toISOString().slice(0, 16);
  };

  const [title, setTitle] = useState(editEvent?.title || '');
  const [description, setDescription] = useState(editEvent?.description || '');
  const [startDate, setStartDate] = useState(
    editEvent?.startDate 
      ? formatDateTimeLocal(new Date(editEvent.startDate))
      : initialDate 
        ? formatDateTimeLocal(new Date(initialDate.setHours(9, 0, 0, 0)))
        : formatDateTimeLocal(new Date(new Date().setHours(9, 0, 0, 0)))
  );
  const [endDate, setEndDate] = useState(
    editEvent?.endDate 
      ? formatDateTimeLocal(new Date(editEvent.endDate))
      : initialDate 
        ? formatDateTimeLocal(new Date(initialDate.setHours(10, 0, 0, 0)))
        : formatDateTimeLocal(new Date(new Date().setHours(10, 0, 0, 0)))
  );
  const [type, setType] = useState<'task' | 'payment' | 'birthday' | 'other'>(
    editEvent?.type || 'other'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate dates
    if (new Date(startDate) > new Date(endDate)) {
      alert('End date must be after start date');
      return;
    }
    
    // In a real app, this would save to Firebase
    console.log({
      title,
      description,
      startDate,
      endDate,
      type,
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            {editEvent ? 'Edit Event' : 'Add New Event'}
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
              placeholder="Enter event title"
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
              placeholder="Enter event description"
              rows={3}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Event Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="task">Task</option>
              <option value="payment">Payment</option>
              <option value="birthday">Birthday</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date & Time
              </label>
              <input
                type="datetime-local"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
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
              {editEvent ? 'Update Event' : 'Add Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CalendarEventModal;