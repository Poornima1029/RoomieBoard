import React from 'react';
import { Link } from 'react-router-dom';
import { Vote, Plus, Clock } from 'lucide-react';

const PollsSummary: React.FC = () => {
  // Mock data - in a real app, this would come from Firebase
  const polls = [
    { 
      id: '1', 
      question: 'What should we have for dinner?', 
      createdBy: 'Alex',
      expiresAt: '2025-05-15T20:00:00',
      options: [
        { id: 'a', text: 'Pizza', votes: 2 },
        { id: 'b', text: 'Tacos', votes: 1 },
        { id: 'c', text: 'Pasta', votes: 0 },
      ]
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Vote size={20} className="text-purple-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Active Polls</h2>
        </div>
        <Link 
          to="/polls" 
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          View all
        </Link>
      </div>
      
      {polls.length > 0 ? (
        <div className="space-y-4">
          {polls.map(poll => (
            <div 
              key={poll.id}
              className="border border-gray-100 rounded-md p-4 hover:bg-gray-50"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-800">{poll.question}</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock size={12} className="mr-1" />
                  <span>
                    Closes: {new Date(poll.expiresAt).toLocaleString()}
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">Created by {poll.createdBy}</p>
              
              <div className="space-y-2">
                {poll.options.map(option => (
                  <div key={option.id} className="relative">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{option.text}</span>
                      <span className="text-xs text-gray-500">{option.votes} votes</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ 
                          width: `${Math.max(
                            5, 
                            (option.votes / poll.options.reduce((sum, opt) => sum + opt.votes, 0) || 0) * 100
                          )}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link 
                to={`/polls/${poll.id}`}
                className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-800"
              >
                Vote now
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-4">No active polls</p>
      )}
      
      <Link 
        to="/polls/new" 
        className="mt-4 flex items-center justify-center w-full py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-100"
      >
        <Plus size={16} className="mr-1" />
        Create New Poll
      </Link>
    </div>
  );
};

export default PollsSummary;