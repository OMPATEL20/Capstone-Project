import React from "react";
import { Routes, Route, Navigate, useLocation, matchPath } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import UrbanRegistrationForm from "./components/UrbanRegistrationForm";
import ChatbotPage from "./components/ChatbotPage";
import BlogPost from "./components/BlogsPage";
import AddPost from "./components/AddPost";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ThankYou from "./components/ThankYou";
import MFA from "./components/MFA";
import AdminDashboard from "./components/AdminDashboard";
import AddMarkdownPage from "./components/AddMarkdownPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import EventForm from "./components/EventForm";
function App() {
  const location = useLocation();

  const noNavbarPaths = [
    "/",
    "/register",
    "/forgot-password",
    "/reset-password/:token",
    "/mfa",
    "/thank-you",
  ];

  const showNavbar = !noNavbarPaths.some(path => matchPath(path, location.pathname));

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        {/* Public Routes without Navbar */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<UrbanRegistrationForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/mfa" element={<MFA />} />

        {/* Protected User Routes with Navbar */}
        <Route element={<ProtectedRoute />}>
          <Route path="/main" element={<ChatbotPage />} />
          <Route path="/blogs" element={<BlogPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/EventForm" element={<EventForm />} />
          {/* Admin Protected Routes */}
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/add-markdown-page" element={<AddMarkdownPage />} />
          </Route>
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
