import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface PollModalProps {
  onClose: () => void;
  editPoll?: {
    id: string;
    question: string;
    expiresAt: string;
    options: {
      id: string;
      text: string;
    }[];
  };
}

const PollModal: React.FC<PollModalProps> = ({ onClose, editPoll }) => {
  const [question, setQuestion] = useState(editPoll?.question || '');
  const [expiresAt, setExpiresAt] = useState(
    editPoll?.expiresAt 
      ? new Date(editPoll.expiresAt).toISOString().slice(0, 16) 
      : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16)
  );
  const [options, setOptions] = useState(
    editPoll?.options || [
      { id: uuidv4(), text: '' },
      { id: uuidv4(), text: '' },
    ]
  );

  const handleOptionChange = (id: string, value: string) => {
    setOptions(prev => 
      prev.map(option => 
        option.id === id 
          ? { ...option, text: value } 
          : option
      )
    );
  };

  const addOption = () => {
    setOptions(prev => [...prev, { id: uuidv4(), text: '' }]);
  };

  const removeOption = (id: string) => {
    if (options.length <= 2) return; // Minimum 2 options
    setOptions(prev => prev.filter(option => option.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate options
    const validOptions = options.filter(option => option.text.trim() !== '');
    if (validOptions.length < 2) {
      alert('Please provide at least 2 valid options');
      return;
    }
    
    // In a real app, this would save to Firebase
    console.log({
      question,
      expiresAt: new Date(expiresAt).toISOString(),
      options: validOptions,
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            {editPoll ? 'Edit Poll' : 'Create New Poll'}
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
            <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
              Question
            </label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your question"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-700 mb-1">
              Closes At
            </label>
            <input
              type="datetime-local"
              id="expiresAt"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Options
            </label>
            <div className="space-y-2">
              {options.map((option, index) => (
                <div key={option.id} className="flex items-center">
                  <span className="mr-2 text-sm text-gray-500">{index + 1}.</span>
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => handleOptionChange(option.id, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Option ${index + 1}`}
                    required
                  />
                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(option.id)}
                      className="ml-2 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <button
              type="button"
              onClick={addOption}
              className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <Plus size={16} className="mr-1" />
              Add Option
            </button>
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
              {editPoll ? 'Update Poll' : 'Create Poll'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PollModal;