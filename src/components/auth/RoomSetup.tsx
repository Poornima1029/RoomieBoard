import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Home, Plus, Users } from 'lucide-react';

const RoomSetup: React.FC = () => {
  const [joinRoom, setJoinRoom] = useState(true);
  const [roomId, setRoomId] = useState('');
  const [roomName, setRoomName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { joinRoom: joinRoomFn, createRoom, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      
      if (joinRoom) {
        await joinRoomFn(roomId);
      } else {
        await createRoom(roomName);
      }
      
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to setup room');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Home size={40} className="text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Room Setup</h2>
          <p className="mt-2 text-sm text-gray-600">
            {currentUser?.displayName}, join an existing room or create a new one
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex border border-gray-300 rounded-md overflow-hidden">
          <button
            type="button"
            className={`flex-1 py-2 px-4 text-center ${joinRoom ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setJoinRoom(true)}
          >
            <Users className="inline-block mr-2" size={16} />
            Join Room
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-4 text-center ${!joinRoom ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setJoinRoom(false)}
          >
            <Plus className="inline-block mr-2" size={16} />
            Create Room
          </button>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {joinRoom ? (
            <div>
              <label htmlFor="room-id\" className="block text-sm font-medium text-gray-700">
                Room ID
              </label>
              <input
                id="room-id"
                name="roomId"
                type="text"
                required
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter the room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
              <p className="mt-2 text-sm text-gray-500">
                Ask your roommate for the room ID
              </p>
            </div>
          ) : (
            <div>
              <label htmlFor="room-name" className="block text-sm font-medium text-gray-700">
                Room Name
              </label>
              <input
                id="room-name"
                name="roomName"
                type="text"
                required
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter a name for your room"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
              <p className="mt-2 text-sm text-gray-500">
                Create a unique name for your shared living space
              </p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {loading ? 'Processing...' : joinRoom ? 'Join Room' : 'Create Room'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomSetup;