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
import UserDashboard from "./pages/userDashboard";
import Profile from "./pages/profile";
// admin imports
import AdminDashboard from "./pages/Admin/AdminDashboard";
import DoctorManagement from "./pages/Admin/DoctorManagement";
import UserManagement from "./pages/Admin/UserManagement";
import AdminManagement from "./pages/Admin/admin-management/AdminManagement";
import AdminProfile from "./pages/Admin/AdminProfile";
import ServiceManagement from "./pages/Admin/ServiceManagement";

import ChangePassword from "./pages/ChangePassword";
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

                    {/* Protected User Routes */}
                    <Route
                        path="/profile"
                        element={
                            <MainLayout>
                                <Profile />
                            </MainLayout>
                        }
                    />
                    <Route
                        path="/user-dashboard"
                        element={
                            <MainLayout>
                                <UserDashboard />
                            </MainLayout>
                        }
                    />
                    <Route
                        path="/change-password"
                        element={
                            <MainLayout>
                                <ChangePassword backPath="/profile" />
                            </MainLayout>
                        }
                    />

                    {/* Admin route */}
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route
                        path="/admin/doctor"
                        element={<DoctorManagement />}
                    />
                    <Route path="/admin/users" element={<UserManagement />} />
                    <Route
                        path="/admin/admin-management"
                        element={<AdminManagement />}
                    />
                    <Route path="/admin/profile" element={<AdminProfile />} />
                    <Route
                        path="/admin/services"
                        element={<ServiceManagement />}
                    />
                    <Route
                        path="/admin/change-password"
                        element={<ChangePassword backPath="/admin/profile" />}
                    />
                </Routes>
            </div>
        </Router>
    );
}
