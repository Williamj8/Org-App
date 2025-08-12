// import './App.css';
// import DashboardLayout from './components/dashboard/dashboard';
// import UserList from './components/dashboard/users';

// src/App.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import DashboardLayout from './components/Layout/dashboardLayout';
import AppRoutes from "./Routes/routes";

const App: React.FC = () => {
  return (
    <Router>
      <DashboardLayout>
        <AppRoutes />
      </DashboardLayout>
    </Router>
  );
};

export default App;

