import { Navigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout({ children }) {
    const { user, isAdmin, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    if (!user || !isAdmin()) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex bg-gray-50">
            <AdminSidebar />
            <main className="w-full md:mt-0">{children}</main>
        </div>
    );
}
