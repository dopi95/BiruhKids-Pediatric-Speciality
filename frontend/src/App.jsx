import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
import DoctorManagement from "./pages/Admin/DoctorManagement";
import UserManagement from "./pages/Admin/UserManagement";
import AdminManagement from "./pages/Admin/admin-management/AdminManagement";
import AdminProfile from "./pages/Admin/AdminProfile";
import ServiceManagement from "./pages/Admin/service-management/ServiceManagement";
import ChangePassword from "./pages/ChangePassword";
import UserDashboard from "./pages/userDashboard";
import Profile from "./pages/profile";
import AppointmentManagement from "./pages/Admin/AppointmentManagement";
import ResultManagement from "./pages/Admin/ResultManagement";
import ResultForm from "./pages/Admin/ResultForm";
import AdminVideos from "./pages/Admin/AdminVideos";
import AdminVideosForm from "./pages/Admin/AdminVideosForm";
import TestimonialManagement from "./pages/Admin/TestimonialManagement";
import SubscriberManagement from "./pages/Admin/SubscriberManagement";
import AdminLayout from "./layouts/AdminLayout";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import NotFound from "./pages/NotFound";

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <ScrollToTop /> 
                <div className="flex flex-col min-h-screen">
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
                            <PublicRoute>
                                <MainLayout>
                                    <SignIn />
                                </MainLayout>
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <PublicRoute>
                                <MainLayout>
                                    <SignUp />
                                </MainLayout>
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/forgot-password"
                        element={
                            <PublicRoute>
                                <MainLayout>
                                    <ForgotPassword />
                                </MainLayout>
                            </PublicRoute>
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
                            <ProtectedRoute>
                                <MainLayout>
                                    <Profile />
                                </MainLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/user-dashboard"
                        element={
                            <ProtectedRoute>
                                <MainLayout>
                                    <UserDashboard />
                                </MainLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/change-password"
                        element={
                            <ProtectedRoute>
                                <MainLayout>
                                    <ChangePassword backPath="/profile" />
                                </MainLayout>
                            </ProtectedRoute>
                        }
                    />

                    {/* Admin routes with permission protection */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute requiredRole="admin">
                                <AdminLayout>
                                    <AdminDashboard />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/doctors"
                        element={
                            <ProtectedRoute requiredPermission="doctorManagement">
                                <AdminLayout>
                                    <DoctorManagement />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/users"
                        element={
                            <ProtectedRoute requiredPermission="userManagement">
                                <AdminLayout>
                                    <UserManagement />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/admins"
                        element={
                            <ProtectedRoute requiredPermission="adminManagement">
                                <AdminLayout>
                                    <AdminManagement />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/profile"
                        element={
                            <AdminLayout>
                                <AdminProfile />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path="/admin/services"
                        element={
                            <ProtectedRoute requiredPermission="serviceManagement">
                                <AdminLayout>
                                    <ServiceManagement />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/change-password"
                        element={
                            <AdminLayout>
                                <ChangePassword backPath="/admin/profile" />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path="/admin/appointments"
                        element={
                            <ProtectedRoute requiredPermission="appointmentManagement">
                                <AdminLayout>
                                    <AppointmentManagement />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/results"
                        element={
                            <ProtectedRoute requiredPermission="resultManagement">
                                <AdminLayout>
                                    <ResultManagement />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/results/form"
                        element={
                            <ProtectedRoute requiredPermission="resultManagement">
                                <AdminLayout>
                                    <ResultForm />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/videos"
                        element={
                            <ProtectedRoute requiredPermission="videoManagement">
                                <AdminLayout>
                                    <AdminVideos />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/videos/form"
                        element={
                            <ProtectedRoute requiredPermission="videoManagement">
                                <AdminLayout>
                                    <AdminVideosForm />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/testimonials"
                        element={
                            <ProtectedRoute requiredPermission="testimonialManagement">
                                <AdminLayout>
                                    <TestimonialManagement />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/subscribers"
                        element={
                            <ProtectedRoute requiredPermission="subscriberManagement">
                                <AdminLayout>
                                    <SubscriberManagement />
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />
                    
                    {/* 404 Catch-all route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Router>
        </AuthProvider>
    );
}
