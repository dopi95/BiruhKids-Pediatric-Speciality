// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppointmentPage from "./pages/AppointmentPage";
import VideosPage from "./pages/VideosPage";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import HomePage from "./pages/Home/HomePage";
import MainLayout from "./layouts/MainLayout";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Services from "./pages/Services";
import AdminDashboard from "./pages/Admin/AdminDashboard";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <MainLayout>
                <HomePage />
              </MainLayout>
            }
          />
          <Route
            path="/about"
            element={
              <MainLayout>
                <AboutPage />
              </MainLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <MainLayout>
                <ContactPage />
              </MainLayout>
            }
          />
          <Route
            path="/services"
            element={
              <MainLayout>
                <Services />
              </MainLayout>
            }
          />
          <Route
            path="/videos"
            element={
              <MainLayout>
                <VideosPage />
              </MainLayout>
            }
          />
          <Route
            path="/appointment"
            element={
              <MainLayout>
                <AppointmentPage />
              </MainLayout>
            }
          />

          {/* Auth routes */}
          <Route
            path="/login"
            element={
              <MainLayout>
                <SignIn />
              </MainLayout>
            }
          />
          <Route
            path="/register"
            element={
              <MainLayout>
                <SignUp />
              </MainLayout>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <MainLayout>
                <ForgotPassword />
              </MainLayout>
            }
          />
          <Route
            path="/verify"
            element={
              <MainLayout>
                <VerifyOtp />
              </MainLayout>
            }
          />
          <Route
            path="/reset-password"
            element={
              <MainLayout>
                <ResetPassword />
              </MainLayout>
            }
          />

          {/* Admin route */}
          <Route
            path="/admin"
            element={
              <MainLayout>
                <AdminDashboard />
              </MainLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
