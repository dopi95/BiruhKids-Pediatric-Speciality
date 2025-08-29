import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppointmentPage from "./pages/AppointmentPage";
import VideosPage from "./pages/VideosPage";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import HomePage from "./pages/Home/HomePage";
import MainLayout from "./layouts/MainLayout";

function App() {
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

export default App;
