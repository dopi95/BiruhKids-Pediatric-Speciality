import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
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
import ResultManagement from "./pages/Admin/ResultManagement";
import ResultForm from "./pages/Admin/ResultForm";

export default function App() {
  return (
        <Router>
            <div className>
                <Routes>
                    <Route
                        path="/appointment"
                        element={
                            <MainLayout>
                                <AppointmentPage />
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
                    <Route path="/about" element={
                        <MainLayout>
                            <AboutPage />
                        </MainLayout>
                    } />
                    <Route path="/contact" element={
                        <MainLayout>
                            <ContactPage />
                        </MainLayout>
                    } />
                
                    <Route path="/login" element={
                        <MainLayout>
                            <SignIn />
                        </MainLayout>
                    } />
                    <Route path="/register" element={
                        <MainLayout>
                            <SignUp />
                        </MainLayout>
                    } />
                    <Route path="/forgot-password" element={
                        <MainLayout>
                            <ForgotPassword />
                        </MainLayout>
                    } />
                    <Route path="/services" element={
                        <MainLayout>
                            <Services />
                        </MainLayout>
                    } />

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
                    <Route
                        path="admin/results"
                        element={
                                <ResultManagement/>
                        }
                    />
                    <Route
  path="/results/form"
  element={
      <ResultForm />
  }
/>
                    <Route
                        path="/"
                        element={
                            <MainLayout>
                                <HomePage />
                            </MainLayout>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}
