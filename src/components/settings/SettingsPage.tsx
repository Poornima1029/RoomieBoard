import React, { useState } from 'react';
import { User, Camera, LogOut, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SettingsPage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUser?.photoURL || null);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would update Firebase Auth and Firestore
    console.log({
      displayName,
      email,
      phone,
      profileImage
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center">
                <User size={18} className="text-blue-600 mr-2" />
                <h2 className="text-lg font-medium text-gray-800">Profile Settings</h2>
              </div>
            </div>
            
            <form onSubmit={handleUpdateProfile} className="p-6">
              <div className="mb-6">
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm mt-6">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center">
                <Trash2 size={18} className="text-red-600 mr-2" />
                <h2 className="text-lg font-medium text-gray-800">Danger Zone</h2>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-md font-medium text-gray-800">Leave Room</h3>
                <p className="text-sm text-gray-600 mt-1">
                  This will remove you from the current room. You can join another room later.
                </p>
                <button
                  type="button"
                  className="mt-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Leave Room
                </button>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-md font-medium text-gray-800">Delete Account</h3>
                <p className="text-sm text-gray-600 mt-1">
                  This will permanently delete your account and remove all your data.
                </p>
                <button
                  type="button"
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt={currentUser?.displayName || 'User'} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User size={40} className="text-gray-400" />
                  )}
                </div>
                <label 
                  htmlFor="profile-image" 
                  className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer"
                >
                  <Camera size={16} />
                  <input
                    type="file"
                    id="profile-image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              
              <h3 className="text-lg font-medium text-gray-800">
                {currentUser?.displayName || 'User'}
              </h3>
              <p className="text-sm text-gray-600">
                {currentUser?.email || 'user@example.com'}
              </p>
              
              <button
                onClick={handleLogout}
                className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-md font-medium text-gray-800 mb-4">Room Information</h3>
            
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-600">Room ID</p>
                <p className="text-sm font-medium">apartment-123</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Your Role</p>
                <p className="text-sm font-medium">Admin</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Members</p>
                <p className="text-sm font-medium">3 roommates</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Joined On</p>
                <p className="text-sm font-medium">May 1, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;