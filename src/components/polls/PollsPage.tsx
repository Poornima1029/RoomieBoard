import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Vote, Plus, Clock, Filter } from 'lucide-react';
import PollModal from './PollModal';

const PollsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'closed'>('all');
  
  // Mock data - in a real app, this would come from Firebase
  const polls = [
    { 
      id: '1', 
      question: 'What should we have for dinner?', 
      createdBy: 'Alex',
      createdAt: '2025-05-12T10:00:00',
      expiresAt: '2025-05-15T20:00:00',
      options: [
        { id: 'a', text: 'Pizza', votes: ['user1', 'user2'] },
        { id: 'b', text: 'Tacos', votes: ['user3'] },
        { id: 'c', text: 'Pasta', votes: [] },
      ]
    },
    { 
      id: '2', 
      question: 'Movie night this weekend?', 
      createdBy: 'Jordan',
      createdAt: '2025-05-10T14:30:00',
      expiresAt: '2025-05-13T18:00:00',
      options: [
        { id: 'a', text: 'Friday', votes: ['user1', 'user3'] },
        { id: 'b', text: 'Saturday', votes: ['user2'] },
        { id: 'c', text: 'Sunday', votes: [] },
      ]
    },
    { 
      id: '3', 
      question: 'New couch color?', 
      createdBy: 'Taylor',
      createdAt: '2025-05-05T09:15:00',
      expiresAt: '2025-05-08T23:59:59',
      options: [
        { id: 'a', text: 'Gray', votes: ['user1'] },
        { id: 'b', text: 'Blue', votes: ['user2', 'user3'] },
        { id: 'c', text: 'Green', votes: [] },
      ]
    },
  ];

  // Filter polls based on selected filter and check if expired
  const filteredPolls = polls.filter(poll => {
    const isExpired = new Date(poll.expiresAt) < new Date();
    
    if (filter === 'all') return true;
    if (filter === 'active') return !isExpired;
    if (filter === 'closed') return isExpired;
    return true;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Polls</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus size={18} className="mr-1" />
          Create Poll
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
            label="All Polls" 
            active={filter === 'all'} 
            onClick={() => setFilter('all')} 
          />
          <FilterButton 
            label="Active" 
            active={filter === 'active'} 
            onClick={() => setFilter('active')} 
          />
          <FilterButton 
            label="Closed" 
            active={filter === 'closed'} 
            onClick={() => setFilter('closed')} 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPolls.length > 0 ? (
          filteredPolls.map(poll => {
            const isExpired = new Date(poll.expiresAt) < new Date();
            const totalVotes = poll.options.reduce((sum, option) => sum + option.votes.length, 0);
            
            return (
              <div 
                key={poll.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-4 border-b border-gray-100">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-800">{poll.question}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      isExpired 
                        ? 'bg-gray-100 text-gray-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {isExpired ? 'Closed' : 'Active'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Created by {poll.createdBy}</p>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <Clock size={12} className="mr-1" />
                    <span>
                      {isExpired 
                        ? `Closed on ${new Date(poll.expiresAt).toLocaleString()}` 
                        : `Closes on ${new Date(poll.expiresAt).toLocaleString()}`}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {poll.options.map(option => (
                      <div key={option.id} className="relative">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{option.text}</span>
                          <span className="text-xs text-gray-500">{option.votes.length} votes</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full" 
                            style={{ 
                              width: `${totalVotes === 0 ? 0 : (option.votes.length / totalVotes) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {!isExpired && (
                    <Link 
                      to={`/polls/${poll.id}`}
                      className="mt-4 block w-full py-2 bg-purple-100 text-purple-800 text-center rounded-md text-sm font-medium hover:bg-purple-200 transition-colors"
                    >
                      Vote Now
                    </Link>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full p-8 text-center text-gray-500 bg-white rounded-lg shadow-sm">
            <Vote size={40} className="mx-auto mb-4 text-gray-300" />
            <p>No polls found matching your filters</p>
          </div>
        )}
      </div>
      
      {showModal && <PollModal onClose={() => setShowModal(false)} />}
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

export default PollsPage;