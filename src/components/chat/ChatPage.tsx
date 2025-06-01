import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Image, Smile, Paperclip as PaperClip } from 'lucide-react';

const ChatPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Mock data - in a real app, this would come from Firebase
  const messages = [
    { 
      id: '1', 
      text: 'Hey everyone, just a reminder that rent is due tomorrow!', 
      senderId: 'user1',
      senderName: 'Alex',
      createdAt: '2025-05-12T10:00:00',
      readBy: ['user1', 'user2', 'user3']
    },
    { 
      id: '2', 
      text: 'Thanks for the reminder! I\'ll transfer the money tonight.', 
      senderId: 'user2',
      senderName: 'Jordan',
      createdAt: '2025-05-12T10:05:00',
      readBy: ['user1', 'user2', 'user3']
    },
    { 
      id: '3', 
      text: 'I already paid yesterday. Check your account!', 
      senderId: 'user3',
      senderName: 'Taylor',
      createdAt: '2025-05-12T10:10:00',
      readBy: ['user1', 'user2', 'user3']
    },
    { 
      id: '4', 
      text: 'You\'re right, I see it now. Thanks Taylor!', 
      senderId: 'user1',
      senderName: 'Alex',
      createdAt: '2025-05-12T10:15:00',
      readBy: ['user1', 'user2', 'user3']
    },
    { 
      id: '5', 
      text: 'By the way, I\'m thinking of making pasta for dinner tonight. Anyone interested?', 
      senderId: 'user2',
      senderName: 'Jordan',
      createdAt: '2025-05-12T14:30:00',
      readBy: ['user1', 'user2']
    },
    { 
      id: '6', 
      text: 'Sounds great! I\'ll be home around 7pm.', 
      senderId: 'user1',
      senderName: 'Alex',
      createdAt: '2025-05-12T14:35:00',
      readBy: ['user1', 'user2']
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // In a real app, this would save to Firebase
    console.log({
      text: message,
      senderId: 'user1', // Current user ID
      senderName: 'Alex', // Current user name
      createdAt: new Date().toISOString(),
      readBy: ['user1'] // Initially only read by sender
    });
    
    setMessage('');
  };

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-[calc(100vh-10rem)]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Chat</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <MessageSquare size={18} className="text-blue-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-800">Room Chat</h2>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div 
              key={msg.id}
              className={`flex ${msg.senderId === 'user1' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                msg.senderId === 'user1' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}>
                {msg.senderId !== 'user1' && (
                  <p className="text-xs font-medium mb-1">
                    {msg.senderName}
                  </p>
                )}
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 text-right ${
                  msg.senderId === 'user1' ? 'text-blue-200' : 'text-gray-500'
                }`}>
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex items-center">
            <button
              type="button"
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <PaperClip size={20} />
            </button>
            <button
              type="button"
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <Image size={20} />
            </button>
            <button
              type="button"
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <Smile size={20} />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 mx-2 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
              disabled={!message.trim()}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;