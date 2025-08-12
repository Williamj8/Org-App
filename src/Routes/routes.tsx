import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../components/Dashboard/dashboard";
const UserList = lazy(() => import("../components/userActions/users"));
const Announcements = ()=> "Page in Progress"

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clients" element={<UserList />} />
        <Route path="/announcements" element={<Announcements />} />
      </Routes>
    </Suspense>
  );
}
