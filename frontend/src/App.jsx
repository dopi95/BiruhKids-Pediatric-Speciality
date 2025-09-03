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
export default function App() {
    return (
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
                    <Route
                        path="/admin"
                        element={
                            <AdminLayout>
                                <AdminDashboard />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path="/admin/doctors"
                        element={
                            <AdminLayout>
                                <DoctorManagement />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path="/admin/users"
                        element={
                            <AdminLayout>
                                <UserManagement />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path="/admin/admins"
                        element={
                            <AdminLayout>
                                <AdminManagement />
                            </AdminLayout>
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
                            <AdminLayout>
                                <ServiceManagement />
                            </AdminLayout>
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
                            <AdminLayout>
                                <AppointmentManagement />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path="/admin/results"
                        element={
                            <AdminLayout>
                                <ResultManagement />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path="/admin/results/form"
                        element={
                            <AdminLayout>
                                <ResultForm />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path="/admin/videos"
                        element={
                            <AdminLayout>
                                <AdminVideos />
                            </AdminLayout>
                        }
                    />

                    <Route
                        path="/admin/videos/form"
                        element={
                            <AdminLayout>
                                <AdminVideosForm />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path="/admin/testimonials"
                        element={
                            <AdminLayout>
                                <TestimonialManagement />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path="/admin/subscribers"
                        element={
                            <AdminLayout>
                                <SubscriberManagement />
                            </AdminLayout>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}
