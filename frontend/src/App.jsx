import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import TasksPage from './pages/TasksPage';
import AddTaskPage from './pages/AddTaskPage';
import RecommendationPage from './pages/RecommendationPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ReflectionPage from './pages/ReflectionPage';
import BucketListPage from './pages/BucketListPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="add-task" element={<AddTaskPage />} />
          <Route path="recommendations" element={<RecommendationPage />} />
          <Route path="reflection" element={<ReflectionPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="bucket-list" element={<BucketListPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
