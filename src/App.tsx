import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';

// Auth Pages
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import RoomSetup from './components/auth/RoomSetup';

// Main Pages
import DashboardPage from './components/dashboard/DashboardPage';
import ChoresPage from './components/chores/ChoresPage';
import ExpensesPage from './components/expenses/ExpensesPage';
import GroceriesPage from './components/groceries/GroceriesPage';
import PollsPage from './components/polls/PollsPage';
import CalendarPage from './components/calendar/CalendarPage';
import ChatPage from './components/chat/ChatPage';
import SettingsPage from './components/settings/SettingsPage';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

// Room Required Route Component
const RoomRequiredRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, userRoomId, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (!userRoomId) {
    return <Navigate to="/room-setup" />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
              path="/room-setup" 
              element={
                <ProtectedRoute>
                  <RoomSetup />
                </ProtectedRoute>
              } 
            />
            
            {/* Main Routes */}
            <Route 
              path="/" 
              element={
                <RoomRequiredRoute>
                  <DashboardPage />
                </RoomRequiredRoute>
              } 
            />
            <Route 
              path="/chores" 
              element={
                <RoomRequiredRoute>
                  <ChoresPage />
                </RoomRequiredRoute>
              } 
            />
            <Route 
              path="/expenses" 
              element={
                <RoomRequiredRoute>
                  <ExpensesPage />
                </RoomRequiredRoute>
              } 
            />
            <Route 
              path="/groceries" 
              element={
                <RoomRequiredRoute>
                  <GroceriesPage />
                </RoomRequiredRoute>
              } 
            />
            <Route 
              path="/polls" 
              element={
                <RoomRequiredRoute>
                  <PollsPage />
                </RoomRequiredRoute>
              } 
            />
            <Route 
              path="/calendar" 
              element={
                <RoomRequiredRoute>
                  <CalendarPage />
                </RoomRequiredRoute>
              } 
            />
            <Route 
              path="/chat" 
              element={
                <RoomRequiredRoute>
                  <ChatPage />
                </RoomRequiredRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;