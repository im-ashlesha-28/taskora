import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import TasksPage from './pages/TasksPage';
import AddTaskPage from './pages/AddTaskPage';
import RecommendationPage from './pages/RecommendationPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ReflectionPage from './pages/ReflectionPage';
import BucketListPage from './pages/BucketListPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-sage-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sage-400"></div>
    </div>
  );
  
  if (!user) return <Navigate to="/login" />;
  
  return children;
};

function AppContent() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="add-task" element={<AddTaskPage />} />
        <Route path="recommendations" element={<RecommendationPage />} />
        <Route path="reflection" element={<ReflectionPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="bucket-list" element={<BucketListPage />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
