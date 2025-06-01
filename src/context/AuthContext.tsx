import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  joinRoom: (roomId: string) => Promise<void>;
  createRoom: (roomName: string) => Promise<string>;
  userRoomId: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRoomId, setUserRoomId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserRoomId(userDoc.data().roomId || null);
        }
      } else {
        setUserRoomId(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string, displayName: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName });
    await setDoc(doc(db, 'users', user.uid), {
      email,
      displayName,
      createdAt: new Date().toISOString(),
      photoURL: null,
      roomId: null,
      role: 'member'
    });
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const joinRoom = async (roomId: string) => {
    if (!currentUser) return;
    
    // Check if room exists
    const roomDoc = await getDoc(doc(db, 'rooms', roomId));
    if (!roomDoc.exists()) {
      throw new Error('Room does not exist');
    }
    
    // Update user's room ID
    await setDoc(doc(db, 'users', currentUser.uid), {
      roomId
    }, { merge: true });
    
    // Add user to room members
    await setDoc(doc(db, 'rooms', roomId, 'members', currentUser.uid), {
      userId: currentUser.uid,
      displayName: currentUser.displayName,
      email: currentUser.email,
      photoURL: currentUser.photoURL,
      role: 'member',
      joinedAt: new Date().toISOString()
    });
    
    setUserRoomId(roomId);
  };

  const createRoom = async (roomName: string) => {
    if (!currentUser) throw new Error('User not authenticated');
    
    // Create a new room
    const roomRef = doc(db, 'rooms', roomName.toLowerCase().replace(/\s+/g, '-'));
    await setDoc(roomRef, {
      name: roomName,
      createdAt: new Date().toISOString(),
      createdBy: currentUser.uid,
      adminId: currentUser.uid
    });
    
    // Add creator as admin member
    await setDoc(doc(db, 'rooms', roomRef.id, 'members', currentUser.uid), {
      userId: currentUser.uid,
      displayName: currentUser.displayName,
      email: currentUser.email,
      photoURL: currentUser.photoURL,
      role: 'admin',
      joinedAt: new Date().toISOString()
    });
    
    // Update user's room ID
    await setDoc(doc(db, 'users', currentUser.uid), {
      roomId: roomRef.id,
      role: 'admin'
    }, { merge: true });
    
    setUserRoomId(roomRef.id);
    return roomRef.id;
  };

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    joinRoom,
    createRoom,
    userRoomId
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};