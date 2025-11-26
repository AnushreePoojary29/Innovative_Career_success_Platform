import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Layout/Sidebar";
import Navbar from "./components/Layout/Navbar";
import Home from "./pages/Home";
import StudentDashboard from "./components/student/StudentDashboard";
import DepartmentDashboard from "./components/department/DepartmentDashboard";
import CompanyDashboard from "./components/company/CompanyDashboard";
import CompanyDetails from "./components/company/CompanyDetails";
import ResumeMatcher from "./pages/ResumeMatcher";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./contexts/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";

import Footer from "./components/Layout/Footer";

export default function App() {
  const location = useLocation();

  return (
    <div className="app-container" style={{ display: "flex" }}>

      {/* Always show the Sidebar so the dashboard layout remains visible */}
      <Sidebar />

      <div className="flex-grow-1" style={{ width: "100%", display: "flex", flexDirection: "column" }}>

        {/* Navbar always visible */}
        <Navbar />

        <main className="content" style={{ flex: 1 }}>
          <ErrorBoundary>
            <Routes>

              {/* Home Page */}
              <Route path="/" element={<Home />} />

              {/* Login Page */}
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Routes */}
              <Route
                path="/student"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/department"
                element={
                  <ProtectedRoute>
                    <DepartmentDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/company"
                element={
                  <ProtectedRoute>
                    <CompanyDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/company/:id"
                element={
                  <ProtectedRoute>
                    <CompanyDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/resume-matcher"
                element={
                  <ProtectedRoute>
                    <ResumeMatcher />
                  </ProtectedRoute>
                }
              />

              {/* Default redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
          </ErrorBoundary>
        </main>

        <Footer />
      </div>
    </div>
  );
}

/* ⭐ SECURE Protected Route ⭐ */
function ProtectedRoute({ children, allowedRoles }) {
  const auth = useAuth();

  // Only require authentication (session cookie set after SIWE)
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check for role access if specified
  if (allowedRoles && !allowedRoles.includes(auth.role)) {
    // Redirect to home if unauthorized
    return <Navigate to="/" replace />;
  }

  return children;
}
